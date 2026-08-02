'use client';
import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string; // CSS variable or tailwind color
  height?: string;
  className?: string;
}

export function ProgressBar({ progress, color = 'var(--dm-info)', height = '3px', className = '' }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate on mount
    const timer = setTimeout(() => setWidth(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className={`w-full bg-dm-surface-2 rounded-full overflow-hidden ${className}`} style={{ height }}>
      <div 
        className="h-full rounded-full transition-all duration-700 ease-out" 
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    </div>
  );
}
