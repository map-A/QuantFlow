import React from 'react';
import { BacktestConfig, Strategy } from '../../types';
import { Icons } from '../Icons';

interface BacktestHeaderProps {
  activeStrategy: Strategy | null;
  config: BacktestConfig;
  onConfigChange: (config: BacktestConfig) => void;
  view: 'editor' | 'results';
  onViewChange: (view: 'editor' | 'results') => void;
  isRunning: boolean;
  onRunBacktest: () => void;
}

const BacktestHeader: React.FC<BacktestHeaderProps> = ({
  activeStrategy,
  config,
  onConfigChange,
  view,
  onViewChange,
  isRunning,
  onRunBacktest
}) => {
  return (
    <div className="h-16 border-b border-border bg-surface/30 backdrop-blur flex items-center justify-between px-6 shrink-0 z-20">
      {/* Left: Strategy Info & Config */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Icons.Code className="w-5 h-5 text-text-muted" />
          <span className="font-bold text-lg text-white">{activeStrategy?.name}</span>
        </div>
        
        <div className="h-8 w-px bg-border"></div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-text-muted text-[10px]">回测区间</span>
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                value={config.startDate} 
                onChange={e => onConfigChange({...config, startDate: e.target.value})} 
                className="bg-transparent text-text-main border-none p-0 focus:ring-0 w-24 font-mono"
              />
              <span className="text-text-muted">→</span>
              <input 
                type="date" 
                value={config.endDate} 
                onChange={e => onConfigChange({...config, endDate: e.target.value})} 
                className="bg-transparent text-text-main border-none p-0 focus:ring-0 w-24 font-mono"
              />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-text-muted text-[10px]">初始资金</span>
            <input 
              type="text" 
              value={config.initialCapital.toLocaleString()} 
              className="bg-transparent text-text-main border-none p-0 focus:ring-0 w-20 font-mono" 
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Right: View Toggle & Run Button */}
      <div className="flex items-center gap-3">
        <div className="flex p-1 bg-surface border border-border rounded-lg">
          <button 
            onClick={() => onViewChange('editor')} 
            className={`px-3 py-1 text-xs font-medium rounded transition-all ${view === 'editor' ? 'bg-primary text-white shadow' : 'text-text-muted hover:text-white'}`}
          >
            代码
          </button>
          <button 
            onClick={() => onViewChange('results')} 
            className={`px-3 py-1 text-xs font-medium rounded transition-all ${view === 'results' ? 'bg-primary text-white shadow' : 'text-text-muted hover:text-white'}`}
          >
            结果
          </button>
        </div>

        <button 
          onClick={onRunBacktest}
          disabled={isRunning}
          className="ml-2 flex items-center gap-2 px-4 py-1.5 bg-success text-white rounded-lg hover:bg-success/90 transition-all shadow-lg shadow-success/20 disabled:opacity-50 font-bold text-xs"
        >
          {isRunning ? <Icons.Refresh className="w-4 h-4 animate-spin" /> : <Icons.Play className="w-4 h-4" />}
          {isRunning ? '正在运行...' : '运行回测'}
        </button>
      </div>
    </div>
  );
};

export default BacktestHeader;
