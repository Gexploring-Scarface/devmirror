import React from 'react';

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, icon, rightElement, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between pb-3 mb-4 border-b border-[rgba(255,255,255,0.08)] ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <div className="text-dm-info">{icon}</div>}
        <h2 className="font-sans font-semibold text-[15px] tracking-[0.01em] text-dm-text-primary">
          {title}
        </h2>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
}
