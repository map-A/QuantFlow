import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts';
import CardMenu from './CardMenu';

interface DistributionChartProps {
  data: any[];
}

const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  return (
    <div className="col-span-1 h-64 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold text-text-muted uppercase">因子分布直方图</span>
        <CardMenu onAction={() => {}} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
          <XAxis dataKey="bin" tick={{fontSize: 8, fill: '#555'}} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{backgroundColor: '#161B22', fontSize: '10px'}} />
          <Area type="step" dataKey="count" stroke="#C084FC" fill="#C084FC" fillOpacity={0.1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistributionChart;
