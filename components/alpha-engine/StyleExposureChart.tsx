import React from 'react';
import { Icons } from '../Icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import Panel from './Panel';

interface StyleExposureData {
  name: string;
  value: number;
}

interface StyleExposureChartProps {
  data: StyleExposureData[];
}

const StyleExposureChart: React.FC<StyleExposureChartProps> = ({ data }) => {
  return (
    <Panel title="风格暴露 (Style Exposure)" icon={Icons.Target} className="col-span-1">
      <div className="p-4 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#8B949E' }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[-1, 1]} />
            <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} />
            <ReferenceLine y={0} stroke="#30363D" />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.value > 0 ? '#1F6FEB' : '#F6465D'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
};

export default StyleExposureChart;
