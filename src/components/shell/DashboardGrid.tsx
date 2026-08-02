import React from 'react';

interface DashboardGridProps {
  children: React.ReactNode;
}

export function DashboardGrid({ children }: DashboardGridProps) {
  return (
    <div className="max-w-[1680px] mx-auto px-4 md:px-6 mt-6 mb-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-5">
        {children}
      </div>
    </div>
  );
}
