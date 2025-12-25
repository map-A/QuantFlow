import React, { useState, useEffect } from 'react';
import {
  NewsHeader,
  NewsFeed,
  SemanticAnalysis,
  ImpactScope,
  MarketReaction,
  QuantSignals,
  AIInsight,
  NewsStatusBar,
  NewsFeedItem,
  MarketMood,
  ReactionDataPoint,
} from './news-lab';

// Mock reaction data - 这个保留因为是图表数据
const MOCK_REACTION_DATA: ReactionDataPoint[] = Array.from({ length: 40 }, (_, i) => ({
  time: i,
  price: 100 + (i > 20 ? (i - 20) * 0.8 : 0) + Math.random() * 0.5,
  volume: Math.random() * 20 + (i === 21 ? 150 : 0),
}));

const NewsLab: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsFeedItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsFeedItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsFeedItem | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeSource, setActiveSource] = useState('ALL'); 
  const [showNewsDetail, setShowNewsDetail] = useState(false);
  const [marketMood] = useState<MarketMood>({
    mood: '亢奋',
    index: 72.4,
    trend: 'up'
  });
  const [isConnected, setIsConnected] = useState(false);
  const [newsSources, setNewsSources] = useState<string[]>(['ALL']);

  // 从API新闻转换为前端格式
  const transformNewsItem = (item: any): NewsFeedItem => {
    // 提取分类标签
    const tags: string[] = [];
    const content = item.content || '';
    const rawTitle = item.title || '';
    
    // 如果标题为空，从内容中截取前50字符作为标题
    const title = rawTitle.trim() || (content.substring(0, 50) + (content.length > 50 ? '...' : ''));
    
    // 简单的关键词标签提取
    const fullText = (title + ' ' + content).toLowerCase();
    
    const keywordMap: Record<string, string[]> = {
      '政策': ['政策', '政府', '央行', '监管', '法规'],
      '房地产': ['房地产', '地产', '房价', '楼市'],
      '宏观': ['宏观', '经济', 'gdp', 'cpi', 'ppi'],
      '财报': ['财报', '业绩', '营收', 'q1', 'q2', 'q3', 'q4'],
      '个股': ['个股', '股票', '涨停', '跌停'],
      '资金': ['资金', '流入', '流出', '北向', '南向'],
      'AI': ['ai', '人工智能', 'chatgpt', '大模型'],
      '白酒': ['白酒', '茅台', '五粮液', '泸州'],
      '半导体': ['半导体', '芯片', '集成电路', 'ic'],
      '美股': ['美联储', '美股', '纳斯达克', '标普'],
    };
    
    for (const [tag, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(kw => fullText.includes(kw))) {
        tags.push(tag);
      }
    }
    
    // 如果没有标签，根据来源添加默认标签
    if (tags.length === 0) {
      const financialSources = ['财联社', '华尔街见闻', '金十数据', '东方财富', '新浪财经'];
      if (financialSources.some(src => item.source.includes(src))) {
        tags.push('市场');
      } else {
        tags.push('资讯');
      }
    }

    // 确定来源等级 - 基于来源质量
    const topSources = ['财联社', '华尔街见闻', '金十数据', '新浪财经', '彭博', '路透'];
    const sourceLevel = topSources.some(src => item.source === src) ? 'A' : 'B';
    
    return {
      id: item.id,
      time: new Date(item.published_at).toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'}),
      title: title,
      content: content,
      source: item.source,
      author: item.author,
      sourceLevel: sourceLevel,
      sentiment: item.sentiment === 'positive' ? 'positive' : item.sentiment === 'negative' ? 'negative' : 'neutral',
      strength: Math.round((item.sentiment_score || 0) * 100),
      uncertainty: Math.floor(Math.random() * 30), // 暂时使用随机值
      tags: tags,
      isBreaking: false, // 可以基于时间判断是否是breaking news
    };
  };

  // 获取新闻来源列表
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/news/sources');
        const data = await response.json();
        
        if (data.code === 200 && data.data && data.data.sources) {
          const sources = data.data.sources.map((s: any) => s.source);
          setNewsSources(['ALL', ...sources]);
          console.log('✅ Loaded', sources.length, 'news sources:', sources);
        }
      } catch (err) {
        console.error("❌ Failed to fetch news sources:", err);
      }
    };

    fetchSources();
  }, []);

  // Fetch initial news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 根据选中的来源筛选
        const sourceParam = activeSource === 'ALL' ? '' : `&source=${encodeURIComponent(activeSource)}`;
        const response = await fetch(`http://localhost:3000/api/v1/news?limit=200${sourceParam}`);
        const data = await response.json();
        
        if (data.code === 200 && data.data && data.data.items && data.data.items.length > 0) {
          const mapped = data.data.items.map(transformNewsItem).filter((item: NewsFeedItem) => item.title);
          
          if (mapped.length > 0) {
            setNewsList(mapped);
            setSelectedNews(mapped[0]);
            console.log('✅ Loaded', mapped.length, 'real news items from', activeSource);
          }
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
        // 保持使用 mock 数据
      }
    };

    fetchNews();
    
    // 每30秒刷新一次新闻
    const interval = setInterval(fetchNews, 30000);
    
    return () => clearInterval(interval);
  }, [activeSource]); // 当来源改变时重新获取

  // WebSocket 实时连接
  useEffect(() => {
    let ws: WebSocket | null = null;
    
    const connectWebSocket = () => {
      try {
        ws = new WebSocket('ws://localhost:3000/api/v1/ws/news');
        
        ws.onopen = () => {
          console.log('✅ WebSocket connected');
          setIsConnected(true);
        };
        
        ws.onmessage = (event) => {
          try {
            const newsData = JSON.parse(event.data);
            console.log('📰 New news received:', newsData);
            
            // 将新闻添加到列表顶部
            const newItem = transformNewsItem(newsData);
            if (newItem.title) {
              setNewsList(prev => [newItem, ...prev].slice(0, 50)); // 保持最多50条
            }
          } catch (err) {
            console.error('Failed to parse WebSocket message:', err);
          }
        };
        
        ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
          setIsConnected(false);
        };
        
        ws.onclose = () => {
          console.log('🔌 WebSocket disconnected, reconnecting in 5s...');
          setIsConnected(false);
          setTimeout(connectWebSocket, 5000);
        };
      } catch (err) {
        console.error('Failed to create WebSocket:', err);
      }
    };
    
    connectWebSocket();
    
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // 新增：筛选逻辑
  useEffect(() => {
    let filtered = newsList;
    
    // 按来源筛选
    if (activeSource !== 'ALL') {
      filtered = filtered.filter(news => news.source === activeSource);
    }
    
    // 按分类筛选（保留原有逻辑）
    if (activeFilter !== 'ALL') {
      filtered = filtered.filter(news => {
        switch (activeFilter) {
          case 'POLICY': return news.tags.includes('政策');
          case 'EARNINGS': return news.tags.includes('财报');
          case 'MACRO': return news.tags.includes('宏观');
          case 'RISK': return news.sentiment === 'negative';
          default: return true;
        }
      });
    }
    
    setFilteredNews(filtered);
    
    // 如果当前选中的新闻不在筛选结果中，选择第一条
    if (filtered.length > 0 && (!selectedNews || !filtered.find(n => n.id === selectedNews.id))) {
      setSelectedNews(filtered[0]);
    }
  }, [newsList, activeSource, activeFilter, selectedNews]);

  // 新增：处理新闻点击
  const handleNewsClick = (news: NewsFeedItem) => {
    setSelectedNews(news);
    setShowNewsDetail(true);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0D1117] p-6 gap-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1F6FEB 1px, transparent 1px), linear-gradient(90deg, #1F6FEB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Header */}
      <NewsHeader
        marketMood={marketMood}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 relative z-10">
        
        {/* LEFT: News Feed */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
          {/* 新增：平台筛选 */}
          <div className="glass-panel rounded-xl border border-border/50 p-3">
            <div className="text-[10px] text-text-muted mb-2 uppercase">Filter by Source</div>
            <div className="flex flex-wrap gap-1">
              {newsSources.map(source => (
                <button
                  key={source}
                  onClick={() => setActiveSource(source)}
                  className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
                    activeSource === source 
                      ? 'bg-accent text-white' 
                      : 'bg-bg-hover text-text-muted hover:text-text-primary'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
          
          {/* News Feed */}
          <NewsFeed
            news={filteredNews}
            selectedNews={selectedNews}
            onSelectNews={handleNewsClick}
          />
        </div>

        {/* CENTER: Intelligence Decomposition */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 overflow-hidden">
          <div className="grid grid-cols-12 gap-6 shrink-0">
            <SemanticAnalysis selectedNews={selectedNews} />
            <ImpactScope selectedNews={selectedNews} />
          </div>
          <MarketReaction data={MOCK_REACTION_DATA} />
        </div>

        {/* RIGHT: Quant Signals & AI */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          <QuantSignals />
          <AIInsight />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <NewsStatusBar newsCount={newsList.length} isConnected={isConnected} />
      
      {/* 新增：新闻详情弹窗 */}
      {showNewsDetail && selectedNews && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowNewsDetail(false)}
        >
          <div 
            className="glass-panel rounded-2xl border border-border/50 max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-border/30">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono text-text-muted">{selectedNews.time}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                    selectedNews.sourceLevel === 'A' ? 'bg-danger/20 text-danger' : 'bg-surface border border-border text-text-muted'
                  }`}>
                    LV {selectedNews.sourceLevel}
                  </span>
                  <span className="text-[10px] text-text-muted">{selectedNews.source}</span>
                  {selectedNews.author && (
                    <>
                      <span className="text-[10px] text-text-muted/50">•</span>
                      <span className="text-[10px] text-text-muted">作者: {selectedNews.author}</span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setShowNewsDetail(false)}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{selectedNews.title}</h2>
              <div className="flex flex-wrap gap-2">
                {selectedNews.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-background border border-border/50 rounded text-[10px] text-text-muted">
                    {tag}
                  </span>
                ))}
                <span className={`px-2 py-1 rounded text-[10px] font-medium ${
                  selectedNews.sentiment === 'positive' ? 'bg-success/20 text-success' :
                  selectedNews.sentiment === 'negative' ? 'bg-danger/20 text-danger' :
                  'bg-surface text-text-muted'
                }`}>
                  {selectedNews.sentiment === 'positive' ? '利好' : selectedNews.sentiment === 'negative' ? '利空' : '中性'}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-text-main leading-relaxed whitespace-pre-wrap">
                  {selectedNews.content || '暂无详细内容'}
                </p>
              </div>
              
              {/* Metrics */}
              <div className="mt-6 pt-6 border-t border-border/30 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-text-muted mb-1">情感强度</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-cyan"
                        style={{ width: `${selectedNews.strength}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-cyan">{selectedNews.strength}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-text-muted mb-1">不确定性</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-red-500"
                        style={{ width: `${selectedNews.uncertainty}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-yellow-400">{selectedNews.uncertainty}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsLab;
