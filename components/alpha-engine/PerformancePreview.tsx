import React from 'react';
import { Icons } from '../Icons';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import Panel from './Panel';
import MetricBlock from './MetricBlock';

interface EquityCurveData {
  date: string;
  strategy: number;
  benchmark: number;
  longShort: number;
}

interface PerformancePreviewProps {
  data: EquityCurveData[];
}

const PerformancePreview: React.FC<PerformancePreviewProps> = ({ data }) => {
  return (
    <Panel title="预测收益与回测预览" icon={Icons.Up}>
      <div className="p-4 flex flex-col h-full gap-6">
        <div className="grid grid-cols-2 gap-3">
          <MetricBlock label="年化收益" value="28.4%" colorClass="text-success" />
          <MetricBlock label="夏普比率" value="2.85" colorClass="text-cyan" />
          <MetricBlock label="最大回撤" value="-12.2%" colorClass="text-danger" />
          <MetricBlock label="信息比率" value="1.42" colorClass="text-violet" />
        </div>

        <div className="flex-1 min-h-[180px] bg-surface/20 rounded-xl border border-border/30 p-2 relative">
          <div className="absolute top-2 left-2 text-[10px] text-text-muted z-10 font-bold">累计收益率</div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="stratGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', fontSize: '10px' }} 
                labelStyle={{ marginBottom: 4 }}
              />
              <Area type="monotone" dataKey="strategy" stroke="#1F6FEB" fill="url(#stratGrad)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="benchmark" stroke="#555" dot={false} strokeWidth={1} strokeDasharray="3 3" />
              <Line type="monotone" dataKey="longShort" stroke="#2BC4A8" dot={false} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-surface border border-border rounded-lg flex justify-between items-center">
          <span className="text-xs text-text-muted">因子稳定性 (Factor Stability)</span>
          <span className="text-xs font-bold text-success font-mono">0.82 High</span>
        </div>
      </div>
    </Panel>
  );
};

export default PerformancePreview;
