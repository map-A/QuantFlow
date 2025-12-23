import React from 'react';

interface StatusBarProps {
  node: string;
  apiLatency: string;
  complianceMode: string;
  timestamp: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  node, 
  apiLatency, 
  complianceMode, 
  timestamp 
}) => {
  return (
    <div className="h-10 shrink-0 border-t border-border bg-[#161B22]/80 px-6 flex items-center justify-between text-[10px] z-[60]">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-text-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          NODE: <span className="text-text-main font-mono">{node}</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-2 text-text-muted">
          API LATENCY: <span className="text-cyan font-mono">{apiLatency}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-text-muted uppercase">
          COMPLIANCE MODE: <span className="text-success font-bold">{complianceMode}</span>
        </span>
        <span className="text-text-muted font-mono">{timestamp}</span>
      </div>
    </div>
  );
};

export default StatusBar;
