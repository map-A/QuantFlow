import React from 'react';
import { Icons } from '../Icons';

interface ChartToolbarProps {
  timeframe: string;
  mainOverlay: 'MA' | 'BOLL' | 'NONE';
  comparison: boolean;
  showSignals: boolean;
  onTimeframeChange: (tf: string) => void;
  onOverlayChange: (overlay: 'MA' | 'BOLL' | 'NONE') => void;
  onComparisonToggle: () => void;
  onSignalsToggle: () => void;
}

interface ToolbarItemProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-xs font-medium rounded transition-all whitespace-nowrap
      ${active 
        ? 'bg-primary text-white shadow-sm' 
        : 'text-text-muted hover:text-white hover:bg-white/5'}
    `}
  >
    {label}
  </button>
);

const ChartToolbar: React.FC<ChartToolbarProps> = ({
  timeframe,
  mainOverlay,
  comparison,
  showSignals,
  onTimeframeChange,
  onOverlayChange,
  onComparisonToggle,
  onSignalsToggle
}) => {
  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '日', '周'];

  return (
    <div className="h-9 border-b border-border flex items-center justify-between px-2 bg-surface/20 select-none">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {timeframes.map(tf => (
          <ToolbarItem 
            key={tf} 
            label={tf} 
            active={timeframe === tf} 
            onClick={() => onTimeframeChange(tf)} 
          />
        ))}
        <div className="w-[1px] h-3 bg-border mx-1" />
        <ToolbarItem 
          label="MA" 
          active={mainOverlay === 'MA'} 
          onClick={() => onOverlayChange(mainOverlay === 'MA' ? 'NONE' : 'MA')} 
        />
        <ToolbarItem 
          label="BOLL" 
          active={mainOverlay === 'BOLL'} 
          onClick={() => onOverlayChange(mainOverlay === 'BOLL' ? 'NONE' : 'BOLL')} 
        />
        <div className="w-[1px] h-3 bg-border mx-1" />
        <button 
          onClick={onComparisonToggle}
          className={`text-[10px] px-2 py-0.5 border rounded ${comparison ? 'border-violet text-violet bg-violet/10' : 'border-border text-text-muted'}`}
        >
          vs HS300
        </button>
      </div>
      <div className="flex items-center gap-1 text-text-muted">
        <button 
          className="p-1 hover:bg-white/10 rounded" 
          title="Strategy Signals" 
          onClick={onSignalsToggle}
        >
          <Icons.Target className={`w-3.5 h-3.5 ${showSignals ? 'text-primary' : ''}`} />
        </button>
        <button className="p-1 hover:bg-white/10 rounded">
          <Icons.Maximize className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ChartToolbar;
