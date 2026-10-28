import type {HydratedDocument, Types} from 'mongoose';
import type {Offer} from '../../types/offer.type.js';
import type {OfferDocument} from './offer.model.js';

export interface OfferServiceInterface {
  findById(id: string | Types.ObjectId): Promise<HydratedDocument<OfferDocument> | null>;
  create(data: Offer, hostId: Types.ObjectId): Promise<HydratedDocument<OfferDocument>>;
}
