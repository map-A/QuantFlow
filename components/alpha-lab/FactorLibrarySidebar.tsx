import React from 'react';
import { Icons } from '../Icons';

interface FactorMetadata {
  id: string;
  name: string;
  category: string;
  icMean: number;
  icIr: number;
  halfLife: string;
  turnover: string;
  description: string;
}

interface FactorLibrarySidebarProps {
  factors: FactorMetadata[];
  activeFactor: FactorMetadata;
  onFactorSelect: (factor: FactorMetadata) => void;
}

const FactorLibrarySidebar: React.FC<FactorLibrarySidebarProps> = ({
  factors,
  activeFactor,
  onFactorSelect
}) => {
  const categories = ['Technical', 'Fundamental', 'Valuation', 'Money Flow'];

  return (
    <div className="flex-1 glass-panel rounded-xl border border-border/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-white/5">
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">因子元件库</span>
        <Icons.Search className="w-3.5 h-3.5 text-text-muted" />
      </div>

      {/* Factor List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4">
        {categories.map(cat => (
          <div key={cat}>
            <div className="px-2 mb-2 text-[9px] font-bold text-text-muted uppercase opacity-50">
              {cat}
            </div>
            <div className="space-y-1">
              {factors.filter(f => f.category === cat).map(f => (
                <div 
                  key={f.id} 
                  draggable 
                  onClick={() => onFactorSelect(f)}
                  className={`p-3 rounded-lg border transition-all cursor-move group relative overflow-hidden
                    ${activeFactor.id === f.id ? 'bg-primary/5 border-primary/40' : 'bg-surface/30 border-border/30 hover:border-white/20'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-text-main group-hover:text-primary">
                      {f.name}
                    </span>
                    <div className="text-[9px] font-mono text-cyan">
                      IC: {f.icMean.toFixed(3)}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[8px] text-text-muted font-mono">
                    <div className="flex flex-col">
                      <span>IR</span>
                      <span className="text-violet">{f.icIr}</span>
                    </div>
                    <div className="flex flex-col">
                      <span>Decay</span>
                      <span className="text-white">{f.halfLife}</span>
                    </div>
                    <div className="flex flex-col">
                      <span>Turn</span>
                      <span className="text-white">{f.turnover}</span>
                    </div>
                  </div>
                  {activeFactor.id === f.id && (
                    <div className="absolute top-0 right-0 w-1 h-full bg-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactorLibrarySidebar;
