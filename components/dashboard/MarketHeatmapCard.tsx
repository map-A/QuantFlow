import React, { useState } from 'react';
import { Icons } from '../Icons';
import { HeatmapItem } from '../../types';

interface MarketHeatmapCardProps {
  heatmapData: HeatmapItem[];
}

const MarketHeatmapCard: React.FC<MarketHeatmapCardProps> = ({ heatmapData }) => {
  const [heatmapMode, setHeatmapMode] = useState<'concept' | 'sector'>('concept');

  return (
    <div className="glass-panel p-5 rounded-xl border border-border flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <Icons.Flame className="w-5 h-5 text-danger" />
          市场热力图
        </h3>
        <div className="flex bg-surface rounded p-0.5 border border-border">
          <button 
            onClick={() => setHeatmapMode('concept')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${heatmapMode === 'concept' ? 'bg-white/10 text-white' : 'text-text-muted'}`}
          >
            概念
          </button>
          <button 
            onClick={() => setHeatmapMode('sector')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${heatmapMode === 'sector' ? 'bg-white/10 text-white' : 'text-text-muted'}`}
          >
            行业
          </button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-4 md:grid-cols-5 gap-2 overflow-hidden">
        {heatmapData.map((item, idx) => {
          const colorClass = item.change > 3 ? 'bg-success' : 
                             item.change > 0 ? 'bg-success/60' : 
                             item.change > -2 ? 'bg-danger/60' : 'bg-danger';
          return (
            <div 
              key={idx} 
              className={`${colorClass} rounded-lg p-2 flex flex-col justify-center items-center cursor-pointer hover:brightness-110 transition-all text-center group relative overflow-hidden`}
              style={{ 
                gridColumn: `span ${item.value > 100 ? 2 : 1}`,
                gridRow: `span ${item.value > 110 ? 2 : 1}`
              }}
            >
              <span className="text-xs font-bold text-white z-10">{item.name}</span>
              <span className="text-[10px] text-white/90 z-10 font-mono">
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
              <span className="text-[8px] text-white/70 absolute bottom-1 z-10 opacity-0 group-hover:opacity-100 uppercase tracking-tighter">
                {item.group}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketHeatmapCard;
