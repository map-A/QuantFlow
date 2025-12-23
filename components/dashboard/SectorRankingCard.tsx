import React from 'react';
import { Icons } from '../Icons';
import { Sector } from '../../types';

interface SectorRankingCardProps {
  sectors: Sector[];
}

const SectorRankingCard: React.FC<SectorRankingCardProps> = ({ sectors }) => {
  return (
    <div className="glass-panel p-5 rounded-xl border border-border flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <Icons.List className="w-5 h-5 text-cyan" />
          领涨板块
        </h3>
        <span className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">
          Sorted by Change%
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {sectors.map((sector, i) => (
          <div 
            key={i} 
            className="mb-3 p-3 bg-surface/50 border border-border/50 rounded-xl flex items-center justify-between hover:bg-surface hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                <span className={`text-[9px] w-4 h-4 rounded flex items-center justify-center font-bold ${i < 3 ? 'bg-danger text-white' : 'bg-surface text-text-muted border border-border'}`}>
                  {i + 1}
                </span>
                {sector.name}
              </div>
              <div className="text-[10px] text-text-muted mt-1">
                领涨: <span className="text-text-main group-hover:text-primary transition-colors">
                  {sector.leadingStock}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-mono font-bold text-sm ${sector.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                {sector.changePercent > 0 ? '+' : ''}{sector.changePercent}%
              </div>
              <div className={`text-[10px] font-mono ${sector.netInflow > 0 ? 'text-success' : 'text-danger'}`}>
                {sector.netInflow}亿
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorRankingCard;
