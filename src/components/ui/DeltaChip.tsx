import React from 'react';

interface DeltaChipProps {
  value: number;
  className?: string;
}

export function DeltaChip({ value, className = '' }: DeltaChipProps) {
  const isPositive = value > 0;
  const isZero = value === 0;

  let colorClass = 'text-dm-text-muted bg-dm-surface-2';
  if (isPositive) colorClass = 'text-dm-success bg-[rgba(34,197,94,0.1)]';
  if (value < 0) colorClass = 'text-dm-danger bg-[rgba(239,68,68,0.1)]';

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-sans font-semibold text-[12px] ${colorClass} ${className}`}>
      {isPositive && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>}
      {value < 0 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline></svg>}
      {isZero && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>}
      <span>
        {isPositive ? '+' : ''}{value}
      </span>
    </div>
  );
}
