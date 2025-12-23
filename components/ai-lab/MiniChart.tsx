import React from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell } from 'recharts';
import { ChartDataPoint } from './types';

interface MiniChartProps {
  data: ChartDataPoint[];
  color: string;
  type?: 'area' | 'bar';
}

export const MiniChart: React.FC<MiniChartProps> = ({ data, color, type = 'area' }) => (
  <ResponsiveContainer width="100%" height="100%">
    {type === 'area' ? (
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={color} fill={`url(#grad-${color})`} strokeWidth={2} isAnimationActive={true} />
      </AreaChart>
    ) : (
      <BarChart data={data}>
        <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#F6465D' : '#2EBD85'} />
          ))}
        </Bar>
      </BarChart>
    )}
  </ResponsiveContainer>
);
