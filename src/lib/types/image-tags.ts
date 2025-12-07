export interface ImageTags {
  objects: string[];
  people: string[];
  themes: string[];
  emotions: string[];
  colors: string[];
  concepts: string[];
  description: string;
}

export interface ImageTagRecord {
  id: number;
  imageUrl: string;
  imageHash: string;
  objects: string[];
  people: string[];
  themes: string[];
  emotions: string[];
  colors: string[];
  concepts: string[];
  description: string;
  articleTitle: string | null;
  articleUrl: string | null;
  cached: boolean;
  createdAt: string;
  lastAccessed: string;
  accessCount: number;
}

export interface AnalyzeImageResponse {
  success: boolean;
  data?: {
    tags: ImageTagRecord;
    cached: boolean;
    cost: number;
  };
  error?: string;
  code?: string;
}

export interface SearchTagsResponse {
  success: boolean;
  data?: {
    results: Array<{
      imageUrl: string;
      tags: Omit<ImageTagRecord, 'id' | 'imageHash' | 'cached' | 'createdAt' | 'lastAccessed' | 'accessCount'>;
      articleTitle: string | null;
      articleUrl: string | null;
    }>;
    count: number;
    searchTerm: string;
    category?: string;
  };
  error?: string;
}

export type TagCategory = 'objects' | 'people' | 'themes' | 'emotions' | 'colors' | 'concepts';
