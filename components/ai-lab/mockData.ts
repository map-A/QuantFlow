import { Icons } from '../Icons';
import { StockRecommendation, PromptTemplate, ChartDataPoint, NewsItem } from './types';

export const MOCK_FLOW_DATA: ChartDataPoint[] = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: Math.random() * 100 - 40 + (i * 2),
}));

export const MOCK_PRICE_DATA: ChartDataPoint[] = Array.from({ length: 40 }, (_, i) => ({
  time: i,
  value: 100 + Math.sin(i * 0.2) * 10 + i * 0.5 + Math.random() * 2,
}));

export const RECOMMENDED_STOCKS: StockRecommendation[] = [
  { code: '600519', name: '贵州茅台', score: 92, reason: '资金回流', change: 2.5 },
  { code: '300750', name: '宁德时代', score: 88, reason: '超跌反弹', change: 1.2 },
  { code: '688981', name: '中芯国际', score: 85, reason: '技术突破', change: -0.5 },
  { code: '002594', name: '比亚迪', score: 81, reason: '销量超预期', change: 1.8 },
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  { icon: Icons.Activity, label: "市场脉搏", query: "今日A股市场整体情绪与资金流向分析" },
  { icon: Icons.Target, label: "个股诊断", query: "深度分析 600519 贵州茅台的技术面与基本面" },
  { icon: Icons.Zap, label: "热点挖掘", query: "目前有哪些板块出现主力资金抢筹迹象？" },
  { icon: Icons.Alert, label: "风险扫描", query: "扫描当前持仓组合的潜在风险与黑天鹅" },
];

export const MOCK_NEWS: NewsItem[] = [
  { title: "公司发布三季度业绩预告，净利润预增40%-50%", sentiment: "positive", time: "10m ago" },
  { title: "北向资金今日大幅加仓板块龙头", sentiment: "positive", time: "1h ago" },
  { title: "行业监管政策落地，短期存在不确定性", sentiment: "neutral", time: "3h ago" },
];
