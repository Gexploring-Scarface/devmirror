import React from 'react';

export function GitHubRecentActivity({ items = [] }: any) {
  return (
    <div className="flex flex-col">
      <span className="block font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary mb-3">
        Recent Activity
      </span>
      {(!items || items.length === 0) ? (
        <div className="flex-1 flex items-center justify-center border border-dashed border-[rgba(255,255,255,0.08)] rounded-[8px] min-h-[120px]">
          <span className="font-sans text-[12px] text-dm-text-muted">No recent activity</span>
        </div>
      ) : (
        <div className="flex flex-col gap-1 relative">
        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-[rgba(255,255,255,0.04)]" />
        
        {items.map((item: any, i: number) => (
          <a key={i} href={item.url} target="_blank" rel="noreferrer" className="relative flex items-start p-2 -mx-2 rounded-[6px] hover:bg-dm-surface-2 transition-colors group cursor-pointer z-10">
            <div className="mt-1 w-6 h-6 rounded-full bg-dm-surface-1 border-2 border-dm-bg-elevated flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-dm-github" />
            </div>
            <div className="ml-3 flex flex-col min-w-0">
              <span className="font-sans text-[13px] text-dm-text-primary group-hover:text-dm-github transition-colors truncate">
                {item.title}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-sans text-[11px] text-dm-text-muted truncate">{item.meta}</span>
                <span className="font-sans text-[11px] text-dm-text-secondary opacity-50 shrink-0">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      )}
    </div>
  );
}
