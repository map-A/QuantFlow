import React from 'react';
import { Icons } from '../Icons';
import { StockRecommendation } from './types';

interface StockListProps {
  stocks: StockRecommendation[];
}

export const StockList: React.FC<StockListProps> = ({ stocks }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 border-b border-border/50 custom-scrollbar">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
          <Icons.Target className="w-4 h-4" /> AI Top Picks
        </h3>
        <button className="text-[10px] text-cyan hover:underline">View All</button>
      </div>
      
      <div className="space-y-3">
        {stocks.map((stock, i) => (
          <div key={i} className="group p-3 bg-[#161B22] border border-white/5 hover:border-cyan/50 rounded-xl transition-all cursor-pointer relative overflow-hidden shadow-sm hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-white group-hover:text-cyan transition-colors">{stock.name}</div>
                  <div className="text-[10px] font-mono text-text-muted group-hover:text-cyan/70">{stock.code}</div>
                </div>
                <div className={`text-sm font-mono font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'} bg-surface/50 px-1.5 py-0.5 rounded`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[10px] text-text-muted bg-white/5 px-2 py-0.5 rounded border border-white/5">{stock.reason}</div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-text-muted uppercase">Score</span>
                  <div className="w-6 h-6 rounded-full border border-cyan/30 flex items-center justify-center text-[10px] font-bold text-cyan bg-cyan/5">
                    {stock.score}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
