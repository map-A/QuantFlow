import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon?: React.ComponentType<{ className?: string }>;
  colorClass?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  subValue, 
  icon: Icon, 
  colorClass = "text-white" 
}) => (
  <div className="glass-panel p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all group">
    <div className="flex justify-between items-start mb-2">
      <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{label}</div>
      {Icon && <Icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />}
    </div>
    <div className={`text-2xl font-mono font-bold ${colorClass}`}>{value}</div>
    {subValue && <div className="text-[10px] text-text-muted mt-1">{subValue}</div>}
  </div>
);
