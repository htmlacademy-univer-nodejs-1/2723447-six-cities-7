import {inject, injectable} from 'inversify';
import {Component} from '../../shared/container/types.js';
import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../../types/offer.type.js';
import type {UserModel, UserDocument} from './user.model.js';
import type {UserServiceInterface} from './user-service.interface.js';

@injectable()
export class UserService implements UserServiceInterface {
  constructor(@inject(Component.UserModel) private readonly model: typeof UserModel) {}
  public async findById(id: string | Types.ObjectId): Promise<HydratedDocument<UserDocument> | null> {
    return this.model.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<HydratedDocument<UserDocument> | null> {
    return this.model.findOne({email}).exec();
  }

  public async create(data: User): Promise<HydratedDocument<UserDocument>> {
    const {name, email, avatarUrl, isPro} = data;
    return this.model.create({name, email, avatarUrl, isPro});
  }
}
