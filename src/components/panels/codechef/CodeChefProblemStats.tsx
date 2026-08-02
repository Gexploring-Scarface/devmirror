import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function CodeChefProblemStats({ fullySolved, partiallySolved }: any) {
  const total = fullySolved + partiallySolved;
  const stats = [
    { label: 'Fully Solved', value: fullySolved, pct: total > 0 ? (fullySolved/total)*100 : 0, color: 'var(--dm-success)' },
    { label: 'Partially Solved', value: partiallySolved, pct: total > 0 ? (partiallySolved/total)*100 : 0, color: '#FFC01E' },
  ];

  return (
    <div className="mt-2">
      <span className="block font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary mb-3">
        Problem Solving Stats
      </span>
      <div className="flex flex-col gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[13px] text-dm-text-secondary">{stat.label}</span>
              <span className="font-mono font-medium text-[13px] text-dm-text-primary">{stat.value}</span>
            </div>
            <ProgressBar progress={stat.pct} color={stat.color} />
          </div>
        ))}
      </div>
    </div>
  );
}
