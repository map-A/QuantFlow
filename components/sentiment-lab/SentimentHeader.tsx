import React from 'react';
import { Icons } from '../Icons';

interface SentimentHeaderProps {
  regime: string;
  activeRange: string;
  onRangeChange: (range: string) => void;
}

export const SentimentHeader: React.FC<SentimentHeaderProps> = ({ regime, activeRange, onRangeChange }) => {
  const ranges = ['1D', '1W', '1M', '3M', 'ALL'];

  return (
    <div className="shrink-0 flex items-center justify-between gap-6 glass-panel p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1F6FEB 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Icons.Flame className="w-6 h-6 text-danger animate-pulse" />
            市场情绪实验室
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-success/10 text-success rounded-full text-[10px] font-bold border border-success/30">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
              正在运行 (Live)
            </span>
            <span className="text-[10px] text-text-muted font-mono">数据刷新: 2023-11-20 14:45:00</span>
          </div>
        </div>
        <div className="h-10 w-px bg-border/50" />
        <div className="flex flex-col">
          <span className="text-[10px] text-text-muted uppercase tracking-tighter">当前情绪周期</span>
          <span className="text-xl font-bold text-cyan">{regime}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {ranges.map(range => (
          <button 
            key={range}
            onClick={() => onRangeChange(range)}
            className={`px-3 py-1 text-xs font-bold rounded transition-all ${
              activeRange === range 
                ? 'bg-primary text-white shadow-glow-blue' 
                : 'text-text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            {range}
          </button>
        ))}
        <div className="h-8 w-px bg-border/50 mx-2" />
        <button className="p-2 text-text-muted hover:text-white rounded-lg border border-border">
          <Icons.Maximize className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
