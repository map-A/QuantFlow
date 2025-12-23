import React from 'react';
import { Icons } from '../Icons';

interface StatusBarProps {
  ruleVersion?: string;
  statusMessage?: string;
  sampleSize?: number;
  onDownloadReport?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  ruleVersion = 'Sentiment_V4_Alpha_Release',
  statusMessage = '策略运行正常',
  sampleSize = 8450,
  onDownloadReport 
}) => {
  return (
    <div className="h-12 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between text-xs">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-text-muted">
          <Icons.History className="w-4 h-4" /> 规则历史: <span className="text-text-main">{ruleVersion}</span>
        </div>
        <div className="w-[1px] h-3 bg-border"></div>
        <div className="flex items-center gap-2 text-text-muted">
          <Icons.CheckCircle className="w-4 h-4 text-success" />
          状态: <span className="text-success font-bold">{statusMessage}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-text-muted font-mono">
          Sample Size: <span className="text-white">{sampleSize.toLocaleString()} Trades</span>
        </span>
        <button 
          onClick={onDownloadReport}
          className="text-primary hover:underline font-bold flex items-center gap-1"
        >
          <Icons.Download className="w-3 h-3" /> 下载因子热力报告
        </button>
      </div>
    </div>
  );
};
