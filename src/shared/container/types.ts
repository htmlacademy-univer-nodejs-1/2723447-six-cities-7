export const Component = {
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  Application: Symbol.for('Application'),
  Database: Symbol.for('Database'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  UserService: Symbol.for('UserService'),
  OfferService: Symbol.for('OfferService')
} as const;
