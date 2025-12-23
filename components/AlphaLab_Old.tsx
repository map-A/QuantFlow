
import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from './Icons';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, 
  Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, 
  ComposedChart, Legend, ReferenceLine
} from 'recharts';

// --- Types ---
interface FactorMetadata {
  id: string;
  name: string;
  category: string;
  icMean: number;
  icIr: number;
  halfLife: string;
  turnover: string;
  description: string;
}

// --- Mock Data ---
const FACTOR_LIBRARY: FactorMetadata[] = [
  { id: 'f_tech_1', name: 'Momentum_20D', category: 'Technical', icMean: 0.052, icIr: 0.85, halfLife: '12D', turnover: 'High', description: '20日动量因子' },
  { id: 'f_tech_2', name: 'RSI_14', category: 'Technical', icMean: 0.031, icIr: 0.42, halfLife: '5D', turnover: 'High', description: '强弱指标' },
  { id: 'f_fund_1', name: 'ROE_TTM', category: 'Fundamental', icMean: 0.065, icIr: 1.24, halfLife: '60D', turnover: 'Low', description: '净资产收益率' },
  { id: 'f_fund_2', name: 'Net_Profit_Growth', category: 'Fundamental', icMean: 0.058, icIr: 1.10, halfLife: '45D', turnover: 'Low', description: '净利润增长率' },
  { id: 'f_val_1', name: 'PE_TTM_Inv', category: 'Valuation', icMean: 0.045, icIr: 0.75, halfLife: '90D', turnover: 'V.Low', description: '市盈率倒数' },
  { id: 'f_money_1', name: 'North_Inflow_5D', category: 'Money Flow', icMean: 0.082, icIr: 0.92, halfLife: '3D', turnover: 'V.High', description: '北向资金流入' },
];

const MOCK_IC_SERIES = Array.from({ length: 40 }, (_, i) => ({
  date: `2023-${String(Math.floor(i/4)+1).padStart(2, '0')}-${String((i%4)*7+1).padStart(2, '0')}`,
  ic: 0.05 + Math.sin(i * 0.4) * 0.08 + (Math.random() - 0.5) * 0.04,
  rankIc: 0.06 + Math.sin(i * 0.4) * 0.1 + (Math.random() - 0.5) * 0.05
}));

const MOCK_DECAY_DATA = [
  { lag: 'T+1', ic: 0.082 }, { lag: 'T+2', ic: 0.075 }, { lag: 'T+3', ic: 0.068 },
  { lag: 'T+5', ic: 0.042 }, { lag: 'T+10', ic: 0.021 }, { lag: 'T+20', ic: 0.005 }
];

const MOCK_QUANTILE_RETURNS = [
  { group: 'Q1 (High)', return: 18.5, cum: 125, color: '#F6465D' },
  { group: 'Q2', return: 12.2, cum: 112, color: '#F6465D88' },
  { group: 'Q3', return: 5.4, cum: 105, color: '#30363D' },
  { group: 'Q4', return: -2.1, cum: 98, color: '#2EBD8588' },
  { group: 'Q5 (Low)', return: -8.5, cum: 85, color: '#2EBD85' },
];

const MOCK_HISTOGRAM = Array.from({ length: 20 }, (_, i) => ({
  bin: (i - 10) * 0.5,
  count: Math.exp(-Math.pow(i - 10, 2) / 20) * 100 + Math.random() * 20
}));

const MOCK_SECTOR_BREAKDOWN = [
  { name: '计算机', weight: 0.25 }, { name: '电子', weight: 0.18 }, 
  { name: '医药', weight: -0.12 }, { name: '银行', weight: -0.22 }, { name: '食品饮料', weight: 0.05 }
];

// --- Components ---

const CardMenu = ({ onAction }: { onAction: (a: string) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-1 hover:bg-white/10 rounded text-text-muted transition-colors">
        <Icons.More className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-lg shadow-2xl z-40 py-1 animate-in fade-in zoom-in-95 duration-100">
            {[
              { label: '全屏模式', icon: Icons.Maximize, act: 'fullscreen' },
              { label: '导出 CSV', icon: Icons.Download, act: 'export' },
              { label: '刷新数据', icon: Icons.Refresh, act: 'refresh' },
              { label: '因子设置', icon: Icons.Settings, act: 'settings' },
              { label: '重置卡片', icon: Icons.Refresh, act: 'reset' },
            ].map(item => (
              <button key={item.label} onClick={() => { onAction(item.act); setOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-xs text-text-muted hover:text-white hover:bg-primary/10 transition-all">
                <item.icon className="w-3.5 h-3.5" /> {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AlphaLab: React.FC = () => {
  const [activeFactor, setActiveFactor] = useState<FactorMetadata>(FACTOR_LIBRARY[0]);
  const [code, setCode] = useState(`alpha = Rank(Momentum(close, 20)) * 0.6 + Rank(ROE_TTM) * 0.4\nreturn Neutralize(alpha, "Industry")`);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1500);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-4 gap-4 overflow-hidden select-none">
      
      {/* Top Header: Actions */}
      <div className="h-14 shrink-0 flex items-center justify-between glass-panel px-6 rounded-xl border border-border/50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                <Icons.Terminal className="w-6 h-6 text-primary shadow-glow-blue" />
             </div>
             <div>
                <h1 className="text-base font-bold text-white leading-none">因子实验室 <span className="text-[10px] text-text-muted font-mono ml-2">Alpha Gen Engine v3.0</span></h1>
                <div className="flex items-center gap-3 text-[10px] text-text-muted mt-1.5">
                  <span className="flex items-center gap-1"><Icons.Grid className="w-3 h-3" /> 全A股 </span>
                  <span className="flex items-center gap-1"><Icons.Clock className="w-3 h-3" /> 日频</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button className="px-4 py-2 border border-border rounded-lg text-xs hover:bg-white/5 text-text-muted flex items-center gap-2">
             <Icons.History className="w-4 h-4" /> 版本管理
           </button>
           <button onClick={handleRun} disabled={isRunning} className="px-6 py-2 bg-gradient-to-r from-primary to-cyan text-white rounded-lg text-xs font-bold shadow-glow-blue hover:brightness-110 transition-all flex items-center gap-2">
              {isRunning ? <Icons.Refresh className="w-4 h-4 animate-spin" /> : <Icons.Zap className="w-4 h-4" />}
              运行分析 (F5)
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* 1. LEFT Sidebar: Factor Library (3 cols) */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 glass-panel rounded-xl border border-border/50 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-white/5">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">因子元件库</span>
              <Icons.Search className="w-3.5 h-3.5 text-text-muted" />
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4">
              {['Technical', 'Fundamental', 'Valuation', 'Money Flow'].map(cat => (
                <div key={cat}>
                  <div className="px-2 mb-2 text-[9px] font-bold text-text-muted uppercase opacity-50">{cat}</div>
                  <div className="space-y-1">
                    {FACTOR_LIBRARY.filter(f => f.category === cat).map(f => (
                      <div 
                        key={f.id} 
                        draggable 
                        onClick={() => setActiveFactor(f)}
                        className={`p-3 rounded-lg border transition-all cursor-move group relative overflow-hidden
                          ${activeFactor.id === f.id ? 'bg-primary/5 border-primary/40' : 'bg-surface/30 border-border/30 hover:border-white/20'}
                        `}
                      >
                         <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-text-main group-hover:text-primary">{f.name}</span>
                            <div className="text-[9px] font-mono text-cyan">IC: {f.icMean.toFixed(3)}</div>
                         </div>
                         <div className="grid grid-cols-3 gap-1 text-[8px] text-text-muted font-mono">
                            <div className="flex flex-col"><span>IR</span><span className="text-violet">{f.icIr}</span></div>
                            <div className="flex flex-col"><span>Decay</span><span className="text-white">{f.halfLife}</span></div>
                            <div className="flex flex-col"><span>Turn</span><span className="text-white">{f.turnover}</span></div>
                         </div>
                         {activeFactor.id === f.id && <div className="absolute top-0 right-0 w-1 h-full bg-primary" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-processing Card */}
          <div className="h-44 glass-panel rounded-xl border border-border/50 p-4">
            <div className="text-[10px] font-bold text-text-muted uppercase mb-4 flex items-center gap-2">
              <Icons.Sliders className="w-3 h-3" /> 数据预处理
            </div>
            <div className="space-y-3">
              {[
                { label: '缺失值填充', opt: '行业中值' },
                { label: 'Winsor化 (3σ)', act: true },
                { label: '标准正态化', act: true }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-text-muted">{item.label}</span>
                  {item.opt ? <span className="px-2 py-0.5 bg-background border border-border rounded text-[9px]">{item.opt}</span> : <Icons.CheckCircle className="w-3.5 h-3.5 text-success" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. CENTER: Editor & Visuals (6 cols) */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
          
          {/* Formula Editor */}
          <div className="h-2/5 glass-panel border border-border/50 rounded-xl flex flex-col overflow-hidden">
            <div className="h-9 border-b border-border/50 bg-white/5 flex items-center px-4 justify-between shrink-0">
              <div className="flex bg-background border border-border rounded p-0.5">
                <button onClick={() => setActiveTab('visual')} className={`px-3 py-1 text-[9px] font-bold rounded ${activeTab === 'visual' ? 'bg-primary text-white' : 'text-text-muted'}`}>可视化</button>
                <button onClick={() => setActiveTab('code')} className={`px-3 py-1 text-[9px] font-bold rounded ${activeTab === 'code' ? 'bg-primary text-white' : 'text-text-muted'}`}>表达式</button>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[9px] text-text-muted font-mono">ID: F_{activeFactor.id}</span>
                 <Icons.Save className="w-3.5 h-3.5 text-text-muted hover:text-white cursor-pointer" />
              </div>
            </div>
            {activeTab === 'visual' ? (
              <div className="flex-1 p-6 flex flex-wrap gap-4 items-center justify-center relative">
                 <div className="p-3 bg-surface border border-primary/30 rounded-lg text-xs font-mono shadow-glow-blue border-dashed">
                    {activeFactor.name} <span className="text-text-muted">(Window: 20)</span>
                 </div>
                 <Icons.Plus className="w-4 h-4 text-text-muted" />
                 <div className="p-3 bg-surface border border-violet/30 rounded-lg text-xs font-mono border-dashed">
                    ROE_TTM <span className="text-text-muted">(Lag: 1)</span>
                 </div>
                 <div className="absolute bottom-4 right-4 text-[10px] text-primary bg-primary/10 px-2 py-1 rounded">
                   + 添加因子算子 (Lag, Diff, Decay...)
                 </div>
              </div>
            ) : (
              <textarea 
                value={code} onChange={e => setCode(e.target.value)}
                className="flex-1 bg-transparent p-4 font-mono text-sm text-cyan outline-none resize-none leading-relaxed custom-scrollbar"
              />
            )}
          </div>

          {/* Analysis Viewport Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0 overflow-y-auto custom-scrollbar pr-1">
            
            {/* 1. IC Series */}
            <div className="col-span-2 h-64 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[10px] font-bold text-text-muted uppercase">IC / Rank IC 稳定性</span>
                 <CardMenu onAction={() => {}} />
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_IC_SERIES}>
                  <defs>
                    <linearGradient id="icG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                  <XAxis dataKey="date" hide />
                  <YAxis tick={{fontSize: 9, fill: '#555'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px'}} />
                  <Area type="monotone" dataKey="ic" stroke="#1F6FEB" fill="url(#icG)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="rankIc" stroke="#2BC4A8" dot={false} strokeWidth={1} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 2. Quantile Returns */}
            <div className="col-span-1 h-64 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[10px] font-bold text-text-muted uppercase">分位数收益 (Quantiles)</span>
                 <CardMenu onAction={() => {}} />
              </div>
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={MOCK_QUANTILE_RETURNS}>
                   <XAxis dataKey="group" tick={{fontSize: 8, fill: '#8B949E'}} axisLine={false} tickLine={false} />
                   <YAxis tick={{fontSize: 9, fill: '#555'}} axisLine={false} tickLine={false} />
                   <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                     {MOCK_QUANTILE_RETURNS.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                   </Bar>
                 </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 3. Distribution Histogram */}
            <div className="col-span-1 h-64 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[10px] font-bold text-text-muted uppercase">因子分布直方图</span>
                 <CardMenu onAction={() => {}} />
              </div>
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={MOCK_HISTOGRAM}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                   <XAxis dataKey="bin" tick={{fontSize: 8, fill: '#555'}} axisLine={false} tickLine={false} />
                   <Tooltip contentStyle={{backgroundColor: '#161B22', fontSize: '10px'}} />
                   <Area type="step" dataKey="count" stroke="#C084FC" fill="#C084FC" fillOpacity={0.1} />
                 </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 4. Decay Chart */}
            <div className="col-span-1 h-56 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
               <span className="text-[10px] font-bold text-text-muted uppercase mb-4">因子衰减分析 (Decay)</span>
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_DECAY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                    <XAxis dataKey="lag" tick={{fontSize: 9, fill: '#555'}} axisLine={false} />
                    <Line type="monotone" dataKey="ic" stroke="#1F6FEB" strokeWidth={2} />
                  </LineChart>
               </ResponsiveContainer>
            </div>

            {/* 5. Turnover Chart */}
            <div className="col-span-1 h-56 glass-panel border border-border/50 rounded-xl p-4 flex flex-col">
               <span className="text-[10px] font-bold text-text-muted uppercase mb-4">换手率可视化 (Turnover)</span>
               <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="text-3xl font-mono font-bold text-white">42.5%</div>
                  <div className="text-[10px] text-text-muted mt-1 uppercase tracking-tighter">每日平均单向换手</div>
                  <div className="w-full mt-4 bg-background h-1.5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: '42.5%' }}></div>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* 3. RIGHT: Evaluation & Insights (3 cols) */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          
          {/* Performance Summary */}
          <div className="glass-panel border border-border/50 rounded-xl p-4">
             <div className="text-[10px] font-bold text-text-muted uppercase mb-4">核心绩效评估</div>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'IC Mean', val: '0.062', trend: '+12%', tc: 'text-success' },
                  { label: 'IC IR', val: '0.85', trend: '-2%', tc: 'text-danger' },
                  { label: '年化收益', val: '18.4%', trend: '+4%', tc: 'text-success' },
                  { label: '夏普比率', val: '2.14', trend: '+0.1', tc: 'text-success' },
                  { label: '最大回撤', val: '-12.2%', trend: 'Low', tc: 'text-primary' },
                  { label: '胜率', val: '58.5%', trend: 'High', tc: 'text-success' },
                ].map((m, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[8px] text-text-muted font-bold uppercase tracking-tight">{m.label}</div>
                    <div className={`text-sm font-mono font-bold ${m.tc}`}>{m.val}</div>
                  </div>
                ))}
             </div>
          </div>

          {/* Sector Exposure */}
          <div className="glass-panel border border-border/50 rounded-xl p-4">
            <div className="text-[10px] font-bold text-text-muted uppercase mb-4">行业暴露 (Sector Exposure)</div>
            <div className="space-y-2">
              {MOCK_SECTOR_BREAKDOWN.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="text-[9px] w-12 text-text-muted">{s.name}</span>
                  <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden flex">
                    <div className={`h-full ${s.weight > 0 ? 'bg-success ml-auto' : 'bg-danger'}`} style={{ width: `${Math.abs(s.weight)*100}%` }}></div>
                  </div>
                  <span className={`text-[8px] font-mono w-8 text-right ${s.weight > 0 ? 'text-success' : 'text-danger'}`}>{s.weight > 0 ? '+' : ''}{s.weight.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="p-5 bg-violet/5 border border-violet/20 rounded-xl relative overflow-hidden group">
            <Icons.Sparkles className="absolute -right-4 -bottom-4 w-20 h-20 text-violet opacity-5 group-hover:scale-110 transition-transform duration-700" />
            <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-widest mb-3">
               <Icons.Robot className="w-4 h-4 animate-bounce" /> AI 投研洞察
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed mb-4">
              “当前因子在 <span className="text-white">高波动/小市值</span> 环境下表现更优。过拟合检测通过 (p=0.032)。建议在目前情绪修复阶段上调动量部分权重。”
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] text-text-muted"><span>过拟合风险</span><span className="text-success font-bold">LOW</span></div>
              <div className="w-full h-1 bg-background rounded-full overflow-hidden"><div className="h-full bg-success w-[15%]" /></div>
            </div>
          </div>

          {/* Correlation Alert */}
          <div className="p-3 bg-danger/5 border border-danger/20 rounded-xl flex items-start gap-3">
             <Icons.Alert className="w-4 h-4 text-danger shrink-0 mt-0.5" />
             <div className="space-y-1">
                <div className="text-[10px] font-bold text-danger">因子相关性过高警示</div>
                <p className="text-[9px] text-text-muted leading-snug">与库中 'Mom_60D' 相关性 0.82，建议进行正交化处理以去冗余。</p>
             </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM: Backtest Preview & Persistence */}
      <div className="h-20 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between gap-8">
         <div className="flex-1 flex items-center gap-6">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] text-text-muted uppercase font-bold">回测净值 (Backtest)</span>
               <div className="w-64 h-8">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_IC_SERIES}>
                       <Area type="monotone" dataKey="ic" stroke="#1F6FEB" fill="#1F6FEB" fillOpacity={0.1} strokeWidth={2} isAnimationActive={false} />
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

         <div className="flex items-center gap-3">
            <button className="px-5 py-2 border border-border rounded-lg text-xs font-bold text-text-muted hover:text-white transition-all uppercase tracking-tighter">
              对比已有因子
            </button>
            <button className="px-8 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-glow-blue hover:brightness-110 transition-all uppercase tracking-tighter">
              保存至生产环境
            </button>
         </div>
      </div>

    </div>
  );
};

export default AlphaLab;
