import { FiveElement, SentimentCompareData, IndustryMapping, HexagramData, CulturalDate } from './types';

export const MOCK_FIVE_ELEMENTS: FiveElement[] = [
  { subject: '木 (Wood)', A: 85, fullMark: 100, note: '科技/成长' },
  { subject: '火 (Fire)', A: 95, fullMark: 100, note: '能源/情绪' },
  { subject: '土 (Earth)', A: 65, fullMark: 100, note: '基建/稳健' },
  { subject: '金 (Metal)', A: 45, fullMark: 100, note: '金融/资源' },
  { subject: '水 (Water)', A: 75, fullMark: 100, note: '贸易/物流' },
];

export const MOCK_SENTIMENT_COMPARE: SentimentCompareData[] = Array.from({ length: 30 }, (_, i) => ({
  time: `T-${30-i}`,
  quant: 40 + Math.sin(i * 0.4) * 20 + Math.random() * 10,
  cultural: 35 + Math.sin(i * 0.3) * 25 + Math.random() * 5,
}));

export const MOCK_INDUSTRY_MAPPINGS: IndustryMapping[] = [
  { name: '半导体/电子', element: '火', style: 'text-success' },
  { name: '计算机/AI', element: '木', style: 'text-cyan' },
  { name: '非银金融', element: '金', style: 'text-white' },
  { name: '商贸/物流', element: '水', style: 'text-primary' },
  { name: '煤炭/基建', element: '土', style: 'text-yellow-500' },
];

export const MOCK_HEXAGRAM: HexagramData = {
  name: '泰 (Tai)',
  symbol: [true, true, true, false, false, false],
  tags: ['通达', '扩散', '顺势'],
  energyLevel: 67,
  status: 'STABLE'
};

export const MOCK_CULTURAL_DATE: CulturalDate = {
  year: '甲辰年',
  month: '丙寅月',
  day: '壬申日',
  season: '立春'
};
