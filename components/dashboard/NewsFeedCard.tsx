import React from 'react';
import { Icons } from '../Icons';
import { NewsItem } from '../../types';

interface NewsFeedCardProps {
  news: NewsItem[];
}

const NewsFeedCard: React.FC<NewsFeedCardProps> = ({ news }) => {
  return (
    <div className="glass-panel p-5 rounded-xl border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <Icons.News className="w-5 h-5 text-text-main" />
          实时电报 & 情绪
        </h3>
        <button className="text-[10px] text-primary hover:underline font-bold uppercase tracking-widest">
          查看更多
        </button>
      </div>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {news.map(item => (
          <div 
            key={item.id} 
            className="flex gap-4 p-3 hover:bg-surface/50 rounded-xl transition-all border-l-2 border-transparent hover:border-primary group"
          >
            <div className="flex flex-col items-center min-w-[50px]">
              <span className="text-[10px] font-mono text-text-muted">{item.time}</span>
              {item.sentiment === 'positive' && 
                <div className="mt-2 w-2 h-2 rounded-full bg-success shadow-glow-cyan" />
              }
              {item.sentiment === 'negative' && 
                <div className="mt-2 w-2 h-2 rounded-full bg-danger shadow-glow-red" />
              }
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-medium text-text-main mb-1 leading-snug group-hover:text-white transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] text-text-muted px-1.5 py-0.5 bg-surface rounded border border-border font-bold uppercase">
                  {item.source}
                </span>
                {item.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`text-[9px] px-1.5 py-0.5 rounded border font-bold tracking-tighter uppercase
                      ${tag === '利好' ? 'border-success/30 text-success bg-success/5' : 
                        tag === '风险' ? 'border-danger/30 text-danger bg-danger/5' : 
                        'border-border text-text-muted bg-surface'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeedCard;
