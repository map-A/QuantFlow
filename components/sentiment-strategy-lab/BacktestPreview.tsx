import React from 'react';
import { Icons } from '../Icons';
import { BacktestDataPoint } from './types';
import { Panel } from './Panel';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface BacktestPreviewProps {
  data: BacktestDataPoint[];
  performanceMetrics?: {
    lowSentiment: number;
    neutral: number;
    highSentiment: number;
  };
  overfittingRisk?: number;
}

export const BacktestPreview: React.FC<BacktestPreviewProps> = ({ 
  data,
  performanceMetrics = { lowSentiment: 12.4, neutral: 24.2, highSentiment: 48.5 },
  overfittingRisk = 0.02
}) => {
  return (
    <Panel title="情绪分区回测预览" icon={Icons.Activity}>
      <div className="flex flex-col h-full gap-4">
        <div className="flex-1 min-h-[180px] bg-surface/30 rounded-xl border border-border p-2 relative overflow-hidden">
          <div className="absolute top-2 left-2 text-[10px] text-text-muted z-10 font-bold uppercase tracking-widest">
            Equity Curve vs Regime
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} 
                labelStyle={{ marginBottom: 4 }}
              />
              <Area type="monotone" dataKey="strategy" stroke="#1F6FEB" fill="#1F6FEB" fillOpacity={0.05} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="benchmark" stroke="#555" dot={false} strokeWidth={1} strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Performance by Regime</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-danger/10 border border-danger/20 rounded-lg">
              <div className="text-[9px] text-text-muted mb-1">Low Sent</div>
              <div className="text-xs font-bold text-danger">+{performanceMetrics.lowSentiment}%</div>
            </div>
            <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="text-[9px] text-text-muted mb-1">Neutral</div>
              <div className="text-xs font-bold text-primary">+{performanceMetrics.neutral}%</div>
            </div>
            <div className="p-2 bg-cyan/10 border border-cyan/20 rounded-lg">
              <div className="text-[9px] text-text-muted mb-1">High Sent</div>
              <div className="text-xs font-bold text-cyan">+{performanceMetrics.highSentiment}%</div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-surface border border-border rounded-xl flex items-center justify-between">
          <span className="text-[10px] text-text-muted">Overfitting Risk</span>
          <span className="text-[10px] font-bold text-success font-mono uppercase">
            Safe ({overfittingRisk.toFixed(2)})
          </span>
        </div>
      </div>
    </Panel>
  );
};
