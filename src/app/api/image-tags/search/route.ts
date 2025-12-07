import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { imageTags } from '@/db/schema';
import { like, or, eq } from 'drizzle-orm';

const VALID_CATEGORIES = ['objects', 'people', 'themes', 'emotions', 'colors', 'concepts'];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);

    // Validate search term is provided
    if (!searchTerm || searchTerm.trim() === '') {
      return NextResponse.json({
        success: false,
        error: 'Search term (q) is required',
        code: 'MISSING_SEARCH_TERM'
      }, { status: 400 });
    }

    // Validate category if provided
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid category. Must be one of: objects, people, themes, emotions, colors, concepts',
        code: 'INVALID_CATEGORY'
      }, { status: 400 });
    }

    // Build search query based on category
    let query = db.select().from(imageTags);
    const searchPattern = `%${searchTerm}%`;

    if (category) {
      // Search only the specified category field
      query = query.where(like(imageTags[category as keyof typeof imageTags], searchPattern));
    } else {
      // Search across all category fields using OR conditions
      query = query.where(
        or(
          like(imageTags.objects, searchPattern),
          like(imageTags.people, searchPattern),
          like(imageTags.themes, searchPattern),
          like(imageTags.emotions, searchPattern),
          like(imageTags.colors, searchPattern),
          like(imageTags.concepts, searchPattern)
        )
      );
    }

    // Execute query with limit
    const results = await query.limit(limit);

    // Update lastAccessed and accessCount for each result
    const now = new Date().toISOString();
    for (const result of results) {
      await db.update(imageTags)
        .set({
          lastAccessed: now,
          accessCount: (result.accessCount || 0) + 1
        })
        .where(eq(imageTags.id, result.id));
    }

    // Format response with relevant fields
    const formattedResults = results.map(result => ({
      imageUrl: result.imageUrl,
      tags: {
        objects: result.objects,
        people: result.people,
        themes: result.themes,
        emotions: result.emotions,
        colors: result.colors,
        concepts: result.concepts,
        description: result.description
      },
      articleTitle: result.articleTitle,
      articleUrl: result.articleUrl
    }));

    return NextResponse.json({
      success: true,
      data: {
        results: formattedResults,
        count: results.length,
        searchTerm: searchTerm,
        category: category
      }
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}