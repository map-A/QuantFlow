import React from 'react';
import { ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, Cell, CartesianGrid, Area } from 'recharts';
import { Candle } from '../types';

interface ChartProps {
  data: Candle[];
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ data, height = 400 }) => {
  return (
    <div style={{ width: '100%', height }} className="relative group">
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#8B949E', fontSize: 10 }} 
            tickLine={false}
            axisLine={false}
            minTickGap={50}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            orientation="right" 
            tick={{ fill: '#8B949E', fontSize: 10 }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `¥${value.toFixed(0)}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
            itemStyle={{ color: '#E6EDF3' }}
            labelStyle={{ color: '#8B949E', marginBottom: '0.5rem' }}
            formatter={(value: number) => [`¥${value.toFixed(2)}`, '价格']}
          />
           <Bar 
            dataKey="volume" 
            yAxisId={0} 
            fill="#30363D" 
            opacity={0.3} 
            barSize={4}
          />
          <Area 
            type="monotone" 
            dataKey="close" 
            stroke="#1F6FEB" 
            fillOpacity={1} 
            fill="url(#colorClose)" 
            strokeWidth={2}
          />
          {/* Add a glowing dot at the end */}
          <Cell /> 
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;