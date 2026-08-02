import React from 'react';
import { Heatmap } from '@/components/ui/Heatmap';

export function GitHubContributionGraph({ contributions, data = [] }: any) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary">
          Contributions
        </span>
        <span className="font-sans text-[13px] text-dm-text-muted">
          {contributions?.toLocaleString() || 0} contributions in the last year
        </span>
      </div>
      <Heatmap colorScale={[
        'var(--dm-bg-surface-3)',
        'rgba(35,134,54,0.4)',
        'rgba(35,134,54,0.6)',
        'rgba(35,134,54,0.8)',
        'rgba(35,134,54,1)'
      ]} data={data} />
    </div>
  );
}
