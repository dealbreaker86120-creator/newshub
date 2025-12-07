import { NewsResponse, SortBy, CountryCode } from './types/news';

const BASE_URL = 'https://newsapi.org/v2';

// Major news agency source IDs and domains
export const MAJOR_NEWS_SOURCES = {
  BBC: 'bbc-news',
  CNN: 'cnn',
  REUTERS: 'reuters',
  AP: 'associated-press',
  GUARDIAN: 'the-guardian',
  NYT: 'the-new-york-times',
  WSJ: 'the-wall-street-journal',
};

export const NEWS_DOMAINS = [
  'reuters.com',
  'apnews.com',
  'bbc.com',
  'bbc.co.uk',
  'cnn.com',
  'theguardian.com',
  'nytimes.com',
  'wsj.com',
];

interface FetchTopHeadlinesParams {
  country?: CountryCode;
  category?: string;
  sources?: string[];
  searchQuery?: string;
  pageSize?: number;
  page?: number;
}

interface FetchEverythingParams {
  query: string;
  domains?: string[];
  language?: string;
  sortBy?: SortBy;
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
}

export async function fetchTopHeadlines(
  params: FetchTopHeadlinesParams,
  apiKey: string
): Promise<NewsResponse> {
  const searchParams = new URLSearchParams();

  if (params.country) searchParams.append('country', params.country);
  if (params.category) {
    // Map our categories to NewsAPI categories
    const categoryMap: Record<string, string> = {
      WORLD: 'general',
      NATION: 'general',
      BUSINESS: 'business',
      TECHNOLOGY: 'technology',
      ENTERTAINMENT: 'entertainment',
      SPORTS: 'sports',
      SCIENCE: 'science',
      HEALTH: 'health',
    };
    searchParams.append('category', categoryMap[params.category] || 'general');
  }
  if (params.sources?.length) {
    searchParams.append('sources', params.sources.slice(0, 20).join(','));
  }
  if (params.searchQuery) searchParams.append('q', params.searchQuery);
  if (params.pageSize) searchParams.append('pageSize', String(Math.min(params.pageSize, 100)));
  if (params.page) searchParams.append('page', String(params.page));

  const response = await fetch(`${BASE_URL}/top-headlines?${searchParams.toString()}`, {
    headers: {
      'X-Api-Key': apiKey,
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `NewsAPI error: ${response.status}`);
  }

  const data = await response.json();
  return {
    ...data,
    lastUpdated: new Date(),
  };
}

export async function fetchEverything(
  params: FetchEverythingParams,
  apiKey: string
): Promise<NewsResponse> {
  if (!params.query) throw new Error('query parameter required');

  const searchParams = new URLSearchParams();
  searchParams.append('q', params.query);

  if (params.domains?.length) {
    searchParams.append('domains', params.domains.join(','));
  }
  if (params.language) searchParams.append('language', params.language);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.from) searchParams.append('from', params.from);
  if (params.to) searchParams.append('to', params.to);
  if (params.pageSize) searchParams.append('pageSize', String(Math.min(params.pageSize, 100)));
  if (params.page) searchParams.append('page', String(params.page));

  const response = await fetch(`${BASE_URL}/everything?${searchParams.toString()}`, {
    headers: {
      'X-Api-Key': apiKey,
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `NewsAPI error: ${response.status}`);
  }

  const data = await response.json();
  return {
    ...data,
    lastUpdated: new Date(),
  };
}
