export interface ActivityDataPoint {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface RecentItem {
  title: string;
  meta: string;
  timestamp: string;
  url?: string;
  color?: string; // used for difficulty or language
}

export interface BaseStatsDTO {
  platform: 'github' | 'leetcode' | 'codeforces' | 'codechef';
  handle: string;
  lastUpdated: string; // ISO String
  status: 'ok' | 'stale' | 'error';
  activitySeries: number[];
  recentItems: RecentItem[];
}

export interface GitHubStatsDTO extends BaseStatsDTO {
  platform: 'github';
  followers: number;
  following: number;
  publicRepos: number;
  stars: number;
  contributions: number;
  avatarUrl: string;
  pinnedRepos: {
    name: string;
    desc: string;
    lang: string;
    color: string;
    stars: number;
  }[];
}

export interface CodeforcesStatsDTO extends BaseStatsDTO {
  platform: 'codeforces';
  rating: number;
  maxRating: number;
  rank: string;
  avatarUrl: string;
  solvedCount: number;
  ratingHistory: { name: string; rating: number }[];
  recentContests: { name: string; rank: number; delta: number; oldRating: number }[];
}

export interface LeetCodeStatsDTO extends BaseStatsDTO {
  platform: 'leetcode';
  avatarUrl: string;
  ranking: number;
  contestData?: {
    rating: number;
    topPercentage: number;
    badge: string;
  } | null;
  solved: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  totalSubmissions?: number;
  available: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
}

export interface CodeChefStatsDTO extends BaseStatsDTO {
  platform: 'codechef';
  rating: number;
  highestRating: number;
  globalRank: string;
  stars: string;
  avatarUrl: string;
  fullySolved: number;
  partiallySolved: number;
}
