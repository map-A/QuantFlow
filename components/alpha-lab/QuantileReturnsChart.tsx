import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import CardMenu from './CardMenu';

interface QuantileReturnsChartProps {
  data: any[];
}

const QuantileReturnsChart: React.FC<QuantileReturnsChartProps> = ({ data }) => {
  return (
    <div className="col-span-1 h-64 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold text-text-muted uppercase">分位数收益 (Quantiles)</span>
        <CardMenu onAction={() => {}} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="group" tick={{fontSize: 8, fill: '#8B949E'}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize: 9, fill: '#555'}} axisLine={false} tickLine={false} />
          <Bar dataKey="return" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuantileReturnsChart;
