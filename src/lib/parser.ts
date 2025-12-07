import { XMLParser } from 'fast-xml-parser';
import { NewsArticle } from './types/news';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  parseTagValue: true,
  parseAttributeValue: true,
});

export async function parseRssFeed(xmlContent: string): Promise<NewsArticle[]> {
  try {
    const parsed = parser.parse(xmlContent);
    
    // Handle both RSS and Atom formats
    const items = parsed.rss?.channel?.item || parsed.feed?.entry || [];
    const channelData = parsed.rss?.channel || parsed.feed || {};

    return (Array.isArray(items) ? items : [items]).map((item: any, index: number) => ({
      id: item.guid?.['#text'] || item.id || `${Date.now()}-${index}`,
      title: item.title || 'Untitled',
      description: stripHtml(item.description || item.summary || ''),
      link: item.link?.['@_href'] || item.link || '',
      source: channelData.title || 'Google News',
      pubDate: new Date(item.pubDate || item.published || Date.now()),
      image: extractImage(item),
      categories: extractCategories(item),
    }));
  } catch (error) {
    console.error('RSS Parse Error:', error);
    throw new Error(`Failed to parse RSS feed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function extractImage(item: any): string | undefined {
  return item.image?.url || 
         item['media:content']?.['@_url'] || 
         item['media:thumbnail']?.['@_url'] ||
         undefined;
}

function extractCategories(item: any): string[] {
  const cats = item.category;
  if (!cats) return [];
  return Array.isArray(cats) ? cats.map((c: any) => c['#text'] || c) : [cats['#text'] || cats];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
