import React from 'react';
import { Icons } from '../Icons';

interface AIAnalysisPanelProps {
  aiAnalysis: string;
}

const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ aiAnalysis }) => {
  return (
    <div className="p-4 space-y-4">
      {/* AI Trend Analysis */}
      <div className="bg-surface/30 p-3 rounded-lg border border-violet/30 relative overflow-hidden">
        <div className="absolute -right-2 -top-2 text-violet/10">
          <Icons.Robot className="w-16 h-16" />
        </div>
        <div className="relative z-10">
          <h4 className="text-xs font-bold text-violet mb-2 flex items-center gap-1">
            <Icons.Zap className="w-3 h-3" /> 趋势诊断
          </h4>
          <p className="text-xs leading-relaxed text-text-main">
            {aiAnalysis || "AI 正在计算盘面数据..."}
          </p>
        </div>
      </div>

      {/* Key Levels */}
      <div>
        <h4 className="text-xs font-bold text-text-muted mb-2">关键点位 (AI预测)</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-center">
          <div className="bg-success/10 p-2 rounded border border-success/20">
            <div className="text-text-muted scale-90">支撑位</div>
            <div className="font-mono font-bold text-success">1710.00</div>
          </div>
          <div className="bg-danger/10 p-2 rounded border border-danger/20">
            <div className="text-text-muted scale-90">压力位</div>
            <div className="font-mono font-bold text-danger">1758.50</div>
          </div>
        </div>
      </div>

      {/* Strategy Signals */}
      <div>
        <h4 className="text-xs font-bold text-text-muted mb-2">策略信号</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-surface rounded border border-border">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-xs">均线多头</span>
            </div>
            <span className="text-[10px] bg-success/20 text-success px-1 rounded">Buy</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-surface rounded border border-border">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
              <span className="text-xs text-text-muted">KDJ 超买</span>
            </div>
            <span className="text-[10px] bg-surface text-text-muted px-1 rounded">Wait</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisPanel;
