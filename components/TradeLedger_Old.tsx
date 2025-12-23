
import React, { useState, useMemo } from 'react';
import { Icons } from './Icons';
import { TradeLog, Position } from '../types';
// Added ReferenceLine to recharts imports
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar, Cell, LineChart, Line, Legend, ReferenceLine 
} from 'recharts';

// --- Professional Mock Data ---
const MOCK_TRADES: TradeLog[] = [
  { 
    id: 'T10029', time: '14:45:22.012', symbol: '600519', name: '贵州茅台', side: 'buy', action: 'OPEN', 
    price: 1735.50, orderPrice: 1734.80, volume: 200, commission: 10.4, tax: 0, 
    slippage: 0.70, slippagePct: 0.04, latency: '14ms', latencyMs: 14, 
    strategyId: 'ST-ALPHA-01', strategyVersion: 'v2.4', strategyName: '核心价值多因子', 
    signalStrength: 82, executionSentiment: 65, triggerSource: 'FACTOR', status: 'FILLED', 
    pnl: 1400, complianceStatus: 'PASS' 
  },
  { 
    id: 'T10030', time: '14:20:10.552', symbol: '300750', name: '宁德时代', side: 'sell', action: 'CLOSE', 
    price: 212.40, orderPrice: 212.50, volume: 1000, commission: 6.2, tax: 212.4, 
    slippage: -0.10, slippagePct: -0.05, latency: '12ms', latencyMs: 12, 
    strategyId: 'ST-SENT-02', strategyVersion: 'v1.1', strategyName: '舆情恐慌博弈', 
    signalStrength: 95, executionSentiment: 22, triggerSource: 'SENTIMENT', status: 'FILLED', 
    pnl: 12500, complianceStatus: 'PASS' 
  },
  { 
    id: 'T10031', time: '13:55:00.115', symbol: '002230', name: '科大讯飞', side: 'buy', action: 'ADD', 
    price: 48.50, orderPrice: 48.25, volume: 5000, commission: 5.5, tax: 0, 
    slippage: 0.25, slippagePct: 0.51, latency: '158ms', latencyMs: 158, 
    strategyId: 'ST-EVENT-03', strategyVersion: 'v3.0', strategyName: '定增套利事件', 
    signalStrength: 78, executionSentiment: 88, triggerSource: 'EVENT', status: 'FILLED', 
    pnl: -4500, isManualOverride: true, complianceStatus: 'WARNING' 
  },
  { 
    id: 'T10032', time: '11:15:22.990', symbol: '000063', name: '中兴通讯', side: 'buy', action: 'OPEN', 
    price: 32.50, orderPrice: 32.50, volume: 2000, commission: 2.2, tax: 0, 
    slippage: 0.00, slippagePct: 0.00, latency: '24ms', latencyMs: 24, 
    strategyId: 'ST-ALPHA-01', strategyVersion: 'v2.4', strategyName: '核心价值多因子', 
    signalStrength: 60, executionSentiment: 55, triggerSource: 'FACTOR', status: 'PARTIAL', 
    pnl: 0, complianceStatus: 'PASS' 
  },
];

const MOCK_POSITIONS: Position[] = [
  { symbol: '600519', name: '贵州茅台', volume: 400, availableVolume: 400, avgCost: 1720.00, currentPrice: 1735.50, pnl: 6200, pnlPercent: 0.9, exposure: 694200, maxDrawdown: -1.2, dailyChange: 0.45 },
  { symbol: '002230', name: '科大讯飞', volume: 15000, availableVolume: 10000, avgCost: 49.20, currentPrice: 48.50, pnl: -10500, pnlPercent: -1.4, exposure: 727500, maxDrawdown: -4.5, dailyChange: -2.12 },
];

const MOCK_PERF_COMPARE = [
  { time: '09:30', sim: 100, live: 100 },
  { time: '10:30', sim: 100.5, live: 100.3 },
  { time: '11:30', sim: 101.2, live: 100.8 },
  { time: '13:30', sim: 100.9, live: 101.1 },
  { time: '14:30', sim: 102.1, live: 101.9 },
  { time: '15:00', sim: 102.5, live: 102.2 },
];

const TradeLedger: React.FC = () => {
  const [selectedTrade, setSelectedTrade] = useState<TradeLog | null>(null);
  const [accountType, setAccountType] = useState<'SIM' | 'LIVE'>('SIM');
  const [showAbnormalOnly, setShowAbnormalOnly] = useState(false);

  const filteredTrades = useMemo(() => {
    let list = MOCK_TRADES;
    if (showAbnormalOnly) {
      list = list.filter(t => t.complianceStatus !== 'PASS' || t.isManualOverride);
    }
    return list;
  }, [showAbnormalOnly]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] text-text-main relative overflow-hidden">
      {/* 1. Header: Institutional Account & Risk Overview */}
      <div className="shrink-0 h-24 border-b border-border bg-[#161B22]/50 backdrop-blur-md px-6 flex items-center justify-between z-40">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
               <Icons.History className="text-primary w-6 h-6" />
               交易记录 / 执行日志
            </h1>
            <div className="flex items-center gap-3 mt-1.5">
               <button 
                 onClick={() => setAccountType(accountType === 'SIM' ? 'LIVE' : 'SIM')}
                 className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-all shadow-glow-blue
                   ${accountType === 'SIM' ? 'bg-cyan/10 border-cyan/40 text-cyan' : 'bg-success/10 border-success/40 text-success'}
                 `}
               >
                 {accountType === 'SIM' ? 'SIMULATION #802' : 'LIVE PRODUCTION'}
               </button>
               <span className="text-[10px] text-text-muted font-mono flex items-center gap-1.5">
                 <Icons.Refresh className="w-3 h-3 animate-spin-slow" />
                 SYNCING WITH EXCHANGE
               </span>
            </div>
          </div>

          <div className="h-10 w-px bg-border/50" />

          <div className="grid grid-cols-3 gap-10">
            <StatItem label="总权益 (Total Equity)" value="¥ 1,245,600.00" subValue="可用: ¥ 425,100" />
            <StatItem label="今日盈亏 (P/L)" value="+¥ 12,450.00" color="text-success" subValue="+1.25% 跑赢基准" />
            <div className="flex flex-col gap-1">
               <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">风控状态</span>
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_#2EBD85]" />
                 <span className="text-sm font-bold text-success">NORMAL (SAFE)</span>
               </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="bg-background/80 border border-border rounded-xl p-1.5 flex gap-1">
             {['1D', '1W', '1M', 'YTD'].map(p => (
               <button key={p} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${p === '1D' ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}>{p}</button>
             ))}
           </div>
           <button className="p-2.5 bg-surface border border-border rounded-xl hover:bg-white/5 transition-colors shadow-sm">
             <Icons.Download className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* 2. Left Panel: Filters (Fixed width) */}
        <aside className="w-64 border-r border-border bg-[#161B22]/30 flex flex-col p-5 gap-8 shrink-0">
          <section className="space-y-4">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">策略 & 账户</div>
            <div className="space-y-2">
               <label className="text-[10px] text-text-muted">选择子账户</label>
               <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs outline-none focus:border-primary">
                 <option>All Accounts</option>
                 <option>Multi-Factor Alpha</option>
                 <option>T+0 Intraday</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] text-text-muted">执行逻辑</label>
               <div className="flex flex-col gap-1.5">
                  {['Multi-Factor', 'Sentiment', 'Event-Driven'].map(l => (
                    <label key={l} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" defaultChecked className="w-3 h-3 accent-primary" />
                      <span className="text-xs text-text-muted group-hover:text-text-main">{l}</span>
                    </label>
                  ))}
               </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border pb-2">交易属性</div>
            <div className="relative">
               <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
               <input type="text" placeholder="搜索代码/名称..." className="w-full bg-background border border-border rounded-lg pl-9 pr-3 py-2 text-xs outline-none focus:border-primary transition-all" />
            </div>
            <div className="flex items-center justify-between p-3 bg-danger/5 border border-danger/20 rounded-xl">
               <div className="flex items-center gap-2">
                 <Icons.Alert className="w-4 h-4 text-danger" />
                 <span className="text-[10px] font-bold text-danger">仅显示异常交易</span>
               </div>
               <button 
                 onClick={() => setShowAbnormalOnly(!showAbnormalOnly)}
                 className={`w-8 h-4 rounded-full relative transition-all ${showAbnormalOnly ? 'bg-danger' : 'bg-border'}`}
               >
                 <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${showAbnormalOnly ? 'left-4.5 shadow-sm' : 'left-0.5'}`} />
               </button>
            </div>
          </section>

          {/* Institutional Compliance Checklist */}
          <section className="mt-auto p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-3">
             <div className="text-[10px] font-bold text-primary flex items-center gap-2">
               <Icons.CheckCircle className="w-4 h-4" /> 算法合规自检
             </div>
             <div className="space-y-2">
                <ComplianceRow label="自成交校验" status="PASS" />
                <ComplianceRow label="价格笼子校验" status="PASS" />
                <ComplianceRow label="撤单率监控" status="WARNING" />
             </div>
          </section>
        </aside>

        {/* 3. Center Workspace: Trade Table & Performance */}
        <main className="flex-1 flex flex-col min-w-0 bg-background relative">
          <div className="flex-1 flex flex-col p-6 gap-6 min-h-0 overflow-hidden">
            {/* Core Ledger Table */}
            <div className="flex-1 glass-panel rounded-2xl border border-border overflow-hidden flex flex-col shadow-2xl">
               <div className="overflow-auto custom-scrollbar flex-1">
                 <table className="w-full text-left text-sm border-separate border-spacing-0 min-w-[1200px]">
                   <thead className="sticky top-0 z-30 bg-[#161B22]/95 backdrop-blur shadow-sm">
                     <tr className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
                       <th className="p-4 border-b border-border">Time (Executed)</th>
                       <th className="p-4 border-b border-border">Symbol</th>
                       <th className="p-4 border-b border-border">Side/Action</th>
                       <th className="p-4 border-b border-border text-right">Quantity</th>
                       <th className="p-4 border-b border-border text-right">Avg Fill Price</th>
                       <th className="p-4 border-b border-border">Strategy / Strength</th>
                       <th className="p-4 border-b border-border text-center">Sentiment</th>
                       <th className="p-4 border-b border-border text-right">Realized P/L</th>
                       <th className="p-4 border-b border-border text-center">Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border/30">
                     {filteredTrades.map(trade => (
                       <tr 
                        key={trade.id} 
                        onClick={() => setSelectedTrade(trade)}
                        className={`group hover:bg-white/[0.03] cursor-pointer transition-colors relative ${selectedTrade?.id === trade.id ? 'bg-primary/5' : ''}`}
                       >
                         <td className="p-4 font-mono text-[11px] text-text-muted">{trade.time}</td>
                         <td className="p-4">
                           <div className="font-bold text-white group-hover:text-primary transition-colors">{trade.name}</div>
                           <div className="text-[10px] font-mono text-text-muted">{trade.symbol}.SH</div>
                         </td>
                         <td className="p-4">
                           <div className="flex items-center gap-2">
                             <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${trade.side === 'buy' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                               {trade.side === 'buy' ? 'BUY' : 'SELL'}
                             </span>
                             <span className="text-[10px] font-bold text-text-muted bg-surface px-1.5 rounded">{trade.action}</span>
                             {/* Fix: Wrap Icons.Target in a span with title because Lucide icons do not support title prop */}
                             {trade.isManualOverride && <span title="Manual Intervention"><Icons.Target className="w-3.5 h-3.5 text-violet animate-pulse" /></span>}
                           </div>
                         </td>
                         <td className="p-4 text-right font-mono text-text-main">{trade.volume.toLocaleString()}</td>
                         <td className="p-4 text-right font-mono text-white">¥{trade.price.toFixed(2)}</td>
                         <td className="p-4">
                           <div className="text-xs font-medium text-text-main">{trade.strategyName}</div>
                           <div className="flex items-center gap-2 mt-1.5">
                             <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden max-w-[60px]">
                               <div className="h-full bg-cyan shadow-glow-cyan" style={{ width: `${trade.signalStrength}%` }} />
                             </div>
                             <span className="text-[9px] font-mono text-cyan">{trade.signalStrength}</span>
                           </div>
                         </td>
                         <td className="p-4">
                           <div className="flex justify-center">
                             <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono text-[10px] font-bold
                               ${trade.executionSentiment > 60 ? 'border-success/30 bg-success/5 text-success' : 'border-danger/30 bg-danger/5 text-danger'}
                             `}>
                               {trade.executionSentiment}
                             </div>
                           </div>
                         </td>
                         <td className={`p-4 text-right font-mono font-bold ${trade.pnl! >= 0 ? 'text-success' : 'text-danger'}`}>
                           {trade.pnl! > 0 ? '+' : ''}{trade.pnl?.toLocaleString()}
                         </td>
                         <td className="p-4 text-center">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-bold border 
                             ${trade.status === 'FILLED' ? 'border-success/40 text-success bg-success/5' : 
                               trade.status === 'PARTIAL' ? 'border-yellow-500/40 text-yellow-500 bg-yellow-500/5' : 'border-border text-text-muted bg-surface'}
                           `}>
                             {trade.status}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Position & Simulation Compare Panel (Bottom) */}
            <div className="h-64 grid grid-cols-12 gap-6 shrink-0">
               {/* Position List */}
               <div className="col-span-12 lg:col-span-8 glass-panel rounded-2xl border border-border p-5 flex flex-col gap-4">
                 <div className="flex justify-between items-center">
                   <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                     <Icons.Briefcase className="w-4 h-4 text-primary" /> 活跃持仓分布 (Positions)
                   </h3>
                   <span className="text-[10px] text-text-muted font-mono">2 ACTIVE POSITIONS</span>
                 </div>
                 <div className="flex-1 overflow-auto custom-scrollbar">
                   <table className="w-full text-left text-xs">
                     <thead className="text-text-muted border-b border-border/50 sticky top-0 bg-[#161B22]/50 backdrop-blur">
                       <tr>
                         <th className="pb-3 pl-2">Name</th>
                         <th className="pb-3 text-right">Vol (Avail)</th>
                         <th className="pb-3 text-right">Avg Cost</th>
                         <th className="pb-3 text-right">P/L %</th>
                         <th className="pb-3 text-right">Exposure</th>
                         <th className="pb-3 text-right">Max DD</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-border/20">
                       {MOCK_POSITIONS.map(pos => (
                         <tr key={pos.symbol} className="hover:bg-white/5 transition-colors">
                           <td className="py-3 pl-2">
                             <div className="font-bold text-white">{pos.name}</div>
                             <div className="text-[10px] font-mono text-text-muted">{pos.symbol}</div>
                           </td>
                           <td className="py-3 text-right font-mono text-text-main">{pos.volume} <span className="text-text-muted">({pos.availableVolume})</span></td>
                           <td className="py-3 text-right font-mono">¥{pos.avgCost.toFixed(2)}</td>
                           <td className={`py-3 text-right font-mono font-bold ${pos.pnlPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                             {pos.pnlPercent > 0 ? '+' : ''}{pos.pnlPercent}%
                           </td>
                           <td className="py-3 text-right font-mono text-text-main">¥{pos.exposure.toLocaleString()}</td>
                           <td className="py-3 text-right font-mono text-danger">{pos.maxDrawdown}%</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>

               {/* Simulation vs Live Efficiency */}
               <div className="col-span-12 lg:col-span-4 glass-panel rounded-2xl border border-border p-5 flex flex-col relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                 <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Icons.Activity className="w-4 h-4 text-cyan" /> 仿真与实盘绩效对比
                 </h3>
                 <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={MOCK_PERF_COMPARE}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip contentStyle={{backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px'}} />
                        <Line type="monotone" dataKey="sim" stroke="#2BC4A8" strokeWidth={2} dot={false} name="SIM Equity" />
                        <Line type="monotone" dataKey="live" stroke="#F6465D" strokeWidth={2} dot={false} name="LIVE Equity" />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-border/50 text-center relative z-10">
                   <div>
                     <div className="text-[9px] text-text-muted">追踪误差 (TE)</div>
                     <div className="text-sm font-mono font-bold text-cyan">12.5 bps</div>
                   </div>
                   <div>
                     <div className="text-[9px] text-text-muted">执行损耗</div>
                     <div className="text-sm font-mono font-bold text-danger">-0.32%</div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </main>

        {/* 4. Right Detail Drawer: Execution Deep-Dive */}
        {selectedTrade && (
          <aside className="w-[450px] border-l border-border bg-[#0D1117] flex flex-col z-50 animate-in slide-in-from-right duration-300 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
             <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <Icons.Zap className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-white">执行深度分析 (Journal)</h2>
                </div>
                <button onClick={() => setSelectedTrade(null)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <Icons.XCircle className="w-6 h-6 text-text-muted" />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                {/* 4.1 Trade Context */}
                <section className="space-y-5">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-2xl font-bold text-primary shadow-glow-blue">
                         {selectedTrade.name[0]}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{selectedTrade.name}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm font-mono text-text-muted">{selectedTrade.symbol}.SH</span>
                          <span className="px-2 py-0.5 bg-surface rounded text-[10px] text-text-muted border border-border">A-Shares</span>
                        </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <DrawerMetric label="执行策略" value={selectedTrade.strategyName} />
                      <DrawerMetric label="策略版本" value={selectedTrade.strategyVersion} />
                      <DrawerMetric label="触发源" value={selectedTrade.triggerSource} icon={<Icons.Cpu className="w-3 h-3 text-cyan" />} />
                      <DrawerMetric label="合规评级" value={selectedTrade.complianceStatus} color={selectedTrade.complianceStatus === 'PASS' ? 'text-success' : 'text-danger'} />
                   </div>
                </section>

                <div className="h-px bg-border/50" />

                {/* 4.2 Execution Quality Visualization */}
                <section className="space-y-4">
                   <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center justify-between">
                     执行质量监控
                     <span className="text-[10px] font-mono text-cyan">LATENCY: {selectedTrade.latency}</span>
                   </h3>
                   {/* Slippage Visualizer */}
                   <div className="p-4 bg-surface rounded-2xl border border-border flex flex-col gap-4">
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-text-muted">报单价 / 成交价</span>
                         <span className="font-mono text-white">¥{selectedTrade.orderPrice} / <span className="text-cyan">¥{selectedTrade.price}</span></span>
                      </div>
                      <div className="relative h-10 flex items-center">
                         <div className="absolute inset-0 h-1.5 bg-border rounded-full my-auto" />
                         <div className="absolute h-1.5 bg-danger rounded-full my-auto transition-all" style={{ left: '40%', width: `${Math.abs(selectedTrade.slippagePct) * 100}%` }} />
                         <div className="absolute left-[40%] w-0.5 h-6 bg-white z-10" title="Order Price" />
                         <div className={`absolute w-3 h-3 rounded-full z-20 shadow-lg ${selectedTrade.slippage > 0 ? 'bg-danger shadow-glow-red' : 'bg-success shadow-glow-cyan'}`} 
                              style={{ left: `${40 + selectedTrade.slippagePct * 10}%` }} title="Fill Price" />
                      </div>
                      <div className="flex justify-between items-center">
                         <div className="text-[10px] text-text-muted">
                            滑点损耗: <span className={`font-mono font-bold ${selectedTrade.slippage > 0 ? 'text-danger' : 'text-success'}`}>{selectedTrade.slippagePct}%</span>
                         </div>
                         <div className="text-[10px] text-text-muted">
                            税费预估: <span className="font-mono text-white">¥{selectedTrade.tax}</span>
                         </div>
                      </div>
                   </div>
                </section>

                {/* 4.3 AI Trade Review */}
                <section className="p-5 bg-violet/5 border border-violet/20 rounded-2xl relative overflow-hidden group">
                   <Icons.Robot className="absolute -right-6 -bottom-6 w-32 h-32 text-violet opacity-10 group-hover:scale-110 transition-transform duration-700" />
                   <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-widest mb-3">
                      <Icons.Sparkles className="w-4 h-4 animate-pulse" /> AI 投后审计报告
                   </div>
                   <p className="text-sm text-text-main leading-relaxed relative z-10 italic">
                      “该笔交易发生在市场情绪 <span className="text-cyan">修复期</span>。策略模型捕捉到了 <span className="text-white font-bold">2.41 因子</span> 的异常共振信号。
                      执行时延 <span className="text-cyan">{selectedTrade.latency}</span> 处于低位，成功规避了 14:50 分的尾盘剧烈波动。
                      合规性审计：<span className="text-success font-bold underline">完全合规</span>。”
                   </p>
                   <div className="mt-4 flex gap-2 relative z-10">
                      {['MOM_STRENGTH_HIGH', 'VOL_LOW', 'REGIME_LONG'].map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-violet/10 text-violet border border-violet/20 rounded text-[8px] font-bold">#{tag}</span>
                      ))}
                   </div>
                </section>

                {/* 4.4 Market Context Snapshot */}
                <section className="space-y-4">
                   <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">成交时刻行情快照</h3>
                   <div className="h-40 bg-surface/30 border border-border rounded-2xl p-2">
                      <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={MOCK_PERF_COMPARE}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Area type="monotone" dataKey="sim" stroke="#1F6FEB" fill="#1F6FEB" fillOpacity={0.1} />
                            <ReferenceLine x="14:30" stroke="#F6465D" strokeDasharray="3 3" label={{ position: 'top', value: 'Trade Point', fill: '#F6465D', fontSize: 10 }} />
                         </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </section>
             </div>

             <div className="p-6 bg-[#161B22] border-t border-border flex gap-4 shrink-0">
                <button className="flex-1 py-3 text-xs font-bold border border-border rounded-xl hover:bg-white/5 transition-all text-text-muted uppercase tracking-tighter">
                  下载原始报单日志
                </button>
                <button className="flex-1 py-3 text-xs font-bold bg-primary text-white rounded-xl shadow-glow-blue hover:brightness-110 transition-all uppercase tracking-tighter">
                  标记为算法错误
                </button>
             </div>
          </aside>
        )}
      </div>

      {/* Global Bottom Status Bar */}
      <div className="h-10 shrink-0 border-t border-border bg-[#161B22]/80 px-6 flex items-center justify-between text-[10px] z-[60]">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 text-text-muted">
             <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
             NODE: <span className="text-text-main font-mono">HK-PROD-QUANT-01</span>
           </div>
           <div className="w-px h-3 bg-border" />
           <div className="flex items-center gap-2 text-text-muted">
             API LATENCY: <span className="text-cyan font-mono">8.2ms</span>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <span className="text-text-muted uppercase">Compliance Mode: <span className="text-success font-bold">STRICT (LEVEL 4)</span></span>
           <span className="text-text-muted font-mono">2023-11-20 15:00:00 JST</span>
        </div>
      </div>

      {/* Global Background Grid Overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[-1]" 
           style={{ backgroundImage: 'linear-gradient(#2BC4A8 1px, transparent 1px), linear-gradient(90deg, #2BC4A8 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>
  );
};

// --- Helper Components ---
const StatItem = ({ label, value, color = "text-white", subValue }: any) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{label}</span>
    <span className={`text-lg font-mono font-bold leading-none ${color}`}>{value}</span>
    {subValue && <span className="text-[9px] text-text-muted font-mono">{subValue}</span>}
  </div>
);

const DrawerMetric = ({ label, value, icon, color = "text-white" }: any) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] text-text-muted uppercase font-bold">{label}</span>
    <div className="flex items-center gap-2">
      {icon}
      <span className={`text-sm font-bold truncate ${color}`}>{value}</span>
    </div>
  </div>
);

const ComplianceRow = ({ label, status }: { label: string, status: string }) => (
  <div className="flex items-center justify-between text-[9px]">
    <span className="text-text-muted">{label}</span>
    <span className={`font-bold ${status === 'PASS' ? 'text-success' : 'text-yellow-500'}`}>{status}</span>
  </div>
);

export default TradeLedger;
