
import React, { useState } from 'react';
import { Icons } from './Icons';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area, CartesianGrid
} from 'recharts';

// --- Mock Data ---

const FIVE_ELEMENTS_DATA = [
  { subject: '金 (Metal)', A: 45, fullMark: 100, label: '金融/资源' },
  { subject: '木 (Wood)', A: 75, fullMark: 100, label: '科技/成长' },
  { subject: '水 (Water)', A: 85, fullMark: 100, label: '物流/流动' },
  { subject: '火 (Fire)', A: 92, fullMark: 100, label: '情绪/能源' },
  { subject: '土 (Earth)', A: 60, fullMark: 100, label: '稳健/基建' },
];

const CHANGE_LOGIC_DATA = [
  { name: '当前状态', status: '亢奋', color: '#F6465D' },
  { name: '变化中', status: '分歧', color: '#D6B36A' },
  { name: '下一倾向', status: '轮动', color: '#2BC4A8' },
];

const ELEMENT_CARDS = [
  { id: 'fire', name: '火 (Fire)', icon: Icons.Flame, keywords: '情绪 / 活跃', desc: '火元素占比偏高，代表市场情绪与短期交易活跃，注意力集中但易波动。', color: '#F6465D', weight: 92 },
  { id: 'water', name: '水 (Water)', icon: Icons.Activity, keywords: '流动 / 扩散', desc: '水元素充盈，象征资金流动性充裕，但缺乏明确的汇聚方向。', color: '#1F6FEB', weight: 85 },
  { id: 'earth', name: '土 (Earth)', icon: Icons.Grid, keywords: '承接 / 修复', desc: '土元素偏弱，意味着底部承接力仍在修复，稳定回升需时间。', color: '#D6B36A', weight: 60 },
];

const CulturalProjection: React.FC = () => {
  const [lensEnabled, setLensEnabled] = useState(true);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] overflow-hidden text-text-main relative select-none">
      {/* Background Subtle Ink Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#2BC4A8 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />

      {/* 1. Header Area */}
      <header className="h-20 shrink-0 border-b border-border/50 bg-[#161B22]/40 backdrop-blur-xl px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-[#D6B36A]/10 rounded-2xl border border-[#D6B36A]/20">
             <Icons.Compass className="w-8 h-8 text-[#D6B36A] animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3 font-serif">
               文化视角 · 下一个观察窗口
               <span className="text-[10px] text-text-muted font-sans font-normal bg-surface px-2 py-0.5 rounded border border-border tracking-widest">CULTURAL PROJECTION</span>
            </h1>
            <div className="flex items-center gap-4 mt-1">
               <p className="text-xs text-text-muted font-sans opacity-70">
                 基于五行、八卦与变化逻辑的市场现象推演 · 非投资建议
               </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
           <div className="flex flex-col items-end">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-tighter mb-1">2025-03-12 · 甲辰日</div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] text-text-muted">参考强度:</span>
                 <span className="text-[10px] font-bold text-[#D6B36A] bg-[#D6B36A]/10 px-2 py-0.5 rounded border border-[#D6B36A]/20">中 (MEDIUM)</span>
              </div>
           </div>
           <div className="h-8 w-px bg-border/50" />
           <div className="flex items-center gap-3">
              <span className="text-[10px] text-text-muted font-bold uppercase">启用文化透镜</span>
              <button 
                onClick={() => setLensEnabled(!lensEnabled)}
                className={`w-12 h-6 rounded-full relative transition-all duration-500 ${lensEnabled ? 'bg-[#2BC4A8] shadow-[0_0_15px_rgba(43,196,168,0.4)]' : 'bg-border'}`}
              >
                 <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 ${lensEnabled ? 'left-7' : 'left-1'}`} />
              </button>
           </div>
        </div>
      </header>

      {/* 2. Main Content Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 z-10 relative">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6">
          
          {/* Section 1: Current State (8 cols top) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="glass-panel rounded-3xl border border-border/50 flex flex-col overflow-hidden bg-gradient-to-br from-surface/40 to-transparent">
              <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest font-serif">当前市场状态（文化视角）</h3>
                <Icons.Target className="w-4 h-4 text-cyan opacity-50" />
              </div>
              <div className="p-8 flex items-center gap-12">
                 <div className="w-64 h-64 shrink-0 relative">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={FIVE_ELEMENTS_DATA}>
                        <PolarGrid stroke="#30363D" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 12, fontFamily: 'serif' }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar 
                          name="Energy" 
                          dataKey="A" 
                          stroke="#2BC4A8" 
                          fill="#2BC4A8" 
                          fillOpacity={0.1} 
                          dot={{ fill: '#2BC4A8', r: 3 }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="flex-1 space-y-6">
                    <p className="text-lg text-text-main leading-relaxed italic font-serif">
                      “当前市场呈现出<span className="text-[#2BC4A8] font-bold">‘火 + 水并存’</span>的特征。交易活跃度较高，但方向一致性较弱，注意力切换偏快。火元素主导情绪波动，水元素主导资金存量博弈。”
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <div className="text-[10px] text-text-muted uppercase mb-1">主导特征</div>
                          <div className="text-sm font-bold text-[#2BC4A8]">离中见坎 · 活跃分歧</div>
                       </div>
                       <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <div className="text-[10px] text-text-muted uppercase mb-1">趋势隐喻</div>
                          <div className="text-sm font-bold text-[#D6B36A]">潜龙虽动 · 仍需守静</div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Section 2: Five Elements Cards */}
            <div className="grid grid-cols-3 gap-6">
               {ELEMENT_CARDS.map(card => (
                 <div key={card.id} className="glass-panel p-6 rounded-3xl border border-border/50 hover:border-primary/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                       <card.icon className="w-16 h-16" />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <h4 className="text-sm font-bold font-serif" style={{ color: card.color }}>{card.name}</h4>
                       <span className="text-[10px] font-mono text-text-muted">{card.weight}% Strength</span>
                    </div>
                    <div className="mb-4">
                       <span className="px-2 py-0.5 bg-surface border border-border rounded text-[9px] text-text-muted font-bold uppercase">{card.keywords}</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                       {card.desc}
                    </p>
                    <div className="mt-6 w-full h-1 bg-surface rounded-full overflow-hidden">
                       <div className="h-full transition-all duration-1000" style={{ backgroundColor: card.color, width: `${card.weight}%` }} />
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Section 3 & 4 (4 cols side) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
             {/* Section 3: Bagua Mapping */}
             <div className="glass-panel rounded-3xl border border-border/50 p-6 flex flex-col h-[350px]">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6 font-serif">结构关系解读（八卦视角）</h3>
                <div className="flex-1 flex items-center justify-center relative">
                   {/* Abstract Bagua Visual */}
                   <div className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center">
                      <div className="w-32 h-32 border border-primary/20 rounded-full flex items-center justify-center animate-spin-slow">
                         <div className="w-16 h-16 border-2 border-[#D6B36A]/40 rounded-full" />
                      </div>
                      {/* Trigram Markers */}
                      <div className="absolute top-0 text-[10px] text-text-muted font-serif">乾</div>
                      <div className="absolute bottom-0 text-[10px] text-text-muted font-serif">坤</div>
                      <div className="absolute left-0 text-[10px] text-text-muted font-serif">坎</div>
                      <div className="absolute right-0 text-[10px] text-text-muted font-serif">离</div>
                   </div>
                   
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#161B22]/90 backdrop-blur px-4 py-2 rounded-xl border border-white/10 text-center shadow-2xl">
                         <div className="text-xl font-serif text-white mb-1">离 (Fire)</div>
                         <div className="flex gap-1 justify-center">
                            {['注意力', '分歧', '转换'].map(tag => (
                              <span key={tag} className="text-[8px] text-text-muted border border-border px-1 rounded">{tag}</span>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
                <p className="mt-6 text-xs text-text-muted leading-relaxed text-center italic">
                  “当前结构更接近‘离中见坎’：表面关注度高度集中，但内部隐性波动正在显著增加，整体稳定性存疑。”
                </p>
             </div>

             {/* Section 4: Change Logic */}
             <div className="glass-panel rounded-3xl border border-border/50 p-6 flex flex-col h-[324px]">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-8 font-serif">变化逻辑推演（状态转换）</h3>
                <div className="flex-1 space-y-8 relative">
                   {/* Connection Line */}
                   <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#F6465D] via-[#D6B36A] to-[#2BC4A8] opacity-20" />
                   
                   {CHANGE_LOGIC_DATA.map((step, i) => (
                     <div key={i} className="flex items-center gap-6 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: step.color }} />
                        </div>
                        <div>
                           <div className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">{step.name}</div>
                           <div className="text-sm font-bold text-white">{step.status}</div>
                        </div>
                     </div>
                   ))}
                </div>
                <p className="mt-6 text-[11px] text-text-muted leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                  从当前情绪驱动状态推演，下一阶段更容易过渡到“分化与轮动增强”的状态，表现为热点持续性下降。
                </p>
             </div>
          </div>

          {/* Section 5: Next Observation Window (Core Feature - 12 cols) */}
          <div className="col-span-12">
             <div className="glass-panel rounded-[40px] border border-[#D6B36A]/30 p-1 bg-gradient-to-br from-[#D6B36A]/10 via-transparent to-[#2BC4A8]/10">
                <div className="bg-[#161B22]/80 backdrop-blur-2xl rounded-[38px] p-10 flex flex-col lg:flex-row gap-12 items-center">
                   <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                      <div className="flex items-center gap-2 text-[#D6B36A] font-bold text-xs uppercase tracking-widest font-serif">
                         <Icons.Target className="w-5 h-5" /> 核心焦点模块
                      </div>
                      <h2 className="text-3xl font-bold text-white font-serif">下一个观察窗口</h2>
                      <p className="text-sm text-text-muted leading-relaxed">
                        此窗口强调“观察现象”，而非判断涨跌结果。建议在此时间段内关注市场对特定阻力的反馈。
                      </p>
                   </div>

                   <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-surface/50 border border-white/5 rounded-3xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6B36A]/5 rounded-full blur-3xl" />
                         <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-2">时间窗口</div>
                         <div className="text-2xl font-bold text-[#D6B36A] font-mono">未来 1–3 个交易日</div>
                         <div className="mt-4 h-1 w-full bg-border rounded-full overflow-hidden">
                            <div className="h-full bg-[#D6B36A] w-2/3 shadow-[0_0_10px_#D6B36A]" />
                         </div>
                      </div>

                      <div className="p-8 bg-surface/50 border border-white/5 rounded-3xl relative overflow-hidden">
                         <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-4">关键观察重点 (Checklist)</div>
                         <ul className="space-y-3">
                            {[
                               '同题材内部是否出现明显分歧',
                               '高波动个股是否触及年线回落',
                               '成交量能否稳定在万亿之上'
                            ].map((item, i) => (
                               <li key={i} className="flex items-start gap-3 text-sm text-text-main group hover:translate-x-1 transition-transform">
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2BC4A8] shrink-0" />
                                  {item}
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Section 6: Risk Context */}
          <div className="col-span-12">
             <div className="p-8 bg-[#D6B36A]/5 border border-[#D6B36A]/10 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0 p-4 bg-[#D6B36A]/10 rounded-2xl">
                   <Icons.Alert className="w-8 h-8 text-[#D6B36A]" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                   <h4 className="text-sm font-bold text-white uppercase tracking-widest font-serif">不确定性说明与理性模型冲突处理</h4>
                   <p className="text-xs text-text-muted leading-relaxed">
                     文化视角反映的是市场心理与象征结构，具有一定的主观性与隐喻性。当本页面的推演结论与量化技术指标（如 MACD、量价关系）或实际行情走势出现明显不一致时，<span className="text-[#D6B36A] font-bold">请务必优先参考理性量化模型与风控策略</span>。文化视角仅作为多维博弈环境下的感性补充，而非决策核心。
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* 3. Global Disclaimer Footer */}
      <footer className="h-12 shrink-0 border-t border-border/50 bg-[#161B22]/80 px-8 flex items-center justify-between z-20">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] text-text-muted">
               <div className="w-1.5 h-1.5 rounded-full bg-[#2BC4A8] animate-pulse" />
               SYMBOLIC PROJECTION: <span className="text-text-main font-mono">MEI-HUA-V2</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="text-[9px] text-text-muted font-mono">CALCULATION LATENCY: 42MS</div>
         </div>
         <div className="text-[10px] text-text-muted italic uppercase font-serif tracking-wide">
           * 本页面为文化象征视角的市场解读，用于辅助理解市场行为，不构成任何投资建议或交易依据
         </div>
      </footer>
    </div>
  );
};

export default CulturalProjection;
