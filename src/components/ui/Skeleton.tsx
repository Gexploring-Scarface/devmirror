import React from 'react';

export function Skeleton({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-dm-surface-2 rounded-md ${className}`}
      {...props}
    />
  );
}
