import { CodeforcesStatsDTO } from './types';
import { generateActivitySeries } from '../utils/activityUtils';
import { validateHandle } from '../utils/validators';

export async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStatsDTO> {
  if (!validateHandle('codeforces', handle)) {
    throw new Error('Invalid Codeforces handle format');
  }

  try {
    const [userRes, ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100`)
    ]);

    if (!userRes.ok || !ratingRes.ok) {
      throw new Error('Codeforces API error');
    }

    const userData = await userRes.json();
    const ratingData = await ratingRes.json();
    const statusData = statusRes.ok ? await statusRes.json() : { result: [] };

    if (userData.status !== 'OK' || userData.result.length === 0) {
      throw new Error('User not found');
    }

    const userInfo = userData.result[0];

    const recentContests = (ratingData.result || []).slice(-3).map((r: any) => ({
      name: r.contestName,
      rank: r.rank,
      delta: r.newRating - r.oldRating,
      url: `https://codeforces.com/contest/${r.contestId}`
    })).reverse();

    const countsByDate = new Map<string, number>();
    try {
      const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      if (statusRes.ok) {
        const { result } = await statusRes.json();
        for (const sub of result) {
          const dateStr = new Date(sub.creationTimeSeconds * 1000).toISOString().split('T')[0];
          countsByDate.set(dateStr, (countsByDate.get(dateStr) || 0) + 1);
        }
      }
    } catch(e) {
      console.error('Error fetching CF status', e);
    }

    return {
      platform: 'codeforces',
      handle,
      status: 'ok',
      lastUpdated: new Date().toISOString(),
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || 'Unrated',
      avatarUrl: userInfo.titlePhoto || userInfo.avatar,
      solvedCount: 0,
      ratingHistory: (ratingData.result || []).map((r: any) => ({
        name: r.contestName,
        rating: r.newRating,
        timestamp: new Date(r.ratingUpdateTimeSeconds * 1000).toISOString()
      })),
      activitySeries: generateActivitySeries(countsByDate),
      recentContests,
      recentItems: []
    };
  } catch (err: any) {
    console.error('Codeforces adapter error:', err);
    throw err;
  }
}
