import {Container} from 'inversify';
import {Application} from '../../app/application.js';
import type {LoggerInterface} from '../libs/logger/logger.interface.js';
import {LoggerService} from '../libs/logger/logger.service.js';
import type {ConfigInterface} from '../libs/config/config.interface.js';
import {ConfigService} from '../libs/config/config.service.js';
import {Component} from './types.js';
import {DatabaseService} from '../libs/database/database.service.js';
import {UserModel} from '../../modules/user/user.model.js';
import {OfferModel} from '../../modules/offer/offer.model.js';
import {UserService} from '../../modules/user/user.service.js';
import {OfferService} from '../../modules/offer/offer.service.js';
import type {UserServiceInterface} from '../../modules/user/user-service.interface.js';
import type {OfferServiceInterface} from '../../modules/offer/offer-service.interface.js';

export function createContainer(): Container {
  const container = new Container({defaultScope: 'Singleton'});
  container.bind<LoggerInterface>(Component.Logger).to(LoggerService);
  container.bind<ConfigInterface>(Component.Config).to(ConfigService);
  container.bind<Application>(Component.Application).to(Application);
  container.bind<DatabaseService>(Component.Database).to(DatabaseService);
  container.bind(Component.UserModel).toConstantValue(UserModel);
  container.bind(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<UserServiceInterface>(Component.UserService).to(UserService);
  container.bind<OfferServiceInterface>(Component.OfferService).to(OfferService);
  return container;
}
