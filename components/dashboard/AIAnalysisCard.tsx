import React from 'react';
import { Icons } from '../Icons';

const AIAnalysisCard: React.FC = () => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-border flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
        <Icons.Robot className="w-32 h-32 text-violet" />
      </div>
      
      <div className="flex justify-between items-center relative z-10">
        <h3 className="text-xs font-bold text-violet uppercase tracking-widest flex items-center gap-2">
          <Icons.Sparkles className="w-4 h-4" />
          AI 组合分析建议
        </h3>
        <span className="text-[9px] text-text-muted font-mono">CONFIDENCE: 92%</span>
      </div>
      
      <div className="relative z-10 space-y-4">
        <p className="text-xs text-text-muted leading-relaxed">
          "当前 <span className="text-white font-bold">双均线趋势版</span> 在 3100 点附近出现 Alpha 衰减，建议将仓位动态调整至 <span className="text-cyan font-bold">中性多因子</span> 模块。监测到小市值风格正在修复，利好模拟盘策略 S2。"
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2.5 bg-violet/10 border border-violet/20 rounded-xl">
            <div className="text-[9px] text-violet font-bold uppercase mb-1">预期夏普</div>
            <div className="text-lg font-mono font-bold text-white">2.82</div>
          </div>
          <div className="p-2.5 bg-cyan/10 border border-cyan/20 rounded-xl">
            <div className="text-[9px] text-cyan font-bold uppercase mb-1">流动性评分</div>
            <div className="text-lg font-mono font-bold text-white">High</div>
          </div>
        </div>
      </div>
      
      <button className="w-full py-2 bg-violet/20 border border-violet/30 rounded-lg text-[10px] font-bold text-violet hover:bg-violet/30 transition-all uppercase tracking-widest relative z-10">
        执行组合再平衡 (Rebalance)
      </button>
    </div>
  );
};

export default AIAnalysisCard;
