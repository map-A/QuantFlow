import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

interface EquityCurveChartProps {
  data: any[];
}

const EquityCurveChart: React.FC<EquityCurveChartProps> = ({ data }) => {
  return (
    <div className="flex-[2] p-4 border-r border-border flex flex-col">
      <div className="flex justify-between mb-2">
        <h3 className="text-xs font-bold text-text-muted">净值曲线</h3>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStrategy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2BC4A8" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2BC4A8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
            <XAxis dataKey="day" hide />
            <YAxis 
              orientation="right" 
              tick={{fontSize: 10, fill: '#8B949E'}} 
              axisLine={false} 
              tickLine={false} 
              domain={['auto', 'auto']} 
            />
            <Tooltip contentStyle={{backgroundColor:'#161B22', borderColor:'#30363D'}} />
            <Area 
              type="monotone" 
              dataKey="strategy" 
              stroke="#2BC4A8" 
              strokeWidth={2} 
              fill="url(#colorStrategy)" 
            />
            <Line 
              type="monotone" 
              dataKey="benchmark" 
              stroke="#555" 
              strokeWidth={1} 
              dot={false} 
              strokeDasharray="3 3" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EquityCurveChart;
