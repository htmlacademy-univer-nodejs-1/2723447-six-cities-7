import type {Types} from 'mongoose';

export class SessionEntity {
  public declare _id: Types.ObjectId;
  public declare user: Types.ObjectId;
  public declare tokenHash: string;
  public declare expiresAt: Date;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}
