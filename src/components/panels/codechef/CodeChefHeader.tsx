import React from 'react';
import { Star } from 'lucide-react';

export function CodeChefHeader({ avatar, handle, stars, rating, highestRating, globalRank }: any) {
  const starCount = parseInt(stars) || 1;
  return (
    <>
      <div className="flex items-center h-[56px] mb-4">
        <div className="w-12 h-12 rounded-[8px] border-2 border-[rgba(91,70,54,0.5)] overflow-hidden shrink-0">
          <img src={avatar || "https://cdn.codechef.com/sites/all/themes/abessive/images/user_default_thumb.jpg"} alt="Avatar" className="w-full h-full object-cover bg-dm-surface-2" />
        </div>
        
        <div className="flex flex-col justify-center ml-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-[16px] text-dm-text-primary">{handle}</span>
            <div className="flex items-center justify-center bg-[#F47820] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[4px]">
              {stars}
            </div>
          </div>
          <span className="font-sans text-[13px] text-dm-text-secondary">Developer</span>
        </div>
      </div>

      <div className="flex items-center h-[60px] bg-dm-surface-2 rounded-[12px] px-2 mb-4">
        {[
          { label: 'Current Rating', value: rating, color: 'var(--dm-codechef)' },
          { label: 'Highest Rating', value: highestRating, color: 'var(--dm-text-primary)' },
          { label: 'Global Rank', value: globalRank, color: 'var(--dm-text-primary)' },
        ].map((stat, i) => (
          <React.Fragment key={stat.label}>
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.06em] text-dm-text-secondary mb-1">{stat.label}</span>
              <span className={`font-mono font-semibold ${typeof stat.value === 'string' ? 'text-[14px]' : 'text-[20px]'}`} style={{ color: stat.color }}>
                {stat.value}
              </span>
            </div>
            {i < 2 && <div className="w-[1px] h-[24px] bg-[rgba(255,255,255,0.08)]" />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
