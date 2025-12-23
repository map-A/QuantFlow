import React from 'react';
import { Icons } from '../Icons';
import { GlassCard } from './GlassCard';
import { MiniChart } from './MiniChart';
import { ChartDataPoint, NewsItem } from './types';

interface AnalysisCardProps {
  data: ChartDataPoint[];
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  chartType?: 'area' | 'bar';
  stats?: { label: string; value: string; color?: string }[];
  news?: NewsItem[];
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({
  data,
  title,
  icon: Icon,
  color,
  chartType = 'area',
  stats,
  news
}) => {
  return (
    <GlassCard className="h-[320px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <div className={`p-1.5 rounded bg-${color}/10 text-${color} border border-${color}/20`}>
            <Icon className="w-4 h-4" />
          </div>
          {title}
        </h3>
      </div>
      
      <div className="flex-1 relative w-full min-h-0 bg-surface/30 rounded-lg border border-white/5 p-2 overflow-hidden">
        <MiniChart data={data} color={color === 'violet' ? '#C084FC' : '#2BC4A8'} type={chartType} />
      </div>
      
      {stats && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          {stats.map((stat, i) => (
            <div key={i} className="p-2.5 bg-white/5 rounded border border-white/5">
              <div className="text-text-muted mb-1 flex items-center gap-1">
                {stat.label}
              </div>
              <div className={`font-bold tracking-wide ${stat.color || 'text-white'}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {news && (
        <div className="mt-4 space-y-3">
          {news.slice(0, 2).map((item, i) => (
            <div key={i} className="flex gap-3 items-start p-2.5 bg-surface/30 rounded-lg">
              <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                item.sentiment === 'positive' ? 'bg-success' : 'bg-text-muted'
              }`}></div>
              <div>
                <p className="text-sm text-text-main leading-snug">{item.title}</p>
                <p className="text-[10px] text-text-muted mt-1 font-mono">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};
