export type NewsCategory = 
  | 'WORLD'
  | 'NATION' 
  | 'BUSINESS'
  | 'TECHNOLOGY'
  | 'ENTERTAINMENT'
  | 'SPORTS'
  | 'SCIENCE'
  | 'HEALTH';

// NewsAPI Article Type
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null; // High-quality image from news source
  publishedAt: string; // ISO 8601
  content: string | null;
}

export interface NewsResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsArticle[];
  code?: string;
  message?: string;
  lastUpdated?: Date;
  category?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export type SortBy = 'relevancy' | 'popularity' | 'publishedAt';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ar';
export type CountryCode = 'us' | 'gb' | 'de' | 'fr' | 'ca' | 'au' | 'in' | 'jp' | 'br';

export interface FetchNewsParams {
  query?: string;
  category?: NewsCategory;
  lang?: string;
  country?: string;
  timeRange?: string;
}