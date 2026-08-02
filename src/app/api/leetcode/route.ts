import { NextRequest, NextResponse } from 'next/server';
import { fetchLeetCodeStats } from '@/lib/adapters/leetcode.adapter';
import { platformsConfig } from '@/lib/config/platforms.config';

export async function GET(request: NextRequest) {
  if (!platformsConfig.leetcode.enabled) {
    return NextResponse.json({ error: 'Disabled' }, { status: 400 });
  }

  try {
    const handle = request.nextUrl.searchParams.get('handle') || platformsConfig.leetcode.handle;
    const data = await fetchLeetCodeStats(handle);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
      }
    });
  } catch (error: any) {
    console.error('[LeetCode API] Error:', error);
    if (error.message && error.message.includes('Invalid')) {
      return NextResponse.json({ error: 'Bad Request: Invalid handle format' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
