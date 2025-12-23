import React from 'react';
import { Icons } from '../Icons';
import { QuantSignal } from './types';
import { Section } from './Section';

interface QuantSignalsProps {
  signalStrength?: number;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  signals?: QuantSignal[];
  strategies?: string[];
}

export const QuantSignals: React.FC<QuantSignalsProps> = ({
  signalStrength = 82.4,
  confidence = 'HIGH',
  signals = [
    { label: 'Momentum Score', val: '8.5' },
    { label: 'Mean Reversion', val: '2.1' },
    { label: 'Event Volatility', val: 'High' },
  ],
  strategies = ['EVENT_DRIVEN', 'BREAKOUT_FOLLOW']
}) => {
  return (
    <Section title="量化交易信号" icon={Icons.Terminal}>
      <div className="space-y-4">
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-2xl flex flex-col items-center gap-3 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 blur-3xl rounded-full" />
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest relative z-10">
            Signal Strength
          </span>
          <span className="text-4xl font-mono font-bold text-primary relative z-10">
            {signalStrength}
          </span>
          <span className={`text-[10px] font-bold relative z-10 ${
            confidence === 'HIGH' ? 'text-success' : confidence === 'MEDIUM' ? 'text-yellow-500' : 'text-danger'
          }`}>
            CONFIDENCE: {confidence}
          </span>
        </div>
        
        <div className="space-y-2">
          {signals.map(sig => (
            <div key={sig.label} className="flex justify-between items-center p-2 bg-surface/30 border border-border/50 rounded-lg">
              <span className="text-[10px] text-text-muted">{sig.label}</span>
              <span className="text-[11px] font-bold text-white font-mono">{sig.val}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-2 pt-2">
          <div className="text-[10px] text-text-muted uppercase font-bold">Recommended Strategies</div>
          <div className="flex flex-wrap gap-2">
            {strategies.map(strategy => (
              <span 
                key={strategy}
                className="px-2 py-1 bg-cyan/10 text-cyan border border-cyan/30 rounded text-[9px] font-bold"
              >
                {strategy}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
