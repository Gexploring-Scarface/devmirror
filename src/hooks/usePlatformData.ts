import { useQuery } from '@tanstack/react-query';
import { GitHubStatsDTO, CodeforcesStatsDTO, LeetCodeStatsDTO, CodeChefStatsDTO } from '@/lib/adapters/types';

export function useGitHubData(handle?: string) {
  return useQuery<GitHubStatsDTO>({
    queryKey: ['github', handle],
    queryFn: async () => {
      const url = handle ? `/api/github?handle=${encodeURIComponent(handle)}` : '/api/github';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch GitHub stats');
      return res.json();
    },
    enabled: !!handle
  });
}

export function useCodeforcesData(handle?: string) {
  return useQuery<CodeforcesStatsDTO>({
    queryKey: ['codeforces', handle],
    queryFn: async () => {
      const url = handle ? `/api/codeforces?handle=${encodeURIComponent(handle)}` : '/api/codeforces';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch Codeforces stats');
      return res.json();
    },
    enabled: !!handle
  });
}

export function useLeetCodeData(handle?: string) {
  return useQuery<LeetCodeStatsDTO>({
    queryKey: ['leetcode', handle],
    queryFn: async () => {
      const url = handle ? `/api/leetcode?handle=${encodeURIComponent(handle)}` : '/api/leetcode';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch LeetCode stats');
      return res.json();
    },
    enabled: !!handle
  });
}

export function useCodeChefData(handle?: string) {
  return useQuery<CodeChefStatsDTO>({
    queryKey: ['codechef', handle],
    queryFn: async () => {
      const url = handle ? `/api/codechef?handle=${encodeURIComponent(handle)}` : '/api/codechef';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch CodeChef stats');
      return res.json();
    },
    enabled: !!handle
  });
}
