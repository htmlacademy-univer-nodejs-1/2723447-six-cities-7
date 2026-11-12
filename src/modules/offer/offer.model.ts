import {Schema, model, type InferSchemaType} from 'mongoose';

const offerSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  postDate: {type: Date, required: true},
  city: {type: String, required: true},
  previewImage: {type: String, required: true},
  images: {type: [String], required: true},
  isPremium: {type: Boolean, required: true},
  isFavorite: {type: Boolean, required: true},
  rating: {type: Number, required: true},
  type: {type: String, required: true},
  bedrooms: {type: Number, required: true},
  maxAdults: {type: Number, required: true},
  price: {type: Number, required: true},
  conveniences: {type: [String], required: true},
  host: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  location: {
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true}
  }
}, {timestamps: true, collection: 'offers'});

export type OfferDocument = InferSchemaType<typeof offerSchema>;
export const OfferModel = model('Offer', offerSchema);
