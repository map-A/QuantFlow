import React, { useState } from 'react';
import { MOCK_STOCKS } from '../constants';
import {
  FilterSidebar,
  AISearchBar,
  StrategyChips,
  StockTable,
  TablePagination,
  ResultsHeader
} from './market-list';

// Define the filter categories and criteria structure
type FilterCategory = 'quote' | 'money' | 'fundamental' | 'technical' | 'sector' | 'risk' | 'ai';

interface FilterCriteria {
  id: string;
  label: string;
  category: FilterCategory;
  type: 'range' | 'select' | 'boolean' | 'multi-select';
  options?: string[];
  unit?: string;
}

// Comprehensive Filter List
const FILTERS: FilterCriteria[] = [
  // 1. Basic Quotes
  { id: 'price', label: '最新价', category: 'quote', type: 'range', unit: '¥' },
  { id: 'changePercent', label: '涨跌幅', category: 'quote', type: 'range', unit: '%' },
  { id: 'change', label: '涨跌额', category: 'quote', type: 'range', unit: '¥' },
  { id: 'volume', label: '成交量', category: 'quote', type: 'range', unit: '手' },
  { id: 'amount', label: '成交额', category: 'quote', type: 'range', unit: '亿' },
  { id: 'turnoverRate', label: '换手率', category: 'quote', type: 'range', unit: '%' },
  { id: 'amplitude', label: '振幅', category: 'quote', type: 'range', unit: '%' },
  { id: 'limitStatus', label: '涨跌停状态', category: 'quote', type: 'select', options: ['涨停', '跌停', '正常'] },
  { id: 'limitUpCount', label: '连板数', category: 'quote', type: 'range', unit: '板' },
  { id: 'marketBoard', label: '板块类型', category: 'quote', type: 'select', options: ['主板', '创业板', '科创板', '北交所'] },

  // 2. Money Flow
  { id: 'mainNetInflow', label: '主力净流入', category: 'money', type: 'range', unit: '万' },
  { id: 'superLargeOrderInflow', label: '超大单净流入', category: 'money', type: 'range', unit: '万' },
  { id: 'northNetInflow', label: '北向资金净买入', category: 'money', type: 'range', unit: '万' },
  { id: 'institutionBuy', label: '机构席位买入', category: 'money', type: 'range', unit: '万' },
  { id: 'dragonTigerList', label: '上榜龙虎榜', category: 'money', type: 'boolean' },

  // 3. Fundamentals
  { id: 'pe', label: '市盈率 (PE-TTM)', category: 'fundamental', type: 'range' },
  { id: 'pb', label: '市净率 (PB)', category: 'fundamental', type: 'range' },
  { id: 'peg', label: 'PEG', category: 'fundamental', type: 'range' },
  { id: 'dividendYield', label: '股息率', category: 'fundamental', type: 'range', unit: '%' },
  { id: 'roe', label: 'ROE (净资产收益率)', category: 'fundamental', type: 'range', unit: '%' },
  { id: 'revenueGrowth', label: '营收增长率', category: 'fundamental', type: 'range', unit: '%' },
  { id: 'netProfitGrowth', label: '净利润增长率', category: 'fundamental', type: 'range', unit: '%' },
  { id: 'grossMargin', label: '毛利率', category: 'fundamental', type: 'range', unit: '%' },
  { id: 'debtToAsset', label: '资产负债率', category: 'fundamental', type: 'range', unit: '%' },

  // 4. Technicals
  { id: 'maAlignment', label: '均线形态', category: 'technical', type: 'select', options: ['多头排列', '空头排列', '纠缠震荡'] },
  { id: 'maBreakout', label: '突破均线', category: 'technical', type: 'select', options: ['突破MA20', '突破MA60', '站上年线'] },
  { id: 'macdStatus', label: 'MACD 信号', category: 'technical', type: 'select', options: ['金叉', '死叉', '顶背离', '底背离'] },
  { id: 'kdjStatus', label: 'KDJ 信号', category: 'technical', type: 'select', options: ['金叉', '死叉'] },
  { id: 'rsi', label: 'RSI (14)', category: 'technical', type: 'range' },
  { id: 'pattern', label: 'K线形态', category: 'technical', type: 'select', options: ['锤子线', '吞没形态', '早晨之星', '三连阳'] },

  // 5. Sectors & Events
  { id: 'sector', label: '申万一级行业', category: 'sector', type: 'select', options: ['电子', '计算机', '通信', '医药生物', '电力设备', '食品饮料', '非银金融'] },
  { id: 'concept', label: '热门概念', category: 'sector', type: 'select', options: ['中特估', 'AI算力', '华为产业链', '高股息', '新能源车'] },
  { id: 'event', label: '事件驱动', category: 'sector', type: 'select', options: ['业绩预增', '大额订单', '高管增持', '分红实施'] },
  
  // 6. Risk Control
  { id: 'maxDrawdown', label: '最大回撤(30日)', category: 'risk', type: 'range', unit: '%' },
  { id: 'volatility', label: '年化波动率', category: 'risk', type: 'range', unit: '%' },
  { id: 'beta', label: 'Beta 系数', category: 'risk', type: 'range' },
  { id: 'isST', label: '排除 ST/*ST', category: 'risk', type: 'boolean' },

  // 7. AI Analysis
  { id: 'aiScore', label: 'AI 综合评分', category: 'ai', type: 'range', unit: '分' },
  { id: 'aiSentiment', label: '舆情情感分', category: 'ai', type: 'range', unit: '分' },
  { id: 'aiTrend', label: 'AI 趋势预测', category: 'ai', type: 'select', options: ['看涨', '看跌', '震荡'] },
  { id: 'aiRisk', label: 'AI 风险提示', category: 'ai', type: 'boolean' },
];

const MarketList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterCategory>('quote');
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Mock Filtering Logic
  const filteredStocks = MOCK_STOCKS.filter(stock => {
    // Natural Language Search
    if (naturalLanguageQuery) {
      if (naturalLanguageQuery.includes('白酒') && !stock.concepts.includes('白酒')) return false;
      if (naturalLanguageQuery.includes('红') && stock.change < 0) return false;
      if (naturalLanguageQuery.includes('AI') && !stock.concepts.includes('人工智能')) return false;
    }

    // Category Filters
    if (activeFilters['limitStatus'] && activeFilters['limitStatus'] !== '全部') {
      const map = { '涨停': 'limitUp', '跌停': 'limitDown', '正常': 'normal' };
      if (stock.limitStatus !== map[activeFilters['limitStatus'] as keyof typeof map]) return false;
    }
    
    if (activeFilters['peMin'] && stock.pe < Number(activeFilters['peMin'])) return false;
    if (activeFilters['peMax'] && stock.pe > Number(activeFilters['peMax'])) return false;
    
    if (activeFilters['maAlignment'] && activeFilters['maAlignment'] !== '全部') {
      const map = { '多头排列': 'long', '空头排列': 'short', '纠缠震荡': 'tangled' };
      if (stock.maAlignment !== map[activeFilters['maAlignment'] as keyof typeof map]) return false;
    }

    if (activeFilters['aiTrend'] && activeFilters['aiTrend'] !== '全部') {
      const map = { '看涨': 'bull', '看跌': 'bear', '震荡': 'shock' };
      if (stock.aiTrend !== map[activeFilters['aiTrend'] as keyof typeof map]) return false;
    }

    return true;
  });

  const toggleFilter = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    if (value === '' || value === '全部') delete newFilters[key];
    setActiveFilters(newFilters);
  };

  const applyStrategy = (strategyId: string) => {
    setActiveFilters({});
    setNaturalLanguageQuery('');
    if (strategyId === 'north_buy') {
      alert("已应用策略：北向资金大幅净买入 > 5000万");
    } else if (strategyId === 'value_growth') {
      setActiveFilters({ peMax: 20, roeMin: 15 });
    } else if (strategyId === 'limit_up_board') {
      setActiveFilters({ limitStatus: '涨停' });
    }
  };

  const strategies = [
    { id: 'limit_up_board', label: '🔥 涨停炸板复盘', color: 'text-danger border-danger/20 bg-danger/5' },
    { id: 'north_buy', label: '🚀 北向资金扫货', color: 'text-primary border-primary/20 bg-primary/5' },
    { id: 'value_growth', label: '💎 低估值高成长', color: 'text-cyan border-cyan/20 bg-cyan/5' },
    { id: 'dividend', label: '💰 高股息红利', color: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' },
    { id: 'ai_hot', label: '🤖 AI 概念龙头', color: 'text-violet border-violet/20 bg-violet/5' },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Left Sidebar: Filter Categories */}
      <FilterSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filters={FILTERS}
        onFilterChange={toggleFilter}
        onReset={() => setActiveFilters({})}
        onSave={() => alert('保存策略功能开发中...')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
        {/* Top Bar: AI Search & Presets */}
        <div className="p-6 pb-2 space-y-4">
          <AISearchBar
            value={naturalLanguageQuery}
            onChange={setNaturalLanguageQuery}
            onSearch={() => console.log('AI Search:', naturalLanguageQuery)}
          />

          <StrategyChips
            strategies={strategies}
            onStrategyClick={applyStrategy}
          />
        </div>

        {/* Results Table */}
        <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
          <ResultsHeader
            resultCount={filteredStocks.length}
            onSettingsClick={() => alert('设置功能开发中...')}
            onExportClick={() => alert('导出功能开发中...')}
          />

          <div className="flex-1 glass-panel rounded-xl border border-border overflow-hidden flex flex-col">
            <StockTable stocks={filteredStocks} />
            
            <TablePagination
              currentPage={currentPage}
              totalItems={filteredStocks.length}
              pageSize={pageSize}
              onPrevious={() => setCurrentPage(p => Math.max(1, p - 1))}
              onNext={() => setCurrentPage(p => p + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketList;
