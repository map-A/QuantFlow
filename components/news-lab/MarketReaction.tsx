import React from 'react';
import { Icons } from '../Icons';
import { ReactionDataPoint } from './types';
import { Section } from './Section';
import { ResponsiveContainer, ComposedChart, Area, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';

interface MarketReactionProps {
  data: ReactionDataPoint[];
  metrics?: {
    responseTime: string;
    maxImpact: string;
    volumeRatio: string;
    arbitrageSpace: string;
  };
}

export const MarketReaction: React.FC<MarketReactionProps> = ({ 
  data,
  metrics = {
    responseTime: '1.2 Min',
    maxImpact: '+4.82%',
    volumeRatio: '7.5x',
    arbitrageSpace: '0.45%'
  }
}) => {
  return (
    <Section 
      title="市场分钟级脉动 (Reaction Monitor)" 
      icon={Icons.Zap} 
      className="flex-1"
      extra={
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan" /> 价格反应
          </span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded bg-surface border border-border" /> 异常放量
          </span>
        </div>
      }
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 bg-surface/20 rounded-xl border border-border p-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2BC4A8" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2BC4A8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis yAxisId="left" hide domain={['auto', 'auto']} />
              <YAxis yAxisId="right" hide domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} />
              <Area yAxisId="left" type="monotone" dataKey="price" stroke="#2BC4A8" fill="url(#priceGrad)" strokeWidth={2} isAnimationActive={false} />
              <Bar yAxisId="right" dataKey="volume" barSize={4} radius={[2, 2, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.volume > 100 ? '#F6465D' : '#30363D'} opacity={0.5} />
                ))}
              </Bar>
              <ReferenceLine yAxisId="left" x={20} stroke="#F6465D" strokeDasharray="3 3" label={{ position: 'top', value: 'News Trigger', fill: '#F6465D', fontSize: 9 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4 px-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted">响应时长</span>
            <span className="text-sm font-bold text-white font-mono">{metrics.responseTime}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted">最大冲击幅</span>
            <span className="text-sm font-bold text-success font-mono">{metrics.maxImpact}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted">成交倍率</span>
            <span className="text-sm font-bold text-yellow-500 font-mono">{metrics.volumeRatio}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-muted">套利空间</span>
            <span className="text-sm font-bold text-cyan font-mono">{metrics.arbitrageSpace}</span>
          </div>
        </div>
      </div>
    </Section>
  );
};
