import React, { useState, useMemo } from 'react';
import { TradeLog, Position } from '../types';
import {
  AccountHeader,
  AccountStats,
  FilterSidebar,
  TradeTable,
  PositionTable,
  PerformanceChart,
  TradeDetailDrawer,
  StatusBar
} from './trade-ledger';

// --- Professional Mock Data ---
const MOCK_TRADES: TradeLog[] = [
  { 
    id: 'T10029', time: '14:45:22.012', symbol: '600519', name: '贵州茅台', side: 'buy', action: 'OPEN', 
    price: 1735.50, orderPrice: 1734.80, volume: 200, commission: 10.4, tax: 0, 
    slippage: 0.70, slippagePct: 0.04, latency: '14ms', latencyMs: 14, 
    strategyId: 'ST-ALPHA-01', strategyVersion: 'v2.4', strategyName: '核心价值多因子', 
    signalStrength: 82, executionSentiment: 65, triggerSource: 'FACTOR', status: 'FILLED', 
    pnl: 1400, complianceStatus: 'PASS' 
  },
  { 
    id: 'T10030', time: '14:20:10.552', symbol: '300750', name: '宁德时代', side: 'sell', action: 'CLOSE', 
    price: 212.40, orderPrice: 212.50, volume: 1000, commission: 6.2, tax: 212.4, 
    slippage: -0.10, slippagePct: -0.05, latency: '12ms', latencyMs: 12, 
    strategyId: 'ST-SENT-02', strategyVersion: 'v1.1', strategyName: '舆情恐慌博弈', 
    signalStrength: 95, executionSentiment: 22, triggerSource: 'SENTIMENT', status: 'FILLED', 
    pnl: 12500, complianceStatus: 'PASS' 
  },
  { 
    id: 'T10031', time: '13:55:00.115', symbol: '002230', name: '科大讯飞', side: 'buy', action: 'ADD', 
    price: 48.50, orderPrice: 48.25, volume: 5000, commission: 5.5, tax: 0, 
    slippage: 0.25, slippagePct: 0.51, latency: '158ms', latencyMs: 158, 
    strategyId: 'ST-EVENT-03', strategyVersion: 'v3.0', strategyName: '定增套利事件', 
    signalStrength: 78, executionSentiment: 88, triggerSource: 'EVENT', status: 'FILLED', 
    pnl: -4500, isManualOverride: true, complianceStatus: 'WARNING' 
  },
  { 
    id: 'T10032', time: '11:15:22.990', symbol: '000063', name: '中兴通讯', side: 'buy', action: 'OPEN', 
    price: 32.50, orderPrice: 32.50, volume: 2000, commission: 2.2, tax: 0, 
    slippage: 0.00, slippagePct: 0.00, latency: '24ms', latencyMs: 24, 
    strategyId: 'ST-ALPHA-01', strategyVersion: 'v2.4', strategyName: '核心价值多因子', 
    signalStrength: 60, executionSentiment: 55, triggerSource: 'FACTOR', status: 'PARTIAL', 
    pnl: 0, complianceStatus: 'PASS' 
  },
];

const MOCK_POSITIONS: Position[] = [
  { symbol: '600519', name: '贵州茅台', volume: 400, availableVolume: 400, avgCost: 1720.00, currentPrice: 1735.50, pnl: 6200, pnlPercent: 0.9, exposure: 694200, maxDrawdown: -1.2, dailyChange: 0.45 },
  { symbol: '002230', name: '科大讯飞', volume: 15000, availableVolume: 10000, avgCost: 49.20, currentPrice: 48.50, pnl: -10500, pnlPercent: -1.4, exposure: 727500, maxDrawdown: -4.5, dailyChange: -2.12 },
];

const MOCK_PERF_COMPARE = [
  { time: '09:30', sim: 100, live: 100 },
  { time: '10:30', sim: 100.5, live: 100.3 },
  { time: '11:30', sim: 101.2, live: 100.8 },
  { time: '13:30', sim: 100.9, live: 101.1 },
  { time: '14:30', sim: 102.1, live: 101.9 },
  { time: '15:00', sim: 102.5, live: 102.2 },
];

const TradeLedger: React.FC = () => {
  const [selectedTrade, setSelectedTrade] = useState<TradeLog | null>(null);
  const [accountType, setAccountType] = useState<'SIM' | 'LIVE'>('SIM');
  const [showAbnormalOnly, setShowAbnormalOnly] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('All Accounts');

  const filteredTrades = useMemo(() => {
    let list = MOCK_TRADES;
    if (showAbnormalOnly) {
      list = list.filter(t => t.complianceStatus !== 'PASS' || t.isManualOverride);
    }
    return list;
  }, [showAbnormalOnly]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] text-text-main relative overflow-hidden">
      {/* Header */}
      <div className="shrink-0 h-24 border-b border-border bg-[#161B22]/50 backdrop-blur-md px-6 flex items-center justify-between z-40">
        <div className="flex items-center gap-8">
          <AccountHeader
            accountType={accountType}
            onAccountTypeToggle={() => setAccountType(accountType === 'SIM' ? 'LIVE' : 'SIM')}
          />
          <div className="h-10 w-px bg-border/50" />
          <AccountStats
            totalEquity={1245600}
            availableBalance={425100}
            dailyPnl={12450}
            dailyPnlPercent={1.25}
            riskStatus="NORMAL (SAFE)"
          />
        </div>
        <div className="flex gap-2">
          {['1D', '1W', '1M', 'YTD'].map(period => (
            <button 
              key={period}
              className="px-3 py-1.5 text-xs font-bold text-text-muted hover:text-white hover:bg-white/10 rounded transition-all"
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Sidebar */}
        <FilterSidebar
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          showAbnormalOnly={showAbnormalOnly}
          onAbnormalToggle={setShowAbnormalOnly}
        />

        {/* Center: Trade List & Positions */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#0D1117]">
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
            {/* Trade Table */}
            <div className="flex-1 glass-panel rounded-2xl border border-border flex flex-col overflow-hidden">
              <TradeTable
                trades={filteredTrades}
                selectedTrade={selectedTrade}
                onTradeSelect={setSelectedTrade}
              />
            </div>

            {/* Position & Performance Panel */}
            <div className="h-64 grid grid-cols-12 gap-6 shrink-0">
              <PositionTable positions={MOCK_POSITIONS} />
              <PerformanceChart
                data={MOCK_PERF_COMPARE}
                trackingError="12.5 bps"
                slippageLoss="-0.32%"
              />
            </div>
          </div>
        </main>

        {/* Right Detail Drawer */}
        {selectedTrade && (
          <TradeDetailDrawer
            trade={selectedTrade}
            onClose={() => setSelectedTrade(null)}
            perfCompareData={MOCK_PERF_COMPARE}
          />
        )}
      </div>

      {/* Status Bar */}
      <StatusBar
        node="HK-PROD-QUANT-01"
        apiLatency="8.2ms"
        complianceMode="STRICT (LEVEL 4)"
        timestamp="2023-11-20 15:00:00 JST"
      />

      {/* Background Grid */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-[-1]" 
        style={{ 
          backgroundImage: 'linear-gradient(#2BC4A8 1px, transparent 1px), linear-gradient(90deg, #2BC4A8 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }} 
      />
    </div>
  );
};

export default TradeLedger;
