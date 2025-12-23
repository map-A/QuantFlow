import React from 'react';
import { Stock } from '../../types';

interface TickStreamPanelProps {
  stock: Stock;
}

const TickStreamPanel: React.FC<TickStreamPanelProps> = ({ stock }) => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="sticky top-0 bg-surface/80 backdrop-blur z-10 px-3 py-1 text-[10px] text-text-muted flex justify-between border-b border-border/30">
        <span>时间</span>
        <span>价格</span>
        <span>现量</span>
      </div>
      <div className="font-mono text-xs">
        {[...Array(20)].map((_, i) => {
          const isLarge = i % 5 === 0;
          return (
            <div 
              key={i} 
              className={`flex justify-between px-3 py-0.5 hover:bg-white/5 ${isLarge ? 'bg-primary/5' : ''}`}
            >
              <span className="text-text-muted">14:56:{10+i}</span>
              <span className="text-text-main">{stock.price}</span>
              <div className="flex items-center gap-1">
                <span className={isLarge ? 'text-violet font-bold' : (i%2===0 ? 'text-danger' : 'text-success')}>
                  {Math.floor(Math.random() * (isLarge ? 5000 : 100))}
                </span>
                {isLarge && <div className="w-1.5 h-1.5 rounded-full bg-violet" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TickStreamPanel;
