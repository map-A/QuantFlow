import React from 'react';
import { Icons } from '../Icons';
import { FactorWeight } from './types';
import { Panel } from './Panel';

interface WeightMatrixProps {
  factors: FactorWeight[];
  onWeightChange?: (id: string, regime: 'low' | 'neutral' | 'high', value: number) => void;
  onAcceptAISuggestion?: () => void;
}

export const WeightMatrix: React.FC<WeightMatrixProps> = ({ 
  factors, 
  onWeightChange,
  onAcceptAISuggestion 
}) => {
  return (
    <Panel 
      title="因子权重动态调节矩阵" 
      icon={Icons.Sliders}
      extra={
        <button className="text-[10px] text-primary hover:underline">
          Auto-Normalize Weights
        </button>
      }
    >
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-4 mb-4 text-[10px] font-bold text-text-muted uppercase px-2">
          <div className="col-span-4">Factor Name</div>
          <div className="col-span-2 text-center">Low Sent</div>
          <div className="col-span-2 text-center">Neutral</div>
          <div className="col-span-2 text-center">High Sent</div>
          <div className="col-span-2 text-right">Preview</div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {factors.map(factor => (
            <div 
              key={factor.id} 
              className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-text-main">{factor.name}</span>
                <span className="text-[10px] text-text-muted">Base: {factor.base}%</span>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 flex items-center gap-4">
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 text-[9px] text-danger">Low</span>
                      <input 
                        type="range" 
                        className="flex-1 accent-danger h-1 rounded-full bg-surface" 
                        defaultValue={factor.low}
                        onChange={(e) => onWeightChange?.(factor.id, 'low', Number(e.target.value))}
                      />
                      <span className="w-6 text-[9px] font-mono text-white">{factor.low}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-10 text-[9px] text-primary">Med</span>
                      <input 
                        type="range" 
                        className="flex-1 accent-primary h-1 rounded-full bg-surface" 
                        defaultValue={factor.neutral}
                        onChange={(e) => onWeightChange?.(factor.id, 'neutral', Number(e.target.value))}
                      />
                      <span className="w-6 text-[9px] font-mono text-white">{factor.neutral}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-10 text-[9px] text-cyan">High</span>
                      <input 
                        type="range" 
                        className="flex-1 accent-cyan h-1 rounded-full bg-surface" 
                        defaultValue={factor.high}
                        onChange={(e) => onWeightChange?.(factor.id, 'high', Number(e.target.value))}
                      />
                      <span className="w-6 text-[9px] font-mono text-white">{factor.high}%</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-surface border-t-primary border-r-cyan flex items-center justify-center relative">
                    <span className="text-[10px] font-bold text-white">{factor.neutral}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-violet/5 border border-violet/20 rounded-xl relative overflow-hidden flex flex-col gap-2">
          <Icons.Robot className="absolute -right-4 -top-4 w-20 h-20 text-violet opacity-5" />
          <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-widest">
            <Icons.Sparkles className="w-4 h-4 shadow-glow-blue" />
            AI 动态权重建议
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed">
            监测到情绪快速从 <span className="text-white">中性</span> 转向 <span className="text-white">活跃</span>。建议将 <span className="text-cyan font-bold">Momentum_20D</span> 的高情绪权重上调至 75% 以捕捉趋势。
          </p>
          <button 
            onClick={onAcceptAISuggestion}
            className="w-full py-2 bg-violet/10 border border-violet/30 rounded text-[10px] text-violet font-bold hover:bg-violet/20 transition-all"
          >
            接受并优化权重
          </button>
        </div>
      </div>
    </Panel>
  );
};
