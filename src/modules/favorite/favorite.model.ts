import {Schema, model, type InferSchemaType} from 'mongoose';

const favoriteSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  offer: {type: Schema.Types.ObjectId, ref: 'Offer', required: true}
}, {timestamps: true, collection: 'favorites'});
favoriteSchema.index({user: 1, offer: 1}, {unique: true});

export type FavoriteDocument = InferSchemaType<typeof favoriteSchema>;
export const FavoriteModel = model('Favorite', favoriteSchema);
