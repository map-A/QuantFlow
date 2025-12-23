
import React, { useState, useMemo } from 'react';
import { Icons } from './Icons';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, 
  Cell, LineChart, Line, Legend, PieChart, Pie, ReferenceLine
} from 'recharts';

// --- Types & Interfaces ---
interface FactorItem {
  id: string;
  name: string;
  type: string;
  icMean: number;
  icIr: number;
  decay: string;
  turnover: string;
  weight: number;
  selected: boolean;
  correlationWarning?: boolean;
}

// --- Mock Data ---
const MOCK_FACTORS: FactorItem[] = [
  { id: 'f1', name: 'Momentum_20D', type: 'Technical', icMean: 0.082, icIr: 0.95, decay: '12 Days', turnover: 'High', weight: 30, selected: true },
  { id: 'f2', name: 'ROE_TTM', type: 'Fundamental', icMean: 0.065, icIr: 1.25, decay: '65 Days', turnover: 'Low', weight: 40, selected: true, correlationWarning: true },
  { id: 'f3', name: 'Net_Profit_Growth', type: 'Fundamental', icMean: 0.058, icIr: 1.10, decay: '60 Days', turnover: 'Low', weight: 20, selected: true },
  { id: 'f4', name: 'PE_Ratio_Inv', type: 'Valuation', icMean: 0.045, icIr: 0.85, decay: '45 Days', turnover: 'Med', weight: 10, selected: true },
  { id: 'f5', name: 'North_Flow_3D', type: 'Capital Flow', icMean: 0.091, icIr: 0.72, decay: '3 Days', turnover: 'High', weight: 0, selected: false },
  { id: 'f6', name: 'Volatility_Rank', type: 'Risk', icMean: -0.032, icIr: -0.65, decay: '20 Days', turnover: 'Med', weight: 0, selected: false },
];

const EQUITY_CURVE_DATA = Array.from({ length: 50 }, (_, i) => ({
  date: `2023-${String(Math.floor(i/4)+1).padStart(2, '0')}-${String((i%4)*7+1).padStart(2, '0')}`,
  strategy: 100 + i * 0.8 + Math.sin(i * 0.3) * 5 + Math.random() * 2,
  benchmark: 100 + i * 0.3 + Math.cos(i * 0.2) * 3,
  longShort: 100 + i * 1.2 + Math.random() * 1,
}));

const STYLE_EXPOSURE_DATA = [
  { name: 'Value', value: 0.45 },
  { name: 'Momentum', value: 0.85 },
  { name: 'Size', value: -0.22 },
  { name: 'Volatility', value: 0.15 },
  { name: 'Quality', value: 0.62 },
];

const HEATMAP_DATA = [
  { x: 'f1', y: 'f1', val: 1.0 }, { x: 'f1', y: 'f2', val: 0.15 }, { x: 'f1', y: 'f3', val: 0.08 }, { x: 'f1', y: 'f4', val: 0.02 },
  { x: 'f2', y: 'f1', val: 0.15 }, { x: 'f2', y: 'f2', val: 1.0 }, { x: 'f2', y: 'f3', val: 0.75 }, { x: 'f2', y: 'f4', val: 0.45 },
  { x: 'f3', y: 'f1', val: 0.08 }, { x: 'f3', y: 'f2', val: 0.75 }, { x: 'f3', y: 'f3', val: 1.0 }, { x: 'f3', y: 'f4', val: 0.32 },
  { x: 'f4', y: 'f1', val: 0.02 }, { x: 'f4', y: 'f2', val: 0.45 }, { x: 'f4', y: 'f3', val: 0.32 }, { x: 'f4', y: 'f4', val: 1.0 },
];

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
    <div className="flex-1 overflow-auto custom-scrollbar">
      {children}
    </div>
  </div>
);

const MetricBlock = ({ label, value, colorClass = "text-white" }: any) => (
  <div className="p-3 bg-surface/40 border border-border/30 rounded-lg">
    <div className="text-[10px] text-text-muted uppercase mb-1">{label}</div>
    <div className={`text-lg font-mono font-bold ${colorClass}`}>{value}</div>
  </div>
);

const AdvancedSettingsDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <div className={`fixed inset-y-0 right-0 w-96 bg-[#0D1117] border-l border-border/50 z-[60] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="p-6 border-b border-border flex items-center justify-between bg-white/5">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Icons.Sliders className="w-5 h-5 text-primary" />
        组合高级限制 (Optimization)
      </h3>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-text-muted">
        <Icons.XCircle className="w-5 h-5" />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
      {/* 1. Weight Constraints */}
      <section className="space-y-4">
        <div className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-3">权重边界 (Weight Bounds)</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted">单票上限 (%)</label>
            <input type="number" defaultValue={5} className="w-full bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted">单票下限 (%)</label>
            <input type="number" defaultValue={0} className="w-full bg-surface border border-border rounded px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-[11px] text-text-muted">总仓位控制</span>
          <span className="text-xs font-mono font-bold text-white">90% - 100%</span>
        </div>
      </section>

      {/* 2. Neutralization Options */}
      <section className="space-y-4">
        <div className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-3">多维中性化 (Neutralization)</div>
        <div className="space-y-3">
          {[
            { label: '行业中性 (Industry)', active: true },
            { label: '市值中性 (Market Cap)', active: true },
            { label: '波动率中性 (Volatility)', active: false },
            { label: '风格中性 (Style Factors)', active: false },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-surface/50 border border-border/50 rounded-xl group hover:border-primary/40 transition-all">
              <span className="text-xs text-text-main font-medium">{item.label}</span>
              <button className={`w-10 h-5 rounded-full relative transition-all ${item.active ? 'bg-primary' : 'bg-border'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.active ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Turnover & Risk */}
      <section className="space-y-4">
        <div className="text-xs font-bold text-primary uppercase tracking-widest border-l-2 border-primary pl-3">交易与风险 (Risk & Costs)</div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-text-muted">最大单次换手限制 (Max Turnover)</span>
              <span className="text-primary font-mono">15%</span>
            </div>
            <input type="range" className="w-full accent-primary h-1 bg-surface rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-text-muted">跟踪误差限制 (Tracking Error)</span>
              <span className="text-primary font-mono">4.5%</span>
            </div>
            <input type="range" className="w-full accent-primary h-1 bg-surface rounded-full" />
          </div>
        </div>
      </section>

      {/* 4. Feasibility Check */}
      <div className="p-4 bg-violet/5 border border-violet/20 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-violet font-bold text-xs">
          <Icons.CheckCircle className="w-4 h-4" /> 优化可行性检测
        </div>
        <p className="text-[10px] text-text-muted leading-relaxed">
          根据当前限制，组合将剔除约 <span className="text-white">12%</span> 的备选股票。预期 <span className="text-success">夏普比率</span> 将提升约 0.15。
        </p>
      </div>
    </div>

    <div className="p-6 border-t border-border bg-white/5 flex gap-3">
      <button onClick={onClose} className="flex-1 py-2.5 bg-surface border border-border rounded-lg text-xs font-bold text-text-muted hover:text-white transition-all">取消</button>
      <button className="flex-2 py-2.5 bg-primary text-white rounded-lg text-xs font-bold shadow-glow-blue hover:brightness-110 transition-all">保存并重新运行</button>
    </div>
  </div>
);

const AlphaEngine: React.FC = () => {
  const [factors, setFactors] = useState(MOCK_FACTORS);
  const [isRunning, setIsRunning] = useState(false);
  const [weightMethod, setWeightMethod] = useState('IC-IR');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const selectedFactors = factors.filter(f => f.selected);

  const handleWeightChange = (id: string, val: number) => {
    setFactors(factors.map(f => f.id === id ? { ...f, weight: val } : f));
  };

  const toggleFactor = (id: string) => {
    setFactors(factors.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  const getHeatmapColor = (val: number) => {
    if (val === 1) return 'bg-primary/40';
    if (val > 0.7) return 'bg-danger/60';
    if (val > 0.4) return 'bg-danger/30';
    if (val > 0.2) return 'bg-yellow-500/20';
    return 'bg-success/20';
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#2BC4A8 1px, transparent 1px), linear-gradient(90deg, #2BC4A8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Advanced Drawer Modal Overlay */}
      {showAdvanced && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" onClick={() => setShowAdvanced(false)} />
      )}
      <AdvancedSettingsDrawer isOpen={showAdvanced} onClose={() => setShowAdvanced(false)} />

      {/* 1. Global Control Header */}
      <div className="h-20 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="p-2.5 bg-primary/20 rounded-xl border border-primary/30 shadow-glow-blue">
                <Icons.Cpu className="w-8 h-8 text-primary" />
             </div>
             <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Alpha Engine <span className="text-xs text-text-muted font-normal ml-2">多因子组合实验室</span></h1>
                <div className="flex items-center gap-4 text-[10px] mt-1 font-mono">
                  <span className="text-primary font-bold">已选因子: {selectedFactors.length}</span>
                  <span className="text-text-muted">|</span>
                  <span className="text-text-muted">股票池: 沪深300</span>
                  <span className="text-text-muted">|</span>
                  <span className="text-text-muted">频率: Weekly</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4 bg-surface/50 p-1.5 rounded-lg border border-border/30">
            <button className="px-3 py-1.5 text-xs text-white bg-primary rounded shadow-sm">基本配置</button>
            <button 
              onClick={() => setShowAdvanced(true)}
              className="px-3 py-1.5 text-xs text-text-muted hover:text-white transition-colors flex items-center gap-2"
            >
              高级限制
              <Icons.Sliders className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-4 mr-4">
             <div className="flex items-center gap-2">
                <span className="text-[10px] text-text-muted">行业中性</span>
                <div className="w-8 h-4 bg-primary/30 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-primary rounded-full"></div></div>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-[10px] text-text-muted">市值中性</span>
                <div className="w-8 h-4 bg-white/10 rounded-full relative"><div className="absolute left-0.5 top-0.5 w-3 h-3 bg-text-muted rounded-full"></div></div>
             </div>
           </div>
           
           <button 
             onClick={handleRun}
             disabled={isRunning}
             className="px-8 py-2.5 bg-gradient-to-r from-primary to-cyan text-white rounded-lg text-sm font-bold shadow-glow-blue hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
           >
              {isRunning ? <Icons.Refresh className="w-4 h-4 animate-spin" /> : <Icons.Play className="w-4 h-4" />}
              {isRunning ? '模型生成中...' : '生成 Alpha 组合'}
           </button>
        </div>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT: Factor Pool (3 cols) */}
        <div className="col-span-3 flex flex-col gap-6">
           <Panel title="因子资源池" icon={Icons.Terminal}>
              <div className="flex flex-col p-2 gap-2">
                 <div className="relative mb-2">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
                    <input type="text" placeholder="搜索已保存因子..." className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs outline-none focus:border-primary transition-all"/>
                 </div>
                 <div className="space-y-1.5">
                    {factors.map(f => (
                      <div 
                        key={f.id} 
                        onClick={() => toggleFactor(f.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all group relative overflow-hidden
                          ${f.selected ? 'bg-primary/5 border-primary/40' : 'bg-surface/30 border-border/30 hover:border-white/20'}
                        `}
                      >
                         <div className="flex justify-between items-start mb-2 relative z-10">
                            <div>
                               <div className="text-xs font-bold text-text-main flex items-center gap-2">
                                  {f.name}
                                  {/* Fix: Wrap Icons.Alert in a span with title because Lucide icons don't support title prop */}
                                  {f.correlationWarning && <span title="Highly Correlated"><Icons.Alert className="w-3 h-3 text-danger" /></span>}
                               </div>
                               <span className="text-[9px] text-text-muted uppercase tracking-tighter">{f.type}</span>
                            </div>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                               ${f.selected ? 'bg-primary border-primary' : 'border-border'}
                            `}>
                               {f.selected && <Icons.CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-2 text-[10px] relative z-10">
                            <div className="flex flex-col">
                               <span className="text-text-muted opacity-60">IC Mean</span>
                               <span className="font-mono font-bold text-cyan">{f.icMean}</span>
                            </div>
                            <div className="flex flex-col">
                               <span className="text-text-muted opacity-60">IC IR</span>
                               <span className="font-mono font-bold text-violet">{f.icIr}</span>
                            </div>
                         </div>
                         {f.selected && <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>}
                      </div>
                    ))}
                 </div>
              </div>
           </Panel>

           <div className="p-4 bg-violet/5 border border-violet/20 rounded-xl flex flex-col gap-3 relative overflow-hidden group">
              <Icons.Robot className="absolute -right-4 -top-4 w-20 h-20 text-violet opacity-5" />
              <div className="flex items-center gap-2 text-violet font-bold text-xs">
                 <Icons.Sparkles className="w-4 h-4" /> AI 组合优化建议
              </div>
              <p className="text-[10px] text-text-muted leading-relaxed">
                监测到 <span className="text-white">f2 (ROE)</span> 与 <span className="text-white">f3 (Profit)</span> 相关性极高(0.75)。建议降低 f3 权重或使用 PCA 合并以降低冗余。
              </p>
              <button className="w-full py-2 bg-violet/10 border border-violet/30 rounded text-[10px] text-violet font-bold hover:bg-violet/20 transition-all uppercase tracking-widest">
                一键优化权重
              </button>
           </div>
        </div>

        {/* CENTER: Weighting & Diagnostics (6 cols) */}
        <div className="col-span-6 flex flex-col gap-6 overflow-hidden">
           
           {/* Weighting Section */}
           <Panel 
             title="权重分配与融合" 
             icon={Icons.Sliders}
             extra={
               <div className="flex bg-background border border-border rounded p-0.5 text-[10px]">
                 {['Equal', 'IC-IR', 'PCA', 'Custom'].map(m => (
                   <button 
                     key={m} 
                     onClick={() => setWeightMethod(m)}
                     className={`px-3 py-1 rounded transition-all ${weightMethod === m ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}
                   >
                     {m}
                   </button>
                 ))}
               </div>
             }
           >
             <div className="p-6 flex flex-col gap-6 h-full">
                <div className="grid grid-cols-2 gap-8 flex-1">
                   <div className="space-y-4">
                      {selectedFactors.map(f => (
                        <div key={f.id} className="space-y-1.5">
                           <div className="flex justify-between text-[11px]">
                              <span className="text-text-main font-bold">{f.name}</span>
                              <span className="text-primary font-mono">{f.weight}%</span>
                           </div>
                           <input 
                             type="range" min="0" max="100" value={f.weight} 
                             onChange={(e) => handleWeightChange(f.id, Number(e.target.value))}
                             className="w-full accent-primary bg-surface h-1 rounded-full outline-none"
                           />
                        </div>
                      ))}
                      {selectedFactors.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-40 italic">
                          <Icons.Plus className="w-8 h-8 mb-2" />
                          请从左侧选择因子
                        </div>
                      )}
                   </div>

                   <div className="flex flex-col bg-surface/20 border border-border/30 rounded-xl p-4 overflow-hidden">
                      <div className="text-[10px] font-bold text-text-muted uppercase mb-4">因子贡献度</div>
                      <div className="flex-1">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={selectedFactors} layout="vertical">
                               <XAxis type="number" hide />
                               <YAxis dataKey="name" type="category" hide />
                               <Tooltip 
                                 cursor={{ fill: 'transparent' }} 
                                 contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} 
                               />
                               <Bar dataKey="weight" fill="#1F6FEB" radius={[0, 4, 4, 0]}>
                                  {selectedFactors.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1F6FEB' : '#2BC4A8'} />
                                  ))}
                               </Bar>
                            </BarChart>
                         </ResponsiveContainer>
                      </div>
                   </div>
                </div>

                <div className="p-3 bg-background border border-border/50 rounded-lg flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Icons.Code className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-mono text-cyan truncate max-w-md">
                        Composite_Alpha = {selectedFactors.map((f, i) => `${(f.weight/100).toFixed(2)}*${f.name}`).join(' + ')}
                      </span>
                   </div>
                   <button className="p-1 hover:text-white transition-colors"><Icons.Copy className="w-3.5 h-3.5" /></button>
                </div>
             </div>
           </Panel>

           {/* Diagnostics Section */}
           <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
              <Panel title="相关性热力图" icon={Icons.Grid} className="col-span-1">
                 <div className="p-4 h-full flex flex-col items-center justify-center">
                    <div className="grid grid-cols-4 gap-1 w-full max-w-[200px]">
                       {HEATMAP_DATA.map((d, i) => (
                         <div 
                           key={i} 
                           className={`aspect-square rounded-sm flex items-center justify-center text-[8px] transition-transform hover:scale-110 cursor-help ${getHeatmapColor(d.val)}`}
                           title={`${d.x} vs ${d.y}: ${d.val}`}
                         >
                            {d.val > 0.5 ? d.val.toFixed(2) : ''}
                         </div>
                       ))}
                    </div>
                    <div className="mt-4 flex gap-4 text-[9px] text-text-muted font-mono">
                      {factors.slice(0, 4).map(f => (
                        <div key={f.id} className="flex items-center gap-1">
                           <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
                           {f.name}
                        </div>
                      ))}
                    </div>
                 </div>
              </Panel>

              <Panel title="风格暴露 (Style Exposure)" icon={Icons.Target} className="col-span-1">
                 <div className="p-4 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={STYLE_EXPOSURE_DATA}>
                          <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#8B949E' }} axisLine={false} tickLine={false} />
                          <YAxis hide domain={[-1, 1]} />
                          <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} />
                          <ReferenceLine y={0} stroke="#30363D" />
                          <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                             {STYLE_EXPOSURE_DATA.map((entry, index) => (
                               <Cell key={index} fill={entry.value > 0 ? '#1F6FEB' : '#F6465D'} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </Panel>
           </div>
        </div>

        {/* RIGHT: Performance Preview (3 cols) */}
        <div className="col-span-3 flex flex-col gap-6">
           <Panel title="预测收益与回测预览" icon={Icons.Up}>
              <div className="p-4 flex flex-col h-full gap-6">
                 <div className="grid grid-cols-2 gap-3">
                    <MetricBlock label="年化收益" value="28.4%" colorClass="text-success" />
                    <MetricBlock label="夏普比率" value="2.85" colorClass="text-cyan" />
                    <MetricBlock label="最大回撤" value="-12.2%" colorClass="text-danger" />
                    <MetricBlock label="信息比率" value="1.42" colorClass="text-violet" />
                 </div>

                 <div className="flex-1 min-h-[180px] bg-surface/20 rounded-xl border border-border/30 p-2 relative">
                    <div className="absolute top-2 left-2 text-[10px] text-text-muted z-10 font-bold">累计收益率</div>
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={EQUITY_CURVE_DATA}>
                          <defs>
                             <linearGradient id="stratGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                          <XAxis dataKey="date" hide />
                          <YAxis hide domain={['auto', 'auto']} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} 
                            labelStyle={{ marginBottom: 4 }}
                          />
                          <Area type="monotone" dataKey="strategy" stroke="#1F6FEB" fill="url(#stratGrad)" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="benchmark" stroke="#555" dot={false} strokeWidth={1} strokeDasharray="3 3" />
                          <Line type="monotone" dataKey="longShort" stroke="#2BC4A8" dot={false} strokeWidth={1.5} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="p-3 bg-surface border border-border rounded-lg flex justify-between items-center">
                    <span className="text-xs text-text-muted">因子稳定性 (Factor Stability)</span>
                    <span className="text-xs font-bold text-success font-mono">0.82 High</span>
                 </div>
              </div>
           </Panel>

           <Panel title="持仓限制与风控" icon={Icons.Briefcase}>
              <div className="p-4 space-y-4">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px]">
                       <span className="text-text-muted">Top N 选择数量</span>
                       <span className="text-white font-bold">50 Stocks</span>
                    </div>
                    <div className="h-1 bg-surface rounded-full overflow-hidden">
                       <div className="bg-primary w-[50%] h-full"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px]">
                       <span className="text-text-muted">交易税费估算</span>
                       <span className="text-white font-bold">0.12%</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2 border border-border/50 rounded flex flex-col items-center">
                       <span className="text-[9px] text-text-muted">换手率</span>
                       <span className="text-xs font-bold">12.5%</span>
                    </div>
                    <div className="p-2 border border-border/50 rounded flex flex-col items-center">
                       <span className="text-[9px] text-text-muted">策略容量</span>
                       <span className="text-xs font-bold">¥2.5B</span>
                    </div>
                 </div>
              </div>
           </Panel>
        </div>

      </div>

      {/* 3. Bottom Execution Context Bar */}
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
    </div>
  );
};

export default AlphaEngine;
