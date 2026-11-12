import type {Types} from 'mongoose';
import type {OfferDocument} from '../offer/offer.model.js';
import type {HydratedDocument} from 'mongoose';

export interface FavoriteServiceInterface {
  findByUser(userId: Types.ObjectId): Promise<HydratedDocument<OfferDocument>[]>;
  add(userId: Types.ObjectId, offerId: Types.ObjectId): Promise<void>;
  remove(userId: Types.ObjectId, offerId: Types.ObjectId): Promise<void>;
  has(userId: Types.ObjectId, offerId: Types.ObjectId): Promise<boolean>;
}
