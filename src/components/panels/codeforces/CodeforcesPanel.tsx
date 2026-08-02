'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CodeforcesHeader } from './CodeforcesHeader';
import { CodeforcesRatingGraph } from './CodeforcesRatingGraph';
import { CodeforcesRecentContests } from './CodeforcesRecentContests';
import { Heatmap } from '@/components/ui/Heatmap';
import { useCodeforcesData } from '@/hooks/usePlatformData';
import { useHandles } from '@/hooks/useHandles';

export function CodeforcesPanel() {
  const { handles } = useHandles();
  const { data, isLoading, isError } = useCodeforcesData(handles.codeforces);

  if (isLoading) return <GlassCard elevated id="codeforces" className="h-[400px] animate-pulse" />;
  if (isError || !data) return <GlassCard elevated id="codeforces" className="h-[400px] text-dm-danger flex items-center justify-center">Error loading Codeforces</GlassCard>;

  return (
    <GlassCard elevated id="codeforces" className="flex flex-col">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5S3 20.328 3 19.5V9c0-.828.672-1.5 1.5-1.5zm9 3c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5S12 20.328 12 19.5V12c0-.828.672-1.5 1.5-1.5zm9-6C23.328 4.5 24 5.172 24 6v13.5c0 .828-.672 1.5-1.5 1.5S21 20.328 21 19.5V6c0-.828.672-1.5 1.5-1.5z" fill="#1F8ACB" />
          </svg>
          <span className="font-sans font-semibold text-[14px] text-dm-text-primary">Codeforces</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-dm-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="font-sans text-[11px] text-dm-text-muted">Live</span>
        </div>
      </div>
      
      <CodeforcesHeader avatar={data.avatarUrl} handle={data.handle} rating={data.rating} maxRating={data.maxRating} rank={data.rank} />
      <CodeforcesRatingGraph data={data.ratingHistory} />
      
      <div className="mt-2 grid grid-cols-2 gap-4 mb-2">
        <div className="flex flex-col">
          <span className="block font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary mb-3">
            Submission Activity
          </span>
          <Heatmap colorScale={[
            'var(--dm-bg-surface-3)',
            'rgba(119,221,187,0.4)',
            'rgba(119,221,187,0.6)',
            'rgba(119,221,187,0.8)',
            'rgba(119,221,187,1)'
          ]} data={data.activitySeries} />
        </div>
        <CodeforcesRecentContests items={data.recentContests} />
      </div>
    </GlassCard>
  );
}
