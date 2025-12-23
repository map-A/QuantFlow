import React, { useState } from 'react';
import {
  FactorLibrarySidebar,
  PreprocessingPanel,
  AlphaLabHeader,
  FormulaEditor,
  ICSeriesChart,
  QuantileReturnsChart,
  DistributionChart,
  DecayChart,
  TurnoverDisplay,
  PerformanceSummary,
  SectorExposure,
  AIInsightCard,
  CorrelationAlert,
  BacktestPreview
} from './alpha-lab';

// --- Types ---
interface FactorMetadata {
  id: string;
  name: string;
  category: string;
  icMean: number;
  icIr: number;
  halfLife: string;
  turnover: string;
  description: string;
}

// --- Mock Data ---
const FACTOR_LIBRARY: FactorMetadata[] = [
  { id: 'f_tech_1', name: 'Momentum_20D', category: 'Technical', icMean: 0.052, icIr: 0.85, halfLife: '12D', turnover: 'High', description: '20日动量因子' },
  { id: 'f_tech_2', name: 'RSI_14', category: 'Technical', icMean: 0.031, icIr: 0.42, halfLife: '5D', turnover: 'High', description: '强弱指标' },
  { id: 'f_fund_1', name: 'ROE_TTM', category: 'Fundamental', icMean: 0.065, icIr: 1.24, halfLife: '60D', turnover: 'Low', description: '净资产收益率' },
  { id: 'f_fund_2', name: 'Net_Profit_Growth', category: 'Fundamental', icMean: 0.058, icIr: 1.10, halfLife: '45D', turnover: 'Low', description: '净利润增长率' },
  { id: 'f_val_1', name: 'PE_TTM_Inv', category: 'Valuation', icMean: 0.045, icIr: 0.75, halfLife: '90D', turnover: 'V.Low', description: '市盈率倒数' },
  { id: 'f_money_1', name: 'North_Inflow_5D', category: 'Money Flow', icMean: 0.082, icIr: 0.92, halfLife: '3D', turnover: 'V.High', description: '北向资金流入' },
];

const MOCK_IC_SERIES = Array.from({ length: 40 }, (_, i) => ({
  date: `2023-${String(Math.floor(i/4)+1).padStart(2, '0')}-${String((i%4)*7+1).padStart(2, '0')}`,
  ic: 0.05 + Math.sin(i * 0.4) * 0.08 + (Math.random() - 0.5) * 0.04,
  rankIc: 0.06 + Math.sin(i * 0.4) * 0.1 + (Math.random() - 0.5) * 0.05
}));

const MOCK_DECAY_DATA = [
  { lag: 'T+1', ic: 0.082 }, { lag: 'T+2', ic: 0.075 }, { lag: 'T+3', ic: 0.068 },
  { lag: 'T+5', ic: 0.042 }, { lag: 'T+10', ic: 0.021 }, { lag: 'T+20', ic: 0.005 }
];

const MOCK_QUANTILE_RETURNS = [
  { group: 'Q1 (High)', return: 18.5, cum: 125, color: '#F6465D' },
  { group: 'Q2', return: 12.2, cum: 112, color: '#F6465D88' },
  { group: 'Q3', return: 5.4, cum: 105, color: '#30363D' },
  { group: 'Q4', return: -2.1, cum: 98, color: '#2EBD8588' },
  { group: 'Q5 (Low)', return: -8.5, cum: 85, color: '#2EBD85' },
];

const MOCK_HISTOGRAM = Array.from({ length: 20 }, (_, i) => ({
  bin: (i - 10) * 0.5,
  count: Math.exp(-Math.pow(i - 10, 2) / 20) * 100 + Math.random() * 20
}));

const MOCK_SECTOR_BREAKDOWN = [
  { name: '计算机', weight: 0.25 }, { name: '电子', weight: 0.18 }, 
  { name: '医药', weight: -0.12 }, { name: '银行', weight: -0.22 }, { name: '食品饮料', weight: 0.05 }
];

const AlphaLab: React.FC = () => {
  const [activeFactor, setActiveFactor] = useState<FactorMetadata>(FACTOR_LIBRARY[0]);
  const [code, setCode] = useState(`alpha = Rank(Momentum(close, 20)) * 0.6 + Rank(ROE_TTM) * 0.4\nreturn Neutralize(alpha, "Industry")`);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1500);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-4 gap-4 overflow-hidden select-none">
      
      {/* Top Header */}
      <AlphaLabHeader isRunning={isRunning} onRun={handleRun} />

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* 1. LEFT Sidebar */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <FactorLibrarySidebar
            factors={FACTOR_LIBRARY}
            activeFactor={activeFactor}
            onFactorSelect={setActiveFactor}
          />
          <PreprocessingPanel />
        </div>

        {/* 2. CENTER: Editor & Visuals */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
          
          {/* Formula Editor */}
          <FormulaEditor
            activeFactor={activeFactor}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            code={code}
            onCodeChange={setCode}
          />

          {/* Analysis Viewport Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0 overflow-y-auto custom-scrollbar pr-1">
            <ICSeriesChart data={MOCK_IC_SERIES} />
            <QuantileReturnsChart data={MOCK_QUANTILE_RETURNS} />
            <DistributionChart data={MOCK_HISTOGRAM} />
            <DecayChart data={MOCK_DECAY_DATA} />
            <TurnoverDisplay />
          </div>
        </div>

        {/* 3. RIGHT: Evaluation & Insights */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          <PerformanceSummary />
          <SectorExposure sectors={MOCK_SECTOR_BREAKDOWN} />
          <AIInsightCard />
          <CorrelationAlert />
        </div>

      </div>

      {/* 3. BOTTOM: Backtest Preview */}
      <BacktestPreview data={MOCK_IC_SERIES} />

    </div>
  );
};

export default AlphaLab;
