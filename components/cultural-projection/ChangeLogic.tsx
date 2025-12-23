import React from 'react';

const CHANGE_LOGIC_DATA = [
  { name: '当前状态', status: '亢奋', color: '#F6465D' },
  { name: '变化中', status: '分歧', color: '#D6B36A' },
  { name: '下一倾向', status: '轮动', color: '#2BC4A8' },
];

export const ChangeLogic: React.FC = () => {
  return (
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
        从当前情绪驱动状态推演，下一阶段更容易过渡到"分化与轮动增强"的状态，表现为热点持续性下降。
      </p>
    </div>
  );
};
