import React, { useState } from 'react';
import {
  NewsHeader,
  NewsFeed,
  SemanticAnalysis,
  ImpactScope,
  MarketReaction,
  QuantSignals,
  AIInsight,
  NewsStatusBar,
  MOCK_NEWS_FEED,
  MOCK_REACTION_DATA,
  NewsFeedItem,
  MarketMood,
} from './news-lab';

const NewsLab: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsFeedItem>(MOCK_NEWS_FEED[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [marketMood] = useState<MarketMood>({
    mood: '亢奋',
    index: 72.4,
    trend: 'up'
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1F6FEB 1px, transparent 1px), linear-gradient(90deg, #1F6FEB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Header */}
      <NewsHeader
        marketMood={marketMood}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 relative z-10">
        
        {/* LEFT: News Feed */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
          <NewsFeed
            news={MOCK_NEWS_FEED}
            selectedNews={selectedNews}
            onSelectNews={setSelectedNews}
          />
        </div>

        {/* CENTER: Intelligence Decomposition */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 overflow-hidden">
          <div className="grid grid-cols-12 gap-6 shrink-0">
            <SemanticAnalysis selectedNews={selectedNews} />
            <ImpactScope selectedNews={selectedNews} />
          </div>
          <MarketReaction data={MOCK_REACTION_DATA} />
        </div>

        {/* RIGHT: Quant Signals & AI */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          <QuantSignals />
          <AIInsight />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <NewsStatusBar />
    </div>
  );
};

export default NewsLab;
