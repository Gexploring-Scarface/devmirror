import React from 'react';
import { Heatmap } from '@/components/ui/Heatmap';

export function LeetCodeHeatmap({ recentItems = [], data = [], submissions = 0 }: any) {
  const lcColors = [
    'var(--dm-bg-surface-3)',
    'rgba(255,161,22,0.4)',
    'rgba(255,161,22,0.6)',
    'rgba(255,161,22,0.8)',
    'rgba(255,161,22,1)'
  ];

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary">
          Submission Activity
        </span>
        <span className="font-sans text-[13px] text-dm-text-muted">
          {submissions.toLocaleString()} total submissions
        </span>
      </div>
      <Heatmap colorScale={lcColors} data={data} />
      
      <div className="mt-6">
        <span className="block font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary mb-3">
          Recent Accepted
        </span>
        <div className="max-h-[168px] overflow-y-auto scrollbar-hide flex flex-col gap-1 relative">
          {recentItems.map((item: any, i: number) => (
            <a key={i} href={item.url} target="_blank" rel="noreferrer" className="flex items-center h-[40px] px-2.5 rounded-[8px] hover:bg-dm-surface-2 transition-colors group cursor-pointer">
              <div className="w-1 h-4 rounded-full mr-3 opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--dm-success)' }} />
              <span className="font-sans text-[13px] text-dm-text-primary truncate flex-1">{item.title}</span>
              <span className="font-sans text-[11px] text-dm-text-muted ml-3">{new Date(item.timestamp).toLocaleDateString()}</span>
            </a>
          ))}
          <div className="sticky bottom-0 h-4 bg-gradient-to-t from-dm-surface-1 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
