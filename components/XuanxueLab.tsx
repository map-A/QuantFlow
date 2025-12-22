
import React, { useState } from 'react';
import { Icons } from './Icons';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ComposedChart, Area, XAxis, YAxis, Tooltip, Line 
} from 'recharts';

// --- Mock Data for Cultural Lens ---
const MOCK_FIVE_ELEMENTS = [
  { subject: '木 (Wood)', A: 85, fullMark: 100, note: '科技/成长' },
  { subject: '火 (Fire)', A: 95, fullMark: 100, note: '能源/情绪' },
  { subject: '土 (Earth)', A: 65, fullMark: 100, note: '基建/稳健' },
  { subject: '金 (Metal)', A: 45, fullMark: 100, note: '金融/资源' },
  { subject: '水 (Water)', A: 75, fullMark: 100, note: '贸易/物流' },
];

const MOCK_SENTIMENT_COMPARE = Array.from({ length: 30 }, (_, i) => ({
  time: `T-${30-i}`,
  quant: 40 + Math.sin(i * 0.4) * 20 + Math.random() * 10,
  cultural: 35 + Math.sin(i * 0.3) * 25 + Math.random() * 5,
}));

const HEXAGRAM_NAME = "泰 (Tai)";
const HEXAGRAM_SYMBOL = [true, true, true, false, false, false]; // Yang is true, Yin is false

const XuanxueLab: React.FC = () => {
  const [lensEnabled, setLensEnabled] = useState(true);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] overflow-hidden text-text-main relative">
      {/* Background Subtle Ink Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#2BC4A8 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />

      {/* 1. Header: Cultural Status */}
      <header className="h-20 shrink-0 border-b border-border/50 bg-[#161B22]/50 backdrop-blur-md px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-cyan/10 rounded-2xl border border-cyan/20">
             <Icons.Compass className="w-8 h-8 text-cyan animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
               国学视角 · 越影实验室
               <span className="text-[10px] text-text-muted font-normal bg-surface px-2 py-0.5 rounded border border-border">EXPERIMENTAL LENS</span>
            </h1>
            <div className="flex items-center gap-4 mt-1">
               <span className="text-xs text-text-muted italic">甲辰年 丙寅月 壬申日</span>
               <div className="h-3 w-px bg-border/50" />
               <span className="text-[10px] text-text-muted uppercase tracking-widest flex items-center gap-2">
                 参考强度: <span className="text-yellow-500 font-bold">低 (LOW)</span>
               </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter">文化透镜模式 (CULTURAL LENS)</span>
              <button 
                onClick={() => setLensEnabled(!lensEnabled)}
                className={`w-12 h-6 rounded-full relative transition-all ${lensEnabled ? 'bg-cyan shadow-glow-cyan' : 'bg-border'}`}
              >
                 <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${lensEnabled ? 'left-7' : 'left-1'}`} />
              </button>
           </div>
        </div>
      </header>

      {/* 2. Main Lab Content */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6 min-h-0 relative z-10 overflow-y-auto custom-scrollbar">
        
        {/* LEFT: Market Tian-Shi & Elements (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-border/50 flex flex-col h-[350px]">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                  <Icons.Clock className="w-4 h-4 text-cyan" /> 今日市场 · 天时
               </h3>
               <span className="text-[10px] text-cyan font-mono font-bold">节气：立春</span>
            </div>
            <div className="flex-1">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_FIVE_ELEMENTS}>
                    <PolarGrid stroke="#30363D" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar 
                      name="Balance" 
                      dataKey="A" 
                      stroke="#2BC4A8" 
                      fill="#2BC4A8" 
                      fillOpacity={0.15} 
                      dot={{ fill: '#2BC4A8', r: 3 }}
                    />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-cyan/5 border border-cyan/20 rounded-xl">
               <p className="text-xs text-text-muted leading-relaxed italic">
                 “<span className="text-cyan font-bold">火元素</span>偏旺，对应今日‘甲辰’地气上升。象征市场情绪波动可能在午后放大，建议规避高频噪音。”
               </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-border/50">
             <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6">行业五行映射表</h3>
             <div className="space-y-3">
                {[
                  { name: '半导体/电子', element: '火', style: 'text-success' },
                  { name: '计算机/AI', element: '木', style: 'text-cyan' },
                  { name: '非银金融', element: '金', style: 'text-white' },
                  { name: '商贸/物流', element: '水', style: 'text-primary' },
                  { name: '煤炭/基建', element: '土', style: 'text-yellow-500' },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between p-2 bg-surface/30 rounded-lg border border-white/5">
                     <span className="text-xs text-text-muted">{item.name}</span>
                     <span className={`text-xs font-bold ${item.style}`}>[{item.element}]</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* CENTER: Market Symbolism (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
           <div className="glass-panel p-6 rounded-2xl border border-border/50 flex flex-col items-center justify-center h-[450px] relative overflow-hidden">
             {/* Hexagram Visual */}
             <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                <div className="w-80 h-80 border border-cyan rounded-full animate-spin-slow"></div>
             </div>
             
             <div className="mb-8 text-center">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">市场象 · 趋势隐喻</h3>
                <span className="text-4xl text-white">{HEXAGRAM_NAME}</span>
             </div>

             <div className="flex flex-col gap-3 w-48 mb-8">
                {HEXAGRAM_SYMBOL.map((isYang, i) => (
                   <div key={i} className="flex justify-between gap-1 h-3">
                      {isYang ? (
                         <div className="w-full bg-cyan/80 rounded-sm shadow-glow-cyan"></div>
                      ) : (
                         <>
                            <div className="w-[48%] bg-border rounded-sm"></div>
                            <div className="w-[48%] bg-border rounded-sm"></div>
                         </>
                      )}
                   </div>
                ))}
             </div>

             <div className="flex gap-2 mb-8">
                {['通达', '扩散', '顺势'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-surface border border-border rounded-full text-[10px] text-text-muted font-bold">
                     {tag}
                   </span>
                ))}
             </div>

             <div className="text-center space-y-2">
                <div className="text-[10px] text-text-muted uppercase font-bold">变动能级</div>
                <div className="flex items-center gap-2">
                   <div className="w-24 h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-cyan w-2/3 shadow-glow-cyan"></div>
                   </div>
                   <span className="text-[10px] font-mono text-cyan">STABLE</span>
                </div>
             </div>
           </div>

           <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
              <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Icons.Alert className="w-3 h-3" /> 非预测声明
              </h4>
              <p className="text-[11px] text-text-muted leading-relaxed">
                本模块仅基于文化符号学对宏观数据进行感性重构，旨在提供多维思考视角。所有“五行”与“卦象”映射不构成任何直接的买卖依据。
              </p>
           </div>
        </div>

        {/* RIGHT: Sentiment Compare & AI Audit (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
           <div className="glass-panel p-6 rounded-2xl border border-border/50 flex flex-col h-[350px]">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                    <Icons.Activity className="w-4 h-4 text-violet" /> 文化视角 × 市场情绪
                 </h3>
                 <span className="text-[10px] text-success font-bold px-2 py-0.5 bg-success/10 rounded">一致 (ALIGN)</span>
              </div>
              <div className="flex-1 min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={MOCK_SENTIMENT_COMPARE}>
                       <XAxis dataKey="time" hide />
                       <YAxis hide domain={['auto', 'auto']} />
                       <Tooltip contentStyle={{backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px'}} />
                       <Area type="monotone" dataKey="quant" stroke="#1F6FEB" fill="#1F6FEB" fillOpacity={0.1} strokeWidth={2} name="量化情绪" />
                       <Line type="monotone" dataKey="cultural" stroke="#2BC4A8" dot={false} strokeWidth={2} name="文化隐喻" />
                    </ComposedChart>
                 </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-text-muted mt-4 leading-snug">
                当<span className="text-cyan font-bold">文化隐喻</span>与<span className="text-primary font-bold">量化情绪</span>走势趋同时，往往预示着群体心理层面的共振较为扎实。
              </p>
           </div>

           {/* AI Cultural Interpretation */}
           <div className="flex-1 glass-panel p-6 rounded-2xl border border-border/50 bg-gradient-to-b from-[#161B22] to-transparent flex flex-col gap-4 relative overflow-hidden group">
              <Icons.Robot className="absolute -right-4 -bottom-4 w-32 h-32 text-violet opacity-5 group-hover:scale-110 transition-transform duration-700" />
              <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-widest">
                 <Icons.Sparkles className="w-4 h-4 shadow-glow-blue" /> AI 跨界诊断报告
              </div>
              <div className="space-y-6 relative z-10 overflow-y-auto custom-scrollbar">
                 <div>
                    <div className="text-[10px] text-text-muted font-bold mb-1">【量化结论】</div>
                    <p className="text-xs text-text-main">
                      市场目前处于极低波动区间，成交量萎缩至 7000 亿。均线缠绕，方向不明。
                    </p>
                 </div>
                 <div>
                    <div className="text-[10px] text-cyan font-bold mb-1">【越影解读】</div>
                    <p className="text-xs text-text-main leading-relaxed">
                      今日象征为“潜龙勿用”。外部消息面看似活跃（火旺），但底部动能不足（金弱）。在国学视角中，这通常代表一种“伪突破”前奏。
                    </p>
                 </div>
                 <div className="p-3 bg-violet/10 border border-violet/20 rounded-xl">
                    <p className="text-[10px] text-violet font-bold leading-relaxed italic">
                      “文化建议：守柔处静，不宜激进扩张。关注‘土’属性相关稳健资产的对冲价值。”
                    </p>
                 </div>
              </div>
              <button className="w-full py-2.5 mt-auto bg-violet/20 border border-violet/30 rounded-xl text-[10px] font-bold text-violet hover:bg-violet/30 transition-all uppercase tracking-widest relative z-10">
                 生成完整周易因子报告
              </button>
           </div>
        </div>
      </div>

      {/* 3. Global Disclaimer Footer */}
      <footer className="h-10 shrink-0 border-t border-border/50 bg-[#161B22]/80 px-8 flex items-center justify-between z-20">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] text-text-muted">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
               SYMBOLIC ENGINE: <span className="text-text-main font-mono">YU-YING-01</span>
            </div>
         </div>
         <div className="text-[10px] text-text-muted italic uppercase">
           * 文化研究视角，不具备金融投资指示性 · 投资有风险，入市需谨慎
         </div>
      </footer>
    </div>
  );
};

export default XuanxueLab;
