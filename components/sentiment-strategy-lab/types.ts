export interface Rule {
  id: string;
  variable: string;
  operator: string;
  value: string;
  action: string;
  enabled: boolean;
}

export interface FactorWeight {
  id: string;
  name: string;
  base: number;
  low: number;
  neutral: number;
  high: number;
}

export interface StrategyGate {
  id: string;
  name: string;
  condition: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface BacktestDataPoint {
  date: string;
  strategy: number;
  benchmark: number;
  sentiment: number;
  regimeColor: string;
}

export interface SentimentMetrics {
  score: number;
  regime: string;
  trend: number[];
}
