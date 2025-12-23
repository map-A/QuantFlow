import React, { useState } from 'react';
import { Icons } from './Icons';
import {
  SearchHero,
  AnalyzingLoader,
  SummaryCard,
  AnalysisCard,
  StockList,
  AIChat,
  PROMPT_TEMPLATES,
  RECOMMENDED_STOCKS,
  MOCK_PRICE_DATA,
  MOCK_FLOW_DATA,
  MOCK_NEWS,
  AnalysisMode,
  ChatMessage,
} from './ai-lab';

const AILab: React.FC = () => {
  const [mode, setMode] = useState<AnalysisMode>('initial');
  const [query, setQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setMode('analyzing');
    setTimeout(() => {
      setMode('result');
      setMessages([{ 
        role: 'model', 
        text: `已为您完成深度分析。根据模型运算，市场目前处于震荡上行阶段，主力资金在科技板块出现显著回流。您可以继续追问更多细节。` 
      }]);
    }, 2000);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user' as const, text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    
    setTimeout(async () => {
      const responseText = `针对 "${userMsg.text}"，从资金流向来看，近期北向资金持续净流入，且MACD在零轴上方金叉，表明多头力量正在增强。建议关注回调时的介入机会，止损位参考20日均线。`;
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    }, 1200);
  };

  // Initial Search View
  if (mode === 'initial') {
    return (
      <SearchHero
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        templates={PROMPT_TEMPLATES}
      />
    );
  }

  // Loading State
  if (mode === 'analyzing') {
    return <AnalyzingLoader query={query} />;
  }

  // Dashboard Result View
  return (
    <div className="h-[calc(100vh-4rem)] bg-[#0D1117] flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Search Bar */}
      <div className="h-16 border-b border-border bg-[#161B22]/80 backdrop-blur-md z-20 flex items-center px-6 gap-4 shrink-0">
        <div className="flex items-center gap-2 text-cyan font-bold cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setMode('initial')}>
          <Icons.Sparkles className="w-5 h-5" />
          <span className="tracking-tight">QuantFlow AI</span>
        </div>
        <div className="h-6 w-px bg-border/50 mx-2"></div>
        <div className="relative flex-1 max-w-2xl group">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-cyan transition-colors" />
          <input 
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
            className="w-full bg-[#0D1117] border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 outline-none text-white transition-all shadow-inner"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs font-mono text-text-muted flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            Live Data
          </span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* LEFT PANEL: Analysis */}
        <div className="flex-[7] overflow-y-auto custom-scrollbar p-6 border-r border-border/50">
          <div className="max-w-5xl mx-auto space-y-6">
            <SummaryCard />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnalysisCard
                data={MOCK_PRICE_DATA}
                title="技术面扫描"
                icon={Icons.Trade}
                color="violet"
                chartType="area"
                stats={[
                  { label: '趋势信号', value: '突破三角形上沿' },
                  { label: 'K线形态', value: '早晨之星 (日线)' }
                ]}
              />
              
              <AnalysisCard
                data={MOCK_FLOW_DATA}
                title="资金流向监控"
                icon={Icons.Wallet}
                color="cyan"
                chartType="bar"
              />
              
              <AnalysisCard
                data={[]}
                title="基本面透视"
                icon={Icons.File}
                color="yellow-500"
              />
              
              <AnalysisCard
                data={[]}
                title="舆情与新闻"
                icon={Icons.News}
                color="blue-500"
                news={MOCK_NEWS}
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Recommendations & Chat */}
        <div className="flex-[3] border-l border-border/50 flex flex-col bg-[#161B22]/30 backdrop-blur-md min-w-[320px]">
          <StockList stocks={RECOMMENDED_STOCKS} />
          <AIChat
            messages={messages}
            input={chatInput}
            onInputChange={setChatInput}
            onSend={handleSendChat}
          />
        </div>
      </div>
    </div>
  );
};

export default AILab;
