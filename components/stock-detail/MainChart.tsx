import React from 'react';
import { 
  ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Bar, Area, Line, ReferenceLine, CartesianGrid 
} from 'recharts';

interface MainChartProps {
  data: any[];
  mainOverlay: 'MA' | 'BOLL' | 'NONE';
  comparison: boolean;
  showSignals: boolean;
}

const MainChart: React.FC<MainChartProps> = ({ 
  data, 
  mainOverlay, 
  comparison, 
  showSignals 
}) => {
  // Calculate latest MA values for legend
  const latest = data[data.length - 1] || {};
  
  return (
    <div className="flex-[7] min-h-0 border-b border-border/30 relative">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 60, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="bullGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F6465D" stopOpacity={0.2}/>
              <stop offset="100%" stopColor="#F6465D" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
          <XAxis dataKey="time" hide />
          <YAxis 
            domain={['auto', 'auto']} 
            orientation="right" 
            tick={{ fill: '#8B949E', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
            axisLine={false} 
            tickLine={false} 
            tickCount={8}
            width={50}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(22, 27, 34, 0.9)', borderColor: '#30363D', fontSize: '11px' }}
            itemStyle={{ padding: 0 }}
            formatter={(val: number) => typeof val === 'number' ? val.toFixed(2) : val}
            labelStyle={{ color: '#8B949E', marginBottom: 4 }}
          />
          
          {/* Candles as Area (simplified) */}
          <Area 
            type="monotone" 
            dataKey="close" 
            stroke="#F6465D" 
            fill="url(#bullGradient)" 
            strokeWidth={1}
          />
          
          {/* Moving Averages */}
          {mainOverlay === 'MA' && (
            <>
              <Line type="monotone" dataKey="MA5" stroke="#FFA500" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="MA10" stroke="#00BFFF" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="MA20" stroke="#FF1493" strokeWidth={1} dot={false} />
            </>
          )}
          
          {/* Bollinger Bands */}
          {mainOverlay === 'BOLL' && (
            <>
              <Line type="monotone" dataKey="bollUpper" stroke="#9370DB" strokeWidth={1} dot={false} strokeDasharray="3 3" />
              <Line type="monotone" dataKey="MA20" stroke="#FF1493" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="bollLower" stroke="#9370DB" strokeWidth={1} dot={false} strokeDasharray="3 3" />
            </>
          )}
          
          {/* Comparison Line */}
          {comparison && (
            <Line 
              type="monotone" 
              dataKey="comparisonPrice" 
              stroke="#A855F7" 
              strokeWidth={1} 
              dot={false} 
              strokeDasharray="5 5"
            />
          )}
          
          {/* Signal Markers */}
          {showSignals && (
            <ReferenceLine y={1800} stroke="#2EBD85" strokeDasharray="3 3" />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      
      {/* Legend Overlay */}
      {mainOverlay === 'MA' && (
        <div className="absolute top-2 left-2 flex gap-3 text-[10px] font-mono bg-background/50 px-2 py-1 rounded backdrop-blur">
          <span className="text-orange-500">MA5: {latest.MA5?.toFixed(1)}</span>
          <span className="text-cyan">MA10: {latest.MA10?.toFixed(1)}</span>
          <span className="text-pink-500">MA20: {latest.MA20?.toFixed(1)}</span>
        </div>
      )}
    </div>
  );
};

export default MainChart;
