import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MarketIndex } from '../../types';

interface MarketIndexCardProps {
  index: MarketIndex;
}

const MarketIndexCard: React.FC<MarketIndexCardProps> = ({ index }) => {
  return (
    <div className="glass-panel p-4 rounded-xl border border-border flex flex-col relative overflow-hidden group hover:border-primary/30 transition-all">
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div>
          <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
            {index.name}
          </div>
          <div className={`text-lg font-mono font-bold mt-1 ${index.change >= 0 ? 'text-success' : 'text-danger'}`}>
            {index.value.toFixed(2)}
          </div>
        </div>
        <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${index.change >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
          {index.change >= 0 ? '+' : ''}{index.changePercent}%
        </div>
      </div>
      
      <div className="flex justify-between items-end relative z-10">
        <div className="text-[10px] text-text-muted">
          主力: <span className={index.mainInflow > 0 ? 'text-success' : 'text-danger'}>
            {index.mainInflow > 0 ? '+' : ''}{index.mainInflow}亿
          </span>
        </div>
        <div className="text-[10px] text-text-muted font-mono">{index.volume}</div>
      </div>

      {/* Sparkline Background */}
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20 group-hover:opacity-30 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={index.sparkline.map((v, i) => ({ i, v }))}>
            <Area 
              type="monotone" 
              dataKey="v" 
              stroke={index.change >= 0 ? '#F6465D' : '#2EBD85'} 
              fill={index.change >= 0 ? '#F6465D' : '#2EBD85'} 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketIndexCard;
