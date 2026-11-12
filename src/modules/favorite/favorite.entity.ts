import type {Types} from 'mongoose';

export class FavoriteEntity {
  public declare _id: Types.ObjectId;
  public declare user: Types.ObjectId;
  public declare offer: Types.ObjectId;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}
