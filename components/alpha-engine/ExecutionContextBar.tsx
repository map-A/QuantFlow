import React from 'react';
import { Icons } from '../Icons';

const ExecutionContextBar: React.FC = () => {
  return (
    <div className="h-12 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between text-xs">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-text-muted">
          <Icons.History className="w-4 h-4" /> 历史记录: <span className="text-text-main">Final_Alpha_v3_Optimized</span>
        </div>
        <div className="w-[1px] h-3 bg-border"></div>
        <div className="flex items-center gap-2 text-text-muted">
          <Icons.Alert className="w-4 h-4 text-yellow-500" />
          过拟合风险检测: <span className="text-yellow-500">Low (P-Value: 0.02)</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-1.5 border border-border hover:bg-white/5 rounded-lg transition-all">导出组合权重</button>
        <button className="px-4 py-1.5 bg-primary text-white rounded-lg font-bold shadow-glow-blue hover:brightness-110 transition-all">
          同步至实盘策略
        </button>
      </div>
    </div>
  );
};

export default ExecutionContextBar;
