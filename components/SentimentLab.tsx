
import React, { useState, useMemo } from 'react';
import { Icons } from './Icons';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, 
  Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie
} from 'recharts';

// --- Types & Mock Data ---

const MOCK_SENTIMENT_SCORE = 72;
const MOCK_REGIME = "活跃 (Active)";

const MOCK_RADAR_DATA = [
  { subject: '投机情绪 (Speculation)', A: 120, fullMark: 150 },
  { subject: '风险偏好 (Risk Appetite)', A: 98, fullMark: 150 },
  { subject: '盈钱效应 (Profitability)', A: 85, fullMark: 150 },
  { subject: '连板高度 (Limit Up Height)', A: 110, fullMark: 150 },
  { subject: '资金活跃度 (Liquidity)', A: 130, fullMark: 150 },
];

const MOCK_TIMELINE_DATA = Array.from({ length: 30 }, (_, i) => ({
  date: `10-${i + 1}`,
  score: 40 + Math.sin(i * 0.4) * 30 + (Math.random() * 10),
  limitUps: 20 + Math.floor(Math.random() * 40),
}));

const MOCK_SECTOR_SENTIMENT = [
  { name: '计算机', value: 85, inflow: 12.5 },
  { name: '半导体', value: 78, inflow: 8.2 },
  { name: '食品饮料', value: 45, inflow: -2.1 },
  { name: '通信', value: 92, inflow: 15.4 },
  { name: '非银金融', value: 65, inflow: 3.5 },
];

// --- Sub-components ---

const SentimentGauge = ({ score }: { score: number }) => {
  const data = [
    { name: 'Score', value: score, fill: score > 60 ? '#2BC4A8' : score > 40 ? '#1F6FEB' : '#F6465D' }
  ];

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[{ value: 100 }]}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#161B22"
            stroke="none"
            dataKey="value"
            startAngle={180}
            endAngle={0}
          />
          <Pie
            data={[{ value: score }, { value: 100 - score }]}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            dataKey="value"
            startAngle={180}
            endAngle={180 - (1.8 * score)}
            stroke="none"
          >
            <Cell fill={score > 60 ? '#2BC4A8' : score > 40 ? '#1F6FEB' : '#F6465D'} />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <span className="text-5xl font-mono font-bold text-white drop-shadow-[0_0_15px_rgba(43,196,168,0.5)]">
          {score}
        </span>
        <span className="text-xs text-text-muted mt-2 tracking-widest uppercase">Sentiment Index</span>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, subValue, icon: Icon, colorClass = "text-white" }: any) => (
  <div className="glass-panel p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all group">
    <div className="flex justify-between items-start mb-2">
      <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{label}</div>
      {Icon && <Icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />}
    </div>
    <div className={`text-2xl font-mono font-bold ${colorClass}`}>{value}</div>
    {subValue && <div className="text-[10px] text-text-muted mt-1">{subValue}</div>}
  </div>
);

const SentimentLab: React.FC = () => {
  const [activeRange, setActiveRange] = useState('1M');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 overflow-y-auto custom-scrollbar">
      {/* 1. Header State Display */}
      <div className="shrink-0 flex items-center justify-between gap-6 glass-panel p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1F6FEB 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Icons.Flame className="w-6 h-6 text-danger animate-pulse" />
              市场情绪实验室
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-success/10 text-success rounded-full text-[10px] font-bold border border-success/30">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                正在运行 (Live)
              </span>
              <span className="text-[10px] text-text-muted font-mono">数据刷新: 2023-11-20 14:45:00</span>
            </div>
          </div>
          <div className="h-10 w-px bg-border/50" />
          <div className="flex flex-col">
             <span className="text-[10px] text-text-muted uppercase tracking-tighter">当前情绪周期</span>
             <span className="text-xl font-bold text-cyan">{MOCK_REGIME}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {['1D', '1W', '1M', '3M', 'ALL'].map(range => (
            <button 
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 text-xs font-bold rounded transition-all ${activeRange === range ? 'bg-primary text-white shadow-glow-blue' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
            >
              {range}
            </button>
          ))}
          <div className="h-8 w-px bg-border/50 mx-2" />
          <button className="p-2 text-text-muted hover:text-white rounded-lg border border-border">
            <Icons.Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Analytics Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* CENTER: Core Sentiment (8 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Sentiment Meter */}
            <div className="glass-panel p-6 rounded-2xl border border-border flex flex-col items-center">
              <h3 className="w-full text-xs font-bold text-text-muted uppercase mb-4 flex items-center gap-2">
                <Icons.Gauge className="w-4 h-4 text-cyan" /> 情绪综合指数
              </h3>
              <SentimentGauge score={MOCK_SENTIMENT_SCORE} />
              <div className="mt-4 flex gap-6 text-[10px] font-mono">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-danger" /> 冰点 (0-20)</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-primary" /> 活跃 (60-80)</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-cyan" /> 亢奋 (80-100)</div>
              </div>
            </div>

            {/* Radar Analysis */}
            <div className="glass-panel p-6 rounded-2xl border border-border">
              <h3 className="w-full text-xs font-bold text-text-muted uppercase mb-4 flex items-center gap-2">
                <Icons.Target className="w-4 h-4 text-violet" /> 情绪因子透视
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_RADAR_DATA}>
                    <PolarGrid stroke="#30363D" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 9 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar 
                      name="Sentiment" 
                      dataKey="A" 
                      stroke="#1F6FEB" 
                      fill="#1F6FEB" 
                      fillOpacity={0.3} 
                      dot={{ fill: '#1F6FEB', r: 3 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sentiment Timeline */}
          <div className="glass-panel p-6 rounded-2xl border border-border h-80 flex flex-col">
            <h3 className="text-xs font-bold text-text-muted uppercase mb-4 flex items-center gap-2">
              <Icons.Activity className="w-4 h-4 text-primary" /> 历史情绪趋势 (Sentiment History)
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TIMELINE_DATA}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#1F6FEB" fill="url(#scoreGrad)" strokeWidth={2} />
                  <Bar dataKey="limitUps" fill="#F6465D" opacity={0.3} barSize={8} radius={[4, 4, 0, 0]} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT: Components & Insights (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Speculation Stats */}
          <div className="grid grid-cols-2 gap-4">
             <MetricCard label="昨日涨停表现" value="+3.52%" subValue="溢价水平: 高" icon={Icons.Up} colorClass="text-success" />
             <MetricCard label="当前连板高度" value="7板" subValue="龙头: 天龙股份" icon={Icons.Zap} colorClass="text-danger" />
             <MetricCard label="涨跌比" value="3200:1800" subValue="多方占优" icon={Icons.Layers} />
             <MetricCard label="炸板率" value="18%" subValue="较昨日: -5%" icon={Icons.XCircle} colorClass="text-success" />
          </div>

          {/* AI Strategy Advice */}
          <div className="glass-panel p-6 rounded-2xl border border-violet/30 bg-violet/5 relative overflow-hidden flex flex-col gap-4">
            {/* Added fix: changed Icons.Bot to Icons.Robot to match definitions in Icons.tsx */}
            <Icons.Robot className="absolute -right-4 -bottom-4 w-24 h-24 text-violet opacity-5" />
            <div className="flex items-center gap-2 text-violet font-bold text-sm">
               <Icons.Sparkles className="w-5 h-5 shadow-glow-blue" />
               AI 策略环境评估 (Environment)
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              当前市场处于 <span className="text-white font-bold">主升浪修复期</span>。成交量温和放大至万亿级别，情绪指标回暖至活跃区间。建议采取 <span className="text-cyan font-bold">趋势跟随</span> 与 <span className="text-cyan font-bold">龙回头</span> 策略。
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
               <span className="px-2 py-1 bg-violet/20 text-violet border border-violet/30 rounded text-[10px] font-bold">MOMENTUM ON</span>
               <span className="px-2 py-1 bg-violet/20 text-violet border border-violet/30 rounded text-[10px] font-bold">BREAKOUT HIGH</span>
               <span className="px-2 py-1 bg-surface text-text-muted border border-border rounded text-[10px] font-bold">VOLATILITY MED</span>
            </div>
            <button className="w-full py-2 bg-violet/20 border border-violet/30 rounded-lg text-xs font-bold text-violet hover:bg-violet/30 transition-all uppercase tracking-widest mt-2">
              优化当前持仓
            </button>
          </div>

          {/* Sector Sentiment Heatmap */}
          <div className="glass-panel p-6 rounded-2xl border border-border flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-muted uppercase flex items-center gap-2">
               <Icons.Pie className="w-4 h-4 text-cyan" /> 行业情绪强度 (Sector Heat)
            </h3>
            <div className="space-y-4">
               {MOCK_SECTOR_SENTIMENT.map(sector => (
                 <div key={sector.name} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                       <span className="text-text-main font-bold">{sector.name}</span>
                       <div className="flex gap-3 font-mono">
                          <span className="text-cyan">{sector.value} pts</span>
                          <span className={sector.inflow > 0 ? 'text-success' : 'text-danger'}>
                             {sector.inflow > 0 ? '+' : ''}{sector.inflow}亿
                          </span>
                       </div>
                    </div>
                    <div className="w-full h-1.5 bg-background rounded-full overflow-hidden border border-border/50">
                       <div 
                         className="h-full bg-gradient-to-r from-primary to-cyan shadow-glow-cyan transition-all duration-1000" 
                         style={{ width: `${sector.value}%` }} 
                       />
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Risk Warnings */}
          <div className="glass-panel p-4 rounded-xl border border-danger/20 bg-danger/5 flex items-start gap-3">
             <Icons.Alert className="w-5 h-5 text-danger shrink-0 mt-0.5" />
             <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-danger">尾盘跳水风险警示</span>
                <p className="text-[10px] text-text-muted leading-snug">
                   监测到高位消费电子板块出现批量大单砸盘，警惕盘中“天地板”发生，建议对获利品种进行部分止盈。
                </p>
             </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Context Footer */}
      <div className="shrink-0 h-12 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between text-[10px]">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-text-muted">
               <Icons.Clock className="w-3 h-3" /> 最新计算周期: <span className="text-text-main font-mono">T-0 (Realtime)</span>
            </div>
            <div className="w-[1px] h-3 bg-border" />
            <div className="flex items-center gap-2 text-text-muted">
               <Icons.History className="w-3 h-3" /> 历史平均分: <span className="text-text-main font-mono">54.2 (Neutral)</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-text-muted">Sentiment Model: <span className="text-primary font-bold">QuantFlow-SENT v4.2</span></span>
            <button className="text-primary hover:underline font-bold">下载完整分析报告</button>
         </div>
      </div>
    </div>
  );
};

export default SentimentLab;
