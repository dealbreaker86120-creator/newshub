import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { imageTags } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createHash } from 'crypto';
import { analyzeImageWithAI, generateImageHash } from '@/lib/image-analyzer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, articleTitle, articleUrl, skipCache } = body;

    // Validate imageUrl
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Valid image URL is required',
          code: 'INVALID_IMAGE_URL'
        },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { 
          success: false,
          error: 'Valid image URL is required',
          code: 'INVALID_IMAGE_URL'
        },
        { status: 400 }
      );
    }

    // Generate SHA-256 hash of imageUrl
    const imageHash = generateImageHash(imageUrl);

    // Check cache if skipCache is not true
    if (!skipCache) {
      const cachedTags = await db.select()
        .from(imageTags)
        .where(eq(imageTags.imageHash, imageHash))
        .limit(1);

      if (cachedTags.length > 0) {
        const cached = cachedTags[0];
        
        // Update lastAccessed and increment accessCount
        const updated = await db.update(imageTags)
          .set({
            lastAccessed: new Date().toISOString(),
            accessCount: (cached.accessCount || 0) + 1
          })
          .where(eq(imageTags.id, cached.id))
          .returning();

        const updatedTag = updated[0];

        return NextResponse.json(
          {
            success: true,
            data: {
              tags: {
                imageUrl: updatedTag.imageUrl,
                imageHash: updatedTag.imageHash,
                objects: updatedTag.objects,
                people: updatedTag.people,
                themes: updatedTag.themes,
                emotions: updatedTag.emotions,
                colors: updatedTag.colors,
                concepts: updatedTag.concepts,
                description: updatedTag.description,
                articleTitle: updatedTag.articleTitle,
                articleUrl: updatedTag.articleUrl,
                createdAt: updatedTag.createdAt,
                lastAccessed: updatedTag.lastAccessed,
                accessCount: updatedTag.accessCount
              },
              cached: true,
              cost: 0
            }
          },
          { status: 200 }
        );
      }
    }

    // Use real AI analysis with OpenAI GPT-4o Vision
    const aiTags = await analyzeImageWithAI(imageUrl);
    const mockCost = 0.000075; // Estimated cost for GPT-4o mini

    const currentTimestamp = new Date().toISOString();

    // Insert new analysis into database
    const newTag = await db.insert(imageTags)
      .values({
        imageUrl,
        imageHash,
        objects: aiTags.objects,
        people: aiTags.people,
        themes: aiTags.themes,
        emotions: aiTags.emotions,
        colors: aiTags.colors,
        concepts: aiTags.concepts,
        description: aiTags.description,
        articleTitle: articleTitle || null,
        articleUrl: articleUrl || null,
        cached: false,
        createdAt: currentTimestamp,
        lastAccessed: currentTimestamp,
        accessCount: 1
      })
      .returning();

    const createdTag = newTag[0];

    return NextResponse.json(
      {
        success: true,
        data: {
          tags: {
            imageUrl: createdTag.imageUrl,
            imageHash: createdTag.imageHash,
            objects: createdTag.objects,
            people: createdTag.people,
            themes: createdTag.themes,
            emotions: createdTag.emotions,
            colors: createdTag.colors,
            concepts: createdTag.concepts,
            description: createdTag.description,
            articleTitle: createdTag.articleTitle,
            articleUrl: createdTag.articleUrl,
            createdAt: createdTag.createdAt,
            lastAccessed: createdTag.lastAccessed,
            accessCount: createdTag.accessCount
          },
          cached: false,
          cost: mockCost
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}