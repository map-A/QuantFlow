import React from 'react';
import { Icons } from '../Icons';
import { NewsFeedItem } from './types';
import { Section } from './Section';

interface ImpactScopeProps {
  selectedNews: NewsFeedItem | null;
  relatedStocks?: string[];
}

export const ImpactScope: React.FC<ImpactScopeProps> = ({ 
  selectedNews,
  relatedStocks = ['万科A', '保利发展', '金地集团']
}) => {
  if (!selectedNews) {
    return (
      <Section title="影响半径与传导" icon={Icons.Crosshair} className="col-span-5">
        <div className="text-center text-text-muted text-sm py-6">
          请选择新闻
        </div>
      </Section>
    );
  }

  return (
    <Section title="影响半径与传导" icon={Icons.Crosshair} className="col-span-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-text-muted">Primary Sector:</span>
          <span className="text-white font-bold">{selectedNews.tags[1] || selectedNews.tags[0]}</span>
        </div>
        <div className="relative h-12 flex items-center justify-center">
          <div className="absolute w-8 h-8 rounded-full border border-primary animate-ping opacity-20" />
          <div className="absolute w-12 h-12 rounded-full border border-primary/40 opacity-20" />
          <div className="relative p-2 bg-primary/20 rounded-lg text-[10px] font-bold text-primary">
            SINGLE STOCK
          </div>
          <Icons.ArrowRight className="w-4 h-4 text-text-muted mx-1" />
          <div className="p-2 bg-surface border border-border rounded-lg text-[10px] font-bold text-text-muted">
            SECTOR
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {relatedStocks.map(s => (
            <span key={s} className="px-2 py-0.5 bg-surface/50 border border-border rounded text-[9px] text-text-main font-bold">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};
