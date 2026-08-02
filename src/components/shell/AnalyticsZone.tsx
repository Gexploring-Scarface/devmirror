import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Activity, Code, Target, Award } from 'lucide-react';

export function AnalyticsZone() {
  return (
    <div className="max-w-[1680px] mx-auto px-4 md:px-6 mb-12">
      <h2 className="font-sans font-semibold text-[18px] text-dm-text-primary mb-4">Unified Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Problems Solved', value: '2,563', trend: '+14 this week', icon: <Code size={20} className="text-dm-info" /> },
          { label: 'Current Streak', value: '42 Days', trend: 'Personal Best: 84', icon: <Activity size={20} className="text-dm-success" /> },
          { label: 'Global Rank Percentile', value: 'Top 8%', trend: 'Up from 11%', icon: <Target size={20} className="text-dm-leetcode" /> },
          { label: 'Achievements', value: '14', trend: 'Next: 50 Day Streak', icon: <Award size={20} className="text-dm-codechef" /> },
        ].map((insight, i) => (
          <GlassCard key={i} elevated className="flex flex-col p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-[8px] bg-dm-surface-2 flex items-center justify-center">
                {insight.icon}
              </div>
              <span className="font-sans font-medium text-[13px] text-dm-text-secondary">{insight.label}</span>
            </div>
            <span className="font-mono font-semibold text-[24px] text-dm-text-primary mb-1">{insight.value}</span>
            <span className="font-sans text-[12px] text-dm-success">{insight.trend}</span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
