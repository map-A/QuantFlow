
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { chatWithAnalyst } from '../services/geminiService';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, 
  Cell, RadialBarChart, RadialBar, PolarAngleAxis 
} from 'recharts';

// --- Types ---
type AnalysisMode = 'initial' | 'analyzing' | 'result';

interface AIInsight {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  trend: string;
  support: string;
  resistance: string;
  summary: string;
}

// --- Mock Data ---
const MOCK_FLOW_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: Math.random() * 100 - 40 + (i * 2),
}));

const MOCK_PRICE_DATA = Array.from({ length: 40 }, (_, i) => ({
  time: i,
  value: 100 + Math.sin(i * 0.2) * 10 + i * 0.5 + Math.random() * 2,
}));

const RECOMMENDED_STOCKS = [
  { code: '600519', name: '贵州茅台', score: 92, reason: '资金回流', change: 2.5 },
  { code: '300750', name: '宁德时代', score: 88, reason: '超跌反弹', change: 1.2 },
  { code: '688981', name: '中芯国际', score: 85, reason: '技术突破', change: -0.5 },
  { code: '002594', name: '比亚迪', score: 81, reason: '销量超预期', change: 1.8 },
];

const PROMPT_TEMPLATES = [
  { icon: Icons.Activity, label: "市场脉搏", query: "今日A股市场整体情绪与资金流向分析" },
  { icon: Icons.Target, label: "个股诊断", query: "深度分析 600519 贵州茅台的技术面与基本面" },
  { icon: Icons.Zap, label: "热点挖掘", query: "目前有哪些板块出现主力资金抢筹迹象？" },
  { icon: Icons.Alert, label: "风险扫描", query: "扫描当前持仓组合的潜在风险与黑天鹅" },
];

// --- Sub-components ---

// FIX: Change children to optional in props type to resolve TS error on JSX usage lines 295, 334, 368, 404, 429
const GlassCard = ({ children, className = "", glow = false, noPadding = false }: { children?: React.ReactNode, className?: string, glow?: boolean, noPadding?: boolean }) => (
  <div className={`
    bg-[#161B22]/60 backdrop-blur-xl border border-white/5 rounded-xl relative overflow-hidden transition-all duration-300 flex flex-col
    ${glow ? 'shadow-[0_0_20px_rgba(43,196,168,0.1)] border-cyan/30' : 'hover:border-white/20 hover:bg-[#161B22]/80'}
    ${noPadding ? '' : 'p-5'}
    ${className}
  `}>
    {/* Subtle gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
    <div className="relative z-10 flex flex-col h-full">{children}</div>
  </div>
);

const ConfidenceGauge = ({ score }: { score: number }) => {
  const data = [{ name: 'score', value: score, fill: '#2BC4A8' }];
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={8} data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: '#30363D' }} dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan">
        <span className="text-xl font-bold font-mono">{score}</span>
        <span className="text-[9px] uppercase tracking-wider text-text-muted">AI Score</span>
      </div>
    </div>
  );
};

const MiniChart = ({ data, color, type = 'area' }: { data: any[], color: string, type?: 'area' | 'bar' }) => (
  <ResponsiveContainer width="100%" height="100%">
    {type === 'area' ? (
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={color} fill={`url(#grad-${color})`} strokeWidth={2} isAnimationActive={true} />
      </AreaChart>
    ) : (
      <BarChart data={data}>
        <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#F6465D' : '#2EBD85'} />
          ))}
        </Bar>
      </BarChart>
    )}
  </ResponsiveContainer>
);

const AILab: React.FC = () => {
  const [mode, setMode] = useState<AnalysisMode>('initial');
  const [query, setQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setMode('analyzing');
    // Simulate API delay
    setTimeout(() => {
        setMode('result');
        // Add initial context to chat
        setMessages([{ role: 'model', text: `已为您完成深度分析。根据模型运算，市场目前处于震荡上行阶段，主力资金在科技板块出现显著回流。您可以继续追问更多细节。` }]);
    }, 2000);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user' as const, text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    
    // Simulate response delay for "thinking" effect
    setTimeout(async () => {
        // In a real app, this would call chatWithAnalyst(messages, userMsg.text)
        // For visual demo, we simulate a smart response
        const responseText = `针对 "${userMsg.text}"，从资金流向来看，近期北向资金持续净流入，且MACD在零轴上方金叉，表明多头力量正在增强。建议关注回调时的介入机会，止损位参考20日均线。`;
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 1200);
  };

  // --- 1. HERO SEARCH VIEW ---
  if (mode === 'initial') {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden p-6 bg-[#0D1117]">
        {/* Ambient Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[5000ms]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
          <div className="flex flex-col items-center gap-4 mb-4">
             <div className="relative">
                <div className="absolute inset-0 bg-cyan blur-xl opacity-20"></div>
                <div className="relative p-4 bg-gradient-to-tr from-[#161B22] to-[#1C2128] rounded-2xl border border-white/10 shadow-2xl">
                    <Icons.Sparkles className="w-10 h-10 text-cyan" />
                </div>
             </div>
             <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white/50 tracking-tight text-center">
               QuantFlow AI
             </h1>
             <p className="text-text-muted font-light text-center max-w-lg text-lg">
                您的智能量化投资副驾驶 <br/>
                <span className="text-sm opacity-60">Deep Analysis • Market Sentiment • Strategy Backtest</span>
             </p>
          </div>
          
          {/* Search Box */}
          <div className="w-full relative group">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan/30 via-violet/30 to-primary/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
             <div className="relative bg-[#161B22]/80 backdrop-blur border border-white/10 rounded-2xl flex items-center p-2 shadow-2xl transition-all group-hover:border-cyan/30 group-hover:bg-[#161B22]">
                <Icons.Search className="w-6 h-6 text-text-muted ml-4" />
                <input 
                  type="text" 
                  className="flex-1 bg-transparent border-none outline-none text-lg px-4 py-4 text-white placeholder-text-muted/40 font-light font-sans"
                  placeholder="Ask AI about stocks, sectors, or strategies..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
                  autoFocus
                />
                <div className="flex items-center gap-2 pr-2">
                    <button className="p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Voice Input">
                        <Icons.Mic className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleSearch(query)}
                      className="px-6 py-3 bg-cyan hover:bg-cyan/90 text-[#0D1117] rounded-xl font-bold shadow-[0_0_15px_rgba(43,196,168,0.4)] transition-all flex items-center gap-2"
                    >
                      <Icons.Sparkles className="w-4 h-4" />
                      <span>Analyze</span>
                    </button>
                </div>
             </div>
          </div>

          {/* Prompt Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-4">
             {PROMPT_TEMPLATES.map((t, i) => (
               <button 
                 key={i} 
                 onClick={() => handleSearch(t.query)}
                 className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-cyan/20 transition-all text-left group backdrop-blur-sm"
               >
                  <div className="p-2.5 rounded-lg bg-surface text-text-muted group-hover:text-cyan group-hover:bg-cyan/10 transition-colors border border-white/5 group-hover:border-cyan/20">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-text-main group-hover:text-white flex items-center gap-2">
                        {t.label}
                    </div>
                    <div className="text-xs text-text-muted truncate opacity-70">{t.query}</div>
                  </div>
                  <Icons.ArrowRight className="w-4 h-4 text-white/10 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
               </button>
             ))}
          </div>
          
          <div className="mt-8 flex gap-6 text-xs text-text-muted font-mono opacity-50">
              <span className="flex items-center gap-1"><Icons.Command className="w-3 h-3"/> Focus Search</span>
              <span className="flex items-center gap-1"><Icons.Mic className="w-3 h-3"/> Voice Mode</span>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. LOADING STATE ---
  if (mode === 'analyzing') {
    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#0D1117] relative">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan/5 via-transparent to-transparent opacity-50"></div>
         
         {/* Cyberpunk Scanner Effect */}
         <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 border border-cyan/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-violet/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 border-t-2 border-cyan rounded-full animate-spin"></div>
            <div className="absolute inset-10 border-b-2 border-violet rounded-full animate-[spin_3s_linear_infinite]"></div>
            
            <div className="relative z-10 text-center space-y-2">
                <Icons.AI className="w-12 h-12 text-cyan mx-auto animate-pulse" />
                <div className="text-2xl font-bold text-white tracking-widest">ANALYZING</div>
            </div>
         </div>

         <div className="mt-8 w-64 space-y-2">
             <div className="flex justify-between text-xs text-cyan font-mono">
                 <span>SCANNING MARKET DATA</span>
                 <span>78%</span>
             </div>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-cyan to-violet w-[78%] animate-pulse"></div>
             </div>
             <div className="text-xs text-text-muted text-center pt-2">Processing {query}...</div>
         </div>
      </div>
    );
  }

  // --- 3. DASHBOARD RESULT VIEW ---
  return (
    <div className="h-[calc(100vh-4rem)] bg-[#0D1117] flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Search Bar (Compact) */}
        <div className="h-16 border-b border-border bg-[#161B22]/80 backdrop-blur-md z-20 flex items-center px-6 gap-4 shrink-0">
             <div className="flex items-center gap-2 text-cyan font-bold cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setMode('initial')}>
                <Icons.Sparkles className="w-5 h-5" />
                <span className="tracking-tight">QuantFlow AI</span>
             </div>
             <div className="h-6 w-px bg-border/50 mx-2"></div>
             <div className="relative flex-1 max-w-2xl group">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-cyan transition-colors" />
                <input 
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
                  className="w-full bg-[#0D1117] border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 outline-none text-white transition-all shadow-inner"
                />
             </div>
             <div className="ml-auto flex items-center gap-3">
                 <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    Live Data
                 </span>
             </div>
        </div>

        {/* Main Grid Content */}
        <div className="flex-1 overflow-hidden flex">
            
            {/* LEFT PANEL: ANALYSIS MODULES (70%) */}
            <div className="flex-[7] overflow-y-auto custom-scrollbar p-6 border-r border-border/50">
                <div className="max-w-5xl mx-auto space-y-6">
                    
                    {/* A. Summary Card */}
                    <GlassCard glow className="flex flex-col md:flex-row gap-6 items-stretch min-h-[180px]">
                        <div className="flex-1 flex flex-col justify-center space-y-4">
                           <div className="flex items-center gap-3">
                              <span className="px-3 py-1 bg-success/10 border border-success/30 text-success rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 shadow-[0_0_10px_rgba(246,70,93,0.2)]">
                                 <Icons.Up className="w-3 h-3" /> Bullish Outlook
                              </span>
                              <span className="text-xs text-text-muted font-mono flex items-center gap-1">
                                <Icons.Clock className="w-3 h-3" /> Generated just now
                              </span>
                           </div>
                           <h2 className="text-2xl font-bold text-white leading-snug">
                              市场呈现<span className="text-cyan drop-shadow-[0_0_8px_rgba(43,196,168,0.5)]">震荡上行</span>趋势，主力资金在半导体与AI板块形成合力。
                           </h2>
                           <p className="text-sm text-text-muted leading-relaxed border-l-2 border-cyan/30 pl-3">
                              虽然大盘面临3100点整数关口压力，但北向资金连续3日净流入，且量能温和放大。建议关注具备业绩支撑的科技成长股，警惕高位消费股的回调风险。
                           </p>
                        </div>
                        
                        <div className="w-px bg-white/10 hidden md:block"></div>

                        <div className="w-[200px] shrink-0 flex flex-col items-center justify-center gap-2">
                           <ConfidenceGauge score={88} />
                           <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full mt-2">
                              <div className="text-center">
                                 <div className="text-[10px] text-text-muted uppercase">Support</div>
                                 <div className="text-sm font-mono font-bold text-success">3050.20</div>
                              </div>
                              <div className="text-center">
                                 <div className="text-[10px] text-text-muted uppercase">Resistance</div>
                                 <div className="text-sm font-mono font-bold text-danger">3120.50</div>
                              </div>
                           </div>
                        </div>
                    </GlassCard>

                    {/* B. Analysis Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* 1. Technical Analysis */}
                        <GlassCard className="h-[320px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <div className="p-1.5 rounded bg-violet/10 text-violet border border-violet/20"><Icons.Trade className="w-4 h-4" /></div>
                                    技术面扫描
                                </h3>
                                <div className="flex gap-2 text-[10px]">
                                    <span className="px-2 py-0.5 bg-violet/10 text-violet rounded border border-violet/20 font-mono">MA Trend: UP</span>
                                    <span className="px-2 py-0.5 bg-surface text-text-muted rounded border border-border font-mono">RSI: 62</span>
                                </div>
                            </div>
                            <div className="flex-1 relative w-full min-h-0 bg-surface/30 rounded-lg border border-white/5 p-2 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-violet/10 to-transparent opacity-50"></div>
                                <MiniChart data={MOCK_PRICE_DATA} color="#C084FC" type="area" />
                                
                                {/* AI Annotation Overlay */}
                                <div className="absolute top-4 left-10 px-2 py-1 bg-[#161B22]/90 border border-violet/50 rounded text-[10px] text-violet shadow-lg backdrop-blur-sm">
                                    Breakout Point
                                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#161B22] border-r border-b border-violet/50 rotate-45"></div>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                                <div className="p-2.5 bg-white/5 rounded border border-white/5">
                                    <div className="text-text-muted mb-1 flex items-center gap-1"><Icons.Activity className="w-3 h-3"/> 趋势信号</div>
                                    <div className="text-white font-bold tracking-wide">突破三角形上沿</div>
                                </div>
                                <div className="p-2.5 bg-white/5 rounded border border-white/5">
                                    <div className="text-text-muted mb-1 flex items-center gap-1"><Icons.Layers className="w-3 h-3"/> K线形态</div>
                                    <div className="text-white font-bold tracking-wide">早晨之星 (日线)</div>
                                </div>
                            </div>
                        </GlassCard>

                         {/* 2. Capital Flow */}
                         <GlassCard className="h-[320px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <div className="p-1.5 rounded bg-cyan/10 text-cyan border border-cyan/20"><Icons.Wallet className="w-4 h-4" /></div>
                                    资金流向监控
                                </h3>
                                <div className="text-xs font-mono">
                                    主力净流入: <span className="text-success font-bold">+12.5亿</span>
                                </div>
                            </div>
                            <div className="flex-1 relative w-full min-h-0 bg-surface/30 rounded-lg border border-white/5 p-2">
                                <MiniChart data={MOCK_FLOW_DATA} color="#2BC4A8" type="bar" />
                            </div>
                             <div className="mt-4 space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-text-muted">超大单 (机构)</span>
                                        <span className="text-success font-mono">+5.2亿</span>
                                    </div>
                                    <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden">
                                        <div className="w-[70%] h-full bg-gradient-to-r from-success/50 to-success"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-text-muted">小单 (散户)</span>
                                        <span className="text-danger font-mono">-3.8亿</span>
                                    </div>
                                    <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden">
                                        <div className="w-[40%] h-full bg-gradient-to-r from-danger/50 to-danger"></div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                         {/* 3. Fundamental Snapshot */}
                         <GlassCard className="min-h-[200px]">
                            <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                                <div className="p-1.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"><Icons.File className="w-4 h-4" /></div>
                                基本面透视
                            </h3>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {[
                                    { label: 'PE (TTM)', val: '12.5', tag: '低估值', color: 'text-success' },
                                    { label: '营收同比', val: '+18.2%', tag: '超预期', color: 'text-success' },
                                    { label: 'ROE', val: '22.5%', tag: '优秀', color: 'text-yellow-500' }
                                ].map((item, i) => (
                                    <div key={i} className="text-center p-3 bg-surface/50 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                                        <div className="text-xs text-text-muted mb-1">{item.label}</div>
                                        <div className="text-lg font-mono font-bold text-white">{item.val}</div>
                                        <div className={`text-[10px] ${item.color} font-medium`}>{item.tag}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs text-text-muted bg-yellow-500/5 border border-yellow-500/10 p-3 rounded-lg flex gap-2 items-start">
                                <Icons.Alert className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                <p className="leading-snug">风险提示：近期原材料价格上涨可能压缩毛利率；行业竞争加剧可能导致市场份额波动。</p>
                            </div>
                        </GlassCard>

                         {/* 4. News & Sentiment */}
                         <GlassCard className="min-h-[200px]">
                            <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                                <div className="p-1.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20"><Icons.News className="w-4 h-4" /></div>
                                舆情与新闻
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { title: "公司发布三季度业绩预告，净利润预增40%-50%", sentiment: "positive", time: "10m ago" },
                                    { title: "北向资金今日大幅加仓板块龙头", sentiment: "positive", time: "1h ago" },
                                    { title: "行业监管政策落地，短期存在不确定性", sentiment: "neutral", time: "3h ago" },
                                ].map((news, i) => (
                                    <div key={i} className="flex gap-3 items-start p-2.5 bg-surface/30 hover:bg-surface rounded-lg border border-transparent hover:border-white/10 transition-colors group">
                                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${news.sentiment === 'positive' ? 'bg-success shadow-[0_0_5px_#F6465D]' : 'bg-text-muted'}`}></div>
                                        <div>
                                            <p className="text-sm text-text-main leading-snug group-hover:text-white transition-colors">{news.title}</p>
                                            <p className="text-[10px] text-text-muted mt-1 font-mono flex items-center gap-2">
                                                {news.time}
                                                <span className={`px-1 rounded text-[8px] border ${news.sentiment === 'positive' ? 'border-success/30 text-success' : 'border-border text-text-muted'}`}>
                                                    {news.sentiment.toUpperCase()}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: RECOMMENDATIONS & CHAT (30%) */}
            <div className="flex-[3] border-l border-border/50 flex flex-col bg-[#161B22]/30 backdrop-blur-md min-w-[320px]">
                
                {/* 1. Recommendations List */}
                <div className="flex-1 overflow-y-auto p-4 border-b border-border/50 custom-scrollbar">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                            <Icons.Target className="w-4 h-4" /> AI Top Picks
                        </h3>
                        <button className="text-[10px] text-cyan hover:underline">View All</button>
                    </div>
                    
                    <div className="space-y-3">
                        {RECOMMENDED_STOCKS.map((stock, i) => (
                            <div key={i} className="group p-3 bg-[#161B22] border border-white/5 hover:border-cyan/50 rounded-xl transition-all cursor-pointer relative overflow-hidden shadow-sm hover:shadow-lg">
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-bold text-white group-hover:text-cyan transition-colors">{stock.name}</div>
                                            <div className="text-[10px] font-mono text-text-muted group-hover:text-cyan/70">{stock.code}</div>
                                        </div>
                                        <div className={`text-sm font-mono font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'} bg-surface/50 px-1.5 py-0.5 rounded`}>
                                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-[10px] text-text-muted bg-white/5 px-2 py-0.5 rounded border border-white/5">{stock.reason}</div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[9px] text-text-muted uppercase">Score</span>
                                            <div className="w-6 h-6 rounded-full border border-cyan/30 flex items-center justify-center text-[10px] font-bold text-cyan bg-cyan/5">
                                                {stock.score}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Interactive Chat */}
                <div className="h-[45%] flex flex-col bg-[#0D1117]/50">
                    <div className="p-3 border-b border-border/50 bg-[#161B22] text-xs font-bold text-white flex items-center gap-2 shadow-sm z-10">
                        <Icons.Robot className="w-4 h-4 text-cyan" />
                        AI Analyst Chat
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span>
                    </div>
                    
                    {/* Message List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-md
                                    ${m.role === 'user' 
                                        ? 'bg-gradient-to-br from-primary to-blue-600 text-white rounded-br-sm' 
                                        : 'bg-[#161B22] border border-white/10 text-text-main rounded-bl-sm'}
                                `}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Suggestions */}
                    <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide bg-gradient-to-t from-[#0D1117] to-transparent">
                        {['解释背离', '同行业对比', '生成回测策略'].map(s => (
                            <button key={s} onClick={() => setChatInput(s)} className="shrink-0 px-3 py-1 bg-white/5 hover:bg-cyan/10 border border-white/10 hover:border-cyan/30 rounded-full text-[10px] text-text-muted hover:text-cyan transition-colors">
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 pt-2 bg-[#0D1117]">
                        <div className="relative group">
                            <input 
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                                placeholder="Ask follow-up questions..."
                                className="w-full bg-[#161B22] border border-border rounded-xl pl-4 pr-10 py-3 text-sm focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 outline-none text-white transition-all shadow-inner group-hover:border-white/20"
                            />
                            <button 
                                onClick={handleSendChat}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-cyan hover:text-white bg-cyan/10 hover:bg-cyan rounded-lg transition-all"
                            >
                                <Icons.Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AILab;
