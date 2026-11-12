import type {Types} from 'mongoose';

export class CommentEntity {
  public declare _id: Types.ObjectId;
  public declare text: string;
  public declare rating: number;
  public declare author: Types.ObjectId;
  public declare offer: Types.ObjectId;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}
