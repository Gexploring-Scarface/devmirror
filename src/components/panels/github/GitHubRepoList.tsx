import React from 'react';

export function GitHubRepoList({ repos = [] }: any) {
  return (
    <div className="flex flex-col">
      <span className="block font-sans font-semibold text-[12px] uppercase tracking-[0.06em] text-dm-text-secondary mb-3">
        Top Repositories
      </span>
      {(!repos || repos.length === 0) ? (
        <div className="flex-1 flex items-center justify-center border border-dashed border-[rgba(255,255,255,0.08)] rounded-[8px] min-h-[120px]">
          <span className="font-sans text-[12px] text-dm-text-muted">No public repositories</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
        {repos.map((repo: any, i: number) => (
          <div key={i} className="flex flex-col p-3 rounded-[8px] border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-sans font-medium text-[13px] text-dm-text-primary group-hover:text-dm-github transition-colors truncate pr-2">
                {repo.name}
              </span>
              <div className="flex items-center gap-1 text-dm-text-muted shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span className="font-mono text-[11px]">{repo.stars}</span>
              </div>
            </div>
            <p className="font-sans text-[11px] text-dm-text-muted line-clamp-1 mb-2">
              {repo.desc}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }} />
              <span className="font-sans text-[10px] text-dm-text-secondary">{repo.lang}</span>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
