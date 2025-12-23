import React from 'react';

interface MetricBlockProps {
  label: string;
  value: string;
  colorClass?: string;
}

const MetricBlock: React.FC<MetricBlockProps> = ({ label, value, colorClass = "text-white" }) => (
  <div className="p-3 bg-surface/40 border border-border/30 rounded-lg">
    <div className="text-[10px] text-text-muted uppercase mb-1">{label}</div>
    <div className={`text-lg font-mono font-bold ${colorClass}`}>{value}</div>
  </div>
);

export default MetricBlock;
