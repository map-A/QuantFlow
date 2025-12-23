import React from 'react';

export const BaguaMapping: React.FC = () => {
  return (
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
        "当前结构更接近'离中见坎'：表面关注度高度集中，但内部隐性波动正在显著增加，整体稳定性存疑。"
      </p>
    </div>
  );
};
