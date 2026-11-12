import {inject, injectable} from 'inversify';
import {Component} from '../../shared/container/types.js';
import type {HydratedDocument, Types} from 'mongoose';
import type {Offer} from '../../types/offer.type.js';
import type {OfferModel, OfferDocument} from './offer.model.js';
import type {OfferServiceInterface} from './offer-service.interface.js';

@injectable()
export class OfferService implements OfferServiceInterface {
  constructor(@inject(Component.OfferModel) private readonly model: typeof OfferModel) {}
  public async findById(id: string | Types.ObjectId): Promise<HydratedDocument<OfferDocument> | null> {
    return this.model.findById(id).exec();
  }

  public async create(data: Offer, hostId: Types.ObjectId): Promise<HydratedDocument<OfferDocument>> {
    return this.model.create({
      title: data.title, description: data.description, postDate: data.postDate, city: data.city,
      previewImage: data.previewImage, images: data.images, isPremium: data.isPremium,
      isFavorite: data.isFavorite, rating: data.rating, type: data.type, bedrooms: data.bedrooms,
      maxAdults: data.maxAdults, price: data.price, conveniences: data.conveniences,
      location: data.location, host: hostId
    });
  }
}
