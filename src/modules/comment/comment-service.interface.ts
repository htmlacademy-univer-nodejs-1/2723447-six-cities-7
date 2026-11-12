import type {HydratedDocument, Types} from 'mongoose';
import type {CommentDocument} from './comment.model.js';
import type {CreateCommentDto} from './dto/create-comment.dto.js';

export interface CommentServiceInterface {
  findByOffer(offerId: Types.ObjectId, limit?: number): Promise<HydratedDocument<CommentDocument>[]>;
  create(offerId: Types.ObjectId, authorId: Types.ObjectId, data: CreateCommentDto): Promise<HydratedDocument<CommentDocument>>;
}
