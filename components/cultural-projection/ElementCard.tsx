import React from 'react';

interface ElementCardProps {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string;
  desc: string;
  color: string;
  weight: number;
}

export const ElementCard: React.FC<ElementCardProps> = ({ id, name, icon: Icon, keywords, desc, color, weight }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-border/50 hover:border-primary/30 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-16 h-16" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-bold font-serif" style={{ color }}>{name}</h4>
        <span className="text-[10px] font-mono text-text-muted">{weight}% Strength</span>
      </div>
      <div className="mb-4">
        <span className="px-2 py-0.5 bg-surface border border-border rounded text-[9px] text-text-muted font-bold uppercase">{keywords}</span>
      </div>
      <p className="text-xs text-text-muted leading-relaxed">
        {desc}
      </p>
      <div className="mt-6 w-full h-1 bg-surface rounded-full overflow-hidden">
        <div className="h-full transition-all duration-1000" style={{ backgroundColor: color, width: `${weight}%` }} />
      </div>
    </div>
  );
};
