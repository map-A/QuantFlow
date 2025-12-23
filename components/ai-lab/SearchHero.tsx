import React from 'react';
import { Icons } from '../Icons';
import { PromptTemplate } from './types';

interface SearchHeroProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (query: string) => void;
  templates: PromptTemplate[];
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  query,
  onQueryChange,
  onSearch,
  templates
}) => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden p-6 bg-[#0D1117]">
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[5000ms]" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan blur-xl opacity-20"></div>
            <div className="relative p-4 bg-gradient-to-tr from-[#161B22] to-[#1C2128] rounded-2xl border border-white/10 shadow-2xl">
              <Icons.Sparkles className="w-10 h-10 text-cyan" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white/50 tracking-tight text-center">
            QuantFlow AI
          </h1>
          <p className="text-text-muted font-light text-center max-w-lg text-lg">
            您的智能量化投资副驾驶 <br/>
            <span className="text-sm opacity-60">Deep Analysis • Market Sentiment • Strategy Backtest</span>
          </p>
        </div>
        
        {/* Search Box */}
        <div className="w-full relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan/30 via-violet/30 to-primary/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative bg-[#161B22]/80 backdrop-blur border border-white/10 rounded-2xl flex items-center p-2 shadow-2xl transition-all group-hover:border-cyan/30 group-hover:bg-[#161B22]">
            <Icons.Search className="w-6 h-6 text-text-muted ml-4" />
            <input 
              type="text" 
              className="flex-1 bg-transparent border-none outline-none text-lg px-4 py-4 text-white placeholder-text-muted/40 font-light font-sans"
              placeholder="Ask AI about stocks, sectors, or strategies..."
              value={query}
              onChange={e => onQueryChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSearch(query)}
              autoFocus
            />
            <div className="flex items-center gap-2 pr-2">
              <button className="p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Voice Input">
                <Icons.Mic className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onSearch(query)}
                className="px-6 py-3 bg-cyan hover:bg-cyan/90 text-[#0D1117] rounded-xl font-bold shadow-[0_0_15px_rgba(43,196,168,0.4)] transition-all flex items-center gap-2"
              >
                <Icons.Sparkles className="w-4 h-4" />
                <span>Analyze</span>
              </button>
            </div>
          </div>
        </div>

        {/* Prompt Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-4">
          {templates.map((t, i) => (
            <button 
              key={i} 
              onClick={() => onSearch(t.query)}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-cyan/20 transition-all text-left group backdrop-blur-sm"
            >
              <div className="p-2.5 rounded-lg bg-surface text-text-muted group-hover:text-cyan group-hover:bg-cyan/10 transition-colors border border-white/5 group-hover:border-cyan/20">
                <t.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-text-main group-hover:text-white flex items-center gap-2">
                  {t.label}
                </div>
                <div className="text-xs text-text-muted truncate opacity-70">{t.query}</div>
              </div>
              <Icons.ArrowRight className="w-4 h-4 text-white/10 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
        
        <div className="mt-8 flex gap-6 text-xs text-text-muted font-mono opacity-50">
          <span className="flex items-center gap-1"><Icons.Command className="w-3 h-3"/> Focus Search</span>
          <span className="flex items-center gap-1"><Icons.Mic className="w-3 h-3"/> Voice Mode</span>
        </div>
      </div>
    </div>
  );
};
