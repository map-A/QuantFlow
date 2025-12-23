import React from 'react';
import { Icons } from '../Icons';
import { StrategyGate } from './types';
import { Panel } from './Panel';

interface StrategyGatesProps {
  gates: StrategyGate[];
  onToggleGate?: (id: string) => void;
}

export const StrategyGates: React.FC<StrategyGatesProps> = ({ gates, onToggleGate }) => {
  return (
    <Panel title="策略准入控制 (Strategy Gate)" icon={Icons.Lock}>
      <div className="space-y-3">
        {gates.map(gate => (
          <div 
            key={gate.id} 
            className="p-3 bg-surface/50 border border-border rounded-xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                gate.status === 'ACTIVE' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-surface border border-border text-text-muted'
              }`}>
                {gate.status === 'ACTIVE' ? (
                  <Icons.Unlock className="w-4 h-4" />
                ) : (
                  <Icons.Lock className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{gate.name}</div>
                <div className="text-[10px] text-text-muted">Gate: {gate.condition}</div>
              </div>
            </div>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              gate.status === 'ACTIVE' 
                ? 'text-success bg-success/10 shadow-[0_0_8px_rgba(46,189,133,0.2)]' 
                : 'text-text-muted bg-surface'
            }`}>
              {gate.status}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};
