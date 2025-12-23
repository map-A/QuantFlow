import React from 'react';

interface Strategy {
  id: string;
  label: string;
  color: string;
}

interface StrategyChipsProps {
  strategies: Strategy[];
  onStrategyClick: (strategyId: string) => void;
}

const StrategyChips: React.FC<StrategyChipsProps> = ({ strategies, onStrategyClick }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <span className="text-xs font-bold text-text-muted whitespace-nowrap">热门策略:</span>
      {strategies.map(strategy => (
        <button 
          key={strategy.id}
          onClick={() => onStrategyClick(strategy.id)}
          className={`px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-transform hover:scale-105 ${strategy.color}`}
        >
          {strategy.label}
        </button>
      ))}
    </div>
  );
};

export default StrategyChips;
