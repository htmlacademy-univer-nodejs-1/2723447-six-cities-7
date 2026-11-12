import type {HydratedDocument, Types} from 'mongoose';
import type {UserDocument} from './user.model.js';
import type {CreateUserDto} from './dto/create-user.dto.js';

export interface UserServiceInterface {
  findById(id: string | Types.ObjectId): Promise<HydratedDocument<UserDocument> | null>;
  findByEmail(email: string): Promise<HydratedDocument<UserDocument> | null>;
  findByEmailWithPassword(email: string): Promise<HydratedDocument<UserDocument> | null>;
  create(data: CreateUserDto): Promise<HydratedDocument<UserDocument>>;
}
