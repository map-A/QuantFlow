import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Cell } from 'recharts';

interface SubIndicatorChartProps {
  data: any[];
  indicator: 'MACD' | 'RSI' | 'KDJ';
  onIndicatorChange: (indicator: 'MACD' | 'RSI' | 'KDJ') => void;
}

const SubIndicatorChart: React.FC<SubIndicatorChartProps> = ({ 
  data, 
  indicator, 
  onIndicatorChange 
}) => {
  return (
    <div className="flex-[3] min-h-0 relative">
      {/* Indicator Selector */}
      <div className="absolute top-1 left-2 z-10 flex gap-1">
        {(['MACD', 'RSI', 'KDJ'] as const).map(ind => (
          <button
            key={ind}
            onClick={() => onIndicatorChange(ind)}
            className={`px-2 py-0.5 text-[10px] rounded ${indicator === ind ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}
          >
            {ind}
          </button>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 60, left: 10, bottom: 5 }}>
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#8B949E', fontSize: 9 }} 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis orientation="right" hide />
          
          {indicator === 'MACD' && (
            <>
              <Bar dataKey="macdBar">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.macdBar > 0 ? '#F6465D' : '#2EBD85'} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="dif" stroke="#FFA500" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="dea" stroke="#00BFFF" strokeWidth={1} dot={false} />
            </>
          )}
          
          {indicator === 'RSI' && (
            <Line type="monotone" dataKey="rsi" stroke="#A855F7" strokeWidth={1.5} dot={false} />
          )}
          
          {indicator === 'KDJ' && (
            <>
              <Line type="monotone" dataKey="k" stroke="#FFA500" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="d" stroke="#00BFFF" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="j" stroke="#FF1493" strokeWidth={1} dot={false} />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubIndicatorChart;
