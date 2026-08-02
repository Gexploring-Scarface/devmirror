'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', rating: 1600 },
  { name: 'Feb', rating: 1680 },
  { name: 'Mar', rating: 1720 },
  { name: 'Apr', rating: 1690 },
  { name: 'May', rating: 1810 },
  { name: 'Jun', rating: 1912 },
  { name: 'Jul', rating: 1842 },
];

export function CodeChefRatingGraph() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[160px] bg-dm-surface-2 rounded-[8px] animate-pulse mb-6" />;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#181B22]/90 backdrop-blur-md border border-[rgba(255,255,255,0.08)] p-3 rounded-[8px] shadow-lg">
          <p className="font-sans text-[12px] text-dm-text-secondary mb-1">{payload[0].payload.name}</p>
          <p className="font-mono text-[14px] font-bold text-dm-codechef">
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[160px] w-full mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" stroke="var(--dm-text-muted)" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--dm-text-muted)" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--dm-text-muted)', strokeWidth: 1, strokeDasharray: '3 3' }} />
          
          <Line 
            type="monotone" 
            dataKey="rating" 
            stroke="var(--dm-codechef)" 
            strokeWidth={2} 
            dot={(props: any) => {
              const { cx, cy } = props;
              return (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4} fill="var(--dm-codechef)" stroke="var(--dm-bg-surface-1)" strokeWidth={1.5} />
              );
            }}
            activeDot={{ r: 6, strokeWidth: 0 }} 
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
