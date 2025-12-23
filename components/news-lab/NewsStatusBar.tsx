import React from 'react';
import { Icons } from '../Icons';

interface NewsStatusBarProps {
  processingDelay?: string;
  newsRegime?: string;
  processedCount?: number;
  engineStatus?: 'online' | 'offline';
}

export const NewsStatusBar: React.FC<NewsStatusBarProps> = ({
  processingDelay = '14ms',
  newsRegime = 'POSITIVE RECOVERY',
  processedCount = 14285,
  engineStatus = 'online'
}) => {
  const regimeProgress = newsRegime.includes('POSITIVE') ? 80 : 
                        newsRegime.includes('NEGATIVE') ? 20 : 50;

  return (
    <div className="h-12 shrink-0 glass-panel rounded-xl border border-border/50 px-6 flex items-center justify-between text-[10px]">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-text-muted">
          <Icons.Clock className="w-3 h-3" /> 最新处理时延: <span className="text-cyan font-mono">{processingDelay}</span>
        </div>
        <div className="w-[1px] h-3 bg-border" />
        <div className="flex items-center gap-4">
          <span className="text-text-muted uppercase">News Regime:</span>
          <div className="flex items-center gap-1">
            <div className="w-20 h-1.5 bg-surface rounded-full overflow-hidden border border-border/50">
              <div 
                className="h-full bg-gradient-to-r from-danger via-primary to-success" 
                style={{ width: `${regimeProgress}%` }}
              />
            </div>
            <span className={`font-bold ${
              newsRegime.includes('POSITIVE') ? 'text-success' : 
              newsRegime.includes('NEGATIVE') ? 'text-danger' : 'text-text-muted'
            }`}>
              {newsRegime}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-text-muted">
          Processed: <span className="text-white font-mono font-bold">{processedCount.toLocaleString()} News/Day</span>
        </span>
        <div className="flex items-center gap-2">
          <Icons.CheckCircle className={`w-3 h-3 ${engineStatus === 'online' ? 'text-success' : 'text-danger'}`} />
          <span className={engineStatus === 'online' ? 'text-success' : 'text-danger'}>
            Engine {engineStatus === 'online' ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
};
