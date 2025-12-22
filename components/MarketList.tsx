import React, { useState } from 'react';
import { MOCK_STOCKS } from '../constants';
import { Icons } from './Icons';
import { Stock } from '../types';

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

// Comprehensive Filter List based on User Request
const FILTERS: FilterCriteria[] = [
    // 1. Basic Quotes (Quote)
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

    // 2. Money Flow (Money)
    { id: 'mainNetInflow', label: '主力净流入', category: 'money', type: 'range', unit: '万' },
    { id: 'superLargeOrderInflow', label: '超大单净流入', category: 'money', type: 'range', unit: '万' },
    { id: 'northNetInflow', label: '北向资金净买入', category: 'money', type: 'range', unit: '万' },
    { id: 'institutionBuy', label: '机构席位买入', category: 'money', type: 'range', unit: '万' },
    { id: 'dragonTigerList', label: '上榜龙虎榜', category: 'money', type: 'boolean' },

    // 3. Fundamentals (Fundamental)
    { id: 'pe', label: '市盈率 (PE-TTM)', category: 'fundamental', type: 'range' },
    { id: 'pb', label: '市净率 (PB)', category: 'fundamental', type: 'range' },
    { id: 'peg', label: 'PEG', category: 'fundamental', type: 'range' },
    { id: 'dividendYield', label: '股息率', category: 'fundamental', type: 'range', unit: '%' },
    { id: 'roe', label: 'ROE (净资产收益率)', category: 'fundamental', type: 'range', unit: '%' },
    { id: 'revenueGrowth', label: '营收增长率', category: 'fundamental', type: 'range', unit: '%' },
    { id: 'netProfitGrowth', label: '净利润增长率', category: 'fundamental', type: 'range', unit: '%' },
    { id: 'grossMargin', label: '毛利率', category: 'fundamental', type: 'range', unit: '%' },
    { id: 'debtToAsset', label: '资产负债率', category: 'fundamental', type: 'range', unit: '%' },

    // 4. Technicals (Technical)
    { id: 'maAlignment', label: '均线形态', category: 'technical', type: 'select', options: ['多头排列', '空头排列', '纠缠震荡'] },
    { id: 'maBreakout', label: '突破均线', category: 'technical', type: 'select', options: ['突破MA20', '突破MA60', '站上年线'] },
    { id: 'macdStatus', label: 'MACD 信号', category: 'technical', type: 'select', options: ['金叉', '死叉', '顶背离', '底背离'] },
    { id: 'kdjStatus', label: 'KDJ 信号', category: 'technical', type: 'select', options: ['金叉', '死叉'] },
    { id: 'rsi', label: 'RSI (14)', category: 'technical', type: 'range' },
    { id: 'pattern', label: 'K线形态', category: 'technical', type: 'select', options: ['锤子线', '吞没形态', '早晨之星', '三连阳'] },

    // 5. Sectors & Events (Sector)
    { id: 'sector', label: '申万一级行业', category: 'sector', type: 'select', options: ['电子', '计算机', '通信', '医药生物', '电力设备', '食品饮料', '非银金融'] },
    { id: 'concept', label: '热门概念', category: 'sector', type: 'select', options: ['中特估', 'AI算力', '华为产业链', '高股息', '新能源车'] },
    { id: 'event', label: '事件驱动', category: 'sector', type: 'select', options: ['业绩预增', '大额订单', '高管增持', '分红实施'] },
    
    // 6. Risk Control (Risk)
    { id: 'maxDrawdown', label: '最大回撤(30日)', category: 'risk', type: 'range', unit: '%' },
    { id: 'volatility', label: '年化波动率', category: 'risk', type: 'range', unit: '%' },
    { id: 'beta', label: 'Beta 系数', category: 'risk', type: 'range' },
    { id: 'isST', label: '排除 ST/*ST', category: 'risk', type: 'boolean' },

    // 7. AI Analysis (AI)
    { id: 'aiScore', label: 'AI 综合评分', category: 'ai', type: 'range', unit: '分' },
    { id: 'aiSentiment', label: '舆情情感分', category: 'ai', type: 'range', unit: '分' },
    { id: 'aiTrend', label: 'AI 趋势预测', category: 'ai', type: 'select', options: ['看涨', '看跌', '震荡'] },
    { id: 'aiRisk', label: 'AI 风险提示', category: 'ai', type: 'boolean' },
];

const MarketList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterCategory>('quote');
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  
  const categories: {id: FilterCategory, label: string, icon: any}[] = [
      { id: 'quote', label: '行情与盘口', icon: Icons.Market },
      { id: 'money', label: '资金博弈', icon: Icons.Wallet },
      { id: 'fundamental', label: '财务估值', icon: Icons.File },
      { id: 'technical', label: '技术形态', icon: Icons.Trade },
      { id: 'sector', label: '板块与事件', icon: Icons.Layers },
      { id: 'risk', label: '风控与情绪', icon: Icons.Alert },
      { id: 'ai', label: 'AI 深度智选', icon: Icons.AI },
  ];

  // Mock Filtering Logic
  const filteredStocks = MOCK_STOCKS.filter(stock => {
      // 1. Natural Language Search (Mock)
      if (naturalLanguageQuery) {
          if (naturalLanguageQuery.includes('白酒') && !stock.concepts.includes('白酒')) return false;
          if (naturalLanguageQuery.includes('红') && stock.change < 0) return false;
          if (naturalLanguageQuery.includes('AI') && !stock.concepts.includes('人工智能')) return false;
      }

      // 2. Category Filters (Mock Implementation for key fields)
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

  const applyStrategy = (strategy: string) => {
      setActiveFilters({}); // Reset
      setNaturalLanguageQuery('');
      if (strategy === 'north_buy') {
          alert("已应用策略：北向资金大幅净买入 > 5000万");
      } else if (strategy === 'value_growth') {
          setActiveFilters({ peMax: 20, roeMin: 15 });
      } else if (strategy === 'limit_up_board') {
          setActiveFilters({ limitStatus: '涨停' });
      }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Left Sidebar: Filter Categories */}
      <div className="w-72 bg-surface border-r border-border flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-border">
              <h2 className="font-bold flex items-center gap-2">
                  <Icons.Filter className="w-5 h-5 text-primary" />
                  全维选股器
              </h2>
          </div>
          
          <div className="flex-1 p-2 space-y-1">
              {categories.map(cat => (
                  <div key={cat.id}>
                      <button 
                        onClick={() => setActiveTab(cat.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors
                            ${activeTab === cat.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-text-muted hover:bg-white/5 hover:text-white'}
                        `}
                      >
                          <div className="flex items-center gap-3">
                            <cat.icon className="w-4 h-4" />
                            {cat.label}
                          </div>
                          <Icons.ArrowRight className={`w-3 h-3 transition-transform ${activeTab === cat.id ? 'rotate-90' : ''}`} />
                      </button>
                      
                      {/* Expanded Filter Controls */}
                      {activeTab === cat.id && (
                          <div className="pl-4 pr-2 py-2 space-y-4 bg-background/50 rounded-b-lg mb-2 animate-in slide-in-from-top-2 border-l-2 border-primary/20 ml-2">
                              {FILTERS.filter(f => f.category === cat.id).map(filter => (
                                  <div key={filter.id} className="space-y-1.5">
                                      <label className="text-xs text-text-muted flex justify-between">
                                          {filter.label}
                                          {filter.unit && <span className="opacity-50">({filter.unit})</span>}
                                      </label>
                                      {filter.type === 'range' && (
                                          <div className="flex items-center gap-2">
                                              <input 
                                                type="number" 
                                                placeholder="Min"
                                                onChange={(e) => toggleFilter(`${filter.id}Min`, e.target.value)}
                                                className="w-full bg-background border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary" 
                                              />
                                              <span className="text-text-muted text-xs">-</span>
                                              <input 
                                                type="number" 
                                                placeholder="Max"
                                                onChange={(e) => toggleFilter(`${filter.id}Max`, e.target.value)}
                                                className="w-full bg-background border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary" 
                                              />
                                          </div>
                                      )}
                                      {filter.type === 'select' && (
                                          <select 
                                            onChange={(e) => toggleFilter(filter.id, e.target.value)}
                                            className="w-full bg-background border border-border rounded px-2 py-1.5 text-xs text-text-main outline-none focus:border-primary"
                                          >
                                              <option>全部</option>
                                              {filter.options?.map(opt => <option key={opt}>{opt}</option>)}
                                          </select>
                                      )}
                                      {filter.type === 'boolean' && (
                                          <div className="flex items-center gap-2">
                                              <input 
                                                type="checkbox"
                                                onChange={(e) => toggleFilter(filter.id, e.target.checked)}
                                                className="accent-primary"
                                              />
                                              <span className="text-xs text-text-muted">启用</span>
                                          </div>
                                      )}
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              ))}
          </div>
          
          <div className="p-4 border-t border-border flex gap-2">
              <button onClick={() => setActiveFilters({})} className="flex-1 py-2 text-xs text-text-muted hover:text-white border border-border rounded-lg transition-colors">
                  重置
              </button>
              <button className="flex-1 py-2 text-xs bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  保存策略
              </button>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
          {/* Top Bar: AI Search & Presets */}
          <div className="p-6 pb-2 space-y-4">
              {/* Natural Language Input */}
              <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet/20 to-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-50"></div>
                  <div className="relative flex items-center bg-surface border border-border rounded-xl p-1 shadow-2xl">
                      <div className="pl-3 pr-2 text-violet">
                          <Icons.AI className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        value={naturalLanguageQuery}
                        onChange={(e) => setNaturalLanguageQuery(e.target.value)}
                        placeholder="输入自然语言筛选，例如：'找出最近主力资金大幅流入且市盈率低于20的白酒股'..." 
                        className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-white placeholder-text-muted/70"
                      />
                      <button className="px-4 py-1.5 bg-violet/10 text-violet border border-violet/20 rounded-lg text-xs font-medium hover:bg-violet/20 transition-all">
                          AI 深度筛选
                      </button>
                  </div>
              </div>

              {/* Quick Strategy Chips */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  <span className="text-xs font-bold text-text-muted whitespace-nowrap">热门策略:</span>
                  {[
                      { id: 'limit_up_board', label: '🔥 涨停炸板复盘', color: 'text-danger border-danger/20 bg-danger/5' },
                      { id: 'north_buy', label: '🚀 北向资金扫货', color: 'text-primary border-primary/20 bg-primary/5' },
                      { id: 'value_growth', label: '💎 低估值高成长', color: 'text-cyan border-cyan/20 bg-cyan/5' },
                      { id: 'dividend', label: '💰 高股息红利', color: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' },
                      { id: 'ai_hot', label: '🤖 AI 概念龙头', color: 'text-violet border-violet/20 bg-violet/5' },
                  ].map(strat => (
                      <button 
                        key={strat.id}
                        onClick={() => applyStrategy(strat.id)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-transform hover:scale-105 ${strat.color}`}
                      >
                          {strat.label}
                      </button>
                  ))}
              </div>
          </div>

          {/* Results Table */}
          <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      筛选结果 
                      <span className="px-1.5 py-0.5 bg-surface rounded text-[10px] text-text-muted border border-border">{filteredStocks.length}</span>
                  </h3>
                  <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-surface rounded text-text-muted hover:text-white">
                          <Icons.Sliders className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-surface rounded text-text-muted hover:text-white">
                          <Icons.Download className="w-4 h-4" />
                      </button>
                  </div>
              </div>

              <div className="flex-1 glass-panel rounded-xl border border-border overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse min-w-[1400px]">
                          <thead className="sticky top-0 z-10 bg-surface/95 backdrop-blur shadow-sm">
                              <tr className="text-xs text-text-muted uppercase">
                                  <th className="p-4 font-medium sticky left-0 bg-surface/95 z-20 w-[100px] border-r border-border/50">代码</th>
                                  <th className="p-4 font-medium sticky left-[100px] bg-surface/95 z-20 w-[100px] border-r border-border/50">名称</th>
                                  <th className="p-4 font-medium text-right">最新价</th>
                                  <th className="p-4 font-medium text-right">涨跌幅</th>
                                  <th className="p-4 font-medium text-right">主力净流入</th>
                                  <th className="p-4 font-medium text-right">北向净流入</th>
                                  <th className="p-4 font-medium text-right">换手率</th>
                                  <th className="p-4 font-medium text-right">市盈率(TTM)</th>
                                  <th className="p-4 font-medium text-right">ROE</th>
                                  <th className="p-4 font-medium text-center">均线形态</th>
                                  <th className="p-4 font-medium text-center">AI 评分</th>
                                  <th className="p-4 font-medium">所属概念</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-border/50 text-sm">
                              {filteredStocks.map(stock => (
                                  <tr key={stock.symbol} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4 font-mono text-cyan sticky left-0 bg-[#161B22] group-hover:bg-[#1C2128] border-r border-border/50">
                                          {stock.symbol}
                                      </td>
                                      <td className="p-4 font-bold sticky left-[100px] bg-[#161B22] group-hover:bg-[#1C2128] border-r border-border/50 flex items-center gap-2">
                                          {stock.name}
                                          {stock.limitStatus === 'limitUp' && <span className="px-1 py-0.5 bg-success text-white text-[10px] rounded leading-none">涨停</span>}
                                      </td>
                                      <td className={`p-4 text-right font-mono ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                          ¥{stock.price.toFixed(2)}
                                      </td>
                                      <td className={`p-4 text-right font-mono font-bold ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                          {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                                      </td>
                                      <td className={`p-4 text-right font-mono ${stock.mainNetInflow > 0 ? 'text-success' : 'text-danger'}`}>
                                          {stock.mainNetInflow > 0 ? '+' : ''}{(stock.mainNetInflow / 10000).toFixed(2)}亿
                                      </td>
                                      <td className={`p-4 text-right font-mono ${stock.northNetInflow > 0 ? 'text-success' : 'text-danger'}`}>
                                          {stock.northNetInflow > 0 ? '+' : ''}{(stock.northNetInflow / 10000).toFixed(2)}亿
                                      </td>
                                      <td className="p-4 text-right text-text-muted">
                                          {stock.turnoverRate}%
                                      </td>
                                      <td className="p-4 text-right text-text-muted font-mono">
                                          {stock.pe}
                                      </td>
                                      <td className="p-4 text-right font-mono text-success">
                                          {stock.roe}%
                                      </td>
                                      <td className="p-4 text-center">
                                          <span className={`px-2 py-0.5 rounded text-[10px] 
                                              ${stock.maAlignment === 'long' ? 'bg-success/10 text-success' : stock.maAlignment === 'short' ? 'bg-danger/10 text-danger' : 'bg-yellow-500/10 text-yellow-500'}
                                          `}>
                                              {stock.maAlignment === 'long' ? '多头排列' : stock.maAlignment === 'short' ? '空头排列' : '纠缠震荡'}
                                          </span>
                                      </td>
                                      <td className="p-4 text-center">
                                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-violet/30 text-violet font-bold text-xs bg-violet/5">
                                              {stock.aiScore}
                                          </div>
                                      </td>
                                      <td className="p-4">
                                          <div className="flex gap-1 flex-wrap w-[180px]">
                                              {stock.concepts.map(c => (
                                                  <span key={c} className="px-1.5 py-0.5 bg-surface border border-border rounded text-[10px] text-text-muted whitespace-nowrap">
                                                      {c}
                                                  </span>
                                              ))}
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
                  {/* Pagination Footer */}
                  <div className="p-3 border-t border-border flex items-center justify-between bg-surface/50 text-xs text-text-muted">
                      <span>显示 1-{filteredStocks.length} 共 {filteredStocks.length} 条</span>
                      <div className="flex gap-2">
                          <button className="px-3 py-1 bg-background border border-border rounded hover:text-white disabled:opacity-50">上一页</button>
                          <button className="px-3 py-1 bg-background border border-border rounded hover:text-white">下一页</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default MarketList;