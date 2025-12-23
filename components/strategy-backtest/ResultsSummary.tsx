import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, color }) => (
  <div className="p-4 bg-surface/50 rounded-xl border border-border hover:border-primary/30 transition-all">
    <div className="text-xs text-text-muted mb-1">{label}</div>
    <div className={`text-2xl font-mono font-bold ${color}`}>{value}</div>
  </div>
);

interface ResultsSummaryProps {
  metrics: {
    totalReturn: number;
    annualizedReturn: number;
    maxDrawdown: number;
    sharpe: number;
    winRate: number;
    calmar: number;
  };
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6 border-b border-border">
      <MetricCard label="总收益率" value={`+${metrics.totalReturn}%`} color="text-success" />
      <MetricCard label="年化收益" value={`${metrics.annualizedReturn}%`} color="text-success" />
      <MetricCard label="最大回撤" value={`${metrics.maxDrawdown}%`} color="text-danger" />
      <MetricCard label="夏普比率" value={String(metrics.sharpe)} color="text-cyan" />
      <MetricCard label="胜率" value={`${metrics.winRate}%`} color="text-text-main" />
      <MetricCard label="Calmar比率" value={String(metrics.calmar)} color="text-text-main" />
    </div>
  );
};

export default ResultsSummary;
