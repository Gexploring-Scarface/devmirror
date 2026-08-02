'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GitHubHeader } from './GitHubHeader';
import { GitHubContributionGraph } from './GitHubContributionGraph';
import { GitHubRepoList } from './GitHubRepoList';
import { GitHubRecentActivity } from './GitHubRecentActivity';
import { useGitHubData } from '@/hooks/usePlatformData';
import { useHandles } from '@/hooks/useHandles';

export function GitHubPanel() {
  const { handles } = useHandles();
  const { data, isLoading, isError } = useGitHubData(handles.github);

  if (isLoading) return <GlassCard elevated id="github" className="h-[400px] animate-pulse" />;
  if (isError || !data) return <GlassCard elevated id="github" className="h-[400px] text-dm-danger flex items-center justify-center">Error loading GitHub</GlassCard>;

  return (
    <GlassCard elevated id="github" className="flex flex-col">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-dm-github"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span className="font-sans font-semibold text-[14px] text-dm-text-primary">GitHub</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-dm-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="font-sans text-[11px] text-dm-text-muted">Live</span>
        </div>
      </div>
      
      <GitHubHeader avatar={data.avatarUrl} handle={data.handle} followers={data.followers} following={data.following} stars={data.stars} contributions={data.contributions} />
      <GitHubContributionGraph contributions={data.contributions} data={data.activitySeries} />
      
      <div className="grid grid-cols-2 gap-6 mt-2">
        <GitHubRepoList repos={data.pinnedRepos} />
        <GitHubRecentActivity items={data.recentItems} />
      </div>
    </GlassCard>
  );
}
