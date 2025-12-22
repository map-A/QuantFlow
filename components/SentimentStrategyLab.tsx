
import React, { useState, useMemo } from 'react';
import { Icons } from './Icons';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, 
  Cell, LineChart, Line, ReferenceLine
} from 'recharts';

// --- Types & Interfaces ---
interface Rule {
  id: string;
  variable: string;
  operator: string;
  value: string;
  action: string;
  enabled: boolean;
}

interface FactorWeight {
  id: string;
  name: string;
  base: number;
  low: number;
  neutral: number;
  high: number;
}

interface StrategyGate {
  id: string;
  name: string;
  condition: string;
  status: 'ACTIVE' | 'INACTIVE';
}

// --- Mock Data ---
const MOCK_RULES: Rule[] = [
  { id: 'r1', variable: 'Sentiment Score', operator: '>', value: '60', action: 'Enable Growth Factors', enabled: true },
  { id: 'r2', variable: 'Regime', operator: '==', value: '冰点', action: 'Switch to Defensive Mode', enabled: true },
  { id: 'r3', variable: 'Volatility', operator: '<', value: '20', action: 'Increase Leverage', enabled: false },
];

const MOCK_FACTOR_WEIGHTS: FactorWeight[] = [
  { id: 'f1', name: 'Momentum_20D', base: 30, low: 10, neutral: 30, high: 60 },
  { id: 'f2', name: 'ROE_TTM', base: 40, low: 50, neutral: 40, high: 20 },
  { id: 'f3', name: 'Volatility_Rank', base: 30, low: 40, neutral: 30, high: 20 },
];

const MOCK_STRATEGY_GATES: StrategyGate[] = [
  { id: 's1', name: 'Breakout Momentum', condition: 'Sentiment ≥ 活跃', status: 'ACTIVE' },
  { id: 's2', name: 'Mean Reversion', condition: 'Sentiment ≤ 修复', status: 'INACTIVE' },
  { id: 's3', name: 'Core Alpha', condition: 'Sentiment ≥ 中性', status: 'ACTIVE' },
];

const BACKTEST_TIMELINE_DATA = Array.from({ length: 60 }, (_, i) => {
  const sentiment = i < 15 ? 20 : i < 35 ? 75 : i < 50 ? 55 : 85;
  const regime = sentiment < 30 ? 'Low' : sentiment < 65 ? 'Neutral' : 'High';
  return {
    date: `2023-${String(Math.floor(i / 5) + 1).padStart(2, '0')}-${String((i % 5) * 6 + 1).padStart(2, '0')}`,
    strategy: 100 + i * 0.8 + Math.sin(i * 0.5) * 5,
    benchmark: 100 + i * 0.3 + Math.cos(i * 0.4) * 3,
    sentiment,
    regimeColor: regime === 'Low' ? '#F6465D22' : regime === 'Neutral' ? '#1F6FEB22' : '#2BC4A822',
  };
});

// --- Sub-components ---

const Panel = ({ title, children, className = "", icon: Icon, extra }: any) => (
  <div className={`bg-[#161B22]/60 backdrop-blur-xl border border-border/50 rounded-xl flex flex-col overflow-hidden ${className}`}>
    <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-white/5">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary shadow-glow-blue" />}
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{title}</span>
      </div>
      {extra && <div className="flex items-center gap-2">{extra}</div>}
    </div>
    <div className="flex-1 overflow-auto custom-scrollbar p-4">
      {children}
    </div>
  </div>
);

const SentimentStrategyLab: React.FC = () => {
  const [globalEnable, setGlobalEnable] = useState(true);
  const [activeRegime, setActiveRegime] = useState('活跃');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#2BC4A8 1px, transparent 1px), linear-gradient(90deg, #2BC4A8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* 1. Top Header: Sentiment Control Panel */}
      <div className="h-24 shrink-0 glass-panel rounded-2xl border border-primary/20 bg-primary/5 px-6 flex items-center justify-between z-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan/10 opacity-50"></div>
        
        <div className="flex items-center gap-8 relative z-10">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-glow-blue">
                <Icons.Flame className="w-8 h-8 text-danger animate-pulse" />
             </div>
             <div>
                <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  市场情绪条件控制 <span className="text-[10px] text-text-muted font-normal bg-surface px-2 py-0.5 rounded border border-border">Sentiment Adaptive</span>
                </h1>
                <div className="flex items-center gap-4 mt-1 font-mono">
                  <span className="text-2xl font-bold text-cyan">72.4 <span className="text-xs font-normal text-text-muted">PTS</span></span>
                  <div className="h-4 w-px bg-border"></div>
                  <span className="text-sm font-bold text-cyan px-2 py-0.5 bg-cyan/10 rounded">Regime: {activeRegime}</span>
                </div>
             </div>
          </div>
          
          <div className="h-12 w-px bg-border/50"></div>

          <div className="flex flex-col gap-2">
             <span className="text-[10px] text-text-muted uppercase font-bold">情绪趋势 (60D)</span>
             <div className="w-48 h-10">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={BACKTEST_TIMELINE_DATA.slice(-20)}>
                      <Area type="monotone" dataKey="sentiment" stroke="#2BC4A8" fill="#2BC4A8" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="flex flex-col items-end gap-1">
             <span className="text-[10px] text-text-muted font-bold uppercase">Global Sentiment Filter</span>
             <button 
               onClick={() => setGlobalEnable(!globalEnable)}
               className={`w-12 h-6 rounded-full relative transition-all ${globalEnable ? 'bg-primary' : 'bg-surface border border-border'}`}
             >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${globalEnable ? 'left-7 shadow-glow-blue' : 'left-1'}`} />
             </button>
          </div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-cyan text-white rounded-xl text-sm font-bold shadow-glow-blue hover:brightness-110 transition-all flex items-center gap-2">
             <Icons.Save className="w-4 h-4" />
             应用设置
          </button>
        </div>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT: Rules & Strategies (4 cols) */}
        <div className="col-span-4 flex flex-col gap-6">
           {/* Sentiment Filter Rules */}
           <Panel title="情绪过滤规则 (Filter Rules)" icon={Icons.Filter} extra={<button className="p-1 hover:text-white transition-colors"><Icons.Plus className="w-3.5 h-3.5" /></button>}>
              <div className="space-y-3">
                 {MOCK_RULES.map(rule => (
                   <div key={rule.id} className={`p-3 rounded-xl border transition-all relative overflow-hidden group ${rule.enabled ? 'bg-primary/5 border-primary/30' : 'bg-surface/30 border-border/50 opacity-60'}`}>
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-main">{rule.variable}</span>
                            <span className="text-xs text-primary font-mono">{rule.operator}</span>
                            <span className="text-xs font-bold text-white">{rule.value}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <button className="p-1 text-text-muted hover:text-white"><Icons.Settings className="w-3 h-3" /></button>
                            <div className={`w-2 h-2 rounded-full ${rule.enabled ? 'bg-primary animate-pulse' : 'bg-text-muted'}`}></div>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-text-muted">
                         <Icons.Zap className="w-3 h-3 text-cyan" />
                         Then Action: <span className="text-white font-bold">{rule.action}</span>
                      </div>
                      {rule.enabled && <div className="absolute top-0 right-0 w-1 h-full bg-primary/40"></div>}
                   </div>
                 ))}
                 <div className="flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-border/50"></div>
                    <button className="px-3 py-1 border border-border rounded text-[10px] text-text-muted hover:text-white">ADD AND/OR LOGIC</button>
                    <div className="h-px flex-1 bg-border/50"></div>
                 </div>
              </div>
           </Panel>

           {/* Strategy Gates */}
           <Panel title="策略准入控制 (Strategy Gate)" icon={Icons.Lock}>
              <div className="space-y-3">
                 {MOCK_STRATEGY_GATES.map(gate => (
                   <div key={gate.id} className="p-3 bg-surface/50 border border-border rounded-xl flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${gate.status === 'ACTIVE' ? 'bg-success/10 text-success' : 'bg-surface border border-border text-text-muted'}`}>
                            {gate.status === 'ACTIVE' ? <Icons.Unlock className="w-4 h-4" /> : <Icons.Lock className="w-4 h-4" />}
                         </div>
                         <div>
                            <div className="text-xs font-bold text-white">{gate.name}</div>
                            <div className="text-[10px] text-text-muted">Gate: {gate.condition}</div>
                         </div>
                      </div>
                      <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${gate.status === 'ACTIVE' ? 'text-success bg-success/10 shadow-[0_0_8px_rgba(46,189,133,0.2)]' : 'text-text-muted bg-surface'}`}>
                         {gate.status}
                      </div>
                   </div>
                 ))}
              </div>
           </Panel>
        </div>

        {/* CENTER: Weight Matrix (5 cols) */}
        <div className="col-span-5 flex flex-col gap-6 overflow-hidden">
           <Panel 
             title="因子权重动态调节矩阵" 
             icon={Icons.Sliders}
             extra={<button className="text-[10px] text-primary hover:underline">Auto-Normalize Weights</button>}
           >
              <div className="flex flex-col h-full">
                 <div className="grid grid-cols-12 gap-4 mb-4 text-[10px] font-bold text-text-muted uppercase px-2">
                    <div className="col-span-4">Factor Name</div>
                    <div className="col-span-2 text-center">Low Sent</div>
                    <div className="col-span-2 text-center">Neutral</div>
                    <div className="col-span-2 text-center">High Sent</div>
                    <div className="col-span-2 text-right">Preview</div>
                 </div>
                 <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    {MOCK_FACTOR_WEIGHTS.map(factor => (
                      <div key={factor.id} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-primary/30 transition-all">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-text-main">{factor.name}</span>
                            <span className="text-[10px] text-text-muted">Base: {factor.base}%</span>
                         </div>
                         <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-12 flex items-center gap-4">
                               <div className="flex-1 flex flex-col gap-3">
                                  <div className="flex items-center gap-3">
                                     <span className="w-10 text-[9px] text-danger">Low</span>
                                     <input type="range" className="flex-1 accent-danger h-1 rounded-full bg-surface" defaultValue={factor.low} />
                                     <span className="w-6 text-[9px] font-mono text-white">{factor.low}%</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                     <span className="w-10 text-[9px] text-primary">Med</span>
                                     <input type="range" className="flex-1 accent-primary h-1 rounded-full bg-surface" defaultValue={factor.neutral} />
                                     <span className="w-6 text-[9px] font-mono text-white">{factor.neutral}%</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                     <span className="w-10 text-[9px] text-cyan">High</span>
                                     <input type="range" className="flex-1 accent-cyan h-1 rounded-full bg-surface" defaultValue={factor.high} />
                                     <span className="w-6 text-[9px] font-mono text-white">{factor.high}%</span>
                                  </div>
                               </div>
                               <div className="w-16 h-16 rounded-full border-4 border-surface border-t-primary border-r-cyan flex items-center justify-center relative">
                                  <span className="text-[10px] font-bold text-white">{factor.neutral}%</span>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-4 p-4 bg-violet/5 border border-violet/20 rounded-xl relative overflow-hidden flex flex-col gap-2">
                    <Icons.Robot className="absolute -right-4 -top-4 w-20 h-20 text-violet opacity-5" />
                    <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-widest">
                       <Icons.Sparkles className="w-4 h-4 shadow-glow-blue" />
                       AI 动态权重建议
                    </div>
                    <p className="text-[10px] text-text-muted leading-relaxed">
                       监测到情绪快速从 <span className="text-white">中性</span> 转向 <span className="text-white">活跃</span>。建议将 <span className="text-cyan font-bold">Momentum_20D</span> 的高情绪权重上调至 75% 以捕捉趋势。
                    </p>
                    <button className="w-full py-2 bg-violet/10 border border-violet/30 rounded text-[10px] text-violet font-bold hover:bg-violet/20 transition-all">
                       接受并优化权重
                    </button>
                 </div>
              </div>
           </Panel>
        </div>

        {/* RIGHT: Performance & Insights (3 cols) */}
        <div className="col-span-3 flex flex-col gap-6">
           {/* Backtest Segmentation */}
           <Panel title="情绪分区回测预览" icon={Icons.Activity}>
              <div className="flex flex-col h-full gap-4">
                 <div className="flex-1 min-h-[180px] bg-surface/30 rounded-xl border border-border p-2 relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-[10px] text-text-muted z-10 font-bold uppercase tracking-widest">Equity Curve vs Regime</div>
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={BACKTEST_TIMELINE_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                          <XAxis dataKey="date" hide />
                          <YAxis hide domain={['auto', 'auto']} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} 
                            labelStyle={{ marginBottom: 4 }}
                          />
                          <Area type="monotone" dataKey="strategy" stroke="#1F6FEB" fill="#1F6FEB" fillOpacity={0.05} strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="benchmark" stroke="#555" dot={false} strokeWidth={1} strokeDasharray="3 3" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="space-y-2">
                    <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Performance by Regime</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                       <div className="p-2 bg-danger/10 border border-danger/20 rounded-lg">
                          <div className="text-[9px] text-text-muted mb-1">Low Sent</div>
                          <div className="text-xs font-bold text-danger">+12.4%</div>
                       </div>
                       <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
                          <div className="text-[9px] text-text-muted mb-1">Neutral</div>
                          <div className="text-xs font-bold text-primary">+24.2%</div>
                       </div>
                       <div className="p-2 bg-cyan/10 border border-cyan/20 rounded-lg">
                          <div className="text-[9px] text-text-muted mb-1">High Sent</div>
                          <div className="text-xs font-bold text-cyan">+48.5%</div>
                       </div>
                    </div>
                 </div>

                 <div className="p-3 bg-surface border border-border rounded-xl flex items-center justify-between">
                    <span className="text-[10px] text-text-muted">Overfitting Risk</span>
                    <span className="text-[10px] font-bold text-success font-mono uppercase">Safe (0.02)</span>
                 </div>
              </div>
           </Panel>

           <Panel title="AI 情绪冲击模拟" icon={Icons.Zap}>
              <div className="space-y-4">
                 <p className="text-[10px] text-text-muted leading-relaxed">
                    模拟当前策略在极端情绪崩坏（冰点）下的表现。系统将模拟 30% 的成分股跌停场景。
                 </p>
                 <div className="p-4 border border-border rounded-xl bg-background/50 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-surface border-t-danger animate-spin-slow"></div>
                    <button className="w-full py-2.5 bg-danger/10 text-danger border border-danger/30 rounded-lg text-xs font-bold hover:bg-danger/20 transition-all uppercase tracking-widest">
                       开始模拟压力测试
                    </button>
                 </div>
                 <div className="space-y-1 mt-2">
                    <div className="flex justify-between text-[9px] text-text-muted">
                       <span>模拟样本量</span>
                       <span className="text-white">100,000 Nodes</span>
                    </div>
                    <div className="h-1 bg-surface rounded-full overflow-hidden">
                       <div className="bg-primary w-[85%] h-full"></div>
                    </div>
                 </div>
              </div>
           </Panel>
        </div>

      </div>

      {/* 3. Bottom Execution Bar */}
      <div className="h-12 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between text-xs">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-text-muted">
               <Icons.History className="w-4 h-4" /> 规则历史: <span className="text-text-main">Sentiment_V4_Alpha_Release</span>
            </div>
            <div className="w-[1px] h-3 bg-border"></div>
            <div className="flex items-center gap-2 text-text-muted">
               <Icons.CheckCircle className="w-4 h-4 text-success" />
               状态: <span className="text-success font-bold">策略运行正常</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-text-muted font-mono">Sample Size: <span className="text-white">8,450 Trades</span></span>
            <button className="text-primary hover:underline font-bold flex items-center gap-1">
              <Icons.Download className="w-3 h-3" /> 下载因子热力报告
            </button>
         </div>
      </div>
    </div>
  );
};

export default SentimentStrategyLab;
