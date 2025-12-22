
import React, { useState } from 'react';
import { MOCK_STOCKS, MOCK_NEWS, MOCK_STRATEGIES, MOCK_INDICES, MOCK_SENTIMENT, MOCK_SECTORS, MOCK_LIMIT_LADDER, MOCK_HEATMAP_DATA, MOCK_RISK_INDICATORS, MOCK_STRATEGY_MONITOR_DATA } from '../constants';
import { Icons } from './Icons';
import { Stock, HeatmapItem, StrategyMetric } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

const Dashboard: React.FC = () => {
  const [stockListTab, setStockListTab] = useState<'gainers' | 'losers' | 'inflow' | 'north' | 'limitup'>('gainers');
  const [heatmapMode, setHeatmapMode] = useState<'concept' | 'sector'>('concept');
  const [strategyTab, setStrategyTab] = useState<'live' | 'backtest'>('live');

  // Filter stocks for the trending list based on tab
  const getTrendingStocks = () => {
      let sorted = [...MOCK_STOCKS];
      if (stockListTab === 'gainers') return sorted.sort((a,b) => b.changePercent - a.changePercent);
      if (stockListTab === 'losers') return sorted.sort((a,b) => a.changePercent - b.changePercent);
      if (stockListTab === 'inflow') return sorted.sort((a,b) => b.mainNetInflow - a.mainNetInflow);
      if (stockListTab === 'north') return sorted.sort((a,b) => b.northNetInflow - a.northNetInflow);
      if (stockListTab === 'limitup') return sorted.filter(s => s.limitStatus === 'limitUp');
      return sorted;
  }

  const activeStrategies = strategyTab === 'live' ? MOCK_STRATEGY_MONITOR_DATA.live : MOCK_STRATEGY_MONITOR_DATA.backtest;

  return (
    <div className="p-6 space-y-6">
      
      {/* 1. Market Overview Indices (Sparklines) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {MOCK_INDICES.map((index, idx) => (
           <div key={idx} className="glass-panel p-4 rounded-xl border border-border flex flex-col relative overflow-hidden group hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start mb-2 relative z-10">
                  <div>
                      <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{index.name}</div>
                      <div className={`text-lg font-mono font-bold mt-1 ${index.change >= 0 ? 'text-success' : 'text-danger'}`}>
                        {index.value.toFixed(2)}
                      </div>
                  </div>
                  <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${index.change >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                      {index.change >= 0 ? '+' : ''}{index.changePercent}%
                  </div>
              </div>
              
              <div className="flex justify-between items-end relative z-10">
                  <div className="text-[10px] text-text-muted">
                      主力: <span className={index.mainInflow > 0 ? 'text-success' : 'text-danger'}>{index.mainInflow > 0 ? '+' : ''}{index.mainInflow}亿</span>
                  </div>
                  <div className="text-[10px] text-text-muted font-mono">{index.volume}</div>
              </div>

              {/* Sparkline Background */}
              <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20 group-hover:opacity-30 transition-opacity">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={index.sparkline.map((v, i) => ({ i, v }))}>
                          <Area 
                            type="monotone" 
                            dataKey="v" 
                            stroke={index.change >= 0 ? '#F6465D' : '#2EBD85'} 
                            fill={index.change >= 0 ? '#F6465D' : '#2EBD85'} 
                            strokeWidth={2}
                          />
                      </AreaChart>
                   </ResponsiveContainer>
              </div>
           </div>
        ))}
      </div>

      {/* 2. Strategy Execution & Backtest Monitor (New Module) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 glass-panel rounded-2xl border border-border overflow-hidden flex flex-col shadow-2xl">
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

          <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="glass-panel p-5 rounded-2xl border border-border flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                      <Icons.Robot className="w-32 h-32 text-violet" />
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                      <h3 className="text-xs font-bold text-violet uppercase tracking-widest flex items-center gap-2">
                          <Icons.Sparkles className="w-4 h-4" />
                          AI 组合分析建议
                      </h3>
                      <span className="text-[9px] text-text-muted font-mono">CONFIDENCE: 92%</span>
                  </div>
                  <div className="relative z-10 space-y-4">
                      <p className="text-xs text-text-muted leading-relaxed">
                          "当前 <span className="text-white font-bold">双均线趋势版</span> 在 3100 点附近出现 Alpha 衰减，建议将仓位动态调整至 <span className="text-cyan font-bold">中性多因子</span> 模块。监测到小市值风格正在修复，利好模拟盘策略 S2。"
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                          <div className="p-2.5 bg-violet/10 border border-violet/20 rounded-xl">
                              <div className="text-[9px] text-violet font-bold uppercase mb-1">预期夏普</div>
                              <div className="text-lg font-mono font-bold text-white">2.82</div>
                          </div>
                          <div className="p-2.5 bg-cyan/10 border border-cyan/20 rounded-xl">
                              <div className="text-[9px] text-cyan font-bold uppercase mb-1">流动性评分</div>
                              <div className="text-lg font-mono font-bold text-white">High</div>
                          </div>
                      </div>
                  </div>
                  <button className="w-full py-2 bg-violet/20 border border-violet/30 rounded-lg text-[10px] font-bold text-violet hover:bg-violet/30 transition-all uppercase tracking-widest relative z-10">
                      执行组合再平衡 (Rebalance)
                  </button>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-danger/20 bg-danger/5 flex-1">
                  <h3 className="text-xs font-bold text-danger uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Icons.Alert className="w-4 h-4" />
                      策略风控实时告警
                  </h3>
                  <div className="space-y-3">
                      {MOCK_STRATEGY_MONITOR_DATA.alerts.map((alert, i) => (
                          <div key={i} className="flex gap-3 items-start p-3 bg-surface/50 border border-border/50 rounded-xl hover:border-danger/30 transition-all cursor-pointer">
                              <div className={`mt-1 p-1 rounded ${alert.level === 'danger' ? 'bg-danger text-white' : 'bg-yellow-500 text-black'}`}>
                                  <Icons.Alert className="w-3 h-3" />
                              </div>
                              <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="text-[10px] font-bold text-text-main">ALERT_ID: {alert.strategyId}</span>
                                      <span className="text-[9px] text-text-muted font-mono">{alert.time}</span>
                                  </div>
                                  <p className="text-[11px] text-text-muted leading-snug">{alert.message}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* 3. A-Share Market Sentiment Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Market Breadth & Temperature (3 cols) */}
          <div className="lg:col-span-3 glass-panel p-5 rounded-xl border border-border flex flex-col justify-between">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                  <Icons.Gauge className="w-5 h-5 text-primary" />
                  市场温度计
              </h3>
              
              <div className="space-y-6">
                {/* Breadth Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-success">{MOCK_SENTIMENT.upCount} 上涨</span>
                    <span className="text-danger">{MOCK_SENTIMENT.downCount} 下跌</span>
                  </div>
                  <div className="flex h-4 rounded-full overflow-hidden bg-surface border border-border">
                      <div className="bg-success h-full relative group" style={{ width: `${(MOCK_SENTIMENT.upCount / (MOCK_SENTIMENT.upCount + MOCK_SENTIMENT.downCount)) * 100}%` }}>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="bg-danger h-full relative group" style={{ width: `${(MOCK_SENTIMENT.downCount / (MOCK_SENTIMENT.upCount + MOCK_SENTIMENT.downCount)) * 100}%` }}>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                  </div>
                </div>

                {/* Volume & Margin Info */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-surface/50 p-2 rounded border border-border/50 text-center">
                      <div className="text-[10px] text-text-muted uppercase font-bold">两市成交</div>
                      <div className="text-sm font-bold text-text-main font-mono">{MOCK_SENTIMENT.marketVolume}</div>
                   </div>
                   <div className="bg-surface/50 p-2 rounded border border-border/50 text-center">
                      <div className="text-[10px] text-text-muted uppercase font-bold">融资余额</div>
                      <div className="text-sm font-bold text-success font-mono">+{MOCK_SENTIMENT.marginBalanceChange}亿</div>
                   </div>
                </div>
              </div>
          </div>

          {/* Limit Up Ladder & Short-term Mood (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold flex items-center gap-2">
                    <Icons.Up className="w-5 h-5 text-success" />
                    短线情绪 (连板梯队)
                 </h3>
                 <div className="flex gap-4 text-[10px] font-mono">
                    <span className="text-success font-bold px-2 py-0.5 bg-success/10 rounded">涨停: {MOCK_SENTIMENT.limitUpCount}</span>
                    <span className="text-danger font-bold px-2 py-0.5 bg-danger/10 rounded">跌停: {MOCK_SENTIMENT.limitDownCount}</span>
                 </div>
              </div>
              
              <div className="flex items-end justify-between gap-2 h-32 px-2">
                  {MOCK_LIMIT_LADDER.map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 group flex-1">
                          <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity truncate max-w-[60px] font-mono">
                              {item.topStock}
                          </span>
                          <div className={`w-full rounded-t-lg bg-gradient-to-t from-success/20 to-success/60 relative hover:brightness-125 transition-all shadow-glow-cyan`} style={{ height: `${item.boards * 15}%` }}>
                              <div className="absolute -top-5 left-0 right-0 text-center text-[10px] font-bold text-success">
                                  {item.boards}板
                              </div>
                              <div className="absolute bottom-2 left-0 right-0 text-center text-[9px] font-bold text-white">
                                  {item.count}家
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* AI Insight (4 cols) */}
          <div className="lg:col-span-4 glass-panel p-1 rounded-xl border border-border bg-gradient-to-br from-violet/5 via-transparent to-cyan/5 relative">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Icons.AI className="w-20 h-20" />
              </div>
              <div className="p-5 h-full flex flex-col justify-between relative z-10">
                   <div className="flex justify-between items-start">
                       <div>
                           <h3 className="font-bold flex items-center gap-2 text-violet mb-1">
                               <Icons.AI className="w-5 h-5" />
                               AI 市场洞察
                           </h3>
                           <p className="text-[10px] text-text-muted font-mono tracking-tighter">ENGINE v4.2 LIVE</p>
                       </div>
                       <div className="px-3 py-1 bg-violet/10 border border-violet/20 rounded-full text-[10px] font-bold text-violet animate-pulse">
                           震荡看多 ↗
                       </div>
                   </div>
                   
                   <div className="my-2 text-sm text-text-main leading-relaxed italic">
                       "AI 监测到<span className="text-success font-bold underline decoration-success/30 decoration-2">算力板块</span>出现主力资金回流，高位股情绪修复。建议关注低位补涨的科技股。"
                   </div>

                   <div className="flex gap-2 mt-auto">
                       {['华为汽车', '算力', '创新药'].map(tag => (
                           <span key={tag} className="px-2 py-0.5 bg-surface border border-border rounded text-[9px] text-text-muted font-bold tracking-tighter">
                               #{tag}
                           </span>
                       ))}
                   </div>
              </div>
          </div>
      </div>

      {/* 4. Market Heatmap & Sector Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
          {/* Interactive Heatmap */}
          <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-border flex flex-col">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                      <Icons.Flame className="w-5 h-5 text-danger" />
                      市场热力图
                  </h3>
                  <div className="flex bg-surface rounded p-0.5 border border-border">
                       <button 
                          onClick={() => setHeatmapMode('concept')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${heatmapMode === 'concept' ? 'bg-white/10 text-white' : 'text-text-muted'}`}
                       >
                           概念
                       </button>
                       <button 
                          onClick={() => setHeatmapMode('sector')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${heatmapMode === 'sector' ? 'bg-white/10 text-white' : 'text-text-muted'}`}
                       >
                           行业
                       </button>
                  </div>
              </div>
              
              <div className="flex-1 grid grid-cols-4 md:grid-cols-5 gap-2 overflow-hidden">
                  {MOCK_HEATMAP_DATA.map((item, idx) => {
                      const colorClass = item.change > 3 ? 'bg-success' : 
                                         item.change > 0 ? 'bg-success/60' : 
                                         item.change > -2 ? 'bg-danger/60' : 'bg-danger';
                      return (
                          <div 
                            key={idx} 
                            className={`${colorClass} rounded-lg p-2 flex flex-col justify-center items-center cursor-pointer hover:brightness-110 transition-all text-center group relative overflow-hidden`}
                            style={{ 
                                gridColumn: `span ${item.value > 100 ? 2 : 1}`,
                                gridRow: `span ${item.value > 110 ? 2 : 1}`
                            }}
                          >
                              <span className="text-xs font-bold text-white z-10">{item.name}</span>
                              <span className="text-[10px] text-white/90 z-10 font-mono">{item.change > 0 ? '+' : ''}{item.change}%</span>
                              <span className="text-[8px] text-white/70 absolute bottom-1 z-10 opacity-0 group-hover:opacity-100 uppercase tracking-tighter">{item.group}</span>
                          </div>
                      )
                  })}
              </div>
          </div>

          {/* Sector Ranking List */}
          <div className="glass-panel p-5 rounded-xl border border-border flex flex-col">
              <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold flex items-center gap-2">
                      <Icons.List className="w-5 h-5 text-cyan" />
                      领涨板块
                   </h3>
                   <span className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">Sorted by Change%</span>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {MOCK_SECTORS.map((sector, i) => (
                      <div key={i} className="mb-3 p-3 bg-surface/50 border border-border/50 rounded-xl flex items-center justify-between hover:bg-surface hover:border-primary/30 transition-all cursor-pointer group">
                          <div>
                              <div className="text-sm font-bold flex items-center gap-2">
                                  <span className={`text-[9px] w-4 h-4 rounded flex items-center justify-center font-bold ${i < 3 ? 'bg-danger text-white' : 'bg-surface text-text-muted border border-border'}`}>{i+1}</span>
                                  {sector.name}
                              </div>
                              <div className="text-[10px] text-text-muted mt-1">
                                  领涨: <span className="text-text-main group-hover:text-primary transition-colors">{sector.leadingStock}</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className={`font-mono font-bold text-sm ${sector.changePercent >= 0 ? 'text-success' : 'text-danger'}`}>
                                  {sector.changePercent > 0 ? '+' : ''}{sector.changePercent}%
                              </div>
                              <div className={`text-[10px] font-mono ${sector.netInflow > 0 ? 'text-success' : 'text-danger'}`}>
                                  {sector.netInflow}亿
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 4. Comprehensive Stock Lists */}
      <div className="glass-panel p-5 rounded-xl border border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
               <h3 className="font-bold flex items-center gap-2">
                  <Icons.Trophy className="w-5 h-5 text-yellow-500" />
                  个股龙虎榜
              </h3>
              <div className="flex bg-surface rounded-lg p-0.5 border border-border overflow-x-auto">
                  {[
                    { id: 'gainers', label: '涨幅榜' }, 
                    { id: 'losers', label: '跌幅榜' }, 
                    { id: 'inflow', label: '主力流入' }, 
                    { id: 'north', label: '北向买入' },
                    { id: 'limitup', label: '🚀 连板池' }
                  ].map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => setStockListTab(tab.id as any)}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all whitespace-nowrap ${stockListTab === tab.id ? 'bg-background text-white shadow-sm' : 'text-text-muted hover:text-white'}`}
                      >
                          {tab.label}
                      </button>
                  ))}
              </div>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-sm min-w-[800px]">
                  <thead>
                      <tr className="text-text-muted border-b border-border/50 text-[10px] uppercase font-bold tracking-wider">
                          <th className="pb-3 pl-2">股票名称/代码</th>
                          <th className="pb-3 text-right">最新价</th>
                          <th className="pb-3 text-right">涨跌幅</th>
                          <th className="pb-3 text-right">主力净流入</th>
                          <th className="pb-3 text-right">北向净买入</th>
                          <th className="pb-3 text-right">换手率</th>
                          <th className="pb-3 text-right">所属板块</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                      {getTrendingStocks().map(stock => (
                          <tr key={stock.symbol} className="group hover:bg-white/5 transition-colors">
                              <td className="py-3 pl-2">
                                  <div className="flex items-center gap-2">
                                      {stock.limitStatus === 'limitUp' && <div className="w-1 h-8 rounded-full bg-success shadow-[0_0_8px_#F6465D]"></div>}
                                      {stock.limitStatus !== 'limitUp' && <div className={`w-1 h-8 rounded-full ${stock.change >= 0 ? 'bg-success' : 'bg-danger'}`}></div>}
                                      <div>
                                          <div className="font-bold flex items-center gap-2">
                                              {stock.name}
                                              {stock.limitStatus === 'limitUp' && <span className="bg-success text-white text-[9px] px-1 py-0.5 rounded leading-none font-bold uppercase">涨停</span>}
                                          </div>
                                          <div className="text-[10px] text-text-muted font-mono">{stock.symbol}</div>
                                      </div>
                                  </div>
                              </td>
                              <td className={`py-3 text-right font-mono font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                  ¥{stock.price.toFixed(2)}
                              </td>
                              <td className={`py-3 text-right font-mono font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                  {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                              </td>
                              <td className={`py-3 text-right font-mono ${stock.mainNetInflow > 0 ? 'text-success' : 'text-danger'}`}>
                                  {stock.mainNetInflow > 0 ? '+' : ''}{(stock.mainNetInflow / 10000).toFixed(2)}亿
                              </td>
                              <td className={`py-3 text-right font-mono ${stock.northNetInflow > 0 ? 'text-success' : 'text-danger'}`}>
                                  {stock.northNetInflow > 0 ? '+' : ''}{(stock.northNetInflow / 10000).toFixed(2)}亿
                              </td>
                              <td className="py-3 text-right text-text-muted font-mono text-xs">
                                  {stock.turnoverRate}%
                              </td>
                               <td className="py-3 text-right">
                                  <span className="px-2 py-1 bg-surface border border-border rounded text-[9px] text-text-muted font-bold tracking-tighter uppercase">
                                      {stock.sector}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

      {/* 5. Risk Panel & Real-time News */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real-time News Feed (2/3) */}
          <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                      <Icons.News className="w-5 h-5 text-text-main" />
                      实时电报 & 情绪
                  </h3>
                  <button className="text-[10px] text-primary hover:underline font-bold uppercase tracking-widest">查看更多</button>
              </div>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {MOCK_NEWS.map(news => (
                      <div key={news.id} className="flex gap-4 p-3 hover:bg-surface/50 rounded-xl transition-all border-l-2 border-transparent hover:border-primary group">
                          <div className="flex flex-col items-center min-w-[50px]">
                              <span className="text-[10px] font-mono text-text-muted">{news.time}</span>
                              {news.sentiment === 'positive' && <div className="mt-2 w-2 h-2 rounded-full bg-success shadow-glow-cyan"></div>}
                              {news.sentiment === 'negative' && <div className="mt-2 w-2 h-2 rounded-full bg-danger shadow-glow-red"></div>}
                          </div>
                          <div className="flex-1">
                              <h4 className="text-sm font-medium text-text-main mb-1 leading-snug group-hover:text-white transition-colors">{news.title}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                  <span className="text-[9px] text-text-muted px-1.5 py-0.5 bg-surface rounded border border-border font-bold uppercase">{news.source}</span>
                                  {news.tags.map(tag => (
                                      <span key={tag} className={`text-[9px] px-1.5 py-0.5 rounded border font-bold tracking-tighter uppercase
                                          ${tag === '利好' ? 'border-success/30 text-success bg-success/5' : 
                                            tag === '风险' ? 'border-danger/30 text-danger bg-danger/5' : 
                                            'border-border text-text-muted bg-surface'}`}>
                                          {tag}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Risk Control Panel (1/3) */}
          <div className="glass-panel p-5 rounded-xl border border-border bg-gradient-to-b from-surface to-background flex flex-col">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-white uppercase text-xs tracking-widest">
                  <Icons.Alert className="w-5 h-5 text-yellow-500" />
                  风控仪表盘 (Risk)
              </h3>
              
              <div className="space-y-4 flex-1">
                  {MOCK_RISK_INDICATORS.map((risk, i) => (
                      <div key={i} className="p-3 bg-surface border border-border rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all">
                          <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">{risk.name}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase
                                  ${risk.status === 'safe' ? 'bg-success/10 text-success' : risk.status === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-danger/10 text-danger'}
                              `}>
                                  {risk.status}
                              </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                              <span className="text-lg font-mono font-bold text-white group-hover:text-primary transition-colors">{risk.value}</span>
                              {risk.trend === 'up' && <Icons.Up className="w-3 h-3 text-danger" />}
                              {risk.trend === 'down' && <Icons.Down className="w-3 h-3 text-success" />}
                          </div>
                          <p className="text-[9px] text-text-muted mt-1 leading-tight">{risk.description}</p>
                          {risk.status === 'warning' && <div className="absolute top-0 right-0 w-1 h-full bg-yellow-500 shadow-glow-cyan" />}
                      </div>
                  ))}

                  {/* Portfolio Risk Summary */}
                  <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">组合风险敞口</span>
                          <span className="text-[10px] font-mono text-cyan font-bold">LOW EXPOSURE</span>
                      </div>
                      <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden border border-border/50">
                          <div className="bg-cyan w-[25%] h-full shadow-glow-cyan"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
