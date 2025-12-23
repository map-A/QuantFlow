import React from 'react';
import { Icons } from '../Icons';
import { CulturalDate } from './types';

interface XuanxueHeaderProps {
  culturalDate: CulturalDate;
  referenceStrength?: 'LOW' | 'MEDIUM' | 'HIGH';
  lensEnabled: boolean;
  onToggleLens: () => void;
}

export const XuanxueHeader: React.FC<XuanxueHeaderProps> = ({
  culturalDate,
  referenceStrength = 'LOW',
  lensEnabled,
  onToggleLens,
}) => {
  const strengthColor = {
    LOW: 'text-yellow-500',
    MEDIUM: 'text-primary',
    HIGH: 'text-success'
  }[referenceStrength];

  return (
    <header className="h-20 shrink-0 border-b border-border/50 bg-[#161B22]/50 backdrop-blur-md px-8 flex items-center justify-between z-10">
      <div className="flex items-center gap-6">
        <div className="p-3 bg-cyan/10 rounded-2xl border border-cyan/20">
          <Icons.Compass className="w-8 h-8 text-cyan animate-spin-slow" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
            国学视角 · 越影实验室
            <span className="text-[10px] text-text-muted font-normal bg-surface px-2 py-0.5 rounded border border-border">
              EXPERIMENTAL LENS
            </span>
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs text-text-muted italic">
              {culturalDate.year} {culturalDate.month} {culturalDate.day}
            </span>
            <div className="h-3 w-px bg-border/50" />
            <span className="text-[10px] text-text-muted uppercase tracking-widest flex items-center gap-2">
              参考强度: <span className={`${strengthColor} font-bold`}>{referenceStrength === 'LOW' ? '低' : referenceStrength === 'MEDIUM' ? '中' : '高'} ({referenceStrength})</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter">
            文化透镜模式 (CULTURAL LENS)
          </span>
          <button 
            onClick={onToggleLens}
            className={`w-12 h-6 rounded-full relative transition-all ${
              lensEnabled ? 'bg-cyan shadow-glow-cyan' : 'bg-border'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
              lensEnabled ? 'left-7' : 'left-1'
            }`} />
          </button>
        </div>
      </div>
    </header>
  );
};
