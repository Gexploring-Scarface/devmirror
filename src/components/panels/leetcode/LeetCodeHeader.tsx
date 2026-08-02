import React from 'react';

export function LeetCodeHeader({ avatar, handle, ranking, contestData }: any) {
  return (
    <>
      <div className="flex items-center justify-between h-[56px] mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-[8px] bg-dm-surface-2 overflow-hidden shrink-0">
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex flex-col justify-center ml-3">
            <span className="font-mono font-semibold text-[16px] text-dm-text-primary">{handle}</span>
            <span className="font-sans text-[13px] text-dm-text-secondary">Rank {ranking?.toLocaleString()}</span>
          </div>
        </div>
        
        {contestData && (
          <div className="flex items-center justify-center px-3 py-1 rounded-[6px] border border-[rgba(255,161,22,0.3)] bg-[rgba(255,161,22,0.1)]">
            <span className="font-sans font-semibold text-[11px] text-dm-leetcode">Top {Math.round(contestData.topPercentage)}%</span>
          </div>
        )}
      </div>
    </>
  );
}
