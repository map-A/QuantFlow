import React from 'react';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

interface FactorRadarChartProps {
  data: any[];
}

const FactorRadarChart: React.FC<FactorRadarChartProps> = ({ data }) => {
  return (
    <div className="flex h-[350px] items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#30363D" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar 
            name="Exposure" 
            dataKey="A" 
            stroke="#2BC4A8" 
            strokeWidth={2} 
            fill="#2BC4A8" 
            fillOpacity={0.3} 
          />
          <Tooltip contentStyle={{backgroundColor:'#161B22', borderColor:'#30363D'}} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FactorRadarChart;
