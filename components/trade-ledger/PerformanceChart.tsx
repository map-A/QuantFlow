import React from 'react';
import { Icons } from '../Icons';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface PerformanceChartProps {
  data: any[];
  trackingError: string;
  slippageLoss: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  trackingError, 
  slippageLoss 
}) => {
  return (
    <div className="col-span-12 lg:col-span-4 glass-panel rounded-2xl border border-border p-5 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      
      <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
        <Icons.Activity className="w-4 h-4 text-cyan" /> 
        仿真与实盘绩效对比
      </h3>
      
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} 
            />
            <Line 
              type="monotone" 
              dataKey="sim" 
              stroke="#2BC4A8" 
              strokeWidth={2} 
              dot={false} 
              name="SIM Equity" 
            />
            <Line 
              type="monotone" 
              dataKey="live" 
              stroke="#F6465D" 
              strokeWidth={2} 
              dot={false} 
              name="LIVE Equity" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-border/50 text-center relative z-10">
        <div>
          <div className="text-[9px] text-text-muted">追踪误差 (TE)</div>
          <div className="text-sm font-mono font-bold text-cyan">{trackingError}</div>
        </div>
        <div>
          <div className="text-[9px] text-text-muted">执行损耗</div>
          <div className="text-sm font-mono font-bold text-danger">{slippageLoss}</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
