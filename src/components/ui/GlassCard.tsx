import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  elevated?: boolean;
}

export function GlassCard({ children, elevated = false, className = '', ...props }: GlassCardProps) {
  return (
    <div
      className={`
        rounded-lg
        bg-dm-surface-1
        relative
        overflow-hidden
        p-4 md:p-6
        border border-[rgba(255,255,255,0.08)]
        shadow-[0_1px_2px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.35)]
        before:absolute before:inset-0 before:bg-[rgba(255,255,255,0.035)] before:backdrop-blur-[18px] before:pointer-events-none
        ${elevated ? 'hover:-translate-y-[2px] hover:border-[rgba(255,255,255,0.14)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.35),0_16px_40px_rgba(0,0,0,0.5)] transition-all duration-200' : ''}
        ${className}
      `}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
