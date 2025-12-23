import React from 'react';
import { Icons } from '../Icons';

interface AnalyzingLoaderProps {
  query: string;
  progress?: number;
}

export const AnalyzingLoader: React.FC<AnalyzingLoaderProps> = ({ query, progress = 78 }) => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#0D1117] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan/5 via-transparent to-transparent opacity-50"></div>
      
      {/* Cyberpunk Scanner Effect */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 border border-cyan/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-4 border border-violet/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
        <div className="absolute inset-0 border-t-2 border-cyan rounded-full animate-spin"></div>
        <div className="absolute inset-10 border-b-2 border-violet rounded-full animate-[spin_3s_linear_infinite]"></div>
        
        <div className="relative z-10 text-center space-y-2">
          <Icons.AI className="w-12 h-12 text-cyan mx-auto animate-pulse" />
          <div className="text-2xl font-bold text-white tracking-widest">ANALYZING</div>
        </div>
      </div>

      <div className="mt-8 w-64 space-y-2">
        <div className="flex justify-between text-xs text-cyan font-mono">
          <span>SCANNING MARKET DATA</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan to-violet animate-pulse" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-text-muted text-center pt-2">Processing {query}...</div>
      </div>
    </div>
  );
};
