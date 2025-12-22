import { Stock, Candle, NewsItem, Strategy, MarketIndex, MarketSentiment, Sector, LimitUpLadderItem, RiskIndicator, HeatmapItem, AIAnalysisReport, StrategyMetric, StrategyRiskAlert, DashboardWidgetConfig, BacktestTrade, BacktestMetrics } from './types';

// Helper to generate sparkline data
const genSpark = (trend: 'up' | 'down' | 'neutral', points: number = 20) => {
  let val = 100;
  return Array.from({length: points}, () => {
    val = val * (1 + (Math.random() - 0.5) * 0.02 + (trend === 'up' ? 0.005 : trend === 'down' ? -0.005 : 0));
    return val;
  });
};

export const MOCK_INDICES: MarketIndex[] = [
  { name: '上证指数', value: 3058.21, change: 12.45, changePercent: 0.41, volume: '4502亿', mainInflow: -12.5, sparkline: genSpark('up') },
  { name: '深证成指', value: 9850.12, change: -23.10, changePercent: -0.23, volume: '5800亿', mainInflow: -45.2, sparkline: genSpark('down') },
  { name: '创业板指', value: 1950.55, change: -10.50, changePercent: -0.54, volume: '2100亿', mainInflow: -18.5, sparkline: genSpark('down') },
  { name: '科创50', value: 850.30, change: 5.20, changePercent: 0.62, volume: '680亿', mainInflow: 5.2, sparkline: genSpark('up') },
  { name: '沪深300', value: 3580.15, change: 8.50, changePercent: 0.24, volume: '3200亿', mainInflow: 10.5, sparkline: genSpark('neutral') },
];

export const MOCK_SENTIMENT: MarketSentiment = {
  upCount: 3200,
  downCount: 1800,
  flatCount: 150,
  limitUpCount: 45,
  limitDownCount: 3,
  northBoundNetInflow: 52.5, // 亿
  marketVolume: '10302亿',
  volumeRatio: 1.15, // 放量
  marginBalanceChange: 15.2, // 融资余额增加
  strongStockPremium: 3.5 // 强势股溢价高
};

export const MOCK_SECTORS: Sector[] = [
  { name: '通信设备', changePercent: 3.2, netInflow: 25.4, leadingStock: '中际旭创', intensity: 95, upCount: 45, downCount: 10 },
  { name: '汽车零部件', changePercent: 2.5, netInflow: 18.2, leadingStock: '拓普集团', intensity: 88, upCount: 60, downCount: 15 },
  { name: '半导体', changePercent: 1.8, netInflow: -5.4, leadingStock: '中芯国际', intensity: 75, upCount: 30, downCount: 40 },
  { name: '证券', changePercent: 1.2, netInflow: 12.1, leadingStock: '中信证券', intensity: 70, upCount: 48, downCount: 2 },
  { name: '光伏设备', changePercent: -1.5, netInflow: -32.5, leadingStock: '隆基绿能', intensity: 40, upCount: 12, downCount: 58 },
  { name: '房地产', changePercent: -2.1, netInflow: -15.8, leadingStock: '万科A', intensity: 30, upCount: 5, downCount: 80 },
];

export const MOCK_LIMIT_LADDER: LimitUpLadderItem[] = [
  { boards: 5, count: 1, topStock: '真视通' },
  { boards: 4, count: 2, topStock: '高新发展' },
  { boards: 3, count: 5, topStock: '圣龙股份' },
  { boards: 2, count: 12, topStock: '赛力斯' },
  { boards: 1, count: 45, topStock: '四川长虹' },
];

export const MOCK_RISK_INDICATORS: RiskIndicator[] = [
  { name: '中国 VIX 波指', value: '18.5', trend: 'stable', status: 'safe', description: '市场情绪平稳，无恐慌' },
  { name: '沪深300 估值', value: '11.2', trend: 'down', status: 'safe', description: '处于历史低位区间' },
  { name: '高位股亏钱效应', value: 'High', trend: 'up', status: 'warning', description: '昨日连板指数大跌' },
];

export const MOCK_HEATMAP_DATA: HeatmapItem[] = [
    { id: '1', name: 'CPO', value: 100, change: 5.2, group: '通信' },
    { id: '2', name: '液冷服务器', value: 80, change: 4.1, group: '通信' },
    { id: '3', name: '算力租赁', value: 90, change: 3.8, group: '计算机' },
    { id: '4', name: '华为汽车', value: 120, change: 2.5, group: '汽车' },
    { id: '5', name: '一体化压铸', value: 60, change: 1.2, group: '汽车' },
    { id: '6', name: '先进封装', value: 70, change: -0.5, group: '电子' },
    { id: '7', name: '存储芯片', value: 85, change: -1.2, group: '电子' },
    { id: '8', name: 'BC电池', value: 50, change: -2.5, group: '电力设备' },
    { id: '9', name: '创新药', value: 110, change: 0.8, group: '医药' },
    { id: '10', name: '减肥药', value: 95, change: 1.5, group: '医药' },
];

export const MOCK_STOCKS: Stock[] = [
  { 
    symbol: '600519', name: '贵州茅台', price: 1735.50, change: 12.50, changePercent: 0.72, 
    volume: '2.5万', amount: '43.5亿', marketCap: '2.1万亿', circulatingMarketCap: '2.1万亿',
    turnoverRate: 0.2, amplitude: 1.5, limitStatus: 'normal', limitUpCount: 0,
    mainNetInflow: 15000, northNetInflow: 8500, superLargeOrderInflow: 5000, institutionBuy: 3000,
    pe: 30.5, pb: 8.2, ps: 12.5, peg: 1.8, roe: 28.5, revenueGrowth: 15.2, netProfitGrowth: 18.5, grossMargin: 92.5, debtToAsset: 12.5, dividendYield: 2.5,
    sector: '食品饮料', subSector: '白酒', concepts: ['白酒', '核心资产', 'MSCI'],
    maAlignment: 'long', rsi: 65, kdjStatus: 'golden', macdStatus: 'golden', bollStatus: 'upper',
    volatility: 12.5, maxDrawdown: -15.5, beta: 0.8, hasAnnounce: false,
    aiScore: 92, aiSentiment: 0.8, aiTrend: 'bull',
    totalShares: '12.56亿' 
  },
  { 
    symbol: '300750', name: '宁德时代', price: 212.40, change: -2.10, changePercent: -0.98, 
    volume: '15.3万', amount: '32.1亿', marketCap: '9300亿', circulatingMarketCap: '8500亿',
    turnoverRate: 1.5, amplitude: 3.2, limitStatus: 'normal', limitUpCount: 0,
    mainNetInflow: -5600, northNetInflow: -1200, superLargeOrderInflow: -2000, institutionBuy: -500,
    pe: 22.1, pb: 4.5, ps: 3.2, peg: 0.9, roe: 18.2, revenueGrowth: 25.4, netProfitGrowth: 22.1, grossMargin: 22.5, debtToAsset: 65.2, dividendYield: 1.1,
    sector: '电力设备', subSector: '电池', concepts: ['新能源车', '锂电池', '创业板权重'],
    maAlignment: 'tangled', rsi: 42, kdjStatus: 'dead', macdStatus: 'dead', bollStatus: 'middle',
    volatility: 25.5, maxDrawdown: -35.2, beta: 1.2, hasAnnounce: true,
    aiScore: 78, aiSentiment: 0.4, aiTrend: 'shock',
    totalShares: '40.2亿' 
  },
  { 
    symbol: '601318', name: '中国平安', price: 45.20, change: 0.35, changePercent: 0.78, 
    volume: '45.1万', amount: '20.5亿', marketCap: '8200亿', circulatingMarketCap: '8200亿',
    turnoverRate: 0.8, amplitude: 1.2, limitStatus: 'normal', limitUpCount: 0,
    mainNetInflow: 2300, northNetInflow: 1500, superLargeOrderInflow: 1000, institutionBuy: 800,
    pe: 8.4, pb: 1.1, ps: 1.2, peg: 0.5, roe: 12.5, revenueGrowth: 5.2, netProfitGrowth: 8.4, grossMargin: 15.2, debtToAsset: 85.5, dividendYield: 5.2,
    sector: '非银金融', subSector: '保险', concepts: ['中特估', '保险', '高股息'],
    maAlignment: 'long', rsi: 58, kdjStatus: 'normal', macdStatus: 'normal', bollStatus: 'upper',
    volatility: 18.5, maxDrawdown: -12.5, beta: 1.1, hasAnnounce: false,
    aiScore: 85, aiSentiment: 0.6, aiTrend: 'bull',
    totalShares: '180亿' 
  },
  { 
    symbol: '002594', name: '比亚迪', price: 239.35, change: 3.50, changePercent: 1.48, 
    volume: '12.2万', amount: '28.8亿', marketCap: '6800亿', circulatingMarketCap: '6800亿',
    turnoverRate: 1.2, amplitude: 2.8, limitStatus: 'normal', limitUpCount: 0,
    mainNetInflow: 4500, northNetInflow: 2100, superLargeOrderInflow: 1500, institutionBuy: 1000,
    pe: 25.2, pb: 5.1, ps: 1.5, peg: 0.7, roe: 16.8, revenueGrowth: 35.2, netProfitGrowth: 65.2, grossMargin: 18.5, debtToAsset: 72.5, dividendYield: 0.8,
    sector: '汽车', subSector: '乘用车', concepts: ['新能源车', '出海概念'],
    maAlignment: 'long', rsi: 72, kdjStatus: 'golden', macdStatus: 'golden', bollStatus: 'upper',
    volatility: 28.5, maxDrawdown: -25.5, beta: 1.3, hasAnnounce: false,
    aiScore: 88, aiSentiment: 0.9, aiTrend: 'bull',
    totalShares: '29.1亿' 
  },
  { 
    symbol: '688981', name: '中芯国际', price: 55.60, change: -1.40, changePercent: -2.45, 
    volume: '28.5万', amount: '15.6亿', marketCap: '4400亿', circulatingMarketCap: '2100亿',
    turnoverRate: 2.1, amplitude: 4.5, limitStatus: 'normal', limitUpCount: 0,
    mainNetInflow: -8500, northNetInflow: -3200, superLargeOrderInflow: -4000, institutionBuy: -1500,
    pe: 45.8, pb: 3.2, ps: 8.5, peg: 2.5, roe: 5.4, revenueGrowth: -8.5, netProfitGrowth: -15.2, grossMargin: 25.5, debtToAsset: 35.2, dividendYield: 0,
    sector: '电子', subSector: '半导体', concepts: ['芯片', '半导体', '科创板'],
    maAlignment: 'short', rsi: 35, kdjStatus: 'dead', macdStatus: 'dead', bollStatus: 'lower',
    volatility: 35.5, maxDrawdown: -45.5, beta: 1.5, hasAnnounce: false,
    aiScore: 65, aiSentiment: -0.2, aiTrend: 'bear',
    totalShares: '79亿' 
  },
  { 
    symbol: '600036', name: '招商银行', price: 32.10, change: 0.15, changePercent: 0.47, 
    volume: '35.4万', amount: '11.2亿', marketCap: '8100亿', circulatingMarketCap: '8100亿',
    turnoverRate: 0.6, amplitude: 1.0, limitStatus: 'normal', limitUpCount: 0,
    mainNetInflow: 1200, northNetInflow: 800, superLargeOrderInflow: 500, institutionBuy: 300,
    pe: 6.5, pb: 0.9, ps: 2.5, peg: 0.8, roe: 14.2, revenueGrowth: 2.1, netProfitGrowth: 5.5, grossMargin: 45.5, debtToAsset: 90.2, dividendYield: 5.8,
    sector: '银行', subSector: '股份制银行', concepts: ['高股息', '中特估'],
    maAlignment: 'long', rsi: 55, kdjStatus: 'normal', macdStatus: 'normal', bollStatus: 'middle',
    volatility: 10.5, maxDrawdown: -10.5, beta: 0.7, hasAnnounce: true,
    aiScore: 82, aiSentiment: 0.5, aiTrend: 'bull',
    totalShares: '252亿' 
  },
  {
      symbol: '002230', name: '科大讯飞', price: 48.50, change: 4.85, changePercent: 10.00,
      volume: '55.2万', amount: '26.5亿', marketCap: '1120亿', circulatingMarketCap: '1100亿',
      turnoverRate: 8.5, amplitude: 10.0, limitStatus: 'limitUp', limitUpCount: 1,
      mainNetInflow: 12500, northNetInflow: 4500, superLargeOrderInflow: 8000, institutionBuy: 5000,
      pe: 120.5, pb: 6.5, ps: 12.5, peg: 5.5, roe: 3.2, revenueGrowth: 12.5, netProfitGrowth: -10.2, grossMargin: 45.5, debtToAsset: 45.2, dividendYield: 0.2,
      sector: '计算机', subSector: '软件开发', concepts: ['AI大模型', '人工智能'],
      maAlignment: 'long', rsi: 85, kdjStatus: 'golden', macdStatus: 'golden', bollStatus: 'upper',
      volatility: 45.5, maxDrawdown: -25.5, beta: 1.8, hasAnnounce: false,
      aiScore: 95, aiSentiment: 0.95, aiTrend: 'bull',
      totalShares: '23.1亿'
  },
  {
      symbol: '000063', name: '中兴通讯', price: 32.50, change: 3.25, changePercent: 10.00,
      volume: '65.2万', amount: '45.5亿', marketCap: '1500亿', circulatingMarketCap: '1500亿',
      turnoverRate: 9.5, amplitude: 10.0, limitStatus: 'limitUp', limitUpCount: 2,
      mainNetInflow: 25000, northNetInflow: 12000, superLargeOrderInflow: 15000, institutionBuy: 8000,
      pe: 25.5, pb: 3.5, ps: 1.5, peg: 1.2, roe: 12.2, revenueGrowth: 8.5, netProfitGrowth: 10.2, grossMargin: 35.5, debtToAsset: 65.2, dividendYield: 1.2,
      sector: '通信', subSector: '通信设备', concepts: ['5G', '6G', '云计算'],
      maAlignment: 'long', rsi: 92, kdjStatus: 'golden', macdStatus: 'golden', bollStatus: 'upper',
      volatility: 35.5, maxDrawdown: -35.5, beta: 1.4, hasAnnounce: true,
      aiScore: 98, aiSentiment: 0.99, aiTrend: 'bull',
      totalShares: '45.1亿'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  { id: '1', title: '央行宣布降准0.5个百分点，释放长期资金约1万亿元', source: '财联社', time: '10分钟前', sentiment: 'positive', impact: 'high', relatedSymbols: ['600036', '601318'], tags: ['宏观', '利好'] },
  { id: '2', title: '新能源车渗透率突破40%，产业链迎来新机遇', source: '证券时报', time: '1小时前', sentiment: 'positive', impact: 'medium', relatedSymbols: ['300750', '002594'], tags: ['行业', '利好'] },
  { id: '3', title: '半导体板块震荡调整，机构提示短期回调风险', source: '每日经济新闻', time: '2小时前', sentiment: 'negative', impact: 'medium', relatedSymbols: ['688981'], tags: ['行业', '风险'] },
  { id: '4', title: '北向资金今日净流入超50亿元', source: '东方财富', time: '3小时前', sentiment: 'positive', impact: 'medium', relatedSymbols: ['600519'], tags: ['资金', '利好'] },
  { id: '5', title: '贵州茅台发布三季度财报，净利润同比增长15%', source: '新浪财经', time: '4小时前', sentiment: 'positive', impact: 'high', relatedSymbols: ['600519'], tags: ['个股', '业绩'] },
];

export const MOCK_STRATEGIES: Strategy[] = [
  { id: '1', name: '双均线趋势跟踪 (MA Cross)', code: 'if ma5 > ma20 and position == 0: buy()', returnRate: 45.2, sharpeRatio: 2.1, drawdown: -12.5, status: 'active', lastRun: '2023-10-27 14:30' },
  { id: '2', name: '多因子Alpha (Multi-Factor)', code: 'score = 0.4*roe + 0.3*mom + 0.3*vol', returnRate: 18.5, sharpeRatio: 1.4, drawdown: -8.2, status: 'active', lastRun: '2023-10-27 09:15' },
  { id: '3', name: '高频网格套利 (Grid Trading)', code: 'grid_spacing = 0.5%', returnRate: 62.1, sharpeRatio: 1.8, drawdown: -22.1, status: 'paused', lastRun: '2023-10-26 15:00' },
];

export const GENERATE_MOCK_CANDLES = (count: number = 100): Candle[] => {
  let price = 1730;
  const candles: Candle[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 60000 * 60 * 24).toISOString().split('T')[0];
    const volatility = price * 0.02;
    const change = (Math.random() - 0.5) * volatility;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    const volume = Math.floor(Math.random() * 10000) + 5000;
    
    // Add signals and patterns randomly
    let signal: 'buy' | 'sell' | undefined;
    let pattern: string | undefined;
    
    if (Math.random() > 0.9) {
        signal = Math.random() > 0.5 ? 'buy' : 'sell';
    }
    if (Math.random() > 0.95) {
        pattern = ['Gap', 'Hammer', 'Engulfing'][Math.floor(Math.random()*3)];
    }

    candles.push({ time, open, high, low, close, volume, signal, pattern });
    price = close;
  }
  return candles;
};

export const MOCK_CANDLES = GENERATE_MOCK_CANDLES(150); // Increased data points

// --- New Mock Data ---

export const MOCK_AI_REPORT: AIAnalysisReport = {
  summary: "今日市场呈现缩量震荡态势，受北向资金回流影响，权重股表现优于中小盘。AI 监测到 '华为产业链' 与 '高股息' 策略出现资金共振，建议关注低位补涨的半导体设备股。",
  trend: '震荡',
  sentimentScore: 68,
  hotSectorsPrediction: ['光刻机', '中特估', '跨境电商'],
  riskAlerts: ['高位连板股出现筹码松动', '尾盘量能不足，警惕冲高回落'],
  recommendations: [
    { symbol: '688xxx', name: '中微公司', reason: '刻蚀设备龙头，主力资金连续3日净流入', type: 'value', confidence: 92 },
    { symbol: '002xxx', name: '张江高科', reason: '光刻机概念，突破均线压制，形成多方炮', type: 'pattern', confidence: 85 },
    { symbol: '600xxx', name: '中国神华', reason: '高股息避险资产，防御属性增强', type: 'short_term', confidence: 88 },
    { symbol: '002230', name: '科大讯飞', reason: 'AI策略匹配: 双均线金叉 + 资金共振', type: 'strategy_match', confidence: 95 }
  ],
  patterns: [
    { symbol: '000063', name: '中兴通讯', pattern: '均线多头排列', timeframe: '日线' },
    { symbol: '300750', name: '宁德时代', pattern: '底背离', timeframe: '60分钟' }
  ]
};

export const MOCK_STRATEGY_MONITOR_DATA: { live: StrategyMetric[], backtest: StrategyMetric[], alerts: StrategyRiskAlert[] } = {
  live: [
    { id: 's1', name: '双均线趋势增强版', type: 'live', dailyReturn: 1.25, totalReturn: 24.5, sharpe: 2.4, maxDrawdown: -8.5, status: 'running', winRate: 62 },
    { id: 's2', name: '小市值轮动 (Paper)', type: 'paper', dailyReturn: -0.4, totalReturn: 12.1, sharpe: 1.8, maxDrawdown: -15.2, status: 'running', winRate: 55 }
  ],
  backtest: [
    { id: 'b1', name: 'RSI均值回归 v2.0', type: 'backtest', dailyReturn: 0, totalReturn: 156.4, sharpe: 3.1, maxDrawdown: -22.4, status: 'stopped', winRate: 70 },
    { id: 'b2', name: '多因子中性策略', type: 'backtest', dailyReturn: 0, totalReturn: 45.2, sharpe: 4.5, maxDrawdown: -4.1, status: 'stopped', winRate: 58 }
  ],
  alerts: [
    { strategyId: 's2', message: '小市值轮动: 单日回撤接近阈值 (2%)', level: 'warning', time: '14:30' },
    { strategyId: 's1', message: '双均线: 执行买入信号 600519', level: 'info', time: '09:35' }
  ]
};

export const DEFAULT_LAYOUT: DashboardWidgetConfig[] = [
  { id: 'w1', type: 'indices', title: '市场核心指数', colSpan: 3 },
  { id: 'w2', type: 'ai_core', title: 'AI 决策中枢', colSpan: 2, h: 2 },
  { id: 'w3', type: 'strategy_monitor', title: '量化策略监控', colSpan: 1, h: 2 },
  { id: 'w4', type: 'sector_stats', title: '板块深度统计', colSpan: 3 },
  { id: 'w5', type: 'market_map', title: '市场热力图', colSpan: 2 },
  { id: 'w6', type: 'risk_news', title: '风控与舆情', colSpan: 1 },
  { id: 'w7', type: 'stock_list', title: '个股龙虎榜', colSpan: 3 },
];

// --- Backtest Mock Data ---

export const MOCK_BACKTEST_METRICS: BacktestMetrics = {
    totalReturn: 45.2,
    annualizedReturn: 18.5,
    maxDrawdown: -12.5,
    sharpe: 2.14,
    volatility: 15.2,
    winRate: 68.5,
    profitFactor: 1.8,
    tradeCount: 142,
    alpha: 0.12,
    beta: 0.85,
    sortino: 2.8,
    calmar: 1.5
};

export const MOCK_BACKTEST_TRADES: BacktestTrade[] = Array.from({length: 20}, (_, i) => ({
    id: `t${i}`,
    time: `2023-10-${String(i+1).padStart(2, '0')} 10:30:00`,
    symbol: '600519.SH',
    name: '贵州茅台',
    side: Math.random() > 0.5 ? 'buy' : 'sell',
    price: 1700 + Math.random() * 50,
    volume: 100 * Math.floor(Math.random() * 5 + 1),
    commission: 5.0,
    pnl: Math.random() > 0.4 ? Math.random() * 5000 : -Math.random() * 2000,
    pnlPercent: Math.random() > 0.4 ? 1.5 : -0.8
}));