import React from 'react';
import { Icons } from '../Icons';
import { MarketMood } from './types';

interface NewsHeaderProps {
  marketMood: MarketMood;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onHistoryClick?: () => void;
}

const FILTERS = ['ALL', 'POLICY', 'EARNINGS', 'MACRO', 'RISK'];

export const NewsHeader: React.FC<NewsHeaderProps> = ({
  marketMood,
  activeFilter,
  onFilterChange,
  onHistoryClick,
}) => {
  return (
    <div className="h-16 shrink-0 glass-panel rounded-xl border border-primary/20 bg-primary/5 px-6 flex items-center justify-between z-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan/10 opacity-30"></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icons.Activity className="w-6 h-6 text-primary shadow-glow-blue" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-pulse border-2 border-background" />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            实时新闻分析实验室 <span className="text-[10px] text-text-muted font-normal bg-surface px-2 py-0.5 rounded border border-border">News Alpha Engine</span>
          </h1>
        </div>
        
        <div className="h-8 w-px bg-border/50"></div>

        <div className="flex items-center gap-2 bg-surface/40 p-1 rounded-lg border border-border/30">
          {FILTERS.map(f => (
            <button 
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${
                activeFilter === f ? 'bg-primary text-white' : 'text-text-muted hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <div className="flex items-center gap-3 bg-surface/60 border border-border/50 rounded-lg px-3 py-1.5">
          <span className="text-[10px] text-text-muted uppercase">Market Mood:</span>
          <span className={`text-xs font-bold flex items-center gap-1 ${
            marketMood.trend === 'up' ? 'text-success' : marketMood.trend === 'down' ? 'text-danger' : 'text-text-muted'
          }`}>
            {marketMood.mood} 
            {marketMood.trend === 'up' && <Icons.Up className="w-3 h-3" />}
            {marketMood.trend === 'down' && <Icons.Down className="w-3 h-3" />}
          </span>
          <div className="h-3 w-px bg-border/50"></div>
          <span className="text-xs font-mono text-cyan">Index: {marketMood.index}</span>
        </div>
        <button 
          onClick={onHistoryClick}
          className="p-2 text-text-muted hover:text-white border border-border/50 rounded-lg bg-surface/30"
        >
          <Icons.History className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
