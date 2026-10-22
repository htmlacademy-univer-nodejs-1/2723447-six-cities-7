export type CityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
export type HousingType = 'apartment' | 'room' | 'house' | 'hotel';
export type Convenience = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type Location = {
  latitude: number;
  longitude: number;
};

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
  password?: string;
  isPro: boolean;
};

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  conveniences: Convenience[];
  host: User;
  commentsCount?: number;
  location: Location;
};

export type Comment = {
  text: string;
  postDate: Date;
  rating: number;
  author: User;
};
