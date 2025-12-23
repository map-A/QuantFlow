import React from 'react';

export const PageFooter: React.FC = () => {
  return (
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
  );
};
