import React from 'react';
import { Icons } from '../Icons';
import { MarketSentiment } from '../../types';

interface MarketSentimentCardProps {
  sentiment: MarketSentiment;
}

const MarketSentimentCard: React.FC<MarketSentimentCardProps> = ({ sentiment }) => {
  return (
    <div className="glass-panel p-5 rounded-xl border border-border flex flex-col justify-between">
      <h3 className="font-bold flex items-center gap-2 mb-4">
        <Icons.Gauge className="w-5 h-5 text-primary" />
        市场温度计
      </h3>
      
      <div className="space-y-6">
        {/* Breadth Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-success">{sentiment.upCount} 上涨</span>
            <span className="text-danger">{sentiment.downCount} 下跌</span>
          </div>
          <div className="flex h-4 rounded-full overflow-hidden bg-surface border border-border">
            <div 
              className="bg-success h-full relative group" 
              style={{ width: `${(sentiment.upCount / (sentiment.upCount + sentiment.downCount)) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div 
              className="bg-danger h-full relative group" 
              style={{ width: `${(sentiment.downCount / (sentiment.upCount + sentiment.downCount)) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Volume & Margin Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface/50 p-2 rounded border border-border/50 text-center">
            <div className="text-[10px] text-text-muted uppercase font-bold">两市成交</div>
            <div className="text-sm font-bold text-text-main font-mono">{sentiment.marketVolume}</div>
          </div>
          <div className="bg-surface/50 p-2 rounded border border-border/50 text-center">
            <div className="text-[10px] text-text-muted uppercase font-bold">融资余额</div>
            <div className="text-sm font-bold text-success font-mono">+{sentiment.marginBalanceChange}亿</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSentimentCard;
