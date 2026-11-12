import type {HydratedDocument, Types} from 'mongoose';
import type {OfferDocument} from './offer.model.js';
import type {CreateOfferDto} from './dto/create-offer.dto.js';
import type {UpdateOfferDto} from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  findById(id: string | Types.ObjectId): Promise<HydratedDocument<OfferDocument> | null>;
  find(limit?: number): Promise<HydratedDocument<OfferDocument>[]>;
  findPremium(city: string, limit?: number): Promise<HydratedDocument<OfferDocument>[]>;
  create(data: CreateOfferDto, hostId: Types.ObjectId): Promise<HydratedDocument<OfferDocument>>;
  update(id: string, hostId: Types.ObjectId, data: UpdateOfferDto): Promise<HydratedDocument<OfferDocument> | null>;
  delete(id: string, hostId: Types.ObjectId): Promise<HydratedDocument<OfferDocument> | null>;
  updateReviewStats(id: Types.ObjectId, count: number, rating: number): Promise<void>;
}
