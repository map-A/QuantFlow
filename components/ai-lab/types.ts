export type AnalysisMode = 'initial' | 'analyzing' | 'result';

export interface AIInsight {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  trend: string;
  support: string;
  resistance: string;
  summary: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface StockRecommendation {
  code: string;
  name: string;
  score: number;
  reason: string;
  change: number;
}

export interface PromptTemplate {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  query: string;
}

export interface NewsItem {
  title: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  time: string;
}

export interface ChartDataPoint {
  time: number;
  value: number;
}
