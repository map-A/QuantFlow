import React from 'react';
import { Icons } from '../Icons';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BacktestDataPoint } from './types';

interface SentimentHeaderProps {
  sentimentScore: number;
  activeRegime: string;
  trendData: BacktestDataPoint[];
  globalEnable: boolean;
  onToggleGlobal: () => void;
  onApplySettings: () => void;
}

export const SentimentHeader: React.FC<SentimentHeaderProps> = ({
  sentimentScore,
  activeRegime,
  trendData,
  globalEnable,
  onToggleGlobal,
  onApplySettings,
}) => {
  return (
    <div className="h-24 shrink-0 glass-panel rounded-2xl border border-primary/20 bg-primary/5 px-6 flex items-center justify-between z-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan/10 opacity-50"></div>
      
      <div className="flex items-center gap-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-glow-blue">
            <Icons.Flame className="w-8 h-8 text-danger animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              市场情绪条件控制 <span className="text-[10px] text-text-muted font-normal bg-surface px-2 py-0.5 rounded border border-border">Sentiment Adaptive</span>
            </h1>
            <div className="flex items-center gap-4 mt-1 font-mono">
              <span className="text-2xl font-bold text-cyan">{sentimentScore} <span className="text-xs font-normal text-text-muted">PTS</span></span>
              <div className="h-4 w-px bg-border"></div>
              <span className="text-sm font-bold text-cyan px-2 py-0.5 bg-cyan/10 rounded">Regime: {activeRegime}</span>
            </div>
          </div>
        </div>
        
        <div className="h-12 w-px bg-border/50"></div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-text-muted uppercase font-bold">情绪趋势 (60D)</span>
          <div className="w-48 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <Area type="monotone" dataKey="sentiment" stroke="#2BC4A8" fill="#2BC4A8" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 relative z-10">
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] text-text-muted font-bold uppercase">Global Sentiment Filter</span>
          <button 
            onClick={onToggleGlobal}
            className={`w-12 h-6 rounded-full relative transition-all ${globalEnable ? 'bg-primary' : 'bg-surface border border-border'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${globalEnable ? 'left-7 shadow-glow-blue' : 'left-1'}`} />
          </button>
        </div>
        <button 
          onClick={onApplySettings}
          className="px-6 py-2.5 bg-gradient-to-r from-primary to-cyan text-white rounded-xl text-sm font-bold shadow-glow-blue hover:brightness-110 transition-all flex items-center gap-2"
        >
          <Icons.Save className="w-4 h-4" />
          应用设置
        </button>
      </div>
    </div>
  );
};
