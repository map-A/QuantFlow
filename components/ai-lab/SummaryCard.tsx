import React from 'react';
import { Icons } from '../Icons';
import { GlassCard } from './GlassCard';
import { ConfidenceGauge } from './ConfidenceGauge';

interface SummaryCardProps {
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  confidence?: number;
  summary?: string;
  details?: string;
  support?: string;
  resistance?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  sentiment = 'bullish',
  confidence = 88,
  summary = '市场呈现震荡上行趋势，主力资金在半导体与AI板块形成合力。',
  details = '虽然大盘面临3100点整数关口压力，但北向资金连续3日净流入，且量能温和放大。建议关注具备业绩支撑的科技成长股，警惕高位消费股的回调风险。',
  support = '3050.20',
  resistance = '3120.50'
}) => {
  const sentimentConfig = {
    bullish: { label: 'Bullish Outlook', color: 'success', icon: Icons.Up },
    bearish: { label: 'Bearish Outlook', color: 'danger', icon: Icons.Down },
    neutral: { label: 'Neutral Outlook', color: 'text-muted', icon: Icons.Minus }
  }[sentiment];

  return (
    <GlassCard glow className="flex flex-col md:flex-row gap-6 items-stretch min-h-[180px]">
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 bg-${sentimentConfig.color}/10 border border-${sentimentConfig.color}/30 text-${sentimentConfig.color} rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 shadow-[0_0_10px_rgba(246,70,93,0.2)]`}>
            <sentimentConfig.icon className="w-3 h-3" /> {sentimentConfig.label}
          </span>
          <span className="text-xs text-text-muted font-mono flex items-center gap-1">
            <Icons.Clock className="w-3 h-3" /> Generated just now
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white leading-snug">
          {summary.split('震荡上行').map((part, i) => 
            i === 0 ? part : <><span key={i} className="text-cyan drop-shadow-[0_0_8px_rgba(43,196,168,0.5)]">震荡上行</span>{part}</>
          )}
        </h2>
        <p className="text-sm text-text-muted leading-relaxed border-l-2 border-cyan/30 pl-3">
          {details}
        </p>
      </div>
      
      <div className="w-px bg-white/10 hidden md:block"></div>

      <div className="w-[200px] shrink-0 flex flex-col items-center justify-center gap-2">
        <ConfidenceGauge score={confidence} />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full mt-2">
          <div className="text-center">
            <div className="text-[10px] text-text-muted uppercase">Support</div>
            <div className="text-sm font-mono font-bold text-success">{support}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-text-muted uppercase">Resistance</div>
            <div className="text-sm font-mono font-bold text-danger">{resistance}</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
