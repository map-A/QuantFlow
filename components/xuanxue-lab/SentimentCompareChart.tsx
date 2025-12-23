import React from 'react';
import { Icons } from '../Icons';
import { SentimentCompareData } from './types';
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface SentimentCompareChartProps {
  data: SentimentCompareData[];
  alignment?: 'ALIGN' | 'DIVERGE' | 'NEUTRAL';
  interpretation?: string;
}

export const SentimentCompareChart: React.FC<SentimentCompareChartProps> = ({ 
  data,
  alignment = 'ALIGN',
  interpretation = '当文化隐喻与量化情绪走势趋同时，往往预示着群体心理层面的共振较为扎实。'
}) => {
  const alignmentConfig = {
    ALIGN: { label: '一致 (ALIGN)', color: 'text-success', bg: 'bg-success/10' },
    DIVERGE: { label: '分歧 (DIVERGE)', color: 'text-danger', bg: 'bg-danger/10' },
    NEUTRAL: { label: '中性 (NEUTRAL)', color: 'text-text-muted', bg: 'bg-surface' }
  }[alignment];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-border/50 flex flex-col h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
          <Icons.Activity className="w-4 h-4 text-violet" /> 文化视角 × 市场情绪
        </h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 ${alignmentConfig.bg} ${alignmentConfig.color} rounded`}>
          {alignmentConfig.label}
        </span>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip contentStyle={{backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px'}} />
            <Area 
              type="monotone" 
              dataKey="quant" 
              stroke="#1F6FEB" 
              fill="#1F6FEB" 
              fillOpacity={0.1} 
              strokeWidth={2} 
              name="量化情绪" 
            />
            <Line 
              type="monotone" 
              dataKey="cultural" 
              stroke="#2BC4A8" 
              dot={false} 
              strokeWidth={2} 
              name="文化隐喻" 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-text-muted mt-4 leading-snug">
        {interpretation.includes('文化隐喻') ? interpretation : (
          <>当<span className="text-cyan font-bold">文化隐喻</span>与<span className="text-primary font-bold">量化情绪</span>{interpretation}</>
        )}
      </p>
    </div>
  );
};
