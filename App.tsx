
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StockDetail from './components/StockDetail';
import AILab from './components/AILab';
import AlphaLab from './components/AlphaLab';
import AlphaEngine from './components/AlphaEngine';
import SentimentLab from './components/SentimentLab';
import SentimentStrategyLab from './components/SentimentStrategyLab';
import NewsLab from './components/NewsLab';
import Settings from './components/Settings';
import MarketList from './components/MarketList';
import StrategyBacktest from './components/StrategyBacktest';
import FundsManagement from './components/FundsManagement';
import TradingHistory from './components/TradingHistory';
import NotificationsPage from './components/NotificationsPage';
import TradeLedger from './components/TradeLedger';
import XuanxueLab from './components/XuanxueLab';
import CulturalProjection from './components/CulturalProjection';
import { Page } from './types';

function App() {
  const [activePage, setPage] = useState<Page>(Page.DASHBOARD);

  const renderContent = () => {
    switch (activePage) {
      case Page.DASHBOARD:
        return <Dashboard />;
      case Page.MARKET:
        return <MarketList />;
      case Page.TRADE:
        return <StockDetail />;
      case Page.TRADE_LEDGER:
        return <TradeLedger />;
      case Page.STRATEGY:
        return <StrategyBacktest />;
      case Page.ALPHA_LAB:
        return <AlphaLab />;
      case Page.ALPHA_ENGINE:
        return <AlphaEngine />;
      case Page.XUANXUE_LAB:
        return <XuanxueLab />;
      case Page.CULTURAL_PROJECTION:
        return <CulturalProjection />;
      case Page.SENTIMENT_LAB:
        return <SentimentLab />;
      case Page.SENTIMENT_STRATEGY:
        return <SentimentStrategyLab />;
      case Page.NEWS_LAB:
        return <NewsLab />;
      case Page.AI_LAB:
        return <AILab />;
      case Page.SETTINGS:
        return <Settings />;
      case Page.FUNDS:
        return <FundsManagement />;
      case Page.BILLING:
        return <TradingHistory />;
      case Page.NOTIFICATIONS:
        return <NotificationsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary/30">
      <Sidebar activePage={activePage} setPage={setPage} />
      
      <div className="ml-20 lg:ml-64 transition-all duration-300">
        <Header setPage={setPage} />
        <main className="animate-in fade-in duration-300">
          {renderContent()}
        </main>
      </div>
      
      {/* Global decorative gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}

export default App;
