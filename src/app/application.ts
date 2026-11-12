import {inject, injectable} from 'inversify';
import type {ConfigInterface} from '../shared/libs/config/config.interface.js';
import type {LoggerInterface} from '../shared/libs/logger/logger.interface.js';
import {Component} from '../shared/container/types.js';

@injectable()
export class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: LoggerInterface,
    @inject(Component.Config) private readonly config: ConfigInterface
  ) {}

  public init(): void {
    this.logger.info(`Приложение инициализировано. Порт: ${this.config.get('PORT')}`);
  }
}
