import React from 'react';
import { Stock } from '../../types';

interface FundamentalsPanelProps {
  stock: Stock;
}

const FundamentalsPanel: React.FC<FundamentalsPanelProps> = ({ stock }) => {
  return (
    <div className="p-4 space-y-4">
      {/* Core Metrics */}
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-text-muted">核心指标</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div className="flex justify-between border-b border-border/30 pb-1">
            <span className="text-text-muted">市盈率(TTM)</span>
            <span className="font-mono">{stock.pe}</span>
          </div>
          <div className="flex justify-between border-b border-border/30 pb-1">
            <span className="text-text-muted">市净率</span>
            <span className="font-mono">{stock.pb}</span>
          </div>
          <div className="flex justify-between border-b border-border/30 pb-1">
            <span className="text-text-muted">ROE</span>
            <span className="font-mono text-success">{stock.roe}%</span>
          </div>
          <div className="flex justify-between border-b border-border/30 pb-1">
            <span className="text-text-muted">股息率</span>
            <span className="font-mono text-success">{stock.dividendYield}%</span>
          </div>
        </div>
      </div>

      {/* Institutional Ratings */}
      <div className="bg-surface/50 p-3 rounded-lg border border-border">
        <h4 className="text-xs font-bold text-text-muted mb-2">机构评级</h4>
        <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-1">
          <div className="bg-success w-[60%]" />
          <div className="bg-yellow-500 w-[30%]" />
          <div className="bg-danger w-[10%]" />
        </div>
        <div className="flex justify-between text-[10px] text-text-muted">
          <span>买入 60%</span>
          <span>持有 30%</span>
          <span>卖出 10%</span>
        </div>
      </div>

      {/* Peer Comparison */}
      <div>
        <h4 className="text-xs font-bold text-text-muted mb-2">同业对比 (PE)</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-12 truncate">{stock.name}</span>
            <div className="flex-1 bg-surface h-1.5 rounded-full">
              <div className="bg-primary h-full" style={{ width: '40%' }} />
            </div>
            <span className="font-mono w-8 text-right">{stock.pe}</span>
          </div>
          <div className="flex items-center gap-2 text-text-muted">
            <span className="w-12 truncate">五粮液</span>
            <div className="flex-1 bg-surface h-1.5 rounded-full">
              <div className="bg-text-muted h-full opacity-50" style={{ width: '35%' }} />
            </div>
            <span className="font-mono w-8 text-right">22.5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentalsPanel;
