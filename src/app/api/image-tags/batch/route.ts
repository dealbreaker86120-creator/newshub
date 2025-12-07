import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { imageTags } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { analyzeImageWithAI, generateImageHash } from '@/lib/image-analyzer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { images } = body;

    // Validate images array is provided
    if (!images) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Images array is required',
          code: 'MISSING_IMAGES'
        },
        { status: 400 }
      );
    }

    // Validate images is an array
    if (!Array.isArray(images)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Images must be an array',
          code: 'INVALID_IMAGES_FORMAT'
        },
        { status: 400 }
      );
    }

    // Validate array is not empty
    if (images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Images array cannot be empty',
          code: 'EMPTY_IMAGES_ARRAY'
        },
        { status: 400 }
      );
    }

    // Validate each image has imageUrl
    for (const image of images) {
      if (!image.imageUrl) {
        return NextResponse.json(
          {
            success: false,
            error: 'Each image must have imageUrl',
            code: 'MISSING_IMAGE_URL'
          },
          { status: 400 }
        );
      }
    }

    const results = [];
    let cachedCount = 0;
    let analyzedCount = 0;
    let totalCost = 0;

    // Process images sequentially
    for (const image of images) {
      const { imageUrl, articleTitle, articleUrl } = image;
      const imageHash = generateImageHash(imageUrl);
      const currentTimestamp = new Date().toISOString();

      // Check for existing tags in database
      const existingTags = await db.select()
        .from(imageTags)
        .where(eq(imageTags.imageHash, imageHash))
        .limit(1);

      if (existingTags.length > 0) {
        // Cache hit - update lastAccessed and accessCount
        const existing = existingTags[0];
        const updated = await db.update(imageTags)
          .set({
            lastAccessed: currentTimestamp,
            accessCount: (existing.accessCount || 0) + 1
          })
          .where(eq(imageTags.imageHash, imageHash))
          .returning();

        results.push({
          imageUrl,
          tags: updated[0],
          cached: true,
          cost: 0
        });

        cachedCount++;
      } else {
        // Cache miss - use real AI analysis
        const aiTags = await analyzeImageWithAI(imageUrl);
        const cost = 0.000075; // Estimated cost for GPT-4o mini

        const newTags = await db.insert(imageTags)
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
            createdAt: currentTimestamp,
            lastAccessed: currentTimestamp,
            accessCount: 1,
            cached: false
          })
          .returning();

        results.push({
          imageUrl,
          tags: newTags[0],
          cached: false,
          cost
        });

        analyzedCount++;
        totalCost += cost;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        results,
        summary: {
          total: images.length,
          cached: cachedCount,
          analyzed: analyzedCount,
          totalCost: parseFloat(totalCost.toFixed(6))
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}