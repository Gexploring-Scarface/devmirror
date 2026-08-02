'use client';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function LeetCodeStatsRing({ solved, available, contestData }: any) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: 'Easy', count: solved.easy, total: available.easy, color: '#2CBB5D' },
    { label: 'Medium', count: solved.medium, total: available.medium, color: '#FFC01E' },
    { label: 'Hard', count: solved.hard, total: available.hard, color: '#EF4743' },
  ];

  const totalSolved = solved.total || (solved.easy + solved.medium + solved.hard);
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  
  const easyDash = totalSolved > 0 ? (solved.easy / totalSolved) * circumference : 0;
  const medDash = totalSolved > 0 ? (solved.medium / totalSolved) * circumference : 0;
  const hardDash = totalSolved > 0 ? (solved.hard / totalSolved) * circumference : 0;

  return (
    <div className="flex flex-col mb-6">
      {contestData && (
        <div className="flex items-center justify-between mb-4">
          <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.06em] text-dm-text-secondary">
            Contest Rating
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans text-[11px] text-dm-text-muted">({contestData.badge || 'Contestant'})</span>
            <span className="font-mono font-bold text-[14px] text-dm-text-primary">{contestData.rating}</span>
            <span className="font-mono font-medium text-[11px] text-dm-success">+23</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-5">
        <div className="relative w-[84px] h-[84px] shrink-0">
          <svg width="84" height="84" className="transform -rotate-90">
            <circle cx="42" cy="42" r={radius} fill="none" stroke="var(--dm-bg-surface-2)" strokeWidth="4" />
            {/* Easy */}
            <circle cx="42" cy="42" r={radius} fill="none" stroke="#2CBB5D" strokeWidth="4" strokeDasharray={`${easyDash} ${circumference}`} strokeDashoffset="0" className="transition-all duration-1000 ease-out" strokeLinecap="round" />
            {/* Medium */}
            <circle cx="42" cy="42" r={radius} fill="none" stroke="#FFC01E" strokeWidth="4" strokeDasharray={`${medDash} ${circumference}`} strokeDashoffset={-easyDash} className="transition-all duration-1000 ease-out delay-100" strokeLinecap="round" />
            {/* Hard */}
            <circle cx="42" cy="42" r={radius} fill="none" stroke="#EF4743" strokeWidth="4" strokeDasharray={`${hardDash} ${circumference}`} strokeDashoffset={-(easyDash + medDash)} className="transition-all duration-1000 ease-out delay-200" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono font-semibold text-[18px] leading-none text-dm-text-primary">{totalSolved}</span>
            <span className="font-sans text-[10px] text-dm-text-secondary mt-1">Solved</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {stats.map((diff) => (
            <div key={diff.label} className="flex items-center justify-between w-full h-[24px]">
              <span className="font-sans font-medium text-[12px] w-[50px]" style={{ color: diff.color }}>{diff.label}</span>
              <div className="flex-1 px-3 flex items-center">
                {/* Minimalist bar representation similar to screenshot? The screenshot has no bar, just the numbers next to it, but maybe it had a very subtle bar or I should just drop the bar */}
                <div className="w-full bg-[rgba(255,255,255,0.04)] h-[2px] rounded-full overflow-hidden">
                   <div className="h-full rounded-full" style={{ width: `${(diff.count/diff.total)*100}%`, backgroundColor: diff.color }} />
                </div>
              </div>
              <div className="flex items-baseline gap-1 shrink-0">
                <span className="font-mono font-semibold text-[13px] text-dm-text-primary">{diff.count}</span>
                <span className="font-sans text-[11px] text-dm-text-muted">/{diff.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
