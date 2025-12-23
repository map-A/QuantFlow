import React from 'react';
import { Icons } from '../Icons';

export const RiskDisclaimer: React.FC = () => {
  return (
    <div className="p-8 bg-[#D6B36A]/5 border border-[#D6B36A]/10 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
      <div className="shrink-0 p-4 bg-[#D6B36A]/10 rounded-2xl">
        <Icons.Alert className="w-8 h-8 text-[#D6B36A]" />
      </div>
      <div className="space-y-2 text-center md:text-left">
        <h4 className="text-sm font-bold text-white uppercase tracking-widest font-serif">不确定性说明与理性模型冲突处理</h4>
        <p className="text-xs text-text-muted leading-relaxed">
          文化视角反映的是市场心理与象征结构，具有一定的主观性与隐喻性。当本页面的推演结论与量化技术指标（如 MACD、量价关系）或实际行情走势出现明显不一致时，<span className="text-[#D6B36A] font-bold">请务必优先参考理性量化模型与风控策略</span>。文化视角仅作为多维博弈环境下的感性补充，而非决策核心。
        </p>
      </div>
    </div>
  );
};
