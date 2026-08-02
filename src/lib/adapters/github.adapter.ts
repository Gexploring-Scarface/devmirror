/* eslint-disable */
import { GitHubStatsDTO } from './types';
import * as cheerio from 'cheerio';
import { validateHandle } from '../utils/validators';

export async function fetchGitHubStats(handle: string): Promise<GitHubStatsDTO> {
  if (!validateHandle('github', handle)) {
    throw new Error('Invalid GitHub handle format');
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (process.env.GITHUB_PAT) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_PAT}`;
    }

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${handle}`, { headers }),
      fetch(`https://api.github.com/users/${handle}/repos?sort=updated&per_page=100`, { headers }),
      fetch(`https://api.github.com/users/${handle}/events/public?per_page=10`, { headers })
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub API error: ${userRes.status}`);
    }

    const userData = await userRes.json();
    const reposData = (await reposRes.json()) as any[];
    const eventsData = (await eventsRes.json()) as any[];

    const stars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    
    const recentItems = eventsData
      .filter(e => ['PushEvent', 'WatchEvent', 'PullRequestEvent', 'IssuesEvent'].includes(e.type))
      .slice(0, 5)
      .map(e => {
        let title = 'Performed action';
        if (e.type === 'PushEvent') title = `Pushed to ${e.repo.name}`;
        if (e.type === 'WatchEvent') title = `Starred ${e.repo.name}`;
        if (e.type === 'PullRequestEvent') title = `Opened PR in ${e.repo.name}`;
        if (e.type === 'IssuesEvent') title = `Opened issue in ${e.repo.name}`;
        
        return {
          title,
          meta: e.repo.name,
          timestamp: e.created_at,
          url: `https://github.com/${e.repo.name}`
        };
      });

    const pinnedRepos = reposData
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((r: any) => ({
        name: r.name,
        desc: r.description || '',
        stars: r.stargazers_count,
        lang: r.language || 'Unknown',
        color: 'var(--dm-text-secondary)',
        url: r.html_url
      }));

    const activitySeries: number[] = Array.from({ length: 364 }).fill(0) as number[];
    try {
      const htmlRes = await fetch(`https://github.com/users/${handle}/contributions`, { headers });
      if (htmlRes.ok) {
        const html = await htmlRes.text();
        const dates = html.match(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g);
        if (dates) {
          const map = new Map<string, number>();
          dates.forEach(match => {
            const dateMatch = match.match(/data-date="([^"]+)"/);
            const levelMatch = match.match(/data-level="([^"]+)"/);
            if (dateMatch && levelMatch) {
              map.set(dateMatch[1], parseInt(levelMatch[1]));
            }
          });
          
          const today = new Date();
          today.setHours(12, 0, 0, 0); 
          for (let i = 363; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            activitySeries[363 - i] = map.get(dateStr) || 0;
          }
        }
      }
    } catch(e) {
      console.error('Error fetching GH contributions', e);
    }

    return {
      platform: 'github',
      handle,
      status: 'ok',
      lastUpdated: new Date().toISOString(),
      followers: userData.followers || 0,
      following: userData.following || 0,
      publicRepos: userData.public_repos || 0,
      stars,
      contributions: activitySeries.reduce((acc, v) => acc + (v > 0 ? 1 : 0), 0) * 5,
      avatarUrl: userData.avatar_url,
      pinnedRepos,
      activitySeries,
      recentItems
    };
  } catch (err: any) {
    console.error('GitHub adapter error:', err);
    throw err;
  }
}

