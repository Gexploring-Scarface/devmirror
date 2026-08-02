import React from 'react';

export function CodeforcesRecentContests({ items = [] }: any) {
  return (
    <div className="flex flex-col">
      <span className="block font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary mb-3">
        Recent Contests
      </span>
      <div className="flex flex-col gap-2">
        {items.map((item: any, i: number) => {
          const isUp = item.delta >= 0;
          return (
            <div key={i} className="flex flex-col p-2.5 rounded-[8px] border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group">
              <span className="font-sans font-medium text-[12px] text-dm-text-primary group-hover:text-dm-info transition-colors truncate mb-1">
                {item.name}
              </span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-sans text-[11px] text-dm-text-muted">Rank {item.rank}</span>
                <span className={`font-mono text-[11px] font-medium ${isUp ? 'text-dm-success' : 'text-dm-danger'}`}>
                  {isUp ? '+' : ''}{item.delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
