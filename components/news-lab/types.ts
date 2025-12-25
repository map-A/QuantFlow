export interface NewsFeedItem {
  id: string;
  time: string;
  title: string;
  content?: string;
  source: string;
  author?: string; // 新增：作者字段
  sourceLevel: 'A' | 'B' | 'C';
  sentiment: 'positive' | 'negative' | 'neutral';
  strength: number; // 0-100
  uncertainty: number; // 0-100
  tags: string[];
  isBreaking?: boolean;
}

export interface ReactionDataPoint {
  time: number;
  price: number;
  volume: number;
}

export interface QuantSignal {
  label: string;
  val: string;
}

export interface MarketMood {
  mood: string;
  index: number;
  trend: 'up' | 'down' | 'neutral';
}
