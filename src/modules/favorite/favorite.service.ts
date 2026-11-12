import {inject, injectable} from 'inversify';
import type {HydratedDocument, Types} from 'mongoose';
import {Component} from '../../shared/container/types.js';
import type {FavoriteModel} from './favorite.model.js';
import type {OfferModel, OfferDocument} from '../offer/offer.model.js';
import type {FavoriteServiceInterface} from './favorite-service.interface.js';

@injectable()
export class FavoriteService implements FavoriteServiceInterface {
  constructor(
    @inject(Component.FavoriteModel) private readonly model: typeof FavoriteModel,
    @inject(Component.OfferModel) private readonly offers: typeof OfferModel
  ) {}

  public async findByUser(userId: Types.ObjectId): Promise<HydratedDocument<OfferDocument>[]> {
    const favorites = await this.model.find({user: userId}).select('offer').exec();
    return this.offers.find({_id: {$in: favorites.map((item) => item.offer)}}).sort({postDate: -1}).exec();
  }

  public async add(userId: Types.ObjectId, offerId: Types.ObjectId): Promise<void> {
    const offer = await this.offers.exists({_id: offerId});
    if (!offer) {
      throw new Error('Предложение не найдено');
    }
    await this.model.updateOne({user: userId, offer: offerId}, {$setOnInsert: {user: userId, offer: offerId}}, {upsert: true}).exec();
  }

  public async remove(userId: Types.ObjectId, offerId: Types.ObjectId): Promise<void> {
    await this.model.deleteOne({user: userId, offer: offerId}).exec();
  }

  public async has(userId: Types.ObjectId, offerId: Types.ObjectId): Promise<boolean> {
    return Boolean(await this.model.exists({user: userId, offer: offerId}));
  }
}
