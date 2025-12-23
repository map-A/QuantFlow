import React from 'react';
import { TradeLog } from '../../types';
import { Icons } from '../Icons';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts';

interface TradeDetailDrawerProps {
  trade: TradeLog;
  onClose: () => void;
  perfCompareData: any[];
}

interface DrawerMetricProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
}

const DrawerMetric: React.FC<DrawerMetricProps> = ({ 
  label, 
  value, 
  icon, 
  color = "text-white" 
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] text-text-muted uppercase font-bold">{label}</span>
    <div className="flex items-center gap-2">
      {icon}
      <span className={`text-sm font-bold truncate ${color}`}>{value}</span>
    </div>
  </div>
);

const TradeDetailDrawer: React.FC<TradeDetailDrawerProps> = ({ 
  trade, 
  onClose, 
  perfCompareData 
}) => {
  return (
    <aside className="w-[450px] border-l border-border bg-[#0D1117] flex flex-col z-50 animate-in slide-in-from-right duration-300 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <Icons.Zap className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-white">执行深度分析 (Journal)</h2>
        </div>
        <button 
          onClick={onClose} 
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Icons.XCircle className="w-6 h-6 text-text-muted" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">
            交易基础信息
          </h3>
          <div className="glass-panel p-4 rounded-2xl border border-border space-y-3">
            <DrawerMetric 
              label="执行时刻" 
              value={trade.time}
              icon={<Icons.Activity className="w-4 h-4 text-cyan" />}
              color="text-cyan"
            />
            <DrawerMetric 
              label="执行标的" 
              value={`${trade.name} (${trade.symbol})`}
              icon={<Icons.TrendingUp className="w-4 h-4 text-violet" />}
            />
            <DrawerMetric 
              label="策略模型" 
              value={`${trade.strategyName} ${trade.strategyVersion}`}
              icon={<Icons.Target className="w-4 h-4 text-yellow-500" />}
            />
          </div>
        </section>

        {/* Execution Metrics */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">
            执行质量指标
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-3 rounded-xl border border-border text-center">
              <div className="text-[9px] text-text-muted mb-1">订单时延</div>
              <div className={`text-lg font-mono font-bold ${trade.latencyMs < 50 ? 'text-success' : 'text-danger'}`}>
                {trade.latency}
              </div>
            </div>
            <div className="glass-panel p-3 rounded-xl border border-border text-center">
              <div className="text-[9px] text-text-muted mb-1">合规状态</div>
              <div className={`text-lg font-bold ${trade.complianceStatus === 'PASS' ? 'text-success' : 'text-yellow-500'}`}>
                {trade.complianceStatus}
              </div>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-border space-y-2 bg-surface/20">
            <div className="text-[10px] text-text-muted">
              订单价格: <span className="font-mono text-white">¥{trade.orderPrice}</span>
            </div>
            <div className="text-[10px] text-text-muted">
              成交价格: <span className="font-mono text-white">¥{trade.price}</span>
            </div>
            <div className="text-[10px] text-text-muted">
              滑点损耗: <span className={`font-mono font-bold ${trade.slippage > 0 ? 'text-danger' : 'text-success'}`}>
                {trade.slippagePct}%
              </span>
            </div>
            <div className="text-[10px] text-text-muted">
              税费预估: <span className="font-mono text-white">¥{trade.tax}</span>
            </div>
          </div>
        </section>

        {/* AI Review */}
        <section className="p-5 bg-violet/5 border border-violet/20 rounded-2xl relative overflow-hidden group">
          <Icons.AI className="absolute -right-6 -bottom-6 w-32 h-32 text-violet opacity-10 group-hover:scale-110 transition-transform duration-700" />
          <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-widest mb-3">
            <Icons.Zap className="w-4 h-4 animate-pulse" /> AI 投后审计报告
          </div>
          <p className="text-sm text-text-main leading-relaxed relative z-10 italic">
            "该笔交易发生在市场情绪 <span className="text-cyan">修复期</span>。策略模型捕捉到了 <span className="text-white font-bold">2.41 因子</span> 的异常共振信号。
            执行时延 <span className="text-cyan">{trade.latency}</span> 处于低位，成功规避了 14:50 分的尾盘剧烈波动。
            合规性审计：<span className="text-success font-bold underline">完全合规</span>。"
          </p>
          <div className="mt-4 flex gap-2 relative z-10">
            {['MOM_STRENGTH_HIGH', 'VOL_LOW', 'REGIME_LONG'].map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 bg-violet/10 text-violet border border-violet/20 rounded text-[8px] font-bold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Market Snapshot */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">
            成交时刻行情快照
          </h3>
          <div className="h-40 bg-surface/30 border border-border rounded-2xl p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={perfCompareData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Area type="monotone" dataKey="sim" stroke="#1F6FEB" fill="#1F6FEB" fillOpacity={0.1} />
                <ReferenceLine 
                  x="14:30" 
                  stroke="#F6465D" 
                  strokeDasharray="3 3" 
                  label={{ position: 'top', value: 'Trade Point', fill: '#F6465D', fontSize: 10 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-6 bg-[#161B22] border-t border-border flex gap-4 shrink-0">
        <button className="flex-1 py-3 text-xs font-bold border border-border rounded-xl hover:bg-white/5 transition-all text-text-muted uppercase tracking-tighter">
          下载原始报单日志
        </button>
        <button className="flex-1 py-3 text-xs font-bold bg-primary text-white rounded-xl shadow-glow-blue hover:brightness-110 transition-all uppercase tracking-tighter">
          标记为算法错误
        </button>
      </div>
    </aside>
  );
};

export default TradeDetailDrawer;
