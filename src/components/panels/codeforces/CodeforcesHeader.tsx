import React from 'react';
import { getCodeforcesRankColor } from '@/lib/utils/colorUtils';

export function CodeforcesHeader({ avatar, handle, rating, maxRating, rank }: any) {
  const color = getCodeforcesRankColor(rating);
  
  return (
    <>
      <div className="flex items-center h-[56px] mb-4">
        <div className="w-12 h-12 rounded-[8px] border-2 overflow-hidden shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col justify-center ml-3">
          <span className="font-mono font-semibold text-[16px]" style={{ color }}>{handle}</span>
          <span className="font-sans text-[13px] capitalize" style={{ color }}>{rank}</span>
        </div>
      </div>

      <div className="flex items-center h-[60px] bg-dm-surface-2 rounded-[12px] px-2 mb-4">
        {[
          { label: 'Rating', value: rating, color },
          { label: 'Max Rating', value: maxRating, color: getCodeforcesRankColor(maxRating) },
        ].map((stat, i) => (
          <React.Fragment key={stat.label}>
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.06em] text-dm-text-secondary mb-1">{stat.label}</span>
              <span className="font-mono font-semibold text-[20px]" style={{ color: stat.color }}>
                {stat.value}
              </span>
            </div>
            {i === 0 && <div className="w-[1px] h-[24px] bg-[rgba(255,255,255,0.08)]" />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
