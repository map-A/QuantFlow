import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface DrawdownChartProps {
  data: any[];
}

const DrawdownChart: React.FC<DrawdownChartProps> = ({ data }) => {
  return (
    <div className="flex-1 p-4 flex flex-col bg-surface/10">
      <h3 className="text-xs font-bold text-text-muted mb-2">回撤分析</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
            <XAxis dataKey="day" hide />
            <YAxis 
              orientation="right" 
              tick={{fontSize: 10, fill: '#8B949E'}} 
              axisLine={false} 
              tickLine={false} 
            />
            <Tooltip contentStyle={{backgroundColor:'#161B22', borderColor:'#30363D'}} />
            <Area 
              type="step" 
              dataKey="drawdown" 
              stroke="#F6465D" 
              fill="#F6465D" 
              fillOpacity={0.2} 
              strokeWidth={1} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DrawdownChart;
