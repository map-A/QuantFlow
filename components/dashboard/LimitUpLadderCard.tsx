import React from 'react';
import { Icons } from '../Icons';
import { LimitUpLadderItem, MarketSentiment } from '../../types';

interface LimitUpLadderCardProps {
  ladderData: LimitUpLadderItem[];
  sentiment: MarketSentiment;
}

const LimitUpLadderCard: React.FC<LimitUpLadderCardProps> = ({ ladderData, sentiment }) => {
  return (
    <div className="glass-panel p-5 rounded-xl border border-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <Icons.Up className="w-5 h-5 text-success" />
          短线情绪 (连板梯队)
        </h3>
        <div className="flex gap-4 text-[10px] font-mono">
          <span className="text-success font-bold px-2 py-0.5 bg-success/10 rounded">
            涨停: {sentiment.limitUpCount}
          </span>
          <span className="text-danger font-bold px-2 py-0.5 bg-danger/10 rounded">
            跌停: {sentiment.limitDownCount}
          </span>
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-2 h-32 px-2">
        {ladderData.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group flex-1">
            <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity truncate max-w-[60px] font-mono">
              {item.topStock}
            </span>
            <div 
              className="w-full rounded-t-lg bg-gradient-to-t from-success/20 to-success/60 relative hover:brightness-125 transition-all shadow-glow-cyan" 
              style={{ height: `${item.boards * 15}%` }}
            >
              <div className="absolute -top-5 left-0 right-0 text-center text-[10px] font-bold text-success">
                {item.boards}板
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-center text-[9px] font-bold text-white">
                {item.count}家
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitUpLadderCard;
