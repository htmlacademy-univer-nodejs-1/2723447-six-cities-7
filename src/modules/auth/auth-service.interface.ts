import type {HydratedDocument} from 'mongoose';
import type {UserDocument} from '../user/user.model.js';
import type {CreateUserDto} from '../user/dto/create-user.dto.js';

export interface AuthServiceInterface {
  register(data: CreateUserDto & {password: string}): Promise<HydratedDocument<UserDocument>>;
  login(email: string, password: string): Promise<string>;
  check(token: string): Promise<HydratedDocument<UserDocument> | null>;
  logout(token: string): Promise<void>;
}
