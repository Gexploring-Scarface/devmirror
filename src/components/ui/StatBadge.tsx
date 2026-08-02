import React from 'react';

interface StatBadgeProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatBadge({ label, value, icon, className = '' }: StatBadgeProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-dm-text-secondary text-xs font-semibold uppercase tracking-[0.06em] font-sans mb-1">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {icon && <span className="text-dm-text-muted">{icon}</span>}
        <span className="text-dm-text-primary text-xl font-mono font-semibold">
          {value}
        </span>
      </div>
    </div>
  );
}
