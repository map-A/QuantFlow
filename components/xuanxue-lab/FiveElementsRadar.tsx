import React from 'react';
import { Icons } from '../Icons';
import { FiveElement, CulturalDate } from './types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface FiveElementsRadarProps {
  data: FiveElement[];
  season: string;
  interpretation?: string;
}

export const FiveElementsRadar: React.FC<FiveElementsRadarProps> = ({ 
  data, 
  season,
  interpretation = "火元素偏旺，对应今日'甲辰'地气上升。象征市场情绪波动可能在午后放大，建议规避高频噪音。"
}) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-border/50 flex flex-col h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
          <Icons.Clock className="w-4 h-4 text-cyan" /> 今日市场 · 天时
        </h3>
        <span className="text-[10px] text-cyan font-mono font-bold">节气：{season}</span>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#30363D" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar 
              name="Balance" 
              dataKey="A" 
              stroke="#2BC4A8" 
              fill="#2BC4A8" 
              fillOpacity={0.15} 
              dot={{ fill: '#2BC4A8', r: 3 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-3 bg-cyan/5 border border-cyan/20 rounded-xl">
        <p className="text-xs text-text-muted leading-relaxed italic">
          "<span className="text-cyan font-bold">火元素</span>{interpretation.substring(4)}"
        </p>
      </div>
    </div>
  );
};
