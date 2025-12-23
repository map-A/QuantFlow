import React from 'react';
import { Icons } from '../Icons';

interface AICulturalReportProps {
  quantConclusion?: string;
  culturalInterpretation?: string;
  culturalAdvice?: string;
  onGenerateReport?: () => void;
}

export const AICulturalReport: React.FC<AICulturalReportProps> = ({
  quantConclusion = '市场目前处于极低波动区间，成交量萎缩至 7000 亿。均线缠绕，方向不明。',
  culturalInterpretation = '今日象征为"潜龙勿用"。外部消息面看似活跃（火旺），但底部动能不足（金弱）。在国学视角中，这通常代表一种"伪突破"前奏。',
  culturalAdvice = '文化建议：守柔处静，不宜激进扩张。关注"土"属性相关稳健资产的对冲价值。',
  onGenerateReport
}) => {
  return (
    <div className="flex-1 glass-panel p-6 rounded-2xl border border-border/50 bg-gradient-to-b from-[#161B22] to-transparent flex flex-col gap-4 relative overflow-hidden group">
      <Icons.Robot className="absolute -right-4 -bottom-4 w-32 h-32 text-violet opacity-5 group-hover:scale-110 transition-transform duration-700" />
      
      <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-widest">
        <Icons.Sparkles className="w-4 h-4 shadow-glow-blue" /> AI 跨界诊断报告
      </div>
      
      <div className="space-y-6 relative z-10 overflow-y-auto custom-scrollbar">
        <div>
          <div className="text-[10px] text-text-muted font-bold mb-1">【量化结论】</div>
          <p className="text-xs text-text-main">
            {quantConclusion}
          </p>
        </div>
        <div>
          <div className="text-[10px] text-cyan font-bold mb-1">【越影解读】</div>
          <p className="text-xs text-text-main leading-relaxed">
            {culturalInterpretation}
          </p>
        </div>
        <div className="p-3 bg-violet/10 border border-violet/20 rounded-xl">
          <p className="text-[10px] text-violet font-bold leading-relaxed italic">
            "{culturalAdvice}"
          </p>
        </div>
      </div>
      
      <button 
        onClick={onGenerateReport}
        className="w-full py-2.5 mt-auto bg-violet/20 border border-violet/30 rounded-xl text-[10px] font-bold text-violet hover:bg-violet/30 transition-all uppercase tracking-widest relative z-10"
      >
        生成完整周易因子报告
      </button>
    </div>
  );
};
