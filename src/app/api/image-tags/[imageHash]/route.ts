import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { imageTags } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createHash } from 'crypto';

export async function GET(
  request: NextRequest,
  { params }: { params: { imageHash: string } }
) {
  try {
    let imageHash = params.imageHash;

    // Check if imageHash is provided
    if (!imageHash) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image hash is required',
          code: 'MISSING_IMAGE_HASH'
        },
        { status: 400 }
      );
    }

    // If imageUrl query param is provided, generate hash from it
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get('imageUrl');

    if (imageUrl) {
      // Generate SHA-256 hash from imageUrl
      imageHash = createHash('sha256').update(imageUrl).digest('hex');
    }

    // Query database for record matching imageHash
    const result = await db
      .select()
      .from(imageTags)
      .where(eq(imageTags.imageHash, imageHash))
      .limit(1);

    // If not found, return 404
    if (result.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Image tags not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    const tags = result[0];

    // Update lastAccessed and increment accessCount
    const updatedTags = await db
      .update(imageTags)
      .set({
        lastAccessed: new Date().toISOString(),
        accessCount: (tags.accessCount || 0) + 1
      })
      .where(eq(imageTags.imageHash, imageHash))
      .returning();

    // Return tags with success
    return NextResponse.json(
      {
        success: true,
        data: {
          tags: updatedTags[0]
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
      },
      { status: 500 }
    );
  }
}