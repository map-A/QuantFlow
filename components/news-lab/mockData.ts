import { NewsFeedItem, ReactionDataPoint } from './types';

export const MOCK_NEWS_FEED: NewsFeedItem[] = [
  { id: '1', time: '14:42', title: '财政部：支持地方政府发行专项债用于收购存量商品房', source: '财联社', sourceLevel: 'A', sentiment: 'positive', strength: 85, uncertainty: 10, tags: ['政策', '房地产', '宏观'], isBreaking: true },
  { id: '2', time: '14:38', title: '科大讯飞：Q3营收同比增长15%，AI算力投入持续加大', source: '财联社', sourceLevel: 'B', sentiment: 'positive', strength: 62, uncertainty: 15, tags: ['个股', '财报', 'AI'], isBreaking: false },
  { id: '3', time: '14:32', title: '部分白酒经销商传闻下调年度销量预期，五粮液暂未回应', source: '证券时报', sourceLevel: 'B', sentiment: 'negative', strength: 75, uncertainty: 45, tags: ['个股', '白酒', '预警'], isBreaking: false },
  { id: '4', time: '14:25', title: '北向资金今日流向显示，主力集中加仓半导体核心龙头', source: '东方财富', sourceLevel: 'C', sentiment: 'positive', strength: 40, uncertainty: 5, tags: ['资金', '半导体'], isBreaking: false },
  { id: '5', time: '14:10', title: '美联储官员：通胀回落路径仍具挑战，不排除继续维持高利率', source: '路透', sourceLevel: 'A', sentiment: 'negative', strength: 55, uncertainty: 30, tags: ['宏观', '政策', '美股'], isBreaking: false },
];

export const MOCK_REACTION_DATA: ReactionDataPoint[] = Array.from({ length: 40 }, (_, i) => ({
  time: i,
  price: 100 + (i > 20 ? (i - 20) * 0.8 : 0) + Math.random() * 0.5,
  volume: Math.random() * 20 + (i === 21 ? 150 : 0),
}));
