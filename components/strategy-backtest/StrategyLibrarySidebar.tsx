import React from 'react';
import { Strategy } from '../../types';
import { Icons } from '../Icons';

interface StrategyLibrarySidebarProps {
  strategies: Strategy[];
  activeStrategy: Strategy | null;
  onStrategySelect: (strategy: Strategy) => void;
  onCreateNew: () => void;
}

const StrategyLibrarySidebar: React.FC<StrategyLibrarySidebarProps> = ({
  strategies,
  activeStrategy,
  onStrategySelect,
  onCreateNew
}) => {
  return (
    <div className="w-64 border-r border-border bg-surface/50 flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="font-bold flex items-center gap-2 text-white">
          <Icons.Layers className="w-5 h-5 text-violet" />
          策略库
        </h2>
        <button className="p-1 hover:bg-white/10 rounded text-text-muted">
          <Icons.Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Strategy List */}
      <div className="flex-1 overflow-y-auto">
        {strategies.map(strat => (
          <div 
            key={strat.id} 
            onClick={() => onStrategySelect(strat)}
            className={`p-4 border-b border-border/50 cursor-pointer hover:bg-white/5 transition-colors
              ${activeStrategy?.id === strat.id ? 'bg-white/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}
            `}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-sm truncate w-32 text-text-main">{strat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${strat.status === 'active' ? 'bg-success/10 text-success' : 'bg-yellow-500/10 text-yellow-500'}`}>
                {strat.status === 'active' ? '实盘' : '开发中'}
              </span>
            </div>
            <div className="flex justify-between text-xs text-text-muted mt-2">
              <span>收益: <span className="text-success">{strat.returnRate > 0 ? '+' : ''}{strat.returnRate}%</span></span>
              <span>夏普: {strat.sharpeRatio || '--'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Button */}
      <div className="p-4 border-t border-border">
        <button 
          onClick={onCreateNew}
          className="w-full py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm hover:bg-primary/20 flex items-center justify-center gap-2 transition-colors"
        >
          <Icons.Zap className="w-4 h-4" />
          新建策略
        </button>
      </div>
    </div>
  );
};

export default StrategyLibrarySidebar;
