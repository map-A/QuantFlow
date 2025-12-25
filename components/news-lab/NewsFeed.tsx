import React from 'react';
import { Icons } from '../Icons';
import { NewsFeedItem } from './types';
import { Section } from './Section';

interface NewsFeedProps {
  news: NewsFeedItem[];
  selectedNews: NewsFeedItem | null;
  onSelectNews: (news: NewsFeedItem) => void;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ news, selectedNews, onSelectNews }) => {
  if (news.length === 0) {
    return (
      <Section title="全维新闻流 (Live Stream)" icon={Icons.News} noPadding>
        <div className="p-6 text-center text-text-muted text-sm">
          正在加载新闻...
        </div>
      </Section>
    );
  }

  return (
    <Section title="全维新闻流 (Live Stream)" icon={Icons.News} noPadding>
      <div className="space-y-3 p-1">
        {news.map(item => (
          <div 
            key={item.id} 
            onClick={() => onSelectNews(item)}
            className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden group 
              ${selectedNews?.id === item.id ? 'bg-primary/5 border-primary/40 shadow-glow-blue' : 'bg-surface/30 border-border/30 hover:border-white/20'}
              ${item.isBreaking ? 'border-danger/40 bg-danger/5 shadow-[0_0_15px_rgba(246,70,93,0.1)]' : ''}
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-text-muted">{item.time}</span>
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                  item.sourceLevel === 'A' ? 'bg-danger/20 text-danger' : 'bg-surface border border-border text-text-muted'
                }`}>
                  LV {item.sourceLevel}
                </span>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${
                item.sentiment === 'positive' ? 'bg-success shadow-glow-cyan' : 
                item.sentiment === 'negative' ? 'bg-danger shadow-glow-red' : 'bg-text-muted'
              }`} />
            </div>
            <h4 className={`text-xs leading-snug font-medium mb-2 line-clamp-2 ${
              selectedNews?.id === item.id ? 'text-white' : 'text-text-main'
            }`}>
              {item.title}
            </h4>
            <div className="flex flex-wrap gap-1">
              {item.tags.map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-background border border-border/50 rounded text-[8px] text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
            {item.isBreaking && (
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-danger text-white text-[8px] font-bold rounded-bl uppercase animate-pulse">
                Breaking
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};
