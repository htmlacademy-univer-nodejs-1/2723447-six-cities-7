import {inject, injectable} from 'inversify';
import {Component} from '../../shared/container/types.js';
import type {HydratedDocument, Types} from 'mongoose';
import type {UserModel, UserDocument} from './user.model.js';
import type {UserServiceInterface} from './user-service.interface.js';
import type {CreateUserDto} from './dto/create-user.dto.js';

@injectable()
export class UserService implements UserServiceInterface {
  constructor(@inject(Component.UserModel) private readonly model: typeof UserModel) {}

  public async findById(id: string | Types.ObjectId): Promise<HydratedDocument<UserDocument> | null> {
    return this.model.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<HydratedDocument<UserDocument> | null> {
    return this.model.findOne({email}).exec();
  }

  public async findByEmailWithPassword(email: string): Promise<HydratedDocument<UserDocument> | null> {
    return this.model.findOne({email}).select('+password').exec();
  }

  public async create(data: CreateUserDto): Promise<HydratedDocument<UserDocument>> {
    return this.model.create(data);
  }
}
