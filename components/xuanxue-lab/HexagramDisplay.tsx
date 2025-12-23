import React from 'react';
import { HexagramData } from './types';

interface HexagramDisplayProps {
  hexagram: HexagramData;
}

export const HexagramDisplay: React.FC<HexagramDisplayProps> = ({ hexagram }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-border/50 flex flex-col items-center justify-center h-[450px] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <div className="w-80 h-80 border border-cyan rounded-full animate-spin-slow"></div>
      </div>
      
      <div className="mb-8 text-center">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">
          市场象 · 趋势隐喻
        </h3>
        <span className="text-4xl text-white">{hexagram.name}</span>
      </div>

      {/* Hexagram Lines */}
      <div className="flex flex-col gap-3 w-48 mb-8">
        {hexagram.symbol.map((isYang, i) => (
          <div key={i} className="flex justify-between gap-1 h-3">
            {isYang ? (
              <div className="w-full bg-cyan/80 rounded-sm shadow-glow-cyan"></div>
            ) : (
              <>
                <div className="w-[48%] bg-border rounded-sm"></div>
                <div className="w-[48%] bg-border rounded-sm"></div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-8">
        {hexagram.tags.map(tag => (
          <span 
            key={tag} 
            className="px-3 py-1 bg-surface border border-border rounded-full text-[10px] text-text-muted font-bold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Energy Level */}
      <div className="text-center space-y-2">
        <div className="text-[10px] text-text-muted uppercase font-bold">变动能级</div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan shadow-glow-cyan" 
              style={{ width: `${hexagram.energyLevel}%` }}
            ></div>
          </div>
          <span className="text-[10px] font-mono text-cyan">{hexagram.status}</span>
        </div>
      </div>
    </div>
  );
};
