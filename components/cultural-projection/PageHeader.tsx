import React from 'react';
import { Icons } from '../Icons';

interface PageHeaderProps {
  lensEnabled: boolean;
  onToggleLens: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ lensEnabled, onToggleLens }) => {
  return (
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
            onClick={onToggleLens}
            className={`w-12 h-6 rounded-full relative transition-all duration-500 ${lensEnabled ? 'bg-[#2BC4A8] shadow-[0_0_15px_rgba(43,196,168,0.4)]' : 'bg-border'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 ${lensEnabled ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
