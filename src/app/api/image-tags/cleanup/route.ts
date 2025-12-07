import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { imageTags } from '@/db/schema';
import { lt } from 'drizzle-orm';

export async function DELETE(request: NextRequest) {
  try {
    // Calculate cutoff date: 90 days ago from current date
    const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();

    // Delete all records older than cutoff date
    const deleted = await db.delete(imageTags)
      .where(lt(imageTags.createdAt, cutoffDate))
      .returning();

    const deletedCount = deleted.length;

    return NextResponse.json({
      success: true,
      data: {
        deletedCount,
        cutoffDate,
        message: `Deleted ${deletedCount} records older than 90 days`
      }
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE cleanup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}