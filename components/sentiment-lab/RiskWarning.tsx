import React from 'react';
import { Icons } from '../Icons';

interface RiskWarningProps {
  title: string;
  description: string;
}

export const RiskWarning: React.FC<RiskWarningProps> = ({ title, description }) => {
  return (
    <div className="glass-panel p-4 rounded-xl border border-danger/20 bg-danger/5 flex items-start gap-3">
      <Icons.Alert className="w-5 h-5 text-danger shrink-0 mt-0.5" />
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-danger">{title}</span>
        <p className="text-[10px] text-text-muted leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
};
