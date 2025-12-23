import React from 'react';
import { ResponsiveContainer, AreaChart, Area, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Icons } from '../Icons';

interface TimelineDataPoint {
  date: string;
  score: number;
  limitUps: number;
}

interface SentimentTimelineProps {
  data: TimelineDataPoint[];
}

export const SentimentTimeline: React.FC<SentimentTimelineProps> = ({ data }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-border h-80 flex flex-col">
      <h3 className="text-xs font-bold text-text-muted uppercase mb-4 flex items-center gap-2">
        <Icons.Activity className="w-4 h-4 text-primary" /> 历史情绪趋势 (Sentiment History)
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px', fontSize: '11px' }}
            />
            <Area type="monotone" dataKey="score" stroke="#1F6FEB" fill="url(#scoreGrad)" strokeWidth={2} />
            <Bar dataKey="limitUps" fill="#F6465D" opacity={0.3} barSize={8} radius={[4, 4, 0, 0]} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
