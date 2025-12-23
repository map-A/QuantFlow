import React from 'react';
import { Icons } from '../Icons';

export const SentimentFooter: React.FC = () => {
  return (
    <div className="shrink-0 h-12 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between text-[10px]">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-text-muted">
          <Icons.Clock className="w-3 h-3" /> 最新计算周期: <span className="text-text-main font-mono">T-0 (Realtime)</span>
        </div>
        <div className="w-[1px] h-3 bg-border" />
        <div className="flex items-center gap-2 text-text-muted">
          <Icons.History className="w-3 h-3" /> 历史平均分: <span className="text-text-main font-mono">54.2 (Neutral)</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-text-muted">Sentiment Model: <span className="text-primary font-bold">QuantFlow-SENT v4.2</span></span>
        <button className="text-primary hover:underline font-bold">下载完整分析报告</button>
      </div>
    </div>
  );
};
