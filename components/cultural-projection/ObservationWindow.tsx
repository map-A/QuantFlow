import React from 'react';
import { Icons } from '../Icons';

export const ObservationWindow: React.FC = () => {
  return (
    <div className="glass-panel rounded-[40px] border border-[#D6B36A]/30 p-1 bg-gradient-to-br from-[#D6B36A]/10 via-transparent to-[#2BC4A8]/10">
      <div className="bg-[#161B22]/80 backdrop-blur-2xl rounded-[38px] p-10 flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <div className="flex items-center gap-2 text-[#D6B36A] font-bold text-xs uppercase tracking-widest font-serif">
            <Icons.Target className="w-5 h-5" /> 核心焦点模块
          </div>
          <h2 className="text-3xl font-bold text-white font-serif">下一个观察窗口</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            此窗口强调"观察现象"，而非判断涨跌结果。建议在此时间段内关注市场对特定阻力的反馈。
          </p>
        </div>

        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-surface/50 border border-white/5 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6B36A]/5 rounded-full blur-3xl" />
            <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-2">时间窗口</div>
            <div className="text-2xl font-bold text-[#D6B36A] font-mono">未来 1–3 个交易日</div>
            <div className="mt-4 h-1 w-full bg-border rounded-full overflow-hidden">
              <div className="h-full bg-[#D6B36A] w-2/3 shadow-[0_0_10px_#D6B36A]" />
            </div>
          </div>

          <div className="p-8 bg-surface/50 border border-white/5 rounded-3xl relative overflow-hidden">
            <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-4">关键观察重点 (Checklist)</div>
            <ul className="space-y-3">
              {[
                '同题材内部是否出现明显分歧',
                '高波动个股是否触及年线回落',
                '成交量能否稳定在万亿之上'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-main group hover:translate-x-1 transition-transform">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2BC4A8] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
