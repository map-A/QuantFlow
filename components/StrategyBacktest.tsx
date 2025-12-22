import React, { useState } from 'react';
import { MOCK_STRATEGIES, MOCK_BACKTEST_METRICS, MOCK_BACKTEST_TRADES } from '../constants';
import { Icons } from './Icons';
import { Strategy, BacktestConfig } from '../types';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Line, 
  PieChart, Pie, Cell, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

const STRATEGY_TEMPLATES = [
  { 
    name: '均线交叉策略 (MA Cross)', 
    code: 'def handle_data(context, data):\n    hist = data.history(context.security, "close", 20, "1d")\n    ma5 = hist[-5:].mean()\n    ma20 = hist.mean()\n    if ma5 > ma20: api.order_target_percent(context.security, 1.0)' 
  },
  { 
    name: 'RSI 超买超卖 (RSI Mean Reversion)', 
    code: 'def handle_data(context, data):\n    rsi = api.get_indicator(context.security, "RSI")\n    if rsi < 30: api.order_target_percent(context.security, 1.0)\n    elif rsi > 70: api.order_target(context.security, 0)' 
  }
];

const StrategyBacktest: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>(MOCK_STRATEGIES);
  const [activeStrategy, setActiveStrategy] = useState<Strategy | null>(strategies[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [view, setView] = useState<'editor' | 'results'>('editor');
  const [showParams, setShowParams] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  // New Strategy Form State
  const [newStratName, setNewStratName] = useState('');
  const [newStratCode, setNewStratCode] = useState(STRATEGY_TEMPLATES[0].code);

  const [config, setConfig] = useState<BacktestConfig>({
      startDate: '2023-01-01',
      endDate: '2023-10-31',
      initialCapital: 1000000,
      benchmark: '000300.SH',
      frequency: 'daily',
      fees: 0.0003
  });

  const [params, setParams] = useState({
      ma_window_short: 5,
      ma_window_long: 20,
      stop_loss_pct: 0.08,
      take_profit_pct: 0.15,
      position_size: 0.9,
      enable_atr_filter: true
  });

  const [activeResultTab, setActiveResultTab] = useState<'trades' | 'positions' | 'stats' | 'factors' | 'ai'>('trades');

  const handleRunBacktest = () => {
      setIsRunning(true);
      setTimeout(() => {
          setIsRunning(false);
          setView('results');
      }, 1500);
  }

  const handleCreateStrategy = () => {
    if (!newStratName.trim()) return;
    const newStrat: Strategy = {
      id: String(Date.now()),
      name: newStratName,
      code: newStratCode,
      returnRate: 0,
      sharpeRatio: 0,
      drawdown: 0,
      status: 'backtesting',
      lastRun: new Date().toLocaleString()
    };
    setStrategies([newStrat, ...strategies]);
    setActiveStrategy(newStrat);
    setIsCreating(false);
    setNewStratName('');
    setView('editor');
  };

  const COLORS = ['#2BC4A8', '#F6465D', '#1F6FEB', '#C084FC'];

  // Mock Data for Charts
  const equityData = Array.from({length: 100}, (_, i) => ({
      day: `D${i + 1}`,
      strategy: 100 + i * 0.5 + Math.sin(i * 0.2) * 5 + Math.random() * 2,
      benchmark: 100 + (i * 0.2) + Math.cos(i * 0.1) * 3,
      drawdown: -Math.abs(Math.sin(i * 0.2) * 2.5)
  }));

  const factorData = [
      { subject: '动量', A: 120, fullMark: 150 },
      { subject: '价值', A: 98, fullMark: 150 },
      { subject: '波动率', A: 86, fullMark: 150 },
      { subject: '成长', A: 99, fullMark: 150 },
      { subject: '质量', A: 85, fullMark: 150 },
      { subject: '流动性', A: 65, fullMark: 150 },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden bg-[#0D1117] relative">
        {/* Left Sidebar: Strategy Library */}
        <div className="w-64 border-r border-border bg-surface/50 flex flex-col shrink-0">
            <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="font-bold flex items-center gap-2 text-white">
                    <Icons.Layers className="w-5 h-5 text-violet" />
                    策略库
                </h2>
                <button className="p-1 hover:bg-white/10 rounded text-text-muted">
                    <Icons.Copy className="w-4 h-4" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {strategies.map(strat => (
                    <div 
                        key={strat.id} 
                        onClick={() => { setActiveStrategy(strat); setView('editor'); }}
                        className={`p-4 border-b border-border/50 cursor-pointer hover:bg-white/5 transition-colors
                            ${activeStrategy?.id === strat.id ? 'bg-white/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}
                        `}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-sm truncate w-32 text-text-main">{strat.name}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${strat.status === 'active' ? 'bg-success/10 text-success' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                {strat.status === 'active' ? '实盘' : '开发中'}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs text-text-muted mt-2">
                            <span>收益: <span className="text-success">{strat.returnRate > 0 ? '+' : ''}{strat.returnRate}%</span></span>
                            <span>夏普: {strat.sharpeRatio || '--'}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-border">
                <button 
                  onClick={() => setIsCreating(true)}
                  className="w-full py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm hover:bg-primary/20 flex items-center justify-center gap-2 transition-colors"
                >
                    <Icons.Zap className="w-4 h-4" />
                    新建策略
                </button>
            </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
            {/* Header: Controls & Config */}
            <div className="h-16 border-b border-border bg-surface/30 backdrop-blur flex items-center justify-between px-6 shrink-0 z-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Icons.Code className="w-5 h-5 text-text-muted" />
                        <span className="font-bold text-lg text-white">{activeStrategy?.name}</span>
                    </div>
                    
                    <div className="h-8 w-px bg-border"></div>

                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-text-muted text-[10px]">回测区间</span>
                            <div className="flex items-center gap-2">
                                <input type="date" value={config.startDate} onChange={e=>setConfig({...config, startDate: e.target.value})} className="bg-transparent text-text-main border-none p-0 focus:ring-0 w-24 font-mono"/>
                                <span className="text-text-muted">→</span>
                                <input type="date" value={config.endDate} onChange={e=>setConfig({...config, endDate: e.target.value})} className="bg-transparent text-text-main border-none p-0 focus:ring-0 w-24 font-mono"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-text-muted text-[10px]">初始资金</span>
                            <input type="text" value={config.initialCapital.toLocaleString()} className="bg-transparent text-text-main border-none p-0 focus:ring-0 w-20 font-mono" readOnly/>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex p-1 bg-surface border border-border rounded-lg">
                        <button onClick={() => setView('editor')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${view === 'editor' ? 'bg-primary text-white shadow' : 'text-text-muted hover:text-white'}`}>
                            代码
                        </button>
                        <button onClick={() => setView('results')} className={`px-3 py-1 text-xs font-medium rounded transition-all ${view === 'results' ? 'bg-primary text-white shadow' : 'text-text-muted hover:text-white'}`}>
                            结果
                        </button>
                    </div>

                    <button 
                        onClick={handleRunBacktest}
                        disabled={isRunning}
                        className="ml-2 flex items-center gap-2 px-4 py-1.5 bg-success text-white rounded-lg hover:bg-success/90 transition-all shadow-lg shadow-success/20 disabled:opacity-50 font-bold text-xs"
                    >
                        {isRunning ? <Icons.Refresh className="w-4 h-4 animate-spin" /> : <Icons.Play className="w-4 h-4" />}
                        {isRunning ? '正在运行...' : '运行回测'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {view === 'editor' ? (
                    <div className="h-full flex">
                        <div className="flex-1 h-full bg-[#0d1117] flex flex-col relative">
                             <div className="flex-1 flex overflow-hidden">
                                <div className="w-12 pt-4 text-right pr-4 text-text-muted/30 font-mono text-sm select-none border-r border-border/30 bg-surface/10">
                                    {Array.from({length: 40}, (_, i) => <div key={i}>{i+1}</div>)}
                                </div>
                                <div className="flex-1 p-4 font-mono text-sm text-text-main overflow-auto custom-scrollbar leading-relaxed">
                                    <pre className="whitespace-pre-wrap">
                                        {activeStrategy?.code || '# Select a strategy or create a new one'}
                                    </pre>
                                </div>
                             </div>
                        </div>
                        
                        {showParams && (
                            <div className="w-80 border-l border-border bg-surface/30 backdrop-blur flex flex-col">
                                <div className="h-10 border-b border-border flex items-center justify-between px-4">
                                    <span className="text-xs font-bold text-text-muted uppercase">策略参数</span>
                                    <button onClick={() => setShowParams(false)} className="text-text-muted hover:text-white"><Icons.ArrowRight className="w-3 h-3" /></button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    <ParamInput label="短期均线" value={params.ma_window_short} onChange={(v:any) => setParams({...params, ma_window_short: v})} />
                                    <ParamInput label="长期均线" value={params.ma_window_long} onChange={(v:any) => setParams({...params, ma_window_long: v})} />
                                    <ParamInput label="止损阈值" value={params.stop_loss_pct} step={0.01} onChange={(v:any) => setParams({...params, stop_loss_pct: v})} />
                                    <div className="pt-4 mt-auto">
                                        <button className="w-full py-2 bg-surface border border-border rounded text-xs text-text-muted hover:text-white hover:border-primary transition-colors">
                                            保存并更新
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar bg-background">
                        {/* Results Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6 border-b border-border">
                            <MetricCard label="总收益率" value={`+${MOCK_BACKTEST_METRICS.totalReturn}%`} color="text-success" />
                            <MetricCard label="年化收益" value={`${MOCK_BACKTEST_METRICS.annualizedReturn}%`} color="text-success" />
                            <MetricCard label="最大回撤" value={`${MOCK_BACKTEST_METRICS.maxDrawdown}%`} color="text-danger" />
                            <MetricCard label="夏普比率" value={MOCK_BACKTEST_METRICS.sharpe} color="text-cyan" />
                            <MetricCard label="胜率" value={`${MOCK_BACKTEST_METRICS.winRate}%`} color="text-text-main" />
                            <MetricCard label="Calmar比率" value={MOCK_BACKTEST_METRICS.calmar} color="text-text-main" />
                        </div>

                        {/* Charts Area */}
                        <div className="flex flex-col lg:flex-row h-[400px] border-b border-border">
                            <div className="flex-[2] p-4 border-r border-border flex flex-col">
                                <div className="flex justify-between mb-2">
                                    <h3 className="text-xs font-bold text-text-muted">净值曲线</h3>
                                </div>
                                <div className="flex-1">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={equityData}>
                                            <defs>
                                                <linearGradient id="colorStrategy" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2BC4A8" stopOpacity={0.2}/>
                                                    <stop offset="95%" stopColor="#2BC4A8" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                                            <XAxis dataKey="day" hide />
                                            <YAxis orientation="right" tick={{fontSize: 10, fill: '#8B949E'}} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                                            <Tooltip contentStyle={{backgroundColor:'#161B22', borderColor:'#30363D'}} />
                                            <Area type="monotone" dataKey="strategy" stroke="#2BC4A8" strokeWidth={2} fill="url(#colorStrategy)" />
                                            <Line type="monotone" dataKey="benchmark" stroke="#555" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            
                            <div className="flex-1 p-4 flex flex-col bg-surface/10">
                                <h3 className="text-xs font-bold text-text-muted mb-2">回撤分析</h3>
                                <div className="flex-1">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={equityData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                                            <XAxis dataKey="day" hide />
                                            <YAxis orientation="right" tick={{fontSize: 10, fill: '#8B949E'}} axisLine={false} tickLine={false} />
                                            <Tooltip contentStyle={{backgroundColor:'#161B22', borderColor:'#30363D'}} />
                                            <Area type="step" dataKey="drawdown" stroke="#F6465D" fill="#F6465D" fillOpacity={0.2} strokeWidth={1} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-border bg-surface/30 sticky top-0 z-10">
                            <TabButton id="trades" label="交易明细" icon={Icons.List} active={activeResultTab} set={setActiveResultTab} />
                            <TabButton id="positions" label="持仓分析" icon={Icons.Pie} active={activeResultTab} set={setActiveResultTab} />
                            <TabButton id="stats" label="统计详情" icon={Icons.Market} active={activeResultTab} set={setActiveResultTab} />
                            <TabButton id="factors" label="因子暴露" icon={Icons.Layers} active={activeResultTab} set={setActiveResultTab} />
                        </div>

                        <div className="p-6">
                            {activeResultTab === 'trades' && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="text-xs text-text-muted border-b border-border">
                                            <tr>
                                                <th className="p-2">时间</th>
                                                <th className="p-2">代码</th>
                                                <th className="p-2">方向</th>
                                                <th className="p-2 text-right">成交价</th>
                                                <th className="p-2 text-right">数量</th>
                                                <th className="p-2 text-right">盈亏</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/30">
                                            {MOCK_BACKTEST_TRADES.map(trade => (
                                                <tr key={trade.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="p-2 font-mono text-text-muted">{trade.time}</td>
                                                    <td className="p-2 font-bold">{trade.name}</td>
                                                    <td className={`p-2 font-bold ${trade.side === 'buy' ? 'text-success' : 'text-danger'}`}>{trade.side === 'buy' ? '买入' : '卖出'}</td>
                                                    <td className="p-2 text-right font-mono">{trade.price.toFixed(2)}</td>
                                                    <td className="p-2 text-right font-mono">{trade.volume}</td>
                                                    <td className={`p-2 text-right font-mono font-bold ${trade.pnl && trade.pnl > 0 ? 'text-success' : 'text-danger'}`}>
                                                        {trade.pnl ? (trade.pnl > 0 ? '+' : '') + trade.pnl.toFixed(2) : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {activeResultTab === 'factors' && (
                                <div className="flex h-[350px] items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={factorData}>
                                            <PolarGrid stroke="#30363D" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 12 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                            <Radar name="Exposure" dataKey="A" stroke="#2BC4A8" strokeWidth={2} fill="#2BC4A8" fillOpacity={0.3} />
                                            <Tooltip contentStyle={{backgroundColor:'#161B22', borderColor:'#30363D'}} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Create Strategy Modal */}
        {isCreating && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
                <div className="bg-surface border border-border rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Icons.Zap className="text-primary w-6 h-6" />
                            新建策略
                        </h3>
                        <button onClick={() => setIsCreating(false)} className="text-text-muted hover:text-white p-1">
                            <Icons.XCircle className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm text-text-muted">策略名称</label>
                            <input 
                                type="text" 
                                value={newStratName}
                                onChange={(e) => setNewStratName(e.target.value)}
                                placeholder="输入策略名称，例如：双均线金叉策略 v1"
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-text-muted">选择模板</label>
                            <div className="grid grid-cols-2 gap-3">
                                {STRATEGY_TEMPLATES.map((tmpl, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setNewStratCode(tmpl.code)}
                                        className={`p-3 text-left rounded-xl border transition-all text-xs
                                            ${newStratCode === tmpl.code ? 'border-primary bg-primary/5 text-white' : 'border-border hover:border-white/20 text-text-muted'}
                                        `}
                                    >
                                        <div className="font-bold mb-1">{tmpl.name}</div>
                                        <div className="opacity-60 truncate">基础量化模板代码</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-text-muted">代码预览</label>
                            <div className="bg-[#0D1117] border border-border rounded-xl p-4 font-mono text-xs text-cyan h-48 overflow-y-auto">
                                <textarea 
                                    value={newStratCode}
                                    onChange={(e) => setNewStratCode(e.target.value)}
                                    className="w-full h-full bg-transparent border-none outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-surface border-t border-border flex gap-3 justify-end">
                        <button 
                            onClick={() => setIsCreating(false)}
                            className="px-6 py-2 text-sm text-text-muted hover:text-white transition-colors"
                        >
                            取消
                        </button>
                        <button 
                            onClick={handleCreateStrategy}
                            className="px-8 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                        >
                            创建策略
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

const MetricCard = ({label, value, color}: any) => (
    <div className="p-4 bg-surface/50 rounded-xl border border-border hover:border-primary/30 transition-all">
        <div className="text-xs text-text-muted mb-1">{label}</div>
        <div className={`text-2xl font-mono font-bold ${color}`}>{value}</div>
    </div>
)

const TabButton = ({id, label, icon: Icon, active, set}: any) => (
    <button 
        onClick={() => set(id)}
        className={`flex items-center gap-2 px-6 py-3 text-xs font-bold border-b-2 transition-all hover:bg-white/5
            ${active === id ? 'border-primary text-white bg-white/5' : 'border-transparent text-text-muted'}
        `}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
)

const ParamInput = ({label, value, onChange, step=1, max}: any) => (
    <div className="space-y-1">
        <label className="text-xs text-text-muted">{label}</label>
        <div className="flex gap-2">
            <input 
                type="number" 
                value={value} 
                step={step}
                max={max}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full bg-background border border-border rounded px-2 py-1.5 text-xs text-white outline-none focus:border-primary font-mono"
            />
        </div>
    </div>
)

const StatRow = ({label, value}: any) => (
    <div className="flex justify-between items-center text-sm py-2 border-b border-border/30 last:border-0">
        <span className="text-text-muted">{label}</span>
        <span className="font-mono font-medium">{value}</span>
    </div>
)

export default StrategyBacktest;