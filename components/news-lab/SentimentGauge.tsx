import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface SentimentGaugeProps {
  value: number;
  label: string;
  color: string;
}

export const SentimentGauge: React.FC<SentimentGaugeProps> = ({ value, label, color }) => {
  const data = [{ name: 'val', value: value, fill: color }];
  
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={6} data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: '#30363D' }} dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-white leading-none">{value}%</span>
        <span className="text-[8px] text-text-muted mt-1 uppercase scale-75 tracking-tighter">{label}</span>
      </div>
    </div>
  );
};
