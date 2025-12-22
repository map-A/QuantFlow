
import React, { useState } from 'react';
import { Icons } from './Icons';
import { MOCK_BACKTEST_TRADES } from '../constants';

const TradingHistory: React.FC = () => {
  const [filterType, setFilterType] = useState('all');

  // Reuse some mock trades for UI representation
  const trades = MOCK_BACKTEST_TRADES.slice(0, 15);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Icons.History className="w-6 h-6 text-cyan" />
          <h1 className="text-2xl font-bold">交易账单</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-xl text-xs text-text-main hover:bg-white/5 transition-all">
            <Icons.Download className="w-4 h-4" /> 导出报表
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-xs text-primary hover:bg-primary/20 transition-all">
            <Icons.Refresh className="w-4 h-4" /> 刷新记录
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-border">
          <div className="text-[10px] text-text-muted uppercase mb-1">累计成交 (本月)</div>
          <div className="text-xl font-mono font-bold text-white">1,428,500.00</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-border">
          <div className="text-[10px] text-text-muted uppercase mb-1">已实现盈亏</div>
          <div className="text-xl font-mono font-bold text-success">+¥42,100.00</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-border">
          <div className="text-[10px] text-text-muted uppercase mb-1">交易频率</div>
          <div className="text-xl font-mono font-bold text-white">4.2 次/日</div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-border">
          <div className="text-[10px] text-text-muted uppercase mb-1">交易胜率</div>
          <div className="text-xl font-mono font-bold text-cyan">68.5%</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between bg-surface/30 p-4 rounded-xl border border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex bg-background border border-border rounded-lg p-0.5">
            {['全部', '买入', '卖出'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  (t === '全部' && filterType === 'all') || (t === '买入' && filterType === '买入') || (t === '卖出' && filterType === '卖出')
                    ? 'bg-primary text-white shadow-glow-blue'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="搜索股票代码..." 
              className="bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs outline-none focus:border-primary w-48"
            />
          </div>
        </div>
        <div className="text-xs text-text-muted">
          筛选范围: <span className="text-text-main">2023-11-01 至 2023-11-20</span>
        </div>
      </div>

      {/* Billing Table */}
      <div className="glass-panel rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] text-text-muted uppercase bg-surface/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">成交时间</th>
                <th className="px-6 py-4 font-medium">名称/代码</th>
                <th className="px-6 py-4 font-medium">方向</th>
                <th className="px-6 py-4 font-medium text-right">成交价</th>
                <th className="px-6 py-4 font-medium text-right">数量</th>
                <th className="px-6 py-4 font-medium text-right">成交额</th>
                <th className="px-6 py-4 font-medium text-right">费用/税</th>
                <th className="px-6 py-4 font-medium text-right">单笔盈亏</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-mono text-text-muted">{trade.time}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{trade.name}</div>
                    <div className="text-[10px] font-mono text-text-muted">{trade.symbol}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      trade.side === 'buy' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                      {trade.side === 'buy' ? '买入' : '卖出'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-text-main">¥ {trade.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-mono text-text-main">{trade.volume}</td>
                  <td className="px-6 py-4 text-right font-mono text-text-main">¥ {(trade.price * trade.volume).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-text-muted">¥ {trade.commission.toFixed(2)}</td>
                  <td className={`px-6 py-4 text-right font-mono font-bold ${trade.pnl! > 0 ? 'text-success' : 'text-danger'}`}>
                    {trade.pnl! > 0 ? '+' : ''}{trade.pnl!.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border flex items-center justify-center bg-surface/30">
          <button className="text-xs text-text-muted hover:text-white flex items-center gap-2">
            <Icons.ChevronDown className="w-4 h-4" /> 加载更多历史数据
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingHistory;
