import {injectable} from 'inversify';
import pino, {type Logger} from 'pino';
import type {LoggerInterface} from './logger.interface.js';

@injectable()
export class LoggerService implements LoggerInterface {
  private readonly logger: Logger = pino();

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }
}
