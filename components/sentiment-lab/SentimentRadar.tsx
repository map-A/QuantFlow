import React from 'react';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Icons } from '../Icons';

interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

interface SentimentRadarProps {
  data: RadarDataPoint[];
}

export const SentimentRadar: React.FC<SentimentRadarProps> = ({ data }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-border">
      <h3 className="w-full text-xs font-bold text-text-muted uppercase mb-4 flex items-center gap-2">
        <Icons.Target className="w-4 h-4 text-violet" /> 情绪因子透视
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#30363D" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 9 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar 
              name="Sentiment" 
              dataKey="A" 
              stroke="#1F6FEB" 
              fill="#1F6FEB" 
              fillOpacity={0.3} 
              dot={{ fill: '#1F6FEB', r: 3 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
