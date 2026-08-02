import * as cheerio from 'cheerio';
import { CodeChefStatsDTO } from './types';
import { generateActivitySeries } from '../utils/activityUtils';
import { validateHandle } from '../utils/validators';

export async function fetchCodeChefStats(handle: string): Promise<CodeChefStatsDTO> {
  if (!validateHandle('codechef', handle)) {
    throw new Error('Invalid CodeChef handle format');
  }

  try {
    const res = await fetch(`https://www.codechef.com/users/${handle}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) throw new Error('CodeChef profile not found');
    const html = await res.text();
    const $ = cheerio.load(html);

    const ratingText = $('.rating-number').text().trim() || '0';
    const highestRatingMatch = html.match(/Highest Rating\s*(\d+)/i);
    const highestRatingText = highestRatingMatch ? highestRatingMatch[1] : '0';
    
    const starsCount = $('.rating-star').children().length || 0;
    const stars = starsCount > 0 ? `${starsCount}★` : '1★';
    
    const globalRank = $('.rating-ranks strong').first().text().trim() || 'Inactive';

    let fullySolved = 0;
    let partiallySolved = 0;
    
    const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/i);
    if (solvedMatch) {
      fullySolved = parseInt(solvedMatch[1]);
    }

    const avatarUrl = $('.user-details-container img').attr('src') || '';

    const countsByDate = new Map<string, number>();
    const statsMatch = html.match(/var\s+userDailySubmissionsStats\s*=\s*(\[.*?\]);/);
    if (statsMatch) {
      try {
        const stats = JSON.parse(statsMatch[1]);
        for (const item of stats) {
          const parts = item.date.split('-');
          if (parts.length === 3) {
            const pad = (n: string) => n.length === 1 ? '0' + n : n;
            const dateStr = `${parts[0]}-${pad(parts[1])}-${pad(parts[2])}`;
            countsByDate.set(dateStr, parseInt(item.value));
          }
        }
      } catch (e) {
        console.error('Error parsing CC stats', e);
      }
    }

    return {
      platform: 'codechef',
      handle,
      status: 'ok',
      lastUpdated: new Date().toISOString(),
      rating: parseInt(ratingText) || 0,
      highestRating: parseInt(highestRatingText) || 0,
      globalRank,
      stars,
      avatarUrl,
      fullySolved,
      partiallySolved,
      activitySeries: generateActivitySeries(countsByDate),
      recentItems: []
    };
  } catch (err: any) {
    console.error('CodeChef adapter error:', err);
    throw err;
  }
}
