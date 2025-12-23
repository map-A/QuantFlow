import React from 'react';

interface Metric {
  label: string;
  val: string;
  trend: string;
  tc: string;
}

const PerformanceSummary: React.FC = () => {
  const metrics: Metric[] = [
    { label: 'IC Mean', val: '0.062', trend: '+12%', tc: 'text-success' },
    { label: 'IC IR', val: '0.85', trend: '-2%', tc: 'text-danger' },
    { label: '年化收益', val: '18.4%', trend: '+4%', tc: 'text-success' },
    { label: '夏普比率', val: '2.14', trend: '+0.1', tc: 'text-success' },
    { label: '最大回撤', val: '-12.2%', trend: 'Low', tc: 'text-primary' },
    { label: '胜率', val: '58.5%', trend: 'High', tc: 'text-success' },
  ];

  return (
    <div className="glass-panel border border-border/50 rounded-xl p-4">
      <div className="text-[10px] font-bold text-text-muted uppercase mb-4">核心绩效评估</div>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="space-y-1">
            <div className="text-[8px] text-text-muted font-bold uppercase tracking-tight">
              {m.label}
            </div>
            <div className={`text-sm font-mono font-bold ${m.tc}`}>{m.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceSummary;
