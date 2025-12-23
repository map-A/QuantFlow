import React, { useRef, useEffect } from 'react';
import { Icons } from '../Icons';
import { ChatMessage } from './types';

interface AIChatProps {
  messages: ChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  suggestions?: string[];
}

export const AIChat: React.FC<AIChatProps> = ({
  messages,
  input,
  onInputChange,
  onSend,
  suggestions = ['解释背离', '同行业对比', '生成回测策略']
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[45%] flex flex-col bg-[#0D1117]/50">
      <div className="p-3 border-b border-border/50 bg-[#161B22] text-xs font-bold text-white flex items-center gap-2 shadow-sm z-10">
        <Icons.Robot className="w-4 h-4 text-cyan" />
        AI Analyst Chat
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span>
      </div>
      
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-md
              ${m.role === 'user' 
                ? 'bg-gradient-to-br from-primary to-blue-600 text-white rounded-br-sm' 
                : 'bg-[#161B22] border border-white/10 text-text-main rounded-bl-sm'}
            `}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide bg-gradient-to-t from-[#0D1117] to-transparent">
        {suggestions.map(s => (
          <button 
            key={s} 
            onClick={() => onInputChange(s)} 
            className="shrink-0 px-3 py-1 bg-white/5 hover:bg-cyan/10 border border-white/10 hover:border-cyan/30 rounded-full text-[10px] text-text-muted hover:text-cyan transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 pt-2 bg-[#0D1117]">
        <div className="relative group">
          <input 
            value={input}
            onChange={e => onInputChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSend()}
            placeholder="Ask follow-up questions..."
            className="w-full bg-[#161B22] border border-border rounded-xl pl-4 pr-10 py-3 text-sm focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 outline-none text-white transition-all shadow-inner group-hover:border-white/20"
          />
          <button 
            onClick={onSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-cyan hover:text-white bg-cyan/10 hover:bg-cyan rounded-lg transition-all"
          >
            <Icons.Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
