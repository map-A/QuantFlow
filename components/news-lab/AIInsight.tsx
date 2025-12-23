import React from 'react';
import { Icons } from '../Icons';

interface AIInsightProps {
  insight?: string;
  warning?: string;
  onSimulateTest?: () => void;
}

export const AIInsight: React.FC<AIInsightProps> = ({
  insight = '该政策变动对房地产板块具有流动性注入效应。历史上相似规模的专项债发行政策在 2018 年发生后，带动板块在 3 个交易日内平均上涨 6.5%。风险点在于市场已提前消化部分预期。',
  warning = '警惕情绪过热后的高位分歧',
  onSimulateTest
}) => {
  return (
    <div className="flex-1 glass-panel border border-violet/30 bg-violet/5 rounded-2xl p-6 relative flex flex-col gap-4 overflow-hidden group">
      <Icons.Robot className="absolute -right-6 -bottom-6 w-32 h-32 text-violet opacity-10 group-hover:scale-110 transition-transform duration-700" />
      
      <div className="flex items-center gap-2 text-violet font-bold text-sm tracking-widest uppercase">
        <Icons.Sparkles className="w-5 h-5 shadow-glow-blue" />
        AI Insight 决策中枢
      </div>
      
      <p className="text-xs text-text-muted leading-relaxed">
        <span className="text-white font-bold italic">"</span>
        {insight.split('流动性注入').map((part, i) => 
          i === 0 ? part : <><span key={i} className="text-cyan font-bold">流动性注入</span>{part}</>
        )}
        {insight.includes('6.5%') && insight.split('6.5%').map((part, i) =>
          i === 0 ? part : <><span key={i} className="text-cyan font-bold">6.5%</span>{part}</>
        )}
      </p>
      
      <div className="mt-auto space-y-3">
        <div className="flex items-center gap-2 p-2 bg-danger/10 border border-danger/30 rounded-lg">
          <Icons.Alert className="w-4 h-4 text-danger" />
          <span className="text-[10px] text-danger font-bold">{warning}</span>
        </div>
        <button 
          onClick={onSimulateTest}
          className="w-full py-2.5 bg-gradient-to-r from-violet to-primary text-white rounded-xl text-xs font-bold shadow-glow-blue hover:brightness-110 transition-all uppercase tracking-tighter"
        >
          执行模拟仓位测试
        </button>
      </div>
    </div>
  );
};
