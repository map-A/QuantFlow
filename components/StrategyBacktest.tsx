import React, { useState } from 'react';
import { MOCK_STRATEGIES, MOCK_BACKTEST_METRICS, MOCK_BACKTEST_TRADES } from '../constants';
import { Strategy, BacktestConfig } from '../types';
import {
  StrategyLibrarySidebar,
  BacktestHeader,
  CodeEditor,
  ParamsPanel,
  ResultsSummary,
  EquityCurveChart,
  DrawdownChart,
  TradesTable,
  FactorRadarChart,
  ResultsTabs,
  CreateStrategyModal
} from './strategy-backtest';

const StrategyBacktest: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>(MOCK_STRATEGIES);
  const [activeStrategy, setActiveStrategy] = useState<Strategy | null>(strategies[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [view, setView] = useState<'editor' | 'results'>('editor');
  const [showParams, setShowParams] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'trades' | 'positions' | 'stats' | 'factors'>('trades');

  const [config, setConfig] = useState<BacktestConfig>({
    startDate: '2023-01-01',
    endDate: '2023-10-31',
    initialCapital: 1000000,
    benchmark: '000300.SH',
    frequency: 'daily',
    fees: 0.0003
  });

  const [params, setParams] = useState({
    ma_window_short: 5,
    ma_window_long: 20,
    stop_loss_pct: 0.08,
    take_profit_pct: 0.15,
    position_size: 0.9,
    enable_atr_filter: true
  });

  // Mock Data for Charts
  const equityData = Array.from({length: 100}, (_, i) => ({
    day: `D${i + 1}`,
    strategy: 100 + i * 0.5 + Math.sin(i * 0.2) * 5 + Math.random() * 2,
    benchmark: 100 + (i * 0.2) + Math.cos(i * 0.1) * 3,
    drawdown: -Math.abs(Math.sin(i * 0.2) * 2.5)
  }));

  const factorData = [
    { subject: '动量', A: 120, fullMark: 150 },
    { subject: '价值', A: 98, fullMark: 150 },
    { subject: '波动率', A: 86, fullMark: 150 },
    { subject: '成长', A: 99, fullMark: 150 },
    { subject: '质量', A: 85, fullMark: 150 },
    { subject: '流动性', A: 65, fullMark: 150 },
  ];

  const handleRunBacktest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setView('results');
    }, 1500);
  };

  const handleCreateStrategy = (name: string, code: string) => {
    const newStrat: Strategy = {
      id: String(Date.now()),
      name,
      code,
      returnRate: 0,
      sharpeRatio: 0,
      drawdown: 0,
      status: 'backtesting',
      lastRun: new Date().toLocaleString()
    };
    setStrategies([newStrat, ...strategies]);
    setActiveStrategy(newStrat);
    setIsCreating(false);
    setView('editor');
  };

  const handleStrategySelect = (strategy: Strategy) => {
    setActiveStrategy(strategy);
    setView('editor');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden bg-[#0D1117] relative">
      {/* Left Sidebar: Strategy Library */}
      <StrategyLibrarySidebar
        strategies={strategies}
        activeStrategy={activeStrategy}
        onStrategySelect={handleStrategySelect}
        onCreateNew={() => setIsCreating(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header: Controls & Config */}
        <BacktestHeader
          activeStrategy={activeStrategy}
          config={config}
          onConfigChange={setConfig}
          view={view}
          onViewChange={setView}
          isRunning={isRunning}
          onRunBacktest={handleRunBacktest}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {view === 'editor' ? (
            <div className="h-full flex">
              <CodeEditor activeStrategy={activeStrategy} />
              
              {showParams && (
                <ParamsPanel
                  params={params}
                  onParamsChange={setParams}
                  onClose={() => setShowParams(false)}
                />
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col overflow-y-auto custom-scrollbar bg-background">
              {/* Results Summary */}
              <ResultsSummary metrics={MOCK_BACKTEST_METRICS} />

              {/* Charts Area */}
              <div className="flex flex-col lg:flex-row h-[400px] border-b border-border">
                <EquityCurveChart data={equityData} />
                <DrawdownChart data={equityData} />
              </div>

              {/* Tabs */}
              <ResultsTabs
                activeTab={activeResultTab}
                onTabChange={(tab: any) => setActiveResultTab(tab)}
              />

              {/* Tab Content */}
              <div className="p-6">
                {activeResultTab === 'trades' && (
                  <TradesTable trades={MOCK_BACKTEST_TRADES} />
                )}
                {activeResultTab === 'factors' && (
                  <FactorRadarChart data={factorData} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Strategy Modal */}
      <CreateStrategyModal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onCreate={handleCreateStrategy}
      />
    </div>
  );
};

export default StrategyBacktest;
