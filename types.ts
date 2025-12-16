
export interface Game {
  id: string;
  title: string;
  genre: string;
  studio: string;
  publisher?: string;
  platform: string[];
  description: string;
  rating: number;
  imageUrl?: string;
  steamId?: string; // Added for fetching real images from Steam CDN
  releaseDate?: string;
  isNewRelease?: boolean;
  officialLink?: string;
  trailerVideoId?: string; // YouTube Video ID for the trailer
  tags?: string[];
  studioLogoUrl?: string; // URL for the studio's logo
}

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  source: string;
  url?: string;
  imageUrl?: string;
  date: string;
}

export interface GamingEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  type: 'tournament' | 'release' | 'convention' | 'update';
  location?: string;
}

export interface Review {
  id: string;
  gameTitle: string;
  reviewerName: string;
  rating: number;
  content: string;
  avatarUrl?: string;
}

export interface GamerProfile {
  id: string;
  name: string;
  handle: string;
  region: string;
  game: string;
  imageUrl: string;
  socials: {
    youtube?: string;
    twitch?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  imageUrl: string;
  buyLink: string;
  brand: string;
  store: string;
}

export interface ShortVideo {
  id: string;
  url: string;
  title: string;
  description?: string;
  creator: string;
  creatorAvatar?: string;
  likes: number;
  comments: number;
  shares: number;
  gameTag: string;
  isUserUploaded?: boolean;
  thumbnailUrl?: string;
  views?: string;
  uploadDate?: string;
}

export type ViewState = 'home' | 'directory' | 'news' | 'events' | 'calendar' | 'reviews' | 'favorites' | 'shop' | 'shorts';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}