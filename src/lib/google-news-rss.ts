import { NewsArticle } from './types/news';

interface GoogleNewsRssItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  guid?: string;
}

/**
 * Fetch news from Google News RSS feeds
 * Free, unlimited, no API key required
 */
export async function fetchGoogleNewsRss(params: {
  query?: string;
  category?: string;
  country?: string;
  language?: string;
}): Promise<NewsArticle[]> {
  try {
    let url: string;
    
    if (params.query) {
      // Search query
      const hl = params.language || 'en';
      const ceid = `${params.country || 'US'}:${hl}`;
      url = `https://news.google.com/rss/search?q=${encodeURIComponent(params.query)}&hl=${hl}&gl=${params.country || 'US'}&ceid=${ceid}`;
    } else if (params.category) {
      // Category/topic feed
      const categoryMap: Record<string, string> = {
        WORLD: 'WORLD',
        NATION: 'NATION',
        BUSINESS: 'BUSINESS',
        TECHNOLOGY: 'TECHNOLOGY',
        ENTERTAINMENT: 'ENTERTAINMENT',
        SPORTS: 'SPORTS',
        SCIENCE: 'SCIENCE',
        HEALTH: 'HEALTH',
      };
      const topic = categoryMap[params.category] || 'WORLD';
      const hl = params.language || 'en';
      const ceid = `${params.country || 'US'}:${hl}`;
      url = `https://news.google.com/rss/headlines/section/topic/${topic}?hl=${hl}&gl=${params.country || 'US'}&ceid=${ceid}`;
    } else {
      // Top stories
      const hl = params.language || 'en';
      const ceid = `${params.country || 'US'}:${hl}`;
      url = `https://news.google.com/rss?hl=${hl}&gl=${params.country || 'US'}&ceid=${ceid}`;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      throw new Error(`Google News RSS error: ${response.status}`);
    }

    const xmlText = await response.text();
    const articles = parseGoogleNewsRss(xmlText);
    
    return articles;
  } catch (error) {
    console.error('Error fetching Google News RSS:', error);
    return [];
  }
}

/**
 * Parse Google News RSS XML into NewsArticle format
 */
function parseGoogleNewsRss(xmlText: string): NewsArticle[] {
  const articles: NewsArticle[] = [];
  
  try {
    // Extract items from RSS feed
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemXml = match[1];

      // Extract fields
      const title = extractTag(itemXml, 'title');
      const link = extractTag(itemXml, 'link');
      const pubDate = extractTag(itemXml, 'pubDate');
      const description = extractTag(itemXml, 'description');
      const source = extractTag(itemXml, 'source');
      const guid = extractTag(itemXml, 'guid');

      if (title && link) {
        // Extract source name from title (Google News format: "Title - Source")
        const titleParts = title.split(' - ');
        const cleanTitle = titleParts.length > 1 ? titleParts.slice(0, -1).join(' - ') : title;
        const sourceName = titleParts.length > 1 ? titleParts[titleParts.length - 1] : (source || 'Google News');

        // Try to extract image from description
        let imageUrl: string | null = null;
        if (description) {
          const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          }
        }

        // Remove HTML tags from description
        const cleanDescription = description
          ? description.replace(/<[^>]*>/g, '').trim()
          : null;

        articles.push({
          source: {
            id: null,
            name: sourceName,
          },
          author: null,
          title: decodeHtmlEntities(cleanTitle),
          description: cleanDescription ? decodeHtmlEntities(cleanDescription) : null,
          url: link,
          urlToImage: imageUrl,
          publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          content: null,
        });
      }
    }
  } catch (error) {
    console.error('Error parsing Google News RSS:', error);
  }

  return articles;
}

/**
 * Extract content between XML tags
 */
function extractTag(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>|<${tagName}[^>]*>([^<]*)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? (match[1] || match[2] || '').trim() : '';
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  };

  return text.replace(/&[#\w]+;/g, (match) => {
    if (entities[match]) {
      return entities[match];
    }
    // Handle numeric entities like &#123;
    if (match.startsWith('&#')) {
      const code = match.slice(2, -1);
      const num = code.startsWith('x') ? parseInt(code.slice(1), 16) : parseInt(code, 10);
      return String.fromCharCode(num);
    }
    return match;
  });
}

/**
 * Get available Google News categories
 */
export const GOOGLE_NEWS_CATEGORIES = {
  WORLD: 'World',
  NATION: 'Nation',
  BUSINESS: 'Business',
  TECHNOLOGY: 'Technology',
  ENTERTAINMENT: 'Entertainment',
  SPORTS: 'Sports',
  SCIENCE: 'Science',
  HEALTH: 'Health',
} as const;

/**
 * Get available countries for Google News
 */
export const GOOGLE_NEWS_COUNTRIES = {
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  IN: 'India',
  DE: 'Germany',
  FR: 'France',
  IT: 'Italy',
  ES: 'Spain',
  JP: 'Japan',
  BR: 'Brazil',
} as const;
