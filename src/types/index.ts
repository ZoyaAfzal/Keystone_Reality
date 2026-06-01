export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  status: "sale" | "rent";
  badge?: "new" | "featured";
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery?: string[];
  agentId: string;
  neighborhood: string;
  description?: string;
  yearBuilt?: number;
  garage?: number;
  amenities?: string[];
};

export type Agent = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  sold: number;
  image: string;
  bio?: string;
  years?: number;
};

export type Neighborhood = {
  slug: string;
  name: string;
  city: string;
  country: string;
  count: number;
  from: number;
  image: string;
  description?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  location: string;
  rating: number;
  image: string;
};
