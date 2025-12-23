import React from 'react';
import { Icons } from '../Icons';

interface FactorMetadata {
  id: string;
  name: string;
}

interface FormulaEditorProps {
  activeFactor: FactorMetadata;
  activeTab: 'visual' | 'code';
  onTabChange: (tab: 'visual' | 'code') => void;
  code: string;
  onCodeChange: (code: string) => void;
}

const FormulaEditor: React.FC<FormulaEditorProps> = ({
  activeFactor,
  activeTab,
  onTabChange,
  code,
  onCodeChange
}) => {
  return (
    <div className="h-2/5 glass-panel border border-border/50 rounded-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-9 border-b border-border/50 bg-white/5 flex items-center px-4 justify-between shrink-0">
        <div className="flex bg-background border border-border rounded p-0.5">
          <button 
            onClick={() => onTabChange('visual')} 
            className={`px-3 py-1 text-[9px] font-bold rounded ${activeTab === 'visual' ? 'bg-primary text-white' : 'text-text-muted'}`}
          >
            可视化
          </button>
          <button 
            onClick={() => onTabChange('code')} 
            className={`px-3 py-1 text-[9px] font-bold rounded ${activeTab === 'code' ? 'bg-primary text-white' : 'text-text-muted'}`}
          >
            表达式
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-text-muted font-mono">ID: F_{activeFactor.id}</span>
          <Icons.Save className="w-3.5 h-3.5 text-text-muted hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Content */}
      {activeTab === 'visual' ? (
        <div className="flex-1 p-6 flex flex-wrap gap-4 items-center justify-center relative">
          <div className="p-3 bg-surface border border-primary/30 rounded-lg text-xs font-mono shadow-glow-blue border-dashed">
            {activeFactor.name} <span className="text-text-muted">(Window: 20)</span>
          </div>
          <Icons.Plus className="w-4 h-4 text-text-muted" />
          <div className="p-3 bg-surface border border-violet/30 rounded-lg text-xs font-mono border-dashed">
            ROE_TTM <span className="text-text-muted">(Lag: 1)</span>
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] text-primary bg-primary/10 px-2 py-1 rounded">
            + 添加因子算子 (Lag, Diff, Decay...)
          </div>
        </div>
      ) : (
        <textarea 
          value={code} 
          onChange={e => onCodeChange(e.target.value)}
          className="flex-1 bg-transparent p-4 font-mono text-sm text-cyan outline-none resize-none leading-relaxed custom-scrollbar"
        />
      )}
    </div>
  );
};

export default FormulaEditor;
