import React from 'react';
import { Icons } from '../Icons';

interface AlphaEngineHeaderProps {
  selectedCount: number;
  isRunning: boolean;
  onRun: () => void;
  onShowAdvanced: () => void;
}

const AlphaEngineHeader: React.FC<AlphaEngineHeaderProps> = ({
  selectedCount,
  isRunning,
  onRun,
  onShowAdvanced
}) => {
  return (
    <div className="h-20 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between z-10">
      {/* Left: Title & Info */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-primary/20 rounded-xl border border-primary/30 shadow-glow-blue">
            <Icons.Cpu className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Alpha Engine <span className="text-xs text-text-muted font-normal ml-2">多因子组合实验室</span>
            </h1>
            <div className="flex items-center gap-4 text-[10px] mt-1 font-mono">
              <span className="text-primary font-bold">已选因子: {selectedCount}</span>
              <span className="text-text-muted">|</span>
              <span className="text-text-muted">股票池: 沪深300</span>
              <span className="text-text-muted">|</span>
              <span className="text-text-muted">频率: Weekly</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-surface/50 p-1.5 rounded-lg border border-border/30">
          <button className="px-3 py-1.5 text-xs text-white bg-primary rounded shadow-sm">基本配置</button>
          <button 
            onClick={onShowAdvanced}
            className="px-3 py-1.5 text-xs text-text-muted hover:text-white transition-colors flex items-center gap-2"
          >
            高级限制
            <Icons.Sliders className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Right: Controls & Run Button */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 mr-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-muted">行业中性</span>
            <div className="w-8 h-4 bg-primary/30 rounded-full relative">
              <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-primary rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-muted">市值中性</span>
            <div className="w-8 h-4 bg-white/10 rounded-full relative">
              <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-text-muted rounded-full"></div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onRun}
          disabled={isRunning}
          className="px-8 py-2.5 bg-gradient-to-r from-primary to-cyan text-white rounded-lg text-sm font-bold shadow-glow-blue hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isRunning ? <Icons.Refresh className="w-4 h-4 animate-spin" /> : <Icons.Play className="w-4 h-4" />}
          {isRunning ? '模型生成中...' : '生成 Alpha 组合'}
        </button>
      </div>
    </div>
  );
};

export default AlphaEngineHeader;
