import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

interface ConfidenceGaugeProps {
  score: number;
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({ score }) => {
  const data = [{ name: 'score', value: score, fill: '#2BC4A8' }];
  
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={8} data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: '#30363D' }} dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan">
        <span className="text-xl font-bold font-mono">{score}</span>
        <span className="text-[9px] uppercase tracking-wider text-text-muted">AI Score</span>
      </div>
    </div>
  );
};
