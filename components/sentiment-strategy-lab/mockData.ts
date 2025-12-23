import { Rule, FactorWeight, StrategyGate, BacktestDataPoint } from './types';

export const MOCK_RULES: Rule[] = [
  { id: 'r1', variable: 'Sentiment Score', operator: '>', value: '60', action: 'Enable Growth Factors', enabled: true },
  { id: 'r2', variable: 'Regime', operator: '==', value: '冰点', action: 'Switch to Defensive Mode', enabled: true },
  { id: 'r3', variable: 'Volatility', operator: '<', value: '20', action: 'Increase Leverage', enabled: false },
];

export const MOCK_FACTOR_WEIGHTS: FactorWeight[] = [
  { id: 'f1', name: 'Momentum_20D', base: 30, low: 10, neutral: 30, high: 60 },
  { id: 'f2', name: 'ROE_TTM', base: 40, low: 50, neutral: 40, high: 20 },
  { id: 'f3', name: 'Volatility_Rank', base: 30, low: 40, neutral: 30, high: 20 },
];

export const MOCK_STRATEGY_GATES: StrategyGate[] = [
  { id: 's1', name: 'Breakout Momentum', condition: 'Sentiment ≥ 活跃', status: 'ACTIVE' },
  { id: 's2', name: 'Mean Reversion', condition: 'Sentiment ≤ 修复', status: 'INACTIVE' },
  { id: 's3', name: 'Core Alpha', condition: 'Sentiment ≥ 中性', status: 'ACTIVE' },
];

export const BACKTEST_TIMELINE_DATA: BacktestDataPoint[] = Array.from({ length: 60 }, (_, i) => {
  const sentiment = i < 15 ? 20 : i < 35 ? 75 : i < 50 ? 55 : 85;
  const regime = sentiment < 30 ? 'Low' : sentiment < 65 ? 'Neutral' : 'High';
  return {
    date: `2023-${String(Math.floor(i / 5) + 1).padStart(2, '0')}-${String((i % 5) * 6 + 1).padStart(2, '0')}`,
    strategy: 100 + i * 0.8 + Math.sin(i * 0.5) * 5,
    benchmark: 100 + i * 0.3 + Math.cos(i * 0.4) * 3,
    sentiment,
    regimeColor: regime === 'Low' ? '#F6465D22' : regime === 'Neutral' ? '#1F6FEB22' : '#2BC4A822',
  };
});
