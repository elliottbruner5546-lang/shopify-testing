export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface ProductSpecs {
  display?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  battery?: string;
  camera?: string;
  connectivity?: string;
  weight?: string;
  dimensions?: string;
  water_resistance?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'phones' | 'audio' | 'laptops' | 'accessories' | 'wearables';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge?: 'HOT' | 'NEW' | 'SALE' | null;
  specs: ProductSpecs;
  description: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  reviews: Review[];
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
