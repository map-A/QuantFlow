import React from 'react';
import { Icons } from '../Icons';
import Panel from './Panel';

interface FactorItem {
  id: string;
  name: string;
  type: string;
  icMean: number;
  icIr: number;
  decay: string;
  turnover: string;
  weight: number;
  selected: boolean;
  correlationWarning?: boolean;
}

interface FactorPoolPanelProps {
  factors: FactorItem[];
  onToggle: (id: string) => void;
}

const FactorPoolPanel: React.FC<FactorPoolPanelProps> = ({ factors, onToggle }) => {
  return (
    <Panel title="因子资源池" icon={Icons.Terminal}>
      <div className="flex flex-col p-2 gap-2">
        <div className="relative mb-2">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
          <input 
            type="text" 
            placeholder="搜索已保存因子..." 
            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs outline-none focus:border-primary transition-all"
          />
        </div>
        <div className="space-y-1.5">
          {factors.map(f => (
            <div 
              key={f.id} 
              onClick={() => onToggle(f.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all group relative overflow-hidden
                ${f.selected ? 'bg-primary/5 border-primary/40' : 'bg-surface/30 border-border/30 hover:border-white/20'}
              `}
            >
              <div className="flex justify-between items-start mb-2 relative z-10">
                <div>
                  <div className="text-xs font-bold text-text-main flex items-center gap-2">
                    {f.name}
                    {f.correlationWarning && (
                      <span title="Highly Correlated">
                        <Icons.Alert className="w-3 h-3 text-danger" />
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-text-muted uppercase tracking-tighter">{f.type}</span>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                  ${f.selected ? 'bg-primary border-primary' : 'border-border'}
                `}>
                  {f.selected && <Icons.CheckCircle className="w-3 h-3 text-white" />}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] relative z-10">
                <div className="flex flex-col">
                  <span className="text-text-muted opacity-60">IC Mean</span>
                  <span className="font-mono font-bold text-cyan">{f.icMean}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-muted opacity-60">IC IR</span>
                  <span className="font-mono font-bold text-violet">{f.icIr}</span>
                </div>
              </div>
              {f.selected && <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};

export default FactorPoolPanel;
