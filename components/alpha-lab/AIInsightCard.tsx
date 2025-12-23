import React from 'react';
import { Icons } from '../Icons';

const AIInsightCard: React.FC = () => {
  return (
    <div className="p-5 bg-violet/5 border border-violet/20 rounded-xl relative overflow-hidden group">
      <Icons.Sparkles className="absolute -right-4 -bottom-4 w-20 h-20 text-violet opacity-5 group-hover:scale-110 transition-transform duration-700" />
      <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-widest mb-3">
        <Icons.Robot className="w-4 h-4 animate-bounce" /> AI 投研洞察
      </div>
      <p className="text-[11px] text-text-muted leading-relaxed mb-4">
        "当前因子在 <span className="text-white">高波动/小市值</span> 环境下表现更优。过拟合检测通过 (p=0.032)。建议在目前情绪修复阶段上调动量部分权重。"
      </p>
      <div className="space-y-2">
        <div className="flex justify-between text-[9px] text-text-muted">
          <span>过拟合风险</span>
          <span className="text-success font-bold">LOW</span>
        </div>
        <div className="w-full h-1 bg-background rounded-full overflow-hidden">
          <div className="h-full bg-success w-[15%]" />
        </div>
      </div>
    </div>
  );
};

export default AIInsightCard;
