import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid } from 'recharts';

interface DecayChartProps {
  data: any[];
}

const DecayChart: React.FC<DecayChartProps> = ({ data }) => {
  return (
    <div className="col-span-1 h-56 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
      <span className="text-[10px] font-bold text-text-muted uppercase mb-4">因子衰减分析 (Decay)</span>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
          <XAxis dataKey="lag" tick={{fontSize: 9, fill: '#555'}} axisLine={false} />
          <Line type="monotone" dataKey="ic" stroke="#1F6FEB" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DecayChart;
