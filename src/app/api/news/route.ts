import { NextRequest, NextResponse } from 'next/server';
import { NewsResponse, NewsArticle } from '@/lib/types/news';
import { fetchTopHeadlines, fetchEverything, NEWS_DOMAINS } from '@/lib/newsapi';
import { fetchGoogleNewsRss } from '@/lib/google-news-rss';
import { dailyLimiter } from '@/lib/rateLimit';

export const revalidate = 60; // ISR: revalidate every 1 minute for latest news

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const country = searchParams.get('country') || 'US';
    const language = searchParams.get('language') || 'en';
    const pageSize = Math.min(parseInt(searchParams.get('pageSize') || '50'), 100);
    const page = parseInt(searchParams.get('page') || '1');
    const source = searchParams.get('source') || 'google'; // 'google' or 'newsapi'

    let articles: NewsArticle[] = [];
    let totalResults = 0;
    let usedSource = 'google-news-rss';

    // Try Google News RSS first (free, unlimited)
    if (source === 'google' || source === 'auto') {
      try {
        const googleArticles = await fetchGoogleNewsRss({
          query: query || undefined,
          category: category || undefined,
          country: country.toUpperCase(),
          language,
        });

        if (googleArticles.length > 0) {
          articles = googleArticles;
          totalResults = googleArticles.length;
          usedSource = 'google-news-rss';
        }
      } catch (error) {
        console.error('Google News RSS Error:', error);
        // Will fallback to NewsAPI below
      }
    }

    // Fallback to NewsAPI if Google News failed or explicitly requested
    if (articles.length === 0 && (source === 'newsapi' || source === 'auto')) {
      const apiKey = process.env.NEWSAPI_KEY;
      
      if (!apiKey) {
        // If no NewsAPI key and Google News also failed, return error
        if (usedSource === 'google-news-rss') {
          return NextResponse.json(
            { 
              error: 'Both Google News RSS and NewsAPI failed. Please check your configuration.',
              status: 'error',
              articles: [],
              totalResults: 0,
            },
            { status: 500 }
          );
        }
        
        return NextResponse.json(
          { 
            error: 'NewsAPI key not configured. Using Google News RSS only.',
            status: 'ok',
            articles: [],
            totalResults: 0,
          },
          { status: 200 }
        );
      }

      // Rate limiting by IP for NewsAPI free tier (100 req/day)
      const ip = request.headers.get('x-forwarded-for') || 'anonymous';
      if (!dailyLimiter(ip)) {
        return NextResponse.json(
          { 
            error: 'NewsAPI rate limit exceeded (100 requests per day). Google News RSS is still available.',
            status: 'error',
            articles: [],
            totalResults: 0,
          },
          { 
            status: 429,
            headers: { 'Retry-After': '86400' }
          }
        );
      }

      try {
        let data: NewsResponse;

        if (query) {
          // Search across major news agencies using Everything endpoint
          data = await fetchEverything(
            {
              query,
              domains: NEWS_DOMAINS,
              sortBy: 'publishedAt',
              language: 'en',
              pageSize,
              page,
            },
            apiKey
          );
        } else {
          // Get top headlines by category
          data = await fetchTopHeadlines(
            {
              country: country.toLowerCase() as any,
              category,
              pageSize,
              page,
            },
            apiKey
          );
        }

        if (data.status === 'ok') {
          articles = data.articles.filter(article => article.title && article.url);
          totalResults = data.totalResults;
          usedSource = 'newsapi';
        }
      } catch (error) {
        console.error('NewsAPI Error:', error);
        // Return Google News results if available, otherwise error
        if (articles.length === 0) {
          return NextResponse.json(
            { 
              error: error instanceof Error ? error.message : 'Failed to fetch news from all sources',
              status: 'error',
              articles: [],
              totalResults: 0,
              lastUpdated: new Date(),
            },
            { status: 500 }
          );
        }
      }
    }

    const result: NewsResponse = {
      status: 'ok',
      totalResults,
      articles,
      lastUpdated: new Date(),
      category: category || 'Top Stories',
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'X-News-Source': usedSource, // Indicate which source was used
      },
    });

  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch news',
        status: 'error',
        articles: [],
        totalResults: 0,
        lastUpdated: new Date(),
      },
      { status: 500 }
    );
  }
}