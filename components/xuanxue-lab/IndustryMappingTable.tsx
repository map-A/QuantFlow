import React from 'react';
import { IndustryMapping } from './types';

interface IndustryMappingTableProps {
  mappings: IndustryMapping[];
}

export const IndustryMappingTable: React.FC<IndustryMappingTableProps> = ({ mappings }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-border/50">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6">
        行业五行映射表
      </h3>
      <div className="space-y-3">
        {mappings.map(item => (
          <div 
            key={item.name} 
            className="flex items-center justify-between p-2 bg-surface/30 rounded-lg border border-white/5"
          >
            <span className="text-xs text-text-muted">{item.name}</span>
            <span className={`text-xs font-bold ${item.style}`}>[{item.element}]</span>
          </div>
        ))}
      </div>
    </div>
  );
};
