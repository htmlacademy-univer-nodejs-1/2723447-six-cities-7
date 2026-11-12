import type {Types} from 'mongoose';

export class UserEntity {
  public declare _id: Types.ObjectId;
  public declare name: string;
  public declare email: string;
  public declare avatarUrl?: string;
  public declare password?: string;
  public declare isPro: boolean;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}
