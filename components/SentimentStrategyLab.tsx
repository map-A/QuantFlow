
import React, { useState } from 'react';
import {
  SentimentHeader,
  FilterRules,
  StrategyGates,
  WeightMatrix,
  BacktestPreview,
  StressTest,
  StatusBar,
  MOCK_RULES,
  MOCK_FACTOR_WEIGHTS,
  MOCK_STRATEGY_GATES,
  BACKTEST_TIMELINE_DATA,
  Rule,
  FactorWeight,
  StrategyGate,
} from './sentiment-strategy-lab';

const SentimentStrategyLab: React.FC = () => {
  const [globalEnable, setGlobalEnable] = useState(true);
  const [activeRegime, setActiveRegime] = useState('活跃');
  const [rules, setRules] = useState<Rule[]>(MOCK_RULES);
  const [factorWeights, setFactorWeights] = useState<FactorWeight[]>(MOCK_FACTOR_WEIGHTS);
  const [gates, setGates] = useState<StrategyGate[]>(MOCK_STRATEGY_GATES);

  const handleApplySettings = () => {
    console.log('应用设置', { globalEnable, rules, factorWeights, gates });
  };

  const handleWeightChange = (id: string, regime: 'low' | 'neutral' | 'high', value: number) => {
    setFactorWeights(prev => prev.map(f => 
      f.id === id ? { ...f, [regime]: value } : f
    ));
  };

  const handleDownloadReport = () => {
    console.log('下载因子热力报告');
  };

  const handleRunStressTest = () => {
    console.log('开始压力测试');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#2BC4A8 1px, transparent 1px), linear-gradient(90deg, #2BC4A8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Header */}
      <SentimentHeader
        sentimentScore={72.4}
        activeRegime={activeRegime}
        trendData={BACKTEST_TIMELINE_DATA.slice(-20)}
        globalEnable={globalEnable}
        onToggleGlobal={() => setGlobalEnable(!globalEnable)}
        onApplySettings={handleApplySettings}
      />

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT: Rules & Strategies */}
        <div className="col-span-4 flex flex-col gap-6">
          <FilterRules rules={rules} />
          <StrategyGates gates={gates} />
        </div>

        {/* CENTER: Weight Matrix */}
        <div className="col-span-5 flex flex-col gap-6 overflow-hidden">
          <WeightMatrix 
            factors={factorWeights}
            onWeightChange={handleWeightChange}
          />
        </div>

        {/* RIGHT: Performance & Insights */}
        <div className="col-span-3 flex flex-col gap-6">
          <BacktestPreview data={BACKTEST_TIMELINE_DATA} />
          <StressTest onRunTest={handleRunStressTest} />
        </div>

      </div>

      {/* Bottom Status Bar */}
      <StatusBar onDownloadReport={handleDownloadReport} />
    </div>
  );
};

export default SentimentStrategyLab;
