export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'apartment' | 'villa' | 'plot' | 'commercial' | 'office';
  category: 'buy' | 'rent';
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  parking?: boolean;
  rating: number;
  features: string[];
}

export interface UserRating {
  propertyId: string;
  rating: number;
}

export interface FilterState {
  category: 'buy' | 'rent';
  type: string;
  location: string;
  minPrice: number;
  maxPrice: number;
}