import React from 'react';
import { Icons } from '../Icons';

interface AlphaLabHeaderProps {
  isRunning: boolean;
  onRun: () => void;
}

const AlphaLabHeader: React.FC<AlphaLabHeaderProps> = ({ isRunning, onRun }) => {
  return (
    <div className="h-14 shrink-0 flex items-center justify-between glass-panel px-6 rounded-xl border border-border/50">
      {/* Left: Title & Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
            <Icons.Terminal className="w-6 h-6 text-primary shadow-glow-blue" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-none">
              因子实验室 <span className="text-[10px] text-text-muted font-mono ml-2">Alpha Gen Engine v3.0</span>
            </h1>
            <div className="flex items-center gap-3 text-[10px] text-text-muted mt-1.5">
              <span className="flex items-center gap-1">
                <Icons.Grid className="w-3 h-3" /> 全A股
              </span>
              <span className="flex items-center gap-1">
                <Icons.Clock className="w-3 h-3" /> 日频
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 border border-border rounded-lg text-xs hover:bg-white/5 text-text-muted flex items-center gap-2">
          <Icons.History className="w-4 h-4" /> 版本管理
        </button>
        <button 
          onClick={onRun} 
          disabled={isRunning} 
          className="px-6 py-2 bg-gradient-to-r from-primary to-cyan text-white rounded-lg text-xs font-bold shadow-glow-blue hover:brightness-110 transition-all flex items-center gap-2"
        >
          {isRunning ? <Icons.Refresh className="w-4 h-4 animate-spin" /> : <Icons.Zap className="w-4 h-4" />}
          运行分析 (F5)
        </button>
      </div>
    </div>
  );
};

export default AlphaLabHeader;
