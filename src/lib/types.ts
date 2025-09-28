export interface Alderman {
  name: string;
  party: string;
  email: string;
  phone: string;
  office: string;
  image: string;
  biography: string;
  platforms: string[];
  committees: string[];
}

export interface WardEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface WardDemographics {
  population: number;
  area: string;
  medianIncome: string;
}

export interface Ward {
  id: number;
  name: string;
  alderman: Alderman;
  demographics: WardDemographics;
  events: WardEvent[];
}

export interface Request {
  id: string;
  wardId: number;
  type: 'infrastructure' | 'safety' | 'environment' | 'housing' | 'other';
  title: string;
  description: string;
  location: string;
  status: 'submitted' | 'in-progress' | 'completed' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  aiGeneratedText?: string;
}

export interface AIRequestData {
  type: string;
  description: string;
  location: string;
}

export interface Advertisement {
  id: number;
  type: 'lawn-care' | 'child-care' | 'plumbing';
  title: string;
  description: string;
  businessName: string;
  owner: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  serviceArea: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  services: string[];
  image: string;
  promoCode: string;
  discount: string;
}
