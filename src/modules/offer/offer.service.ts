import {inject, injectable} from 'inversify';
import {Component} from '../../shared/container/types.js';
import type {HydratedDocument, Types} from 'mongoose';
import type {OfferModel, OfferDocument} from './offer.model.js';
import type {CommentModel} from '../comment/comment.model.js';
import type {FavoriteModel} from '../favorite/favorite.model.js';
import type {OfferServiceInterface} from './offer-service.interface.js';
import type {CreateOfferDto} from './dto/create-offer.dto.js';
import type {UpdateOfferDto} from './dto/update-offer.dto.js';

@injectable()
export class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.OfferModel) private readonly model: typeof OfferModel,
    @inject(Component.CommentModel) private readonly comments: typeof CommentModel,
    @inject(Component.FavoriteModel) private readonly favorites: typeof FavoriteModel
  ) {}

  public async findById(id: string | Types.ObjectId): Promise<HydratedDocument<OfferDocument> | null> {
    return this.model.findById(id).exec();
  }

  public async find(limit = 60): Promise<HydratedDocument<OfferDocument>[]> {
    return this.model.find().sort({postDate: -1}).limit(limit).exec();
  }

  public async findPremium(city: string, limit = 3): Promise<HydratedDocument<OfferDocument>[]> {
    return this.model.find({city, isPremium: true}).sort({postDate: -1}).limit(limit).exec();
  }

  public async create(data: CreateOfferDto, hostId: Types.ObjectId): Promise<HydratedDocument<OfferDocument>> {
    return this.model.create({...data, host: hostId, rating: 0, commentsCount: 0});
  }

  public async update(id: string, hostId: Types.ObjectId, data: UpdateOfferDto): Promise<HydratedDocument<OfferDocument> | null> {
    return this.model.findOneAndUpdate({_id: id, host: hostId}, {$set: data}, {new: true}).exec();
  }

  public async delete(id: string, hostId: Types.ObjectId): Promise<HydratedDocument<OfferDocument> | null> {
    const deleted = await this.model.findOneAndDelete({_id: id, host: hostId}).exec();
    if (deleted) {
      await Promise.all([this.comments.deleteMany({offer: deleted._id}), this.favorites.deleteMany({offer: deleted._id})]);
    }
    return deleted;
  }

  public async updateReviewStats(id: Types.ObjectId, count: number, rating: number): Promise<void> {
    await this.model.updateOne({_id: id}, {$set: {commentsCount: count, rating}}).exec();
  }
}
