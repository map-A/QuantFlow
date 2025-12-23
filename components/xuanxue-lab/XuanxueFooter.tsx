import React from 'react';

interface XuanxueFooterProps {
  engineName?: string;
  disclaimerText?: string;
}

export const XuanxueFooter: React.FC<XuanxueFooterProps> = ({
  engineName = 'YU-YING-01',
  disclaimerText = '* 文化研究视角，不具备金融投资指示性 · 投资有风险，入市需谨慎'
}) => {
  return (
    <footer className="h-10 shrink-0 border-t border-border/50 bg-[#161B22]/80 px-8 flex items-center justify-between z-20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[10px] text-text-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          SYMBOLIC ENGINE: <span className="text-text-main font-mono">{engineName}</span>
        </div>
      </div>
      <div className="text-[10px] text-text-muted italic uppercase">
        {disclaimerText}
      </div>
    </footer>
  );
};
