import React from 'react';
import { Icons } from '../Icons';
import { NewsFeedItem } from './types';
import { Section } from './Section';
import { SentimentGauge } from './SentimentGauge';

interface SemanticAnalysisProps {
  selectedNews: NewsFeedItem;
}

export const SemanticAnalysis: React.FC<SemanticAnalysisProps> = ({ selectedNews }) => {
  return (
    <Section title="语义与情绪分解" icon={Icons.AI} className="col-span-7">
      <div className="flex gap-6 items-center">
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex justify-between text-[10px] text-text-muted uppercase mb-1">
              <span>预期差偏离 (Expectation Shift)</span>
              <span className="text-success">+12.4%</span>
            </div>
            <div className="h-1 bg-surface rounded-full overflow-hidden">
              <div className="h-full bg-success w-[70%]" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface/50 border border-border/50 rounded-xl">
            <div className="flex flex-col">
              <span className="text-[9px] text-text-muted uppercase">Sentiment Regime</span>
              <span className={`text-xs font-bold ${
                selectedNews.sentiment === 'positive' ? 'text-success' : 'text-danger'
              }`}>
                {selectedNews.sentiment.toUpperCase()} RECOVERY
              </span>
            </div>
            <div className="flex items-center gap-3">
              <SentimentGauge value={selectedNews.strength} label="Strength" color="#1F6FEB" />
              <SentimentGauge value={selectedNews.uncertainty} label="Uncertainty" color="#F6465D" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
