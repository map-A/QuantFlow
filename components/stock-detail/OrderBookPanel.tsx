import React from 'react';
import { Stock } from '../../types';

interface OrderBookPanelProps {
  stock: Stock;
}

const OrderBookPanel: React.FC<OrderBookPanelProps> = ({ stock }) => {
  const maxOrderVol = 1000;
  
  return (
    <div className="p-2 border-b border-border/50">
      <div className="flex justify-between text-[10px] text-text-muted mb-1 px-1">
        <span>卖盘</span>
        <span>委比: <span className="text-danger">-12%</span></span>
      </div>
      
      {/* Sell Orders */}
      <div className="space-y-0.5">
        {[...Array(5)].map((_, i) => {
          const p = (stock.price + (5-i)*0.01).toFixed(2);
          const v = Math.floor(Math.random() * 500);
          return (
            <div key={i} className="flex justify-between items-center text-xs relative h-5">
              <span className="text-text-muted w-8 z-10">卖{5-i}</span>
              <span className="text-danger z-10 font-mono">{p}</span>
              <span className="text-text-main z-10 font-mono">{v}</span>
              <div 
                className="absolute right-0 top-0 h-full bg-danger/10" 
                style={{ width: `${(v/maxOrderVol)*100}%` }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Current Price */}
      <div className="py-2 text-center border-y border-border/30 my-1 bg-surface/20">
        <span className="text-lg font-bold font-mono text-success">{stock.price}</span>
      </div>
      
      {/* Buy Orders */}
      <div className="space-y-0.5">
        {[...Array(5)].map((_, i) => {
          const p = (stock.price - (i+1)*0.01).toFixed(2);
          const v = Math.floor(Math.random() * 600);
          return (
            <div key={i} className="flex justify-between items-center text-xs relative h-5">
              <span className="text-text-muted w-8 z-10">买{i+1}</span>
              <span className="text-success z-10 font-mono">{p}</span>
              <span className="text-text-main z-10 font-mono">{v}</span>
              <div 
                className="absolute right-0 top-0 h-full bg-success/10" 
                style={{ width: `${(v/maxOrderVol)*100}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBookPanel;
