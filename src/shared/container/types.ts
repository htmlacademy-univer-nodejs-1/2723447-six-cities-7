export const Component = {
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  Application: Symbol.for('Application'),
  Database: Symbol.for('Database'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  FavoriteModel: Symbol.for('FavoriteModel'),
  SessionModel: Symbol.for('SessionModel'),
  UserService: Symbol.for('UserService'),
  OfferService: Symbol.for('OfferService'),
  CommentService: Symbol.for('CommentService'),
  FavoriteService: Symbol.for('FavoriteService'),
  AuthService: Symbol.for('AuthService')
} as const;
