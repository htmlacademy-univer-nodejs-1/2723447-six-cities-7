import {inject, injectable} from 'inversify';
import mongoose from 'mongoose';
import {Component} from '../../container/types.js';
import type {LoggerInterface} from '../logger/logger.interface.js';
import type {ConfigInterface} from '../config/config.interface.js';

@injectable()
export class DatabaseService {
  constructor(
    @inject(Component.Logger) private readonly logger: LoggerInterface,
    @inject(Component.Config) private readonly config: ConfigInterface
  ) {}

  public async connect(uri?: string): Promise<void> {
    const address = uri ?? `mongodb://${this.config.get('DB_HOST')}:27017/six-cities`;
    this.logger.info('Подключение к MongoDB...');
    try {
      await mongoose.connect(address, {serverSelectionTimeoutMS: 5000});
      this.logger.info('Подключение к MongoDB установлено');
    } catch (error) {
      this.logger.error(`Не удалось подключиться к MongoDB: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Соединение с MongoDB закрыто');
  }
}
