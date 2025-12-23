import React, { useMemo } from 'react';
import { Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Using Responsive directly as WidthProvider is missing in v2 ESM build
const ResponsiveGridLayout = Responsive;

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
  const [width, setWidth] = React.useState(1200);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial width
    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Define the layout logic
  const layouts = useMemo(() => ({
    lg: [
      // 1. Indices (Span 2 each, total 10 cols, height 4)
      { i: 'index-0', x: 0, y: 0, w: 2, h: 4, static: false },
      { i: 'index-1', x: 2, y: 0, w: 2, h: 4, static: false },
      { i: 'index-2', x: 4, y: 0, w: 2, h: 4, static: false },
      { i: 'index-3', x: 6, y: 0, w: 2, h: 4, static: false },
      { i: 'index-4', x: 8, y: 0, w: 2, h: 4, static: false },

      // 2. Strategy (Monitor: 8x10, AI: 4x5, Alerts: 4x5)
      { i: 'strategy-monitor', x: 0, y: 4, w: 8, h: 10, static: false },
      { i: 'ai-analysis', x: 8, y: 4, w: 4, h: 5, static: false },
      { i: 'strategy-alerts', x: 8, y: 9, w: 4, h: 5, static: false }, // stacked below AI Analysis

      // 3. Sentiment (Sentiment: 3x8, Ladder: 5x8, Insight: 4x8)
      { i: 'market-sentiment', x: 0, y: 14, w: 3, h: 8, static: false },
      { i: 'limit-ladder', x: 3, y: 14, w: 5, h: 8, static: false },
      { i: 'ai-insight', x: 8, y: 14, w: 4, h: 8, static: false },

      // 4. Heatmap (Heatmap: 8x10, Sector: 4x10)
      { i: 'market-heatmap', x: 0, y: 22, w: 8, h: 9, static: false },
      { i: 'sector-ranking', x: 8, y: 22, w: 4, h: 9, static: false },

      // 5. Stocks (12x14)
      { i: 'stock-list', x: 0, y: 32, w: 12, h: 14, static: false },

      // 6. News/Risk (News: 8x9, Risk: 4x9)
      { i: 'news-feed', x: 0, y: 46, w: 8, h: 9, static: false },
      { i: 'risk-control', x: 8, y: 46, w: 4, h: 9, static: false },
    ]
  }), []);

  return (
    <div className="p-6" ref={containerRef}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        width={width}
        containerPadding={[0, 0]}
        margin={[24, 24]}
        isResizable={false} // User cannot resize as per requirements
        isDraggable={true}  // User can validly drag move
        compactType="vertical"
        preventCollision={false}
      >
        {/* Indices */}
        {MOCK_INDICES.map((index, idx) => (
          <div key={`index-${idx}`} className="h-full">
            <MarketIndexCard index={index} />
          </div>
        ))}

        {/* Strategy Section */}
        <div key="strategy-monitor">
          <StrategyMonitorCard
            liveStrategies={MOCK_STRATEGY_MONITOR_DATA.live}
            backtestStrategies={MOCK_STRATEGY_MONITOR_DATA.backtest}
          />
        </div>
        <div key="ai-analysis">
          <AIAnalysisCard />
        </div>
        <div key="strategy-alerts">
          <StrategyAlertsCard alerts={MOCK_STRATEGY_MONITOR_DATA.alerts} />
        </div>

        {/* Sentiment Section */}
        <div key="market-sentiment">
          <MarketSentimentCard sentiment={MOCK_SENTIMENT} />
        </div>
        <div key="limit-ladder">
          <LimitUpLadderCard
            ladderData={MOCK_LIMIT_LADDER}
            sentiment={MOCK_SENTIMENT}
          />
        </div>
        <div key="ai-insight">
          <AIInsightCard />
        </div>

        {/* Heatmap Section */}
        <div key="market-heatmap">
          <MarketHeatmapCard heatmapData={MOCK_HEATMAP_DATA} />
        </div>
        <div key="sector-ranking">
          <SectorRankingCard sectors={MOCK_SECTORS} />
        </div>

        {/* Stock List */}
        <div key="stock-list">
          <StockListCard stocks={MOCK_STOCKS} />
        </div>

        {/* News & Risk */}
        <div key="news-feed">
          <NewsFeedCard news={MOCK_NEWS} />
        </div>
        <div key="risk-control">
          <RiskControlCard riskIndicators={MOCK_RISK_INDICATORS} />
        </div>

      </ResponsiveGridLayout>

      {/* Optional: Add a note or visual cue that items are draggable if needed, but 'cursor: move' on hover is handled by RGL usually on the item or handle */}
      <style>{`
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top;
        }
        .react-grid-item.cssTransforms {
          transition-property: transform;
        }
        /* Add a grab cursor to indicate draggability */
        .react-grid-item {
          cursor: grab;
        }
        .react-grid-item:active {
          cursor: grabbing;
          z-index: 100;
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); /* Material Design shadow for lift effect */
          opacity: 0.9;
        }
        /* Fix h-full issues in cards if they expect flex parent */
        .react-grid-item > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
