import React from 'react';
import { Stock } from '../../types';
import { Icons } from '../Icons';

interface StockHeaderProps {
  stock: Stock;
  high: number;
  low: number;
}

interface RiskBadgeProps {
  label: string;
  level: 'low' | 'med' | 'high';
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ label, level }) => (
  <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border
    ${level === 'low' ? 'bg-success/10 border-success/30 text-success' : 
      level === 'med' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 
      'bg-danger/10 border-danger/30 text-danger'}
  `}>
    <div className={`w-1.5 h-1.5 rounded-full ${level === 'low' ? 'bg-success' : level === 'med' ? 'bg-yellow-500' : 'bg-danger'}`} />
    {label}
  </div>
);

const StockHeader: React.FC<StockHeaderProps> = ({ stock, high, low }) => {
  return (
    <header className="h-14 px-4 border-b border-border bg-surface/30 backdrop-blur-md flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
            {stock.symbol} <span className="text-sm font-sans text-text-muted font-normal">{stock.name}</span>
          </h1>
        </div>
        <div className="h-6 w-[1px] bg-border/50" />
        <div className="flex items-baseline gap-2 font-mono">
          <span className={`text-2xl font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
            {stock.price.toFixed(2)}
          </span>
          <span className={`text-sm ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </span>
        </div>
        <div className="hidden md:flex gap-4 text-xs font-mono text-text-muted ml-2">
          <span>H: <span className="text-text-main">{high.toFixed(2)}</span></span>
          <span>L: <span className="text-text-main">{low.toFixed(2)}</span></span>
          <span>V: <span className="text-yellow-500">{stock.volume}</span></span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <RiskBadge label="波动率正常" level="low" />
        <RiskBadge label="主力控盘" level="med" />
        <button className="p-1.5 hover:bg-white/10 rounded text-text-muted">
          <Icons.Alert className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default StockHeader;
