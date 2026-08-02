'use client';

import React, { useEffect, useState, useRef } from 'react';

interface HeatmapProps {
  data?: number[];
  colorScale: string[]; // Array of 5 colors from lowest to highest
  className?: string;
}

export function Heatmap({ data = [], colorScale, className = '' }: HeatmapProps) {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
    // Use a timeout to ensure rendering is complete before scrolling
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
      }
    }, 0);
  }, []);

  const displayData = data.length === 364 ? data : Array.from({ length: 364 }).fill(0) as number[];

  if (!mounted) {
    return (
      <div className={`overflow-x-auto scrollbar-hide w-full ${className}`}>
        <div className="flex gap-[3px] min-w-max pb-1">
        {Array.from({ length: 52 }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <div key={rowIndex} className="w-[10px] h-[10px] rounded-[2px] bg-[var(--dm-bg-surface-2)] animate-pulse" />
            ))}
          </div>
        ))}
      </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className={`overflow-x-auto scrollbar-hide w-full ${className}`}>
      <div className="flex gap-[3px] min-w-max pb-1">
      {Array.from({ length: 52 }).map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-[3px]">
          {Array.from({ length: 7 }).map((_, rowIndex) => {
            const index = colIndex * 7 + rowIndex;
            const level = displayData[index] || 0;
            const color = colorScale[level] || colorScale[0];
            return (
              <div 
                key={rowIndex} 
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      ))}
      </div>
    </div>
  );
}
