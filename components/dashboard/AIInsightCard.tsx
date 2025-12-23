import React from 'react';
import { Icons } from '../Icons';

const AIInsightCard: React.FC = () => {
  return (
    <div className="glass-panel p-1 rounded-xl border border-border bg-gradient-to-br from-violet/5 via-transparent to-cyan/5 relative">
      <div className="absolute top-0 right-0 p-3 opacity-10">
        <Icons.AI className="w-20 h-20" />
      </div>
      
      <div className="p-5 h-full flex flex-col justify-between relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold flex items-center gap-2 text-violet mb-1">
              <Icons.AI className="w-5 h-5" />
              AI 市场洞察
            </h3>
            <p className="text-[10px] text-text-muted font-mono tracking-tighter">ENGINE v4.2 LIVE</p>
          </div>
          <div className="px-3 py-1 bg-violet/10 border border-violet/20 rounded-full text-[10px] font-bold text-violet animate-pulse">
            震荡看多 ↗
          </div>
        </div>
        
        <div className="my-2 text-sm text-text-main leading-relaxed italic">
          "AI 监测到<span className="text-success font-bold underline decoration-success/30 decoration-2">算力板块</span>出现主力资金回流，高位股情绪修复。建议关注低位补涨的科技股。"
        </div>

        <div className="flex gap-2 mt-auto">
          {['华为汽车', '算力', '创新药'].map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-surface border border-border rounded text-[9px] text-text-muted font-bold tracking-tighter">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIInsightCard;
