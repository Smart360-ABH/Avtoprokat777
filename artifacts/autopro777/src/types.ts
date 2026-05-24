export interface Car {
  id: number;
  name: string;
  category: string;
  pricePerDay: number;
  description?: string | null;
  imageUrl?: string | null;
  seats?: number | null;
  transmission?: string | null;
  year?: number | null;
  popular?: boolean;
  available?: boolean;
  fuelType?: string | null;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  city: string;
  workingHours?: string | null;
  mapUrl?: string | null;
  lat?: number | null;
  lng?: number | null;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  date?: string | null;
  avatarUrl?: string | null;
}
