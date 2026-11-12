import type {Types} from 'mongoose';
import type {CityName, Convenience, HousingType, Location} from '../../types/offer.type.js';

export class OfferEntity {
  public declare _id: Types.ObjectId;
  public declare title: string;
  public declare description: string;
  public declare postDate: Date;
  public declare city: CityName;
  public declare previewImage: string;
  public declare images: string[];
  public declare isPremium: boolean;
  public declare rating: number;
  public declare type: HousingType;
  public declare bedrooms: number;
  public declare maxAdults: number;
  public declare price: number;
  public declare conveniences: Convenience[];
  public declare host: Types.ObjectId;
  public declare commentsCount: number;
  public declare location: Location;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}
