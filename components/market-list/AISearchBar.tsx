import React from 'react';
import { Icons } from '../Icons';

interface AISearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const AISearchBar: React.FC<AISearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-violet/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-50" />
      
      <div className="relative flex items-center bg-surface border border-border rounded-xl p-1 shadow-2xl">
        <div className="pl-3 pr-2 text-violet">
          <Icons.AI className="w-5 h-5" />
        </div>
        
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="输入自然语言筛选，例如：'找出最近主力资金大幅流入且市盈率低于20的白酒股'..." 
          className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-white placeholder-text-muted/70"
        />
        
        <button 
          onClick={onSearch}
          className="px-4 py-1.5 bg-violet/10 text-violet border border-violet/20 rounded-lg text-xs font-medium hover:bg-violet/20 transition-all"
        >
          AI 深度筛选
        </button>
      </div>
    </div>
  );
};

export default AISearchBar;
