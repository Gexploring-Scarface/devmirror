import React from 'react';

export function GitHubHeader({ avatar, handle, followers, following, stars, contributions }: any) {
  return (
    <>
      <div className="flex items-center h-[56px] mb-4">
        <div className="w-12 h-12 rounded-[8px] bg-dm-surface-2 overflow-hidden shrink-0 border border-[rgba(255,255,255,0.08)]">
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col justify-center ml-3 flex-1">
          <span className="font-mono font-semibold text-[16px] text-dm-text-primary">{handle}</span>
          <span className="font-sans text-[13px] text-dm-text-secondary truncate">Open source enthusiast</span>
        </div>
      </div>

      <div className="flex items-center justify-between h-[60px] bg-dm-surface-2 rounded-[12px] px-2 mb-6">
        {[
          { label: 'Followers', value: followers },
          { label: 'Following', value: following },
          { label: 'Stars', value: stars },
        ].map((stat, i) => (
          <React.Fragment key={stat.label}>
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.06em] text-dm-text-secondary mb-1">{stat.label}</span>
              <span className="font-mono font-semibold text-[16px] text-dm-text-primary">
                {stat.value.toLocaleString()}
              </span>
            </div>
            {i < 2 && <div className="w-[1px] h-[24px] bg-[rgba(255,255,255,0.08)]" />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
