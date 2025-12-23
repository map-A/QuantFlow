import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface VolumeChartProps {
  data: any[];
}

const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  return (
    <div className="flex-[2] min-h-0 border-b border-border/30 relative">
      <div className="absolute top-1 left-2 text-[10px] text-text-muted font-bold">
        VOL / 资金流
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 60, left: 10, bottom: 0 }}>
          <XAxis dataKey="time" hide />
          <YAxis orientation="right" hide />
          <Bar dataKey="volume" fill="#8B949E" opacity={0.3} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;
