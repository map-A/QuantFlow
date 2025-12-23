import React from 'react';
import { Icons } from '../Icons';
import { Rule } from './types';
import { Panel } from './Panel';

interface FilterRulesProps {
  rules: Rule[];
  onAddRule?: () => void;
  onToggleRule?: (id: string) => void;
  onEditRule?: (id: string) => void;
}

export const FilterRules: React.FC<FilterRulesProps> = ({ 
  rules, 
  onAddRule,
  onToggleRule,
  onEditRule 
}) => {
  return (
    <Panel 
      title="情绪过滤规则 (Filter Rules)" 
      icon={Icons.Filter} 
      extra={
        <button onClick={onAddRule} className="p-1 hover:text-white transition-colors">
          <Icons.Plus className="w-3.5 h-3.5" />
        </button>
      }
    >
      <div className="space-y-3">
        {rules.map(rule => (
          <div 
            key={rule.id} 
            className={`p-3 rounded-xl border transition-all relative overflow-hidden group ${
              rule.enabled ? 'bg-primary/5 border-primary/30' : 'bg-surface/30 border-border/50 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-text-main">{rule.variable}</span>
                <span className="text-xs text-primary font-mono">{rule.operator}</span>
                <span className="text-xs font-bold text-white">{rule.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onEditRule?.(rule.id)} 
                  className="p-1 text-text-muted hover:text-white"
                >
                  <Icons.Settings className="w-3 h-3" />
                </button>
                <div className={`w-2 h-2 rounded-full ${rule.enabled ? 'bg-primary animate-pulse' : 'bg-text-muted'}`}></div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-muted">
              <Icons.Zap className="w-3 h-3 text-cyan" />
              Then Action: <span className="text-white font-bold">{rule.action}</span>
            </div>
            {rule.enabled && <div className="absolute top-0 right-0 w-1 h-full bg-primary/40"></div>}
          </div>
        ))}
        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-border/50"></div>
          <button className="px-3 py-1 border border-border rounded text-[10px] text-text-muted hover:text-white">
            ADD AND/OR LOGIC
          </button>
          <div className="h-px flex-1 bg-border/50"></div>
        </div>
      </div>
    </Panel>
  );
};
