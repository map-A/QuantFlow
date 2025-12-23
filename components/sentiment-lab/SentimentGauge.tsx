import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SentimentGaugeProps {
  score: number;
}

export const SentimentGauge: React.FC<SentimentGaugeProps> = ({ score }) => {
  const getColor = (score: number) => {
    if (score > 60) return '#2BC4A8';
    if (score > 40) return '#1F6FEB';
    return '#F6465D';
  };

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[{ value: 100 }]}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#161B22"
            stroke="none"
            dataKey="value"
            startAngle={180}
            endAngle={0}
          />
          <Pie
            data={[{ value: score }, { value: 100 - score }]}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            dataKey="value"
            startAngle={180}
            endAngle={180 - (1.8 * score)}
            stroke="none"
          >
            <Cell fill={getColor(score)} />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <span className="text-5xl font-mono font-bold text-white drop-shadow-[0_0_15px_rgba(43,196,168,0.5)]">
          {score}
        </span>
        <span className="text-xs text-text-muted mt-2 tracking-widest uppercase">Sentiment Index</span>
      </div>
    </div>
  );
};
