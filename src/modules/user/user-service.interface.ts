import type {HydratedDocument, Types} from 'mongoose';
import type {User} from '../../types/offer.type.js';
import type {UserDocument} from './user.model.js';

export interface UserServiceInterface {
  findById(id: string | Types.ObjectId): Promise<HydratedDocument<UserDocument> | null>;
  findByEmail(email: string): Promise<HydratedDocument<UserDocument> | null>;
  create(data: User): Promise<HydratedDocument<UserDocument>>;
}
