import type {CityName, Convenience, HousingType, Location} from '../../../types/offer.type.js';

export type CreateOfferDto = {
  title: string;
  description: string;
  postDate: Date;
  city: CityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  conveniences: Convenience[];
  location: Location;
};
