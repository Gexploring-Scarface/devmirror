import { LeetCodeStatsDTO } from './types';
import { generateActivitySeries } from '../utils/activityUtils';
import { validateHandle } from '../utils/validators';

export async function fetchLeetCodeStats(handle: string): Promise<LeetCodeStatsDTO> {
  if (!validateHandle('leetcode', handle)) {
    throw new Error('Invalid LeetCode handle format');
  }

  const query = `
    query getUserProfile($username: String!) {
      allQuestionsCount { difficulty count }
      matchedUser(username: $username) {
        profile { userAvatar ranking }
        submitStats {
          acSubmissionNum { difficulty count submissions }
        }
        userCalendar {
          submissionCalendar
        }
      }
      userContestRanking(username: $username) {
        rating
        topPercentage
        badge { name }
      }
      recentAcSubmissionList(username: $username, limit: 5) {
        title titleSlug timestamp
      }
    }
  `;

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query,
        variables: { username: handle }
      })
    });

    if (!res.ok) throw new Error('LeetCode GraphQL error');
    const { data } = await res.json();

    if (!data?.matchedUser) throw new Error('User not found');

    const totalStats = data.allQuestionsCount;
    const userStats = data.matchedUser.submitStats.acSubmissionNum;
    
    const getCount = (arr: any[], diff: string) => arr.find(x => x.difficulty === diff)?.count || 0;

    const recentItems = data.recentAcSubmissionList.map((item: any) => ({
      title: item.title,
      meta: 'Accepted',
      timestamp: new Date(parseInt(item.timestamp) * 1000).toISOString(),
      url: `https://leetcode.com/problems/${item.titleSlug}`
    }));

    let totalSubmissions = 0;
    const countsByDate = new Map<string, number>();
    if (data.matchedUser.userCalendar?.submissionCalendar) {
      try {
        const calendar = JSON.parse(data.matchedUser.userCalendar.submissionCalendar);
        for (const [ts, count] of Object.entries(calendar)) {
          const dateStr = new Date(parseInt(ts) * 1000).toISOString().split('T')[0];
          countsByDate.set(dateStr, (countsByDate.get(dateStr) || 0) + (count as number));
          totalSubmissions += (count as number);
        }
      } catch (e) {
        console.error('Error parsing LC calendar', e);
      }
    }

    return {
      platform: 'leetcode',
      handle,
      status: 'ok',
      lastUpdated: new Date().toISOString(),
      avatarUrl: data.matchedUser.profile.userAvatar,
      ranking: data.matchedUser.profile.ranking,
      contestData: data.userContestRanking ? {
        rating: Math.round(data.userContestRanking.rating),
        topPercentage: data.userContestRanking.topPercentage,
        badge: data.userContestRanking.badge?.name || ''
      } : null,
      solved: {
        easy: getCount(userStats, 'Easy'),
        medium: getCount(userStats, 'Medium'),
        hard: getCount(userStats, 'Hard'),
        total: getCount(userStats, 'All'),
      },
      available: {
        easy: getCount(totalStats, 'Easy'),
        medium: getCount(totalStats, 'Medium'),
        hard: getCount(totalStats, 'Hard'),
        total: getCount(totalStats, 'All'),
      },
      activitySeries: generateActivitySeries(countsByDate),
      totalSubmissions,
      recentItems
    };
  } catch (err) {
    console.error('LeetCode adapter error:', err);
    throw err;
  }
}
