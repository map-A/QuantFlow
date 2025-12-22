
import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from './Icons';
// Added missing ComposedChart and ReferenceLine imports
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, 
  Cell, LineChart, Line, RadialBarChart, RadialBar, PolarAngleAxis, ComposedChart, ReferenceLine
} from 'recharts';

// --- Types & Mock Data ---

interface NewsFeedItem {
  id: string;
  time: string;
  title: string;
  source: string;
  sourceLevel: 'A' | 'B' | 'C';
  sentiment: 'positive' | 'negative' | 'neutral';
  strength: number; // 0-100
  uncertainty: number; // 0-100
  tags: string[];
  isBreaking?: boolean;
}

const MOCK_NEWS_FEED: NewsFeedItem[] = [
  { id: '1', time: '14:42', title: '财政部：支持地方政府发行专项债用于收购存量商品房', source: '财联社', sourceLevel: 'A', sentiment: 'positive', strength: 85, uncertainty: 10, tags: ['政策', '房地产', '宏观'], isBreaking: true },
  { id: '2', time: '14:38', title: '科大讯飞：Q3营收同比增长15%，AI算力投入持续加大', source: '财联社', sourceLevel: 'B', sentiment: 'positive', strength: 62, uncertainty: 15, tags: ['个股', '财报', 'AI'], isBreaking: false },
  { id: '3', time: '14:32', title: '部分白酒经销商传闻下调年度销量预期，五粮液暂未回应', source: '证券时报', sourceLevel: 'B', sentiment: 'negative', strength: 75, uncertainty: 45, tags: ['个股', '白酒', '预警'], isBreaking: false },
  { id: '4', time: '14:25', title: '北向资金今日流向显示，主力集中加仓半导体核心龙头', source: '东方财富', sourceLevel: 'C', sentiment: 'positive', strength: 40, uncertainty: 5, tags: ['资金', '半导体'], isBreaking: false },
  { id: '5', time: '14:10', title: '美联储官员：通胀回落路径仍具挑战，不排除继续维持高利率', source: '路透', sourceLevel: 'A', sentiment: 'negative', strength: 55, uncertainty: 30, tags: ['宏观', '政策', '美股'], isBreaking: false },
];

const MOCK_REACTION_DATA = Array.from({ length: 40 }, (_, i) => ({
  time: i,
  price: 100 + (i > 20 ? (i - 20) * 0.8 : 0) + Math.random() * 0.5,
  volume: Math.random() * 20 + (i === 21 ? 150 : 0),
}));

// --- Sub-components ---

const SentimentGauge = ({ value, label, color }: { value: number, label: string, color: string }) => {
  const data = [{ name: 'val', value: value, fill: color }];
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={6} data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: '#30363D' }} dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-white leading-none">{value}%</span>
        <span className="text-[8px] text-text-muted mt-1 uppercase scale-75 tracking-tighter">{label}</span>
      </div>
    </div>
  );
};

const Section = ({ title, children, className = "", icon: Icon, extra }: any) => (
  <div className={`bg-[#161B22]/60 backdrop-blur-xl border border-border/50 rounded-xl flex flex-col overflow-hidden ${className}`}>
    <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-white/5 shrink-0">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{title}</span>
      </div>
      {extra && <div className="flex items-center gap-2">{extra}</div>}
    </div>
    <div className="flex-1 overflow-auto custom-scrollbar p-4">
      {children}
    </div>
  </div>
);

const NewsLab: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsFeedItem>(MOCK_NEWS_FEED[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1F6FEB 1px, transparent 1px), linear-gradient(90deg, #1F6FEB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* 1. News Intelligence Bar (Header) */}
      <div className="h-16 shrink-0 glass-panel rounded-xl border border-primary/20 bg-primary/5 px-6 flex items-center justify-between z-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cyan/10 opacity-30"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="flex items-center gap-3">
             <div className="relative">
                <Icons.Activity className="w-6 h-6 text-primary shadow-glow-blue" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-pulse border-2 border-background" />
             </div>
             <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
               实时新闻分析实验室 <span className="text-[10px] text-text-muted font-normal bg-surface px-2 py-0.5 rounded border border-border">News Alpha Engine</span>
             </h1>
          </div>
          
          <div className="h-8 w-px bg-border/50"></div>

          <div className="flex items-center gap-2 bg-surface/40 p-1 rounded-lg border border-border/30">
            {['ALL', 'POLICY', 'EARNINGS', 'MACRO', 'RISK'].map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${activeFilter === f ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
           <div className="flex items-center gap-3 bg-surface/60 border border-border/50 rounded-lg px-3 py-1.5">
              <span className="text-[10px] text-text-muted uppercase">Market Mood:</span>
              <span className="text-xs font-bold text-success flex items-center gap-1">
                亢奋 <Icons.Up className="w-3 h-3" />
              </span>
              <div className="h-3 w-px bg-border/50"></div>
              <span className="text-xs font-mono text-cyan">Index: 72.4</span>
           </div>
           <button className="p-2 text-text-muted hover:text-white border border-border/50 rounded-lg bg-surface/30">
              <Icons.History className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 relative z-10">
        
        {/* LEFT: News Feed (3 cols) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
           <Section title="全维新闻流 (Live Stream)" icon={Icons.News} noPadding>
              <div className="space-y-3 p-1">
                 {MOCK_NEWS_FEED.map(news => (
                   <div 
                     key={news.id} 
                     onClick={() => setSelectedNews(news)}
                     className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden group 
                       ${selectedNews.id === news.id ? 'bg-primary/5 border-primary/40 shadow-glow-blue' : 'bg-surface/30 border-border/30 hover:border-white/20'}
                       ${news.isBreaking ? 'border-danger/40 bg-danger/5 shadow-[0_0_15px_rgba(246,70,93,0.1)]' : ''}
                     `}
                   >
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-text-muted">{news.time}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${news.sourceLevel === 'A' ? 'bg-danger/20 text-danger' : 'bg-surface border border-border text-text-muted'}`}>
                               LV {news.sourceLevel}
                            </span>
                         </div>
                         <div className={`w-1.5 h-1.5 rounded-full ${news.sentiment === 'positive' ? 'bg-success shadow-glow-cyan' : news.sentiment === 'negative' ? 'bg-danger shadow-glow-red' : 'bg-text-muted'}`} />
                      </div>
                      <h4 className={`text-xs leading-snug font-medium mb-2 line-clamp-2 ${selectedNews.id === news.id ? 'text-white' : 'text-text-main'}`}>
                        {news.title}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                         {news.tags.map(tag => (
                           <span key={tag} className="px-1.5 py-0.5 bg-background border border-border/50 rounded text-[8px] text-text-muted">
                              {tag}
                           </span>
                         ))}
                      </div>
                      {news.isBreaking && (
                         <div className="absolute top-0 right-0 px-2 py-0.5 bg-danger text-white text-[8px] font-bold rounded-bl uppercase animate-pulse">
                            Breaking
                         </div>
                      )}
                   </div>
                 ))}
              </div>
           </Section>
        </div>

        {/* CENTER: Intelligence Decomposition (6 cols) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 overflow-hidden">
           
           {/* Decomposition Modules */}
           <div className="grid grid-cols-12 gap-6 shrink-0">
              {/* Semantic Analysis */}
              {/* FIXED: Changed icon from BrainCircuit to AI to resolve property access error */}
              <Section title="语义与情绪分解" icon={Icons.AI} className="col-span-7">
                 <div className="flex gap-6 items-center">
                    <div className="flex-1 space-y-4">
                       <div>
                          <div className="flex justify-between text-[10px] text-text-muted uppercase mb-1">
                             <span>预期差偏离 (Expectation Shift)</span>
                             <span className="text-success">+12.4%</span>
                          </div>
                          <div className="h-1 bg-surface rounded-full overflow-hidden">
                             <div className="h-full bg-success w-[70%]" />
                          </div>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-surface/50 border border-border/50 rounded-xl">
                          <div className="flex flex-col">
                             <span className="text-[9px] text-text-muted uppercase">Sentiment Regime</span>
                             <span className={`text-xs font-bold ${selectedNews.sentiment === 'positive' ? 'text-success' : 'text-danger'}`}>
                                {selectedNews.sentiment.toUpperCase()} RECOVERY
                             </span>
                          </div>
                          <div className="flex items-center gap-3">
                             <SentimentGauge value={selectedNews.strength} label="Strength" color="#1F6FEB" />
                             <SentimentGauge value={selectedNews.uncertainty} label="Uncertainty" color="#F6465D" />
                          </div>
                       </div>
                    </div>
                 </div>
              </Section>

              {/* Impact Scope */}
              <Section title="影响半径与传导" icon={Icons.Crosshair} className="col-span-5">
                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px]">
                       <span className="text-text-muted">Primary Sector:</span>
                       <span className="text-white font-bold">{selectedNews.tags[1]}</span>
                    </div>
                    <div className="relative h-12 flex items-center justify-center">
                       <div className="absolute w-8 h-8 rounded-full border border-primary animate-ping opacity-20" />
                       <div className="absolute w-12 h-12 rounded-full border border-primary/40 opacity-20" />
                       <div className="relative p-2 bg-primary/20 rounded-lg text-[10px] font-bold text-primary">
                          SINGLE STOCK
                       </div>
                       <Icons.ArrowRight className="w-4 h-4 text-text-muted mx-1" />
                       <div className="p-2 bg-surface border border-border rounded-lg text-[10px] font-bold text-text-muted">
                          SECTOR
                       </div>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2">
                       {['万科A', '保利发展', '金地集团'].map(s => (
                         <span key={s} className="px-2 py-0.5 bg-surface/50 border border-border rounded text-[9px] text-text-main font-bold">
                           {s}
                         </span>
                       ))}
                    </div>
                 </div>
              </Section>
           </div>

           {/* Market Reaction Monitor (Chart) */}
           <Section 
             title="市场分钟级脉动 (Reaction Monitor)" 
             icon={Icons.Zap} 
             className="flex-1"
             extra={
               <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-cyan" /> 价格反应</span>
                  <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded bg-surface border border-border" /> 异常放量</span>
               </div>
             }
           >
              <div className="h-full flex flex-col">
                 <div className="flex-1 min-h-0 bg-surface/20 rounded-xl border border-border p-2">
                    <ResponsiveContainer width="100%" height="100%">
                       <ComposedChart data={MOCK_REACTION_DATA}>
                          <defs>
                             <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2BC4A8" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#2BC4A8" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                          <XAxis dataKey="time" hide />
                          <YAxis yAxisId="left" hide domain={['auto', 'auto']} />
                          <YAxis yAxisId="right" hide domain={['auto', 'auto']} />
                          <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} />
                          <Area yAxisId="left" type="monotone" dataKey="price" stroke="#2BC4A8" fill="url(#priceGrad)" strokeWidth={2} isAnimationActive={false} />
                          <Bar yAxisId="right" dataKey="volume" barSize={4} radius={[2, 2, 0, 0]}>
                             {MOCK_REACTION_DATA.map((entry, index) => (
                               <Cell key={index} fill={entry.volume > 100 ? '#F6465D' : '#30363D'} opacity={0.5} />
                             ))}
                          </Bar>
                          <ReferenceLine yAxisId="left" x={20} stroke="#F6465D" strokeDasharray="3 3" label={{ position: 'top', value: 'News Trigger', fill: '#F6465D', fontSize: 9 }} />
                       </ComposedChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="mt-4 grid grid-cols-4 gap-4 px-2">
                    <div className="flex flex-col gap-1">
                       <span className="text-[10px] text-text-muted">响应时长</span>
                       <span className="text-sm font-bold text-white font-mono">1.2 Min</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-[10px] text-text-muted">最大冲击幅</span>
                       <span className="text-sm font-bold text-success font-mono">+4.82%</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-[10px] text-text-muted">成交倍率</span>
                       <span className="text-sm font-bold text-yellow-500 font-mono">7.5x</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-[10px] text-text-muted">套利空间</span>
                       <span className="text-sm font-bold text-cyan font-mono">0.45%</span>
                    </div>
                 </div>
              </div>
           </Section>
        </div>

        {/* RIGHT: Quant Signals & AI (3 cols) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-hidden">
           {/* Quant Signals */}
           <Section title="量化交易信号" icon={Icons.Terminal}>
              <div className="space-y-4">
                 <div className="p-4 bg-primary/10 border border-primary/30 rounded-2xl flex flex-col items-center gap-3 relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 blur-3xl rounded-full" />
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest relative z-10">Signal Strength</span>
                    <span className="text-4xl font-mono font-bold text-primary relative z-10">82.4</span>
                    <span className="text-[10px] text-success font-bold relative z-10">CONFIDENCE: HIGH</span>
                 </div>
                 <div className="space-y-2">
                    {[
                      { label: 'Momentum Score', val: '8.5' },
                      { label: 'Mean Reversion', val: '2.1' },
                      { label: 'Event Volatility', val: 'High' },
                    ].map(sig => (
                      <div key={sig.label} className="flex justify-between items-center p-2 bg-surface/30 border border-border/50 rounded-lg">
                         <span className="text-[10px] text-text-muted">{sig.label}</span>
                         <span className="text-[11px] font-bold text-white font-mono">{sig.val}</span>
                      </div>
                    ))}
                 </div>
                 <div className="flex flex-col gap-2 pt-2">
                    <div className="text-[10px] text-text-muted uppercase font-bold">Recommended Strategies</div>
                    <div className="flex flex-wrap gap-2">
                       <span className="px-2 py-1 bg-cyan/10 text-cyan border border-cyan/30 rounded text-[9px] font-bold">EVENT_DRIVEN</span>
                       <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/30 rounded text-[9px] font-bold">BREAKOUT_FOLLOW</span>
                    </div>
                 </div>
              </div>
           </Section>

           {/* AI Insight Card */}
           <div className="flex-1 glass-panel border border-violet/30 bg-violet/5 rounded-2xl p-6 relative flex flex-col gap-4 overflow-hidden group">
              <Icons.Robot className="absolute -right-6 -bottom-6 w-32 h-32 text-violet opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="flex items-center gap-2 text-violet font-bold text-sm tracking-widest uppercase">
                 <Icons.Sparkles className="w-5 h-5 shadow-glow-blue" />
                 AI Insight 决策中枢
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                <span className="text-white font-bold italic">“</span>该政策变动对房地产板块具有 <span className="text-cyan font-bold">流动性注入</span> 效应。历史上相似规模的专项债发行政策在 2018 年发生后，带动板块在 3 个交易日内平均上涨 <span className="text-cyan font-bold">6.5%</span>。风险点在于市场已提前消化部分预期。
              </p>
              <div className="mt-auto space-y-3">
                 <div className="flex items-center gap-2 p-2 bg-danger/10 border border-danger/30 rounded-lg">
                    <Icons.Alert className="w-4 h-4 text-danger" />
                    <span className="text-[10px] text-danger font-bold">警惕情绪过热后的高位分歧</span>
                 </div>
                 <button className="w-full py-2.5 bg-gradient-to-r from-violet to-primary text-white rounded-xl text-xs font-bold shadow-glow-blue hover:brightness-110 transition-all uppercase tracking-tighter">
                   执行模拟仓位测试
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* 3. Bottom Panel: News Impact Timeline */}
      <div className="h-12 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between text-[10px]">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-text-muted">
               <Icons.Clock className="w-3 h-3" /> 最新处理时延: <span className="text-cyan font-mono">14ms</span>
            </div>
            <div className="w-[1px] h-3 bg-border" />
            <div className="flex items-center gap-4">
               <span className="text-text-muted uppercase">News Regime:</span>
               <div className="flex items-center gap-1">
                  <div className="w-20 h-1.5 bg-surface rounded-full overflow-hidden border border-border/50">
                     <div className="h-full bg-gradient-to-r from-danger via-primary to-success w-[80%]" />
                  </div>
                  <span className="text-success font-bold">POSITIVE RECOVERY</span>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <span className="text-text-muted">Processed: <span className="text-white font-mono font-bold">14,285 News/Day</span></span>
            <div className="flex items-center gap-2">
               <Icons.CheckCircle className="w-3 h-3 text-success" />
               <span className="text-success">Engine Online</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NewsLab;
