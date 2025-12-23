import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface BacktestPreviewProps {
  data: any[];
}

const BacktestPreview: React.FC<BacktestPreviewProps> = ({ data }) => {
  return (
    <div className="h-20 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between gap-8">
      {/* Left: Preview */}
      <div className="flex-1 flex items-center gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-text-muted uppercase font-bold">回测净值 (Backtest)</span>
          <div className="w-64 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <Area 
                  type="monotone" 
                  dataKey="ic" 
                  stroke="#1F6FEB" 
                  fill="#1F6FEB" 
                  fillOpacity={0.1} 
                  strokeWidth={2} 
                  isAnimationActive={false} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] font-mono">
          <div className="text-text-muted">估算费用: <span className="text-white">0.12%</span></div>
          <div className="text-text-muted">A股限制: <span className="text-success">ON (T+1/涨跌停)</span></div>
          <div className="text-text-muted">样本量: <span className="text-white">4.2k Stocks</span></div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="px-5 py-2 border border-border rounded-lg text-xs font-bold text-text-muted hover:text-white transition-all uppercase tracking-tighter">
          对比已有因子
        </button>
        <button className="px-8 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-glow-blue hover:brightness-110 transition-all uppercase tracking-tighter">
          保存至生产环境
        </button>
      </div>
    </div>
  );
};

export default BacktestPreview;
