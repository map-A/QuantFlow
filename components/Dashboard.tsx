import React from 'react';
import { 
  MOCK_STOCKS, 
  MOCK_NEWS, 
  MOCK_INDICES, 
  MOCK_SENTIMENT, 
  MOCK_SECTORS, 
  MOCK_LIMIT_LADDER, 
  MOCK_HEATMAP_DATA, 
  MOCK_RISK_INDICATORS, 
  MOCK_STRATEGY_MONITOR_DATA 
} from '../constants';
import MarketIndexCard from './dashboard/MarketIndexCard';
import StrategyMonitorCard from './dashboard/StrategyMonitorCard';
import AIAnalysisCard from './dashboard/AIAnalysisCard';
import StrategyAlertsCard from './dashboard/StrategyAlertsCard';
import MarketSentimentCard from './dashboard/MarketSentimentCard';
import LimitUpLadderCard from './dashboard/LimitUpLadderCard';
import AIInsightCard from './dashboard/AIInsightCard';
import MarketHeatmapCard from './dashboard/MarketHeatmapCard';
import SectorRankingCard from './dashboard/SectorRankingCard';
import StockListCard from './dashboard/StockListCard';
import NewsFeedCard from './dashboard/NewsFeedCard';
import RiskControlCard from './dashboard/RiskControlCard';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      
      {/* 1. Market Overview Indices (Sparklines) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {MOCK_INDICES.map((index, idx) => (
          <MarketIndexCard key={idx} index={index} />
        ))}
      </div>

      {/* 2. Strategy Execution & Backtest Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <StrategyMonitorCard 
            liveStrategies={MOCK_STRATEGY_MONITOR_DATA.live}
            backtestStrategies={MOCK_STRATEGY_MONITOR_DATA.backtest}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <AIAnalysisCard />
          <StrategyAlertsCard alerts={MOCK_STRATEGY_MONITOR_DATA.alerts} />
        </div>
      </div>

      {/* 3. A-Share Market Sentiment Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Market Breadth & Temperature (3 cols) */}
        <div className="lg:col-span-3">
          <MarketSentimentCard sentiment={MOCK_SENTIMENT} />
        </div>

        {/* Limit Up Ladder & Short-term Mood (5 cols) */}
        <div className="lg:col-span-5">
          <LimitUpLadderCard 
            ladderData={MOCK_LIMIT_LADDER} 
            sentiment={MOCK_SENTIMENT}
          />
        </div>

        {/* AI Insight (4 cols) */}
        <div className="lg:col-span-4">
          <AIInsightCard />
        </div>
      </div>

      {/* 4. Market Heatmap & Sector Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Interactive Heatmap */}
        <div className="lg:col-span-2">
          <MarketHeatmapCard heatmapData={MOCK_HEATMAP_DATA} />
        </div>

        {/* Sector Ranking List */}
        <div className="lg:col-span-1">
          <SectorRankingCard sectors={MOCK_SECTORS} />
        </div>
      </div>

      {/* 5. Comprehensive Stock Lists */}
      <StockListCard stocks={MOCK_STOCKS} />

      {/* 6. Risk Panel & Real-time News */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time News Feed (2/3) */}
        <div className="lg:col-span-2">
          <NewsFeedCard news={MOCK_NEWS} />
        </div>

        {/* Risk Control Panel (1/3) */}
        <div className="lg:col-span-1">
          <RiskControlCard riskIndicators={MOCK_RISK_INDICATORS} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
