'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CodeChefHeader } from './CodeChefHeader';
import { CodeChefRatingGraph } from './CodeChefRatingGraph';
import { CodeChefProblemStats } from './CodeChefProblemStats';
import { ChefHat } from 'lucide-react';
import { Heatmap } from '@/components/ui/Heatmap';
import { useCodeChefData } from '@/hooks/usePlatformData';
import { useHandles } from '@/hooks/useHandles';

export function CodeChefPanel() {
  const { handles } = useHandles();
  const { data, isLoading, isError } = useCodeChefData(handles.codechef);

  if (isLoading) return <GlassCard elevated id="codechef" className="h-[400px] animate-pulse" />;
  if (isError || !data) return <GlassCard elevated id="codechef" className="h-[400px] text-dm-danger flex items-center justify-center">Error loading CodeChef</GlassCard>;

  return (
    <GlassCard elevated id="codechef" className="flex flex-col">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2">
          <ChefHat size={20} className="text-dm-codechef" />
          <span className="font-sans font-semibold text-[14px] text-dm-text-primary">CodeChef</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-dm-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="font-sans text-[11px] text-dm-text-muted">Live</span>
        </div>
      </div>
      
      <CodeChefHeader avatar={data.avatarUrl} handle={data.handle} stars={data.stars} rating={data.rating} highestRating={data.highestRating} globalRank={data.globalRank} />
      <CodeChefRatingGraph />
      
      <div className="mt-2 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary">
            Submission Activity
          </span>
          <span className="font-sans text-[13px] text-dm-text-muted">
            {data.fullySolved + data.partiallySolved} total solved
          </span>
        </div>
        <Heatmap colorScale={[
          'var(--dm-bg-surface-3)',
          'rgba(244,120,32,0.4)',
          'rgba(244,120,32,0.6)',
          'rgba(244,120,32,0.8)',
          'rgba(244,120,32,1)'
        ]} data={data.activitySeries} />
      </div>

      <CodeChefProblemStats fullySolved={data.fullySolved} partiallySolved={data.partiallySolved} />
    </GlassCard>
  );
}
