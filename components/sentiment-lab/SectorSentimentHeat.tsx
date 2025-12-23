import React from 'react';
import { Icons } from '../Icons';

interface SectorData {
  name: string;
  value: number;
  inflow: number;
}

interface SectorSentimentHeatProps {
  sectors: SectorData[];
}

export const SectorSentimentHeat: React.FC<SectorSentimentHeatProps> = ({ sectors }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-border flex flex-col gap-4">
      <h3 className="text-xs font-bold text-text-muted uppercase flex items-center gap-2">
        <Icons.Pie className="w-4 h-4 text-cyan" /> 行业情绪强度 (Sector Heat)
      </h3>
      <div className="space-y-4">
        {sectors.map(sector => (
          <div key={sector.name} className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-text-main font-bold">{sector.name}</span>
              <div className="flex gap-3 font-mono">
                <span className="text-cyan">{sector.value} pts</span>
                <span className={sector.inflow > 0 ? 'text-success' : 'text-danger'}>
                  {sector.inflow > 0 ? '+' : ''}{sector.inflow}亿
                </span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-background rounded-full overflow-hidden border border-border/50">
              <div 
                className="h-full bg-gradient-to-r from-primary to-cyan shadow-glow-cyan transition-all duration-1000" 
                style={{ width: `${sector.value}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
