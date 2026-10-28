import {Container} from 'inversify';
import {Application} from '../../app/application.js';
import type {LoggerInterface} from '../libs/logger/logger.interface.js';
import {LoggerService} from '../libs/logger/logger.service.js';
import type {ConfigInterface} from '../libs/config/config.interface.js';
import {ConfigService} from '../libs/config/config.service.js';
import {Component} from './types.js';

export function createContainer(): Container {
  const container = new Container({defaultScope: 'Singleton'});
  container.bind<LoggerInterface>(Component.Logger).to(LoggerService);
  container.bind<ConfigInterface>(Component.Config).to(ConfigService);
  container.bind<Application>(Component.Application).to(Application);
  return container;
}
