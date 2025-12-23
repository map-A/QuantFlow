import React from 'react';
import { Icons } from '../Icons';

const AIOptimizationSuggestion: React.FC = () => {
  return (
    <div className="p-4 bg-violet/5 border border-violet/20 rounded-xl flex flex-col gap-3 relative overflow-hidden group">
      <Icons.Robot className="absolute -right-4 -top-4 w-20 h-20 text-violet opacity-5" />
      <div className="flex items-center gap-2 text-violet font-bold text-xs">
        <Icons.Sparkles className="w-4 h-4" /> AI 组合优化建议
      </div>
      <p className="text-[10px] text-text-muted leading-relaxed">
        监测到 <span className="text-white">f2 (ROE)</span> 与 <span className="text-white">f3 (Profit)</span> 相关性极高(0.75)。建议降低 f3 权重或使用 PCA 合并以降低冗余。
      </p>
      <button className="w-full py-2 bg-violet/10 border border-violet/30 rounded text-[10px] text-violet font-bold hover:bg-violet/20 transition-all uppercase tracking-widest">
        一键优化权重
      </button>
    </div>
  );
};

export default AIOptimizationSuggestion;
