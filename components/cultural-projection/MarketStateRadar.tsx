import React from 'react';
import { Icons } from '../Icons';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const FIVE_ELEMENTS_DATA = [
  { subject: '金 (Metal)', A: 45, fullMark: 100, label: '金融/资源' },
  { subject: '木 (Wood)', A: 75, fullMark: 100, label: '科技/成长' },
  { subject: '水 (Water)', A: 85, fullMark: 100, label: '物流/流动' },
  { subject: '火 (Fire)', A: 92, fullMark: 100, label: '情绪/能源' },
  { subject: '土 (Earth)', A: 60, fullMark: 100, label: '稳健/基建' },
];

export const MarketStateRadar: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl border border-border/50 flex flex-col overflow-hidden bg-gradient-to-br from-surface/40 to-transparent">
      <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest font-serif">当前市场状态（文化视角）</h3>
        <Icons.Target className="w-4 h-4 text-cyan opacity-50" />
      </div>
      <div className="p-8 flex items-center gap-12">
        <div className="w-64 h-64 shrink-0 relative">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={FIVE_ELEMENTS_DATA}>
              <PolarGrid stroke="#30363D" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B949E', fontSize: 12, fontFamily: 'serif' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar 
                name="Energy" 
                dataKey="A" 
                stroke="#2BC4A8" 
                fill="#2BC4A8" 
                fillOpacity={0.1} 
                dot={{ fill: '#2BC4A8', r: 3 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-lg text-text-main leading-relaxed italic font-serif">
            "当前市场呈现出<span className="text-[#2BC4A8] font-bold">'火 + 水并存'</span>的特征。交易活跃度较高，但方向一致性较弱，注意力切换偏快。火元素主导情绪波动，水元素主导资金存量博弈。"
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-[10px] text-text-muted uppercase mb-1">主导特征</div>
              <div className="text-sm font-bold text-[#2BC4A8]">离中见坎 · 活跃分歧</div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-[10px] text-text-muted uppercase mb-1">趋势隐喻</div>
              <div className="text-sm font-bold text-[#D6B36A]">潜龙虽动 · 仍需守静</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
