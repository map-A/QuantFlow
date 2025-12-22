
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  amount: string; 
  marketCap: string; 
  circulatingMarketCap: string; 
  turnoverRate: number; 
  amplitude: number; 
  limitStatus: 'limitUp' | 'limitDown' | 'normal'; 
  limitUpCount?: number; 
  mainNetInflow: number; 
  superLargeOrderInflow?: number; 
  northNetInflow: number; 
  institutionBuy?: number; 
  pe: number; 
  pb: number; 
  ps?: number; 
  peg?: number; 
  dividendYield: number; 
  roe: number; 
  revenueGrowth: number; 
  netProfitGrowth: number; 
  grossMargin?: number; 
  debtToAsset?: number; 
  sector: string; 
  subSector?: string; 
  concepts: string[]; 
  maAlignment: 'long' | 'short' | 'tangled'; 
  rsi: number;
  kdjStatus?: 'golden' | 'dead' | 'normal';
  macdStatus: 'golden' | 'dead' | 'normal'; 
  bollStatus?: 'upper' | 'lower' | 'middle';
  volatility?: number; 
  maxDrawdown?: number; 
  beta?: number;
  hasAnnounce?: boolean; 
  aiScore: number; 
  aiSentiment: number; 
  aiTrend?: 'bull' | 'bear' | 'shock'; 
  totalShares: string; 
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma5?: number;
  ma10?: number;
  ma20?: number;
  ma30?: number;
  ma60?: number;
  dif?: number;
  dea?: number;
  macd?: number;
  k?: number;
  d?: number;
  j?: number;
  rsi6?: number;
  rsi12?: number;
  rsi24?: number;
  bollUpper?: number;
  bollMid?: number;
  bollLower?: number;
  signal?: 'buy' | 'sell';
  pattern?: string; 
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  relatedSymbols: string[];
  tags: string[]; 
}

export interface Strategy {
  id: string;
  name: string;
  code: string; 
  returnRate: number; 
  sharpeRatio: number;
  drawdown: number; 
  status: 'active' | 'paused' | 'backtesting';
  lastRun?: string;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  volume: string; 
  mainInflow: number; 
  sparkline: number[]; 
}

export interface MarketSentiment {
  upCount: number;
  downCount: number;
  flatCount: number;
  limitUpCount: number;
  limitDownCount: number;
  northBoundNetInflow: number; 
  marketVolume: string; 
  volumeRatio: number; 
  marginBalanceChange: number; 
  strongStockPremium: number; 
}

export interface Sector {
  name: string;
  changePercent: number;
  netInflow: number; 
  leadingStock: string;
  intensity: number; 
  upCount: number; 
  downCount: number; 
}

export interface LimitUpLadderItem {
  boards: number; 
  count: number;  
  topStock: string; 
}

export interface RiskIndicator {
  name: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  status: 'safe' | 'warning' | 'danger';
  description: string;
}

export interface HeatmapItem {
  id: string;
  name: string;
  value: number; 
  change: number; 
  group: string; 
}

export interface AIAnalysisReport {
  summary: string;
  trend: string;
  sentimentScore: number;
  hotSectorsPrediction: string[];
  riskAlerts: string[];
  recommendations: {
    symbol: string;
    name: string;
    reason: string;
    type: string;
    confidence: number;
  }[];
  patterns: {
    symbol: string;
    name: string;
    pattern: string;
    timeframe: string;
  }[];
}

export interface StrategyMetric {
  id: string;
  name: string;
  type: 'live' | 'paper' | 'backtest';
  dailyReturn: number;
  totalReturn: number;
  sharpe: number;
  maxDrawdown: number;
  status: 'running' | 'stopped';
  winRate: number;
}

export interface StrategyRiskAlert {
  strategyId: string;
  message: string;
  level: 'warning' | 'info' | 'danger';
  time: string;
}

export interface DashboardWidgetConfig {
  id: string;
  type: string;
  title: string;
  colSpan: number;
  h?: number;
}

export interface BacktestTrade {
  id: string;
  time: string;
  symbol: string;
  name: string;
  side: 'buy' | 'sell';
  price: number;
  volume: number;
  commission: number;
  pnl?: number;
  pnlPercent?: number;
}

// Institutional Grade Trade Log
export interface TradeLog extends BacktestTrade {
  action: 'OPEN' | 'CLOSE' | 'ADD' | 'REDUCE';
  orderPrice: number;
  slippage: number;
  slippagePct: number;
  latency: string; 
  latencyMs: number;
  strategyId: string;
  strategyVersion: string;
  strategyName: string;
  signalStrength: number;
  executionSentiment: number;
  triggerSource: 'FACTOR' | 'SENTIMENT' | 'EVENT' | 'MANUAL';
  status: 'FILLED' | 'PARTIAL' | 'CANCELLED' | 'REJECTED';
  isManualOverride?: boolean;
  complianceStatus: 'PASS' | 'WARNING' | 'BREACH';
  unrealizedPnl?: number;
  tax: number;
}

export interface Position {
  symbol: string;
  name: string;
  volume: number;
  availableVolume: number;
  avgCost: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  exposure: number;
  maxDrawdown: number;
  dailyChange: number;
}

// Added BacktestMetrics and BacktestConfig interfaces to fix missing export errors
export interface BacktestMetrics {
    totalReturn: number;
    annualizedReturn: number;
    maxDrawdown: number;
    sharpe: number;
    volatility: number;
    winRate: number;
    profitFactor: number;
    tradeCount: number;
    alpha: number;
    beta: number;
    sortino: number;
    calmar: number;
}

export interface BacktestConfig {
    startDate: string;
    endDate: string;
    initialCapital: number;
    benchmark: string;
    frequency: string;
    fees: number;
}

export enum Page {
  DASHBOARD = 'DASHBOARD',
  MARKET = 'MARKET',
  TRADE = 'TRADE',
  STRATEGY = 'STRATEGY',
  ALPHA_LAB = 'ALPHA_LAB',
  ALPHA_ENGINE = 'ALPHA_ENGINE',
  SENTIMENT_LAB = 'SENTIMENT_LAB',
  SENTIMENT_STRATEGY = 'SENTIMENT_STRATEGY',
  NEWS_LAB = 'NEWS_LAB',
  AI_LAB = 'AI_LAB',
  SETTINGS = 'SETTINGS',
  FUNDS = 'FUNDS',
  BILLING = 'BILLING',
  NOTIFICATIONS = 'NOTIFICATIONS',
  TRADE_LEDGER = 'TRADE_LEDGER',
  XUANXUE_LAB = 'XUANXUE_LAB',
  CULTURAL_PROJECTION = 'CULTURAL_PROJECTION'
}
