import React from 'react';
import { Icons } from '../Icons';

interface ParamsPanelProps {
  params: any;
  onParamsChange: (params: any) => void;
  onClose: () => void;
}

interface ParamInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  max?: number;
}

const ParamInput: React.FC<ParamInputProps> = ({ label, value, onChange, step = 1, max }) => (
  <div className="space-y-1">
    <label className="text-xs text-text-muted">{label}</label>
    <div className="flex gap-2">
      <input 
        type="number" 
        value={value} 
        step={step}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-background border border-border rounded px-2 py-1.5 text-xs text-white outline-none focus:border-primary font-mono"
      />
    </div>
  </div>
);

const ParamsPanel: React.FC<ParamsPanelProps> = ({ params, onParamsChange, onClose }) => {
  return (
    <div className="w-80 border-l border-border bg-surface/30 backdrop-blur flex flex-col">
      {/* Header */}
      <div className="h-10 border-b border-border flex items-center justify-between px-4">
        <span className="text-xs font-bold text-text-muted uppercase">策略参数</span>
        <button onClick={onClose} className="text-text-muted hover:text-white">
          <Icons.ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Params */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ParamInput 
          label="短期均线" 
          value={params.ma_window_short} 
          onChange={(v) => onParamsChange({...params, ma_window_short: v})} 
        />
        <ParamInput 
          label="长期均线" 
          value={params.ma_window_long} 
          onChange={(v) => onParamsChange({...params, ma_window_long: v})} 
        />
        <ParamInput 
          label="止损阈值" 
          value={params.stop_loss_pct} 
          step={0.01} 
          onChange={(v) => onParamsChange({...params, stop_loss_pct: v})} 
        />
        
        <div className="pt-4 mt-auto">
          <button className="w-full py-2 bg-surface border border-border rounded text-xs text-text-muted hover:text-white hover:border-primary transition-colors">
            保存并更新
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParamsPanel;
