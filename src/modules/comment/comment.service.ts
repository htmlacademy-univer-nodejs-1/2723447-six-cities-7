import {inject, injectable} from 'inversify';
import type {HydratedDocument, Types} from 'mongoose';
import {Component} from '../../shared/container/types.js';
import type {CommentModel, CommentDocument} from './comment.model.js';
import type {OfferServiceInterface} from '../offer/offer-service.interface.js';
import type {CommentServiceInterface} from './comment-service.interface.js';
import type {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly model: typeof CommentModel,
    @inject(Component.OfferService) private readonly offers: OfferServiceInterface
  ) {}

  public async findByOffer(offerId: Types.ObjectId, limit = 50): Promise<HydratedDocument<CommentDocument>[]> {
    return this.model.find({offer: offerId}).sort({createdAt: -1}).limit(limit).exec();
  }

  public async create(offerId: Types.ObjectId, authorId: Types.ObjectId, data: CreateCommentDto): Promise<HydratedDocument<CommentDocument>> {
    const offer = await this.offers.findById(offerId);
    if (!offer) {
      throw new Error('Предложение не найдено');
    }
    const comment = await this.model.create({...data, offer: offerId, author: authorId});
    const stats = await this.model.aggregate<{_id: Types.ObjectId; count: number; average: number}>([
      {$match: {offer: offerId}},
      {$group: {_id: '$offer', count: {$sum: 1}, average: {$avg: '$rating'}}}
    ]);
    const result = stats[0];
    await this.offers.updateReviewStats(offerId, result?.count ?? 0, Math.round((result?.average ?? 0) * 10) / 10);
    return comment;
  }
}
