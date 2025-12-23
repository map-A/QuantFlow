import React from 'react';
import { Icons } from '../Icons';
import { StrategyRiskAlert } from '../../types';

interface StrategyAlertsCardProps {
  alerts: StrategyRiskAlert[];
}

const StrategyAlertsCard: React.FC<StrategyAlertsCardProps> = ({ alerts }) => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-danger/20 bg-danger/5 flex-1">
      <h3 className="text-xs font-bold text-danger uppercase tracking-widest mb-4 flex items-center gap-2">
        <Icons.Alert className="w-4 h-4" />
        策略风控实时告警
      </h3>
      
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div 
            key={i} 
            className="flex gap-3 items-start p-3 bg-surface/50 border border-border/50 rounded-xl hover:border-danger/30 transition-all cursor-pointer"
          >
            <div className={`mt-1 p-1 rounded ${alert.level === 'danger' ? 'bg-danger text-white' : 'bg-yellow-500 text-black'}`}>
              <Icons.Alert className="w-3 h-3" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-text-main">ALERT_ID: {alert.strategyId}</span>
                <span className="text-[9px] text-text-muted font-mono">{alert.time}</span>
              </div>
              <p className="text-[11px] text-text-muted leading-snug">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategyAlertsCard;
