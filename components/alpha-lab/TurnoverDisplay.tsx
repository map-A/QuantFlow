import React from 'react';

const TurnoverDisplay: React.FC = () => {
  return (
    <div className="col-span-1 h-56 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
      <span className="text-[10px] font-bold text-text-muted uppercase mb-4">换手率可视化 (Turnover)</span>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-3xl font-mono font-bold text-white">42.5%</div>
        <div className="text-[10px] text-text-muted mt-1 uppercase tracking-tighter">
          每日平均单向换手
        </div>
        <div className="w-full mt-4 bg-background h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: '42.5%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TurnoverDisplay;
