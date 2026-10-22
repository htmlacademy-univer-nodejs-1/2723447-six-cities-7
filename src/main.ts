#!/usr/bin/env node
import {readFile} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import chalk from 'chalk';
import type {CityName, Convenience, HousingType, Offer} from './types/offer.type.js';

const HELP = `Доступные команды:
  --help
  --version
  --import <path.tsv>
  --generate <n> <path> <url>`;

const cities: CityName[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
const housingTypes: HousingType[] = ['apartment', 'room', 'house', 'hotel'];
const conveniences: Convenience[] = ['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'];

function fail(message: string): never {
  throw new Error(message);
}

function parseBoolean(value: string, field: string): boolean {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return fail(`Поле «${field}» должно быть true или false`);
}

function parseNumber(value: string, field: string): number {
  const result = Number(value);
  if (!value.trim() || !Number.isFinite(result)) {
    return fail(`Поле «${field}» должно содержать число`);
  }
  return result;
}

function parseOffer(line: string, index: number): Offer {
  // Поля разделены TAB; изображения и удобства внутри поля разделены «;».
  const fields = line.split('\t');
  if (fields.length !== 20) {
    return fail(`Строка ${index}: ожидалось 20 полей, получено ${fields.length}`);
  }
  const [title, description, date, city, previewImage, images, premium,
    favorite, rating, type, bedrooms, maxAdults, price, goods,
    hostName, hostEmail, hostAvatar, hostPro, latitude, longitude] = fields;
  if (!cities.includes(city as CityName)) {
    return fail(`Строка ${index}: неизвестный город ${city}`);
  }
  if (!housingTypes.includes(type as HousingType)) {
    return fail(`Строка ${index}: неизвестный тип жилья ${type}`);
  }
  const amenities = goods.split(';') as Convenience[];
  if (amenities.some((item) => !conveniences.includes(item))) {
    return fail(`Строка ${index}: неизвестное удобство`);
  }
  const postDate = new Date(date);
  if (Number.isNaN(postDate.getTime())) {
    return fail(`Строка ${index}: неправильная дата`);
  }
  if (title.length < 10 || title.length > 100) {
    return fail(`Строка ${index}: длина названия должна быть 10–100 символов`);
  }
  if (description.length < 20 || description.length > 1024) {
    return fail(`Строка ${index}: длина описания должна быть 20–1024 символа`);
  }
  if (images.split(';').length !== 6) {
    return fail(`Строка ${index}: должно быть ровно 6 фотографий`);
  }
  const parsedRating = parseNumber(rating, 'rating');
  const parsedBedrooms = parseNumber(bedrooms, 'bedrooms');
  const parsedGuests = parseNumber(maxAdults, 'maxAdults');
  const parsedPrice = parseNumber(price, 'price');
  if (parsedRating < 1 || parsedRating > 5 || !/^\d(?:[.,]\d)?$/.test(rating)) {
    return fail(`Строка ${index}: рейтинг должен быть от 1 до 5 с точностью до десятых`);
  }
  if (!Number.isInteger(parsedBedrooms) || parsedBedrooms < 1 || parsedBedrooms > 8) {
    return fail(`Строка ${index}: комнат должно быть от 1 до 8`);
  }
  if (!Number.isInteger(parsedGuests) || parsedGuests < 1 || parsedGuests > 10) {
    return fail(`Строка ${index}: гостей должно быть от 1 до 10`);
  }
  if (parsedPrice < 100 || parsedPrice > 100000) {
    return fail(`Строка ${index}: цена должна быть от 100 до 100000`);
  }
  if (amenities.length < 1) {
    return fail(`Строка ${index}: добавь хотя бы одно удобство`);
  }
  return {
    title, description, postDate, city: city as CityName, previewImage,
    images: images.split(';'), isPremium: parseBoolean(premium, 'isPremium'),
    isFavorite: parseBoolean(favorite, 'isFavorite'),
    rating: parsedRating, type: type as HousingType,
    bedrooms: parsedBedrooms,
    maxAdults: parsedGuests, price: parsedPrice,
    conveniences: amenities,
    host: {name: hostName, email: hostEmail, avatarUrl: hostAvatar, isPro: parseBoolean(hostPro, 'host.isPro')},
    location: {latitude: parseNumber(latitude, 'latitude'), longitude: parseNumber(longitude, 'longitude')}
  };
}

async function showVersion(): Promise<void> {
  const directory = path.dirname(fileURLToPath(import.meta.url));
  const packagePath = path.resolve(directory, '../package.json');
  const packageInfo = JSON.parse(await readFile(packagePath, 'utf8')) as {version: string};
  console.log(chalk.green(packageInfo.version));
}

async function importOffers(filePath: string | undefined): Promise<void> {
  if (!filePath) {
    return fail('После --import укажи путь к TSV-файлу');
  }
  if (path.extname(filePath).toLowerCase() !== '.tsv') {
    return fail('Для импорта нужен файл .tsv');
  }
  const stream = createReadStream(path.resolve(process.cwd(), filePath), {encoding: 'utf8'});
  const reader = createInterface({input: stream, crlfDelay: Infinity});
  let count = 0;
  try {
    for await (const line of reader) {
      if (!line.trim()) {
        continue;
      }
      const offer = parseOffer(line.replace(/^\uFEFF/, ''), count + 1);
      count++;
      console.log(chalk.cyan(`\nПредложение №${count}: ${offer.title}`));
      console.log(offer);
    }
    console.log(chalk.green(`Успешно прочитано предложений: ${count}`));
  } finally {
    reader.close();
    stream.destroy();
  }
}

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  switch (command) {
    case undefined:
    case '--help':
      console.log(chalk.cyan.bold('Six Cities CLI'));
      console.log(HELP);
      return;
    case '--version':
      await showVersion();
      return;
    case '--import':
      await importOffers(args[0]);
      return;
    case '--generate':
      console.error(chalk.yellow('Команда --generate предусмотрена ТЗ, но реализуется в следующем задании.'));
      process.exitCode = 1;
      return;
    default:
      console.error(chalk.yellow(`Неизвестная команда: ${command}`));
      console.log(HELP);
      process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(chalk.red(error instanceof Error ? error.message : String(error)));
  process.exitCode = 1;
});
