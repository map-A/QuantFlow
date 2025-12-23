import React from 'react';
import { Icons } from '../Icons';
import { RiskIndicator } from '../../types';

interface RiskControlCardProps {
  riskIndicators: RiskIndicator[];
}

const RiskControlCard: React.FC<RiskControlCardProps> = ({ riskIndicators }) => {
  return (
    <div className="glass-panel p-5 rounded-xl border border-border bg-gradient-to-b from-surface to-background flex flex-col">
      <h3 className="font-bold flex items-center gap-2 mb-4 text-white uppercase text-xs tracking-widest">
        <Icons.Alert className="w-5 h-5 text-yellow-500" />
        风控仪表盘 (Risk)
      </h3>
      
      <div className="space-y-4 flex-1">
        {riskIndicators.map((risk, i) => (
          <div 
            key={i} 
            className="p-3 bg-surface border border-border rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">
                {risk.name}
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase
                ${risk.status === 'safe' ? 'bg-success/10 text-success' : 
                  risk.status === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 
                  'bg-danger/10 text-danger'}
              `}>
                {risk.status}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-mono font-bold text-white group-hover:text-primary transition-colors">
                {risk.value}
              </span>
              {risk.trend === 'up' && <Icons.Up className="w-3 h-3 text-danger" />}
              {risk.trend === 'down' && <Icons.Down className="w-3 h-3 text-success" />}
            </div>
            
            <p className="text-[9px] text-text-muted mt-1 leading-tight">{risk.description}</p>
            
            {risk.status === 'warning' && 
              <div className="absolute top-0 right-0 w-1 h-full bg-yellow-500 shadow-glow-cyan" />
            }
          </div>
        ))}

        {/* Portfolio Risk Summary */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
              组合风险敞口
            </span>
            <span className="text-[10px] font-mono text-cyan font-bold">LOW EXPOSURE</span>
          </div>
          <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden border border-border/50">
            <div className="bg-cyan w-[25%] h-full shadow-glow-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskControlCard;
