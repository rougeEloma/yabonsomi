// Types partagés — aucun import web ici : ce dossier « core » est réutilisable tel quel en React Native.

export type PriceUnit = 'forfait' | 'heure' | 'jour' | 'séance' | 'mois' | 'course' | 'page';

export interface Category {
  slug: string;
  name: string;
  short: string; // phrase courte pour la carte
  images: string[]; // chemins relatifs à /public
}

export interface Provider {
  id: string;
  name: string;
  title: string; // métier affiché
  quartier: string;
  bio: string;
  verified: boolean;
  memberSince: string; // AAAA-MM
  languages: string[];
  responseTime: string;
}

export interface Review {
  author: string;
  rating: number; // 1..5
  date: string; // AAAA-MM-JJ
  text: string;
}

export interface Service {
  id: string;
  title: string;
  category: string; // Category.slug
  providerId: string;
  price: { amount: number; unit: PriceUnit; from?: boolean };
  description: string;
  conditions: string[];
  zones: string[]; // quartiers desservis
  images: string[];
  stats: { views: number; contacts: number };
  reviews: Review[];
}
