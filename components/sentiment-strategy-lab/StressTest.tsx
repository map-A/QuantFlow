import React from 'react';
import { Icons } from '../Icons';
import { Panel } from './Panel';

interface StressTestProps {
  sampleSize?: number;
  progress?: number;
  onRunTest?: () => void;
}

export const StressTest: React.FC<StressTestProps> = ({ 
  sampleSize = 100000,
  progress = 85,
  onRunTest 
}) => {
  return (
    <Panel title="AI 情绪冲击模拟" icon={Icons.Zap}>
      <div className="space-y-4">
        <p className="text-[10px] text-text-muted leading-relaxed">
          模拟当前策略在极端情绪崩坏（冰点）下的表现。系统将模拟 30% 的成分股跌停场景。
        </p>
        <div className="p-4 border border-border rounded-xl bg-background/50 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-surface border-t-danger animate-spin-slow"></div>
          <button 
            onClick={onRunTest}
            className="w-full py-2.5 bg-danger/10 text-danger border border-danger/30 rounded-lg text-xs font-bold hover:bg-danger/20 transition-all uppercase tracking-widest"
          >
            开始模拟压力测试
          </button>
        </div>
        <div className="space-y-1 mt-2">
          <div className="flex justify-between text-[9px] text-text-muted">
            <span>模拟样本量</span>
            <span className="text-white">{sampleSize.toLocaleString()} Nodes</span>
          </div>
          <div className="h-1 bg-surface rounded-full overflow-hidden">
            <div className="bg-primary h-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </Panel>
  );
};
