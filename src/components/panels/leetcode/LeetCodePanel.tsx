'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { LeetCodeHeader } from './LeetCodeHeader';
import { LeetCodeStatsRing } from './LeetCodeStatsRing';
import { LeetCodeHeatmap } from './LeetCodeHeatmap';
import { useLeetCodeData } from '@/hooks/usePlatformData';
import { useHandles } from '@/hooks/useHandles';

export function LeetCodePanel() {
  const { handles } = useHandles();
  const { data, isLoading, isError } = useLeetCodeData(handles.leetcode);

  if (isLoading) return <GlassCard elevated id="leetcode" className="h-[400px] animate-pulse" />;
  if (isError || !data) return <GlassCard elevated id="leetcode" className="h-[400px] text-dm-danger flex items-center justify-center">Error loading LeetCode</GlassCard>;

  return (
    <GlassCard elevated id="leetcode" className="flex flex-col">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-dm-leetcode" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.259 2.65 2.65 0 0 1 .154-.343 2.549 2.549 0 0 1 .771-1.024l3.818-4.09 5.061-5.678a1.376 1.376 0 0 0-.003-1.954 1.385 1.385 0 0 0-.962-.439zM22.502 17.553c-.76.76-1.993.76-2.753 0l-7.23-7.23c-.76-.76-.76-1.993 0-2.753.76-.76 1.993-.76 2.753 0l7.23 7.23c.76.76.76 1.992 0 2.753z" />
          </svg>
          <span className="font-sans font-semibold text-[14px] text-dm-text-primary">LeetCode</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-dm-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="font-sans text-[11px] text-dm-text-muted">Live</span>
        </div>
      </div>
      
      <LeetCodeHeader avatar={data.avatarUrl} handle={data.handle} ranking={data.ranking} contestData={data.contestData} />
      <LeetCodeStatsRing solved={data.solved} available={data.available} contestData={data.contestData} />
      <LeetCodeHeatmap recentItems={data.recentItems} data={data.activitySeries} submissions={data.totalSubmissions || 0} />
    </GlassCard>
  );
}
