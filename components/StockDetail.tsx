import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_CANDLES, MOCK_STOCKS, MOCK_NEWS } from '../constants';
import { Icons } from './Icons';
import { getMarketAnalysis } from '../services/geminiService';
import { 
  ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Bar, Cell, Area, Line, ReferenceLine, ReferenceDot, CartesianGrid 
} from 'recharts';

// --- Types & Interfaces ---
interface ChartState {
  timeframe: string;
  mainOverlay: 'MA' | 'BOLL' | 'NONE';
  subIndicator: 'MACD' | 'RSI' | 'KDJ';
  comparison: boolean;
  showSignals: boolean;
  aiPanel: boolean;
}

// --- Helper Functions for Indicators ---
const calculateIndicators = (data: any[]) => {
  // Simplified Indicator Logic for Demo
  let rsiPeriod = 14;
  
  return data.map((entry, index) => {
    // Moving Averages
    const getMA = (n: number) => {
        if (index < n - 1) return null;
        const slice = data.slice(index - n + 1, index + 1);
        return slice.reduce((acc: number, curr: any) => acc + curr.close, 0) / n;
    };

    // BOLL (20, 2)
    const ma20 = getMA(20);
    let bollUpper = null, bollLower = null;
    if (ma20) {
         const slice = data.slice(index - 19, index + 1);
         const variance = slice.reduce((acc: number, curr: any) => acc + Math.pow(curr.close - ma20, 2), 0) / 20;
         const std = Math.sqrt(variance);
         bollUpper = ma20 + 2 * std;
         bollLower = ma20 - 2 * std;
    }

    // Comparison Mock (HS300) - just scaled variation
    const comparisonPrice = entry.close * (1 + Math.sin(index * 0.1) * 0.05);

    return { 
        ...entry, 
        MA5: getMA(5), 
        MA10: getMA(10), 
        MA20: ma20,
        MA60: getMA(60),
        bollUpper,
        bollLower,
        comparisonPrice,
        // Mock MACD/RSI/KDJ values for visualization
        dif: Math.sin(index * 0.2) * 5,
        dea: Math.sin(index * 0.2 - 0.5) * 5,
        macdBar: (Math.sin(index * 0.2) - Math.sin(index * 0.2 - 0.5)) * 10,
        rsi: 50 + Math.sin(index * 0.3) * 30,
        k: 50 + Math.cos(index * 0.3) * 30,
        d: 50 + Math.cos(index * 0.3 - 0.5) * 30,
        j: 50 + Math.cos(index * 0.3) * 30 * 3 - 2 * (50 + Math.cos(index * 0.3 - 0.5) * 30)
    };
  });
};

// --- Custom Shapes ---
// Recharts doesn't have a native Candle. We draw it using a Custom Shape on a Bar.
const CandleShape = (props: any) => {
    const { x, y, width, height, payload } = props;
    const isUp = payload.close > payload.open;
    const color = isUp ? '#F6465D' : '#2EBD85'; // A-Share: Red=Up, Green=Down
    const wickWidth = 1;
    
    // Calculate Y positions based on the scale (props.y is top of bar, height is height of bar)
    // NOTE: In Recharts, y is top-down. 
    // We need access to the scale to convert prices to pixels, but inside shape we often get pixel coords directly relative to bar value.
    // However, for a Candle, we need High and Low which are not the "value" of the bar (usually close or max).
    // WORKAROUND: We use a ComposedChart with ErrorBar or simply overlay Lines. 
    // BUT for "Ultra-Detailed", we will use the standard trick:
    // A Bar representing (Open-Close) range, and we draw the wick manually if we have access to high/low in pixels.
    // Since calculating pixel values manually here is complex without context, we will use a simplified robust visual:
    // We will render the body as the Bar, and assume High/Low are handled by error bars or we just render the Body here 
    // and use a composed chart technique for wicks.
    
    // BETTER APPROACH for this codebase: Use <Bar dataKey="max(open, close)" minPointSize={1} /> with a custom shape that reads payload.open, payload.close, payload.high, payload.low
    
    // We need the Y-Axis scale to convert High/Low to pixels. Since we don't have it easily here,
    // We will use a simpler approximation for the visual in this specific React environment:
    // We will use a Bar for the Body and an ErrorBar for the Wick.
    // OR: Just draw a simple rectangle for body.
    
    return (
      <g>
        {/* We can't easily draw the exact wick without the scale function here. 
            So we default to standard bar style but colored correctly. 
            For the "Wick", we often add an ErrorBar in the chart config. 
        */}
        <rect x={x} y={y} width={width} height={height} fill={color} stroke="none" />
      </g>
    );
};


// --- Sub-components ---

const ToolbarItem = ({ active, label, onClick }: any) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 text-xs font-medium rounded transition-all whitespace-nowrap
          ${active 
            ? 'bg-primary text-white shadow-sm' 
            : 'text-text-muted hover:text-white hover:bg-white/5'}
        `}
    >
        {label}
    </button>
);

const RiskBadge = ({ label, level }: { label: string, level: 'low' | 'med' | 'high' }) => (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border
        ${level === 'low' ? 'bg-success/10 border-success/30 text-success' : 
          level === 'med' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 
          'bg-danger/10 border-danger/30 text-danger'}
    `}>
        <div className={`w-1.5 h-1.5 rounded-full ${level === 'low' ? 'bg-success' : level === 'med' ? 'bg-yellow-500' : 'bg-danger'}`}></div>
        {label}
    </div>
);

// --- Main Component ---

const StockDetail: React.FC = () => {
  const stock = MOCK_STOCKS[0];
  const [chartState, setChartState] = useState<ChartState>({
      timeframe: '日',
      mainOverlay: 'MA',
      subIndicator: 'MACD',
      comparison: false,
      showSignals: true,
      aiPanel: true
  });
  
  const [activeTab, setActiveTab] = useState<'quote' | 'ai' | 'fund'>('quote');
  const [aiAnalysis, setAiAnalysis] = useState('');

  // Process Data
  const chartData = useMemo(() => {
    return calculateIndicators(MOCK_CANDLES);
  }, []);

  useEffect(() => {
      // Simulation of AI analysis loading
      getMarketAnalysis(stock.symbol, MOCK_CANDLES).then(setAiAnalysis);
  }, [stock.symbol]);

  // Calculations for Order Book visual
  const maxOrderVol = 1000; 

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] overflow-hidden text-text-main">
      
      {/* 1. Header (Condensed & Pro) */}
      <header className="h-14 px-4 border-b border-border bg-surface/30 backdrop-blur-md flex items-center justify-between shrink-0">
         <div className="flex items-center gap-4">
             <div>
                 <h1 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                     {stock.symbol} <span className="text-sm font-sans text-text-muted font-normal">{stock.name}</span>
                 </h1>
             </div>
             <div className="h-6 w-[1px] bg-border/50"></div>
             <div className="flex items-baseline gap-2 font-mono">
                 <span className={`text-2xl font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>{stock.price.toFixed(2)}</span>
                 <span className={`text-sm ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>{stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
             </div>
             <div className="hidden md:flex gap-4 text-xs font-mono text-text-muted ml-2">
                 <span>H: <span className="text-text-main">1745.00</span></span>
                 <span>L: <span className="text-text-main">1718.00</span></span>
                 <span>V: <span className="text-yellow-500">{stock.volume}</span></span>
             </div>
         </div>
         <div className="flex items-center gap-2">
             <RiskBadge label="波动率正常" level="low" />
             <RiskBadge label="主力控盘" level="med" />
             <button className="p-1.5 hover:bg-white/10 rounded text-text-muted"><Icons.Alert className="w-4 h-4" /></button>
         </div>
      </header>

      {/* 2. Main Workspace */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
          
          {/* LEFT: Charts (9 Cols) */}
          <div className="col-span-12 lg:col-span-9 flex flex-col border-r border-border bg-background relative">
              
              {/* Toolbar */}
              <div className="h-9 border-b border-border flex items-center justify-between px-2 bg-surface/20 select-none">
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                      {['1m', '5m', '15m', '30m', '1h', '4h', '日', '周'].map(tf => (
                          <ToolbarItem key={tf} label={tf} active={chartState.timeframe === tf} onClick={() => setChartState({...chartState, timeframe: tf})} />
                      ))}
                      <div className="w-[1px] h-3 bg-border mx-1"></div>
                      <ToolbarItem label="MA" active={chartState.mainOverlay === 'MA'} onClick={() => setChartState(s => ({...s, mainOverlay: s.mainOverlay === 'MA' ? 'NONE' : 'MA'}))} />
                      <ToolbarItem label="BOLL" active={chartState.mainOverlay === 'BOLL'} onClick={() => setChartState(s => ({...s, mainOverlay: s.mainOverlay === 'BOLL' ? 'NONE' : 'BOLL'}))} />
                      <div className="w-[1px] h-3 bg-border mx-1"></div>
                      <button 
                        onClick={() => setChartState(s => ({...s, comparison: !s.comparison}))}
                        className={`text-[10px] px-2 py-0.5 border rounded ${chartState.comparison ? 'border-violet text-violet bg-violet/10' : 'border-border text-text-muted'}`}
                      >
                         vs HS300
                      </button>
                  </div>
                  <div className="flex items-center gap-1 text-text-muted">
                      <button className="p-1 hover:bg-white/10 rounded" title="Strategy Signals" onClick={() => setChartState(s => ({...s, showSignals: !s.showSignals}))}>
                          <Icons.Target className={`w-3.5 h-3.5 ${chartState.showSignals ? 'text-primary' : ''}`} />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded"><Icons.Maximize className="w-3.5 h-3.5" /></button>
                  </div>
              </div>

              {/* Main Chart Canvas */}
              <div className="flex-1 flex flex-col cursor-crosshair relative">
                  {/* Top: Price (70%) */}
                  <div className="flex-[7] min-h-0 border-b border-border/30 relative">
                       <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart data={chartData} margin={{ top: 10, right: 60, left: 10, bottom: 0 }}>
                               <defs>
                                   <linearGradient id="bullGradient" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="0%" stopColor="#F6465D" stopOpacity={0.2}/>
                                       <stop offset="100%" stopColor="#F6465D" stopOpacity={0}/>
                                   </linearGradient>
                                   <linearGradient id="bearGradient" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="0%" stopColor="#2EBD85" stopOpacity={0.2}/>
                                       <stop offset="100%" stopColor="#2EBD85" stopOpacity={0}/>
                                   </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                               <XAxis dataKey="time" hide />
                               <YAxis 
                                 domain={['auto', 'auto']} 
                                 orientation="right" 
                                 tick={{ fill: '#8B949E', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                                 axisLine={false} tickLine={false} tickCount={8}
                                 width={50}
                               />
                               <Tooltip 
                                 contentStyle={{ backgroundColor: 'rgba(22, 27, 34, 0.9)', borderColor: '#30363D', fontSize: '11px' }}
                                 itemStyle={{ padding: 0 }}
                                 formatter={(val: number) => typeof val === 'number' ? val.toFixed(2) : val}
                                 labelStyle={{ color: '#8B949E', marginBottom: 4 }}
                               />
                               
                               {/* Comparison Index */}
                               {chartState.comparison && (
                                   <Line type="monotone" dataKey="comparisonPrice" stroke="#C084FC" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                               )}

                               {/* Main Indicators */}
                               {chartState.mainOverlay === 'MA' && (
                                   <>
                                     <Line type="monotone" dataKey="MA5" stroke="#E8C1A0" dot={false} strokeWidth={1} />
                                     <Line type="monotone" dataKey="MA10" stroke="#2BC4A8" dot={false} strokeWidth={1} />
                                     <Line type="monotone" dataKey="MA20" stroke="#C084FC" dot={false} strokeWidth={1} />
                                     <Line type="monotone" dataKey="MA60" stroke="#1F6FEB" dot={false} strokeWidth={1.5} />
                                   </>
                               )}
                               {chartState.mainOverlay === 'BOLL' && (
                                   <>
                                     <Line type="monotone" dataKey="bollUpper" stroke="#8B949E" dot={false} strokeWidth={1} strokeDasharray="3 3" />
                                     <Line type="monotone" dataKey="bollLower" stroke="#8B949E" dot={false} strokeWidth={1} strokeDasharray="3 3" />
                                     <Line type="monotone" dataKey="MA20" stroke="#C084FC" dot={false} strokeWidth={1} />
                                     <Area type="monotone" dataKey="bollUpper" baseLine={0} fill="#8B949E" stroke="none" fillOpacity={0.05} />
                                   </>
                               )}

                               {/* Candlestick Representation 
                                   Using Bar for body. 
                                   Advanced: High/Low wicks would usually be done with ErrorBar or Custom Shape.
                                   Here we visually approximate with Open/Close bars for solidity. 
                               */}
                               <Bar dataKey="close" barSize={5} isAnimationActive={false} shape={(props: any) => {
                                   const { x, y, width, height, payload } = props;
                                   const isUp = payload.close > payload.open;
                                   const color = isUp ? '#F6465D' : '#2EBD85';
                                   // Calculate body height based on open/close difference
                                   // This requires proper scale mapping which is tricky inside simple Bar shape without context.
                                   // Fallback: Use standard Bar colored by direction for reliable rendering in this demo.
                                   return <rect x={x} y={y} width={width} height={height} fill={color} />;
                               }} />
                               
                               {/* Strategy Signals & Patterns */}
                               {chartState.showSignals && (
                                   <>
                                    <ReferenceDot x="2023-10-25" y={1720} r={4} fill="#F6465D" stroke="none" label={{ position: 'bottom', value: 'B', fill: '#F6465D', fontSize: 10, fontWeight: 'bold' }} />
                                    <ReferenceDot x="2023-11-15" y={1780} r={4} fill="#2EBD85" stroke="none" label={{ position: 'top', value: 'S', fill: '#2EBD85', fontSize: 10, fontWeight: 'bold' }} />
                                    {/* Pattern Labels */}
                                    <ReferenceLine x="2023-11-05" stroke="#30363D" strokeDasharray="3 3" label={{ position: 'insideTop', value: '缺口', fill: '#8B949E', fontSize: 9 }} />
                                   </>
                               )}

                           </ComposedChart>
                       </ResponsiveContainer>
                       {/* Overlay Legend */}
                       <div className="absolute top-2 left-2 flex gap-3 text-[10px] font-mono pointer-events-none z-10">
                           {chartState.mainOverlay === 'MA' && (
                               <>
                                <span className="text-[#E8C1A0]">MA5: 1732.1</span>
                                <span className="text-[#2BC4A8]">MA10: 1728.4</span>
                                <span className="text-[#C084FC]">MA20: 1715.2</span>
                               </>
                           )}
                           {chartState.comparison && <span className="text-[#C084FC]">HS300: 3580.2</span>}
                       </div>
                  </div>

                  {/* Mid: Volume & Capital (15%) */}
                  <div className="flex-[1.5] min-h-0 border-b border-border/30 relative">
                       <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={chartData} margin={{ top: 0, right: 60, left: 10, bottom: 0 }}>
                              <YAxis orientation="right" hide domain={['0', 'auto']} />
                              <Tooltip content={<></>} />
                              <Bar dataKey="volume" fill="#30363D" opacity={0.5} barSize={3} isAnimationActive={false}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.close > entry.open ? '#F6465D' : '#2EBD85'} />
                                ))}
                              </Bar>
                              {/* Overlay Main Force Flow Line */}
                              <Line type="monotone" dataKey="dif" stroke="#E8C1A0" dot={false} strokeWidth={1} />
                          </ComposedChart>
                       </ResponsiveContainer>
                       <div className="absolute top-1 left-2 text-[10px] text-text-muted">VOL / 资金流</div>
                  </div>

                  {/* Bottom: Indicators (15%) */}
                  <div className="flex-[1.5] min-h-0 relative">
                       {/* Indicator Switcher */}
                       <div className="absolute top-0 left-0 z-10 flex border-b border-border/30 bg-background/50 backdrop-blur">
                           {['MACD', 'RSI', 'KDJ'].map(ind => (
                               <button 
                                 key={ind} 
                                 onClick={() => setChartState(s => ({...s, subIndicator: ind as any}))}
                                 className={`px-2 py-0.5 text-[9px] font-bold ${chartState.subIndicator === ind ? 'text-primary bg-primary/10' : 'text-text-muted'}`}
                               >
                                   {ind}
                               </button>
                           ))}
                       </div>
                       
                       <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={chartData} margin={{ top: 15, right: 60, left: 10, bottom: 0 }}>
                              <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#555' }} axisLine={false} tickLine={false} minTickGap={40} />
                              <YAxis orientation="right" hide domain={['auto', 'auto']} />
                              
                              {chartState.subIndicator === 'MACD' && (
                                  <>
                                    <Bar dataKey="macdBar" fill="#2EBD85" barSize={2}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.macdBar > 0 ? '#F6465D' : '#2EBD85'} />
                                        ))}
                                    </Bar>
                                    <Line type="monotone" dataKey="dif" stroke="#E6EDF3" dot={false} strokeWidth={1} />
                                    <Line type="monotone" dataKey="dea" stroke="#E8C1A0" dot={false} strokeWidth={1} />
                                  </>
                              )}
                              
                              {chartState.subIndicator === 'RSI' && (
                                  <>
                                    <Line type="monotone" dataKey="rsi" stroke="#C084FC" dot={false} strokeWidth={1} />
                                    <ReferenceLine y={80} stroke="#30363D" strokeDasharray="3 3" />
                                    <ReferenceLine y={20} stroke="#30363D" strokeDasharray="3 3" />
                                  </>
                              )}

                              {chartState.subIndicator === 'KDJ' && (
                                  <>
                                    <Line type="monotone" dataKey="k" stroke="#E6EDF3" dot={false} strokeWidth={1} />
                                    <Line type="monotone" dataKey="d" stroke="#E8C1A0" dot={false} strokeWidth={1} />
                                    <Line type="monotone" dataKey="j" stroke="#C084FC" dot={false} strokeWidth={1} />
                                  </>
                              )}
                          </ComposedChart>
                       </ResponsiveContainer>
                  </div>
              </div>
          </div>

          {/* RIGHT: Analysis & Data (3 Cols) */}
          <div className="col-span-12 lg:col-span-3 flex flex-col bg-surface/5 border-l border-border/50">
              {/* Tab Header */}
              <div className="flex border-b border-border">
                   {[
                       { id: 'quote', label: '盘口', icon: Icons.Layers },
                       { id: 'ai', label: 'AI 决策', icon: Icons.AI },
                       { id: 'fund', label: 'F10', icon: Icons.File }
                   ].map(tab => (
                       <button 
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id as any)}
                         className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1 transition-all
                             ${activeTab === tab.id ? 'text-white border-b-2 border-primary bg-primary/5' : 'text-text-muted hover:text-white'}
                         `}
                       >
                           <tab.icon className="w-3 h-3" />
                           {tab.label}
                       </button>
                   ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                  
                  {/* TAB 1: QUOTES (Order Book + Ticks) */}
                  {activeTab === 'quote' && (
                      <div className="flex flex-col h-full">
                          {/* Depth */}
                          <div className="p-2 border-b border-border/50">
                               <div className="flex justify-between text-[10px] text-text-muted mb-1 px-1">
                                   <span>卖盘</span>
                                   <span>委比: <span className="text-danger">-12%</span></span>
                               </div>
                               <div className="space-y-0.5">
                                   {[...Array(5)].map((_, i) => {
                                       const p = (stock.price + (5-i)*0.01).toFixed(2);
                                       const v = Math.floor(Math.random() * 500);
                                       return (
                                           <div key={i} className="flex justify-between items-center text-xs relative h-5">
                                               <span className="text-text-muted w-8 z-10">卖{5-i}</span>
                                               <span className="text-danger z-10 font-mono">{p}</span>
                                               <span className="text-text-main z-10 font-mono">{v}</span>
                                               <div className="absolute right-0 top-0 h-full bg-danger/10" style={{ width: `${(v/maxOrderVol)*100}%` }}></div>
                                           </div>
                                       )
                                   })}
                               </div>
                               <div className="py-2 text-center border-y border-border/30 my-1 bg-surface/20">
                                   <span className="text-lg font-bold font-mono text-success">{stock.price}</span>
                               </div>
                               <div className="space-y-0.5">
                                   {[...Array(5)].map((_, i) => {
                                       const p = (stock.price - (i+1)*0.01).toFixed(2);
                                       const v = Math.floor(Math.random() * 600);
                                       return (
                                           <div key={i} className="flex justify-between items-center text-xs relative h-5">
                                               <span className="text-text-muted w-8 z-10">买{i+1}</span>
                                               <span className="text-success z-10 font-mono">{p}</span>
                                               <span className="text-text-main z-10 font-mono">{v}</span>
                                               <div className="absolute right-0 top-0 h-full bg-success/10" style={{ width: `${(v/maxOrderVol)*100}%` }}></div>
                                           </div>
                                       )
                                   })}
                               </div>
                          </div>
                          
                          {/* Tick Stream */}
                          <div className="flex-1 overflow-auto">
                              <div className="sticky top-0 bg-surface/80 backdrop-blur z-10 px-3 py-1 text-[10px] text-text-muted flex justify-between border-b border-border/30">
                                  <span>时间</span>
                                  <span>价格</span>
                                  <span>现量</span>
                              </div>
                              <div className="font-mono text-xs">
                                  {[...Array(20)].map((_, i) => {
                                      const isLarge = i % 5 === 0;
                                      return (
                                          <div key={i} className={`flex justify-between px-3 py-0.5 hover:bg-white/5 ${isLarge ? 'bg-primary/5' : ''}`}>
                                              <span className="text-text-muted">14:56:{10+i}</span>
                                              <span className="text-text-main">{stock.price}</span>
                                              <div className="flex items-center gap-1">
                                                  <span className={isLarge ? 'text-violet font-bold' : (i%2===0 ? 'text-danger' : 'text-success')}>
                                                      {Math.floor(Math.random() * (isLarge ? 5000 : 100))}
                                                  </span>
                                                  {isLarge && <div className="w-1.5 h-1.5 rounded-full bg-violet"></div>}
                                              </div>
                                          </div>
                                      )
                                  })}
                              </div>
                          </div>
                      </div>
                  )}

                  {/* TAB 2: AI ANALYSIS */}
                  {activeTab === 'ai' && (
                      <div className="p-4 space-y-4">
                          <div className="bg-surface/30 p-3 rounded-lg border border-violet/30 relative overflow-hidden">
                              <div className="absolute -right-2 -top-2 text-violet/10"><Icons.Robot className="w-16 h-16" /></div>
                              <div className="relative z-10">
                                  <h4 className="text-xs font-bold text-violet mb-2 flex items-center gap-1">
                                      <Icons.Zap className="w-3 h-3" /> 趋势诊断
                                  </h4>
                                  <p className="text-xs leading-relaxed text-text-main">
                                      {aiAnalysis || "AI 正在计算盘面数据..."}
                                  </p>
                              </div>
                          </div>

                          <div>
                              <h4 className="text-xs font-bold text-text-muted mb-2">关键点位 (AI预测)</h4>
                              <div className="grid grid-cols-2 gap-2 text-xs text-center">
                                  <div className="bg-success/10 p-2 rounded border border-success/20">
                                      <div className="text-text-muted scale-90">支撑位</div>
                                      <div className="font-mono font-bold text-success">1710.00</div>
                                  </div>
                                  <div className="bg-danger/10 p-2 rounded border border-danger/20">
                                      <div className="text-text-muted scale-90">压力位</div>
                                      <div className="font-mono font-bold text-danger">1758.50</div>
                                  </div>
                              </div>
                          </div>

                          <div>
                              <h4 className="text-xs font-bold text-text-muted mb-2">策略信号</h4>
                              <div className="space-y-2">
                                  <div className="flex items-center justify-between p-2 bg-surface rounded border border-border">
                                      <div className="flex items-center gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                                          <span className="text-xs">均线多头</span>
                                      </div>
                                      <span className="text-[10px] bg-success/20 text-success px-1 rounded">Buy</span>
                                  </div>
                                  <div className="flex items-center justify-between p-2 bg-surface rounded border border-border">
                                      <div className="flex items-center gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-text-muted"></span>
                                          <span className="text-xs text-text-muted">KDJ 超买</span>
                                      </div>
                                      <span className="text-[10px] bg-surface text-text-muted px-1 rounded">Wait</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* TAB 3: FUNDAMENTALS & RISK */}
                  {activeTab === 'fund' && (
                      <div className="p-4 space-y-4">
                          <div className="space-y-1">
                              <h4 className="text-xs font-bold text-text-muted">核心指标</h4>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                  <div className="flex justify-between border-b border-border/30 pb-1">
                                      <span className="text-text-muted">市盈率(TTM)</span>
                                      <span className="font-mono">{stock.pe}</span>
                                  </div>
                                  <div className="flex justify-between border-b border-border/30 pb-1">
                                      <span className="text-text-muted">市净率</span>
                                      <span className="font-mono">{stock.pb}</span>
                                  </div>
                                  <div className="flex justify-between border-b border-border/30 pb-1">
                                      <span className="text-text-muted">ROE</span>
                                      <span className="font-mono text-success">{stock.roe}%</span>
                                  </div>
                                  <div className="flex justify-between border-b border-border/30 pb-1">
                                      <span className="text-text-muted">股息率</span>
                                      <span className="font-mono text-success">{stock.dividendYield}%</span>
                                  </div>
                              </div>
                          </div>

                          <div className="bg-surface/50 p-3 rounded-lg border border-border">
                              <h4 className="text-xs font-bold text-text-muted mb-2">机构评级</h4>
                              <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-1">
                                  <div className="bg-success w-[60%]"></div>
                                  <div className="bg-yellow-500 w-[30%]"></div>
                                  <div className="bg-danger w-[10%]"></div>
                              </div>
                              <div className="flex justify-between text-[10px] text-text-muted">
                                  <span>买入 60%</span>
                                  <span>持有 30%</span>
                                  <span>卖出 10%</span>
                              </div>
                          </div>

                          <div>
                              <h4 className="text-xs font-bold text-text-muted mb-2">同业对比 (PE)</h4>
                              <div className="space-y-2 text-xs">
                                  <div className="flex items-center gap-2">
                                      <span className="w-12 truncate">{stock.name}</span>
                                      <div className="flex-1 bg-surface h-1.5 rounded-full">
                                          <div className="bg-primary h-full" style={{ width: '40%' }}></div>
                                      </div>
                                      <span className="font-mono w-8 text-right">{stock.pe}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-text-muted">
                                      <span className="w-12 truncate">五粮液</span>
                                      <div className="flex-1 bg-surface h-1.5 rounded-full">
                                          <div className="bg-text-muted h-full opacity-50" style={{ width: '35%' }}></div>
                                      </div>
                                      <span className="font-mono w-8 text-right">22.5</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default StockDetail;