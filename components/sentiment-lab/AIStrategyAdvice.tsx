import React from 'react';
import { Icons } from '../Icons';

interface AIStrategyAdviceProps {
  regime: string;
  description: string;
  tags: Array<{ label: string; active: boolean }>;
}

export const AIStrategyAdvice: React.FC<AIStrategyAdviceProps> = ({ regime, description, tags }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-violet/30 bg-violet/5 relative overflow-hidden flex flex-col gap-4">
      <Icons.Robot className="absolute -right-4 -bottom-4 w-24 h-24 text-violet opacity-5" />
      <div className="flex items-center gap-2 text-violet font-bold text-sm">
        <Icons.Sparkles className="w-5 h-5 shadow-glow-blue" />
        AI 策略环境评估 (Environment)
      </div>
      <p className="text-xs text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, idx) => (
          <span 
            key={idx}
            className={`px-2 py-1 border rounded text-[10px] font-bold ${
              tag.active 
                ? 'bg-violet/20 text-violet border-violet/30' 
                : 'bg-surface text-text-muted border-border'
            }`}
          >
            {tag.label}
          </span>
        ))}
      </div>
      <button className="w-full py-2 bg-violet/20 border border-violet/30 rounded-lg text-xs font-bold text-violet hover:bg-violet/30 transition-all uppercase tracking-widest mt-2">
        优化当前持仓
      </button>
    </div>
  );
};
