import React, { useState } from 'react';
import { Icons } from '../Icons';
import { StrategyMetric } from '../../types';

interface StrategyMonitorCardProps {
  liveStrategies: StrategyMetric[];
  backtestStrategies: StrategyMetric[];
}

const StrategyMonitorCard: React.FC<StrategyMonitorCardProps> = ({ 
  liveStrategies, 
  backtestStrategies 
}) => {
  const [strategyTab, setStrategyTab] = useState<'live' | 'backtest'>('live');
  const activeStrategies = strategyTab === 'live' ? liveStrategies : backtestStrategies;

  return (
    <div className="glass-panel rounded-2xl border border-border overflow-hidden flex flex-col shadow-2xl">
      <div className="px-6 py-4 border-b border-border bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-bold flex items-center gap-2 text-white">
            <Icons.Layers className="w-5 h-5 text-primary" />
            量化策略绩效监控
          </h3>
          <div className="flex bg-background border border-border rounded-lg p-0.5 text-[10px] font-bold">
            <button 
              onClick={() => setStrategyTab('live')}
              className={`px-3 py-1.5 rounded-md transition-all ${strategyTab === 'live' ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}
            >
              实盘 / 模拟 (Paper)
            </button>
            <button 
              onClick={() => setStrategyTab('backtest')}
              className={`px-3 py-1.5 rounded-md transition-all ${strategyTab === 'backtest' ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}
            >
              回测排行榜 (Leaderboard)
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-muted uppercase tracking-tighter">Active Nodes: 12</span>
          <Icons.Activity className="w-4 h-4 text-success animate-pulse" />
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-sm border-collapse min-w-[800px]">
          <thead className="bg-surface/50 text-[10px] text-text-muted uppercase font-bold tracking-wider">
            <tr>
              <th className="p-4 border-b border-border">策略名称</th>
              <th className="p-4 border-b border-border text-right">今日收益</th>
              <th className="p-4 border-b border-border text-right">累计盈亏</th>
              <th className="p-4 border-b border-border text-center">胜率 (WR)</th>
              <th className="p-4 border-b border-border text-center">夏普 (Sharpe)</th>
              <th className="p-4 border-b border-border">最大回撤 (MaxDD)</th>
              <th className="p-4 border-b border-border text-center">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {activeStrategies.map((strat) => (
              <tr key={strat.id} className="group hover:bg-white/[0.03] transition-colors cursor-pointer">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${strat.type === 'live' ? 'bg-danger/10 text-danger' : 'bg-cyan/10 text-cyan'} border border-white/5`}>
                      <Icons.Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-primary transition-colors">{strat.name}</div>
                      <div className="text-[10px] text-text-muted font-mono">{strat.id.toUpperCase()} • {strat.type.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className={`p-4 text-right font-mono font-bold ${strat.dailyReturn >= 0 ? 'text-success' : 'text-danger'}`}>
                  {strat.dailyReturn > 0 ? '+' : ''}{strat.dailyReturn}%
                </td>
                <td className={`p-4 text-right font-mono font-bold ${strat.totalReturn >= 0 ? 'text-success' : 'text-danger'}`}>
                  {strat.totalReturn > 0 ? '+' : ''}{strat.totalReturn}%
                </td>
                <td className="p-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-16 h-1.5 bg-surface rounded-full overflow-hidden border border-border/50">
                      <div className="h-full bg-cyan shadow-glow-cyan" style={{ width: `${strat.winRate}%` }} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan">{strat.winRate}%</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="px-2 py-0.5 bg-surface border border-border rounded font-mono font-bold text-white">
                    {strat.sharpe}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[9px] text-text-muted">
                      <span>Limit: -15%</span>
                      <span className="text-danger font-bold">{strat.maxDrawdown}%</span>
                    </div>
                    <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-danger opacity-60" style={{ width: `${Math.abs(strat.maxDrawdown/15)*100}%` }} />
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold border 
                    ${strat.status === 'running' ? 'border-success/30 text-success bg-success/5' : 'border-border text-text-muted bg-surface'}`}>
                    {strat.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StrategyMonitorCard;
