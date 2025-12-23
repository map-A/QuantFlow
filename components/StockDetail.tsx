import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_CANDLES, MOCK_STOCKS } from '../constants';
import { getMarketAnalysis } from '../services/geminiService';
import {
  StockHeader,
  ChartToolbar,
  MainChart,
  VolumeChart,
  SubIndicatorChart,
  RightSidebar
} from './stock-detail';

// --- Types & Interfaces ---
interface ChartState {
  timeframe: string;
  mainOverlay: 'MA' | 'BOLL' | 'NONE';
  subIndicator: 'MACD' | 'RSI' | 'KDJ';
  comparison: boolean;
  showSignals: boolean;
}

// --- Helper Functions for Indicators ---
const calculateIndicators = (data: any[]) => {
  return data.map((entry, index) => {
    // Moving Averages
    const getMA = (n: number) => {
      if (index < n - 1) return null;
      const slice = data.slice(index - n + 1, index + 1);
      return slice.reduce((acc: number, curr: any) => acc + curr.close, 0) / n;
    };

    // BOLL (20, 2)
    const ma20 = getMA(20);
    let bollUpper = null, bollLower = null;
    if (ma20) {
      const slice = data.slice(index - 19, index + 1);
      const variance = slice.reduce((acc: number, curr: any) => acc + Math.pow(curr.close - ma20, 2), 0) / 20;
      const std = Math.sqrt(variance);
      bollUpper = ma20 + 2 * std;
      bollLower = ma20 - 2 * std;
    }

    // Comparison Mock (HS300)
    const comparisonPrice = entry.close * (1 + Math.sin(index * 0.1) * 0.05);

    return { 
      ...entry, 
      MA5: getMA(5), 
      MA10: getMA(10), 
      MA20: ma20,
      MA60: getMA(60),
      bollUpper,
      bollLower,
      comparisonPrice,
      // Mock MACD/RSI/KDJ values for visualization
      dif: Math.sin(index * 0.2) * 5,
      dea: Math.sin(index * 0.2 - 0.5) * 5,
      macdBar: (Math.sin(index * 0.2) - Math.sin(index * 0.2 - 0.5)) * 10,
      rsi: 50 + Math.sin(index * 0.3) * 30,
      k: 50 + Math.cos(index * 0.3) * 30,
      d: 50 + Math.cos(index * 0.3 - 0.5) * 30,
      j: 50 + Math.cos(index * 0.3) * 30 * 3 - 2 * (50 + Math.cos(index * 0.3 - 0.5) * 30)
    };
  });
};

// --- Main Component ---
const StockDetail: React.FC = () => {
  const stock = MOCK_STOCKS[0];
  const [chartState, setChartState] = useState<ChartState>({
    timeframe: '日',
    mainOverlay: 'MA',
    subIndicator: 'MACD',
    comparison: false,
    showSignals: true
  });
  
  const [aiAnalysis, setAiAnalysis] = useState('');

  // Process Data
  const chartData = useMemo(() => {
    return calculateIndicators(MOCK_CANDLES);
  }, []);

  useEffect(() => {
    // Simulation of AI analysis loading
    getMarketAnalysis(stock.symbol, MOCK_CANDLES).then(setAiAnalysis);
  }, [stock.symbol]);

  // Calculate high/low for header
  const high = Math.max(...MOCK_CANDLES.map(c => c.high));
  const low = Math.min(...MOCK_CANDLES.map(c => c.low));

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] overflow-hidden text-text-main">
      
      {/* 1. Header */}
      <StockHeader stock={stock} high={high} low={low} />

      {/* 2. Main Workspace */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        
        {/* LEFT: Charts (9 Cols) */}
        <div className="col-span-12 lg:col-span-9 flex flex-col border-r border-border bg-background relative">
          
          {/* Toolbar */}
          <ChartToolbar
            timeframe={chartState.timeframe}
            mainOverlay={chartState.mainOverlay}
            comparison={chartState.comparison}
            showSignals={chartState.showSignals}
            onTimeframeChange={(tf) => setChartState({ ...chartState, timeframe: tf })}
            onOverlayChange={(overlay) => setChartState({ ...chartState, mainOverlay: overlay })}
            onComparisonToggle={() => setChartState(s => ({ ...s, comparison: !s.comparison }))}
            onSignalsToggle={() => setChartState(s => ({ ...s, showSignals: !s.showSignals }))}
          />

          {/* Main Chart Canvas */}
          <div className="flex-1 flex flex-col cursor-crosshair relative">
            {/* Top: Price Chart */}
            <MainChart
              data={chartData}
              mainOverlay={chartState.mainOverlay}
              comparison={chartState.comparison}
              showSignals={chartState.showSignals}
            />

            {/* Middle: Volume */}
            <VolumeChart data={chartData} />

            {/* Bottom: Sub Indicator */}
            <SubIndicatorChart
              data={chartData}
              indicator={chartState.subIndicator}
              onIndicatorChange={(indicator) => setChartState({ ...chartState, subIndicator: indicator })}
            />
          </div>
        </div>

        {/* RIGHT: Sidebar (3 Cols) */}
        <RightSidebar stock={stock} aiAnalysis={aiAnalysis} />
      </div>
    </div>
  );
};

export default StockDetail;
