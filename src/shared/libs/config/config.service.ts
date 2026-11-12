import {config as loadEnv} from 'dotenv';
import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';
import {injectable} from 'inversify';
import type {AppConfig, ConfigInterface} from './config.interface.js';

convict.addFormats(convictFormatWithValidator);

@injectable()
export class ConfigService implements ConfigInterface {
  private readonly config: convict.Config<AppConfig>;

  constructor() {
    loadEnv();

    for (const key of ['PORT', 'DB_HOST', 'SALT'] as const) {
      if (!process.env[key]?.trim()) {
        throw new Error(`Обязательная переменная окружения не задана: ${key}`);
      }
    }

    this.config = convict<AppConfig>({
      PORT: {
        doc: 'Порт REST API',
        format: 'port',
        default: null as unknown as number,
        env: 'PORT'
      },
      DB_HOST: {
        doc: 'IP-адрес сервера MongoDB',
        format: 'ipaddress',
        default: null as unknown as string,
        env: 'DB_HOST'
      },
      SALT: {
        doc: 'Случайная соль для будущего хеширования паролей',
        format: (value: unknown): void => {
          if (typeof value !== 'string' || value.trim().length === 0) {
            throw new Error('SALT должна быть непустой строкой');
          }
        },
        default: null as unknown as string,
        env: 'SALT',
        sensitive: true
      }
    });
    this.config.validate({allowed: 'strict'});
  }

  public get<Key extends keyof AppConfig>(key: Key): AppConfig[Key] {
    return this.config.get(key) as AppConfig[Key];
  }
}
