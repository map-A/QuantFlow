import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import CardMenu from './CardMenu';

interface ICSeriesChartProps {
  data: any[];
}

const ICSeriesChart: React.FC<ICSeriesChartProps> = ({ data }) => {
  return (
    <div className="col-span-2 h-64 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold text-text-muted uppercase">IC / Rank IC 稳定性</span>
        <CardMenu onAction={() => {}} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="icG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
          <XAxis dataKey="date" hide />
          <YAxis tick={{fontSize: 9, fill: '#555'}} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px'}} />
          <Area type="monotone" dataKey="ic" stroke="#1F6FEB" fill="url(#icG)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="rankIc" stroke="#2BC4A8" dot={false} strokeWidth={1} strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ICSeriesChart;
