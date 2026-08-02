import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/adapters/github.adapter';
import { platformsConfig } from '@/lib/config/platforms.config';

export async function GET(request: NextRequest) {
  if (!platformsConfig.github.enabled) {
    return NextResponse.json({ error: 'Disabled' }, { status: 400 });
  }

  try {
    const handle = request.nextUrl.searchParams.get('handle') || platformsConfig.github.handle;
    const data = await fetchGitHubStats(handle);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=86400',
      }
    });
  } catch (error: any) {
    console.error('[GitHub API] Error:', error);
    if (error.message && error.message.includes('Invalid')) {
      return NextResponse.json({ error: 'Bad Request: Invalid handle format' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
