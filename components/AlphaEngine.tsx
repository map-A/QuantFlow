import React, { useState } from 'react';
import {
  AlphaEngineHeader,
  FactorPoolPanel,
  AIOptimizationSuggestion,
  WeightingPanel,
  CorrelationHeatmap,
  StyleExposureChart,
  PerformancePreview,
  PositionConstraints,
  ExecutionContextBar,
  AdvancedSettingsDrawer
} from './alpha-engine';

// --- Types & Interfaces ---
interface FactorItem {
  id: string;
  name: string;
  type: string;
  icMean: number;
  icIr: number;
  decay: string;
  turnover: string;
  weight: number;
  selected: boolean;
  correlationWarning?: boolean;
}

// --- Mock Data ---
const MOCK_FACTORS: FactorItem[] = [
  { id: 'f1', name: 'Momentum_20D', type: 'Technical', icMean: 0.082, icIr: 0.95, decay: '12 Days', turnover: 'High', weight: 30, selected: true },
  { id: 'f2', name: 'ROE_TTM', type: 'Fundamental', icMean: 0.065, icIr: 1.25, decay: '65 Days', turnover: 'Low', weight: 40, selected: true, correlationWarning: true },
  { id: 'f3', name: 'Net_Profit_Growth', type: 'Fundamental', icMean: 0.058, icIr: 1.10, decay: '60 Days', turnover: 'Low', weight: 20, selected: true },
  { id: 'f4', name: 'PE_Ratio_Inv', type: 'Valuation', icMean: 0.045, icIr: 0.85, decay: '45 Days', turnover: 'Med', weight: 10, selected: true },
  { id: 'f5', name: 'North_Flow_3D', type: 'Capital Flow', icMean: 0.091, icIr: 0.72, decay: '3 Days', turnover: 'High', weight: 0, selected: false },
  { id: 'f6', name: 'Volatility_Rank', type: 'Risk', icMean: -0.032, icIr: -0.65, decay: '20 Days', turnover: 'Med', weight: 0, selected: false },
];

const EQUITY_CURVE_DATA = Array.from({ length: 50 }, (_, i) => ({
  date: `2023-${String(Math.floor(i/4)+1).padStart(2, '0')}-${String((i%4)*7+1).padStart(2, '0')}`,
  strategy: 100 + i * 0.8 + Math.sin(i * 0.3) * 5 + Math.random() * 2,
  benchmark: 100 + i * 0.3 + Math.cos(i * 0.2) * 3,
  longShort: 100 + i * 1.2 + Math.random() * 1,
}));

const STYLE_EXPOSURE_DATA = [
  { name: 'Value', value: 0.45 },
  { name: 'Momentum', value: 0.85 },
  { name: 'Size', value: -0.22 },
  { name: 'Volatility', value: 0.15 },
  { name: 'Quality', value: 0.62 },
];

const HEATMAP_DATA = [
  { x: 'f1', y: 'f1', val: 1.0 }, { x: 'f1', y: 'f2', val: 0.15 }, { x: 'f1', y: 'f3', val: 0.08 }, { x: 'f1', y: 'f4', val: 0.02 },
  { x: 'f2', y: 'f1', val: 0.15 }, { x: 'f2', y: 'f2', val: 1.0 }, { x: 'f2', y: 'f3', val: 0.75 }, { x: 'f2', y: 'f4', val: 0.45 },
  { x: 'f3', y: 'f1', val: 0.08 }, { x: 'f3', y: 'f2', val: 0.75 }, { x: 'f3', y: 'f3', val: 1.0 }, { x: 'f3', y: 'f4', val: 0.32 },
  { x: 'f4', y: 'f1', val: 0.02 }, { x: 'f4', y: 'f2', val: 0.45 }, { x: 'f4', y: 'f3', val: 0.32 }, { x: 'f4', y: 'f4', val: 1.0 },
];

const AlphaEngine: React.FC = () => {
  const [factors, setFactors] = useState(MOCK_FACTORS);
  const [isRunning, setIsRunning] = useState(false);
  const [weightMethod, setWeightMethod] = useState('IC-IR');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const selectedFactors = factors.filter(f => f.selected);

  const handleWeightChange = (id: string, val: number) => {
    setFactors(factors.map(f => f.id === id ? { ...f, weight: val } : f));
  };

  const toggleFactor = (id: string) => {
    setFactors(factors.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#2BC4A8 1px, transparent 1px), linear-gradient(90deg, #2BC4A8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Advanced Drawer Modal Overlay */}
      {showAdvanced && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" onClick={() => setShowAdvanced(false)} />
      )}
      <AdvancedSettingsDrawer isOpen={showAdvanced} onClose={() => setShowAdvanced(false)} />

      {/* 1. Global Control Header */}
      <AlphaEngineHeader
        selectedCount={selectedFactors.length}
        isRunning={isRunning}
        onRun={handleRun}
        onShowAdvanced={() => setShowAdvanced(true)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT: Factor Pool (3 cols) */}
        <div className="col-span-3 flex flex-col gap-6">
          <FactorPoolPanel factors={factors} onToggle={toggleFactor} />
          <AIOptimizationSuggestion />
        </div>

        {/* CENTER: Weighting & Diagnostics (6 cols) */}
        <div className="col-span-6 flex flex-col gap-6 overflow-hidden">
          
          {/* Weighting Section */}
          <WeightingPanel
            selectedFactors={selectedFactors}
            weightMethod={weightMethod}
            onWeightMethodChange={setWeightMethod}
            onWeightChange={handleWeightChange}
          />

          {/* Diagnostics Section */}
          <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
            <CorrelationHeatmap data={HEATMAP_DATA} factors={factors} />
            <StyleExposureChart data={STYLE_EXPOSURE_DATA} />
          </div>
        </div>

        {/* RIGHT: Performance Preview (3 cols) */}
        <div className="col-span-3 flex flex-col gap-6">
          <PerformancePreview data={EQUITY_CURVE_DATA} />
          <PositionConstraints />
        </div>

      </div>

      {/* 3. Bottom Execution Context Bar */}
      <ExecutionContextBar />
    </div>
  );
};

export default AlphaEngine;
