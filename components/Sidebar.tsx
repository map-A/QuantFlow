
import React from 'react';
import { Icons } from './Icons';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setPage }) => {
  const menuItems = [
    { id: Page.DASHBOARD, label: '概览', icon: Icons.Dashboard },
    { id: Page.MARKET, label: '行情/筛选', icon: Icons.Market },
    { id: Page.TRADE, label: '个股交易', icon: Icons.Trade },
    { id: Page.TRADE_LEDGER, label: '执行日志', icon: Icons.History },
    { id: Page.STRATEGY, label: '策略回测', icon: Icons.Layers },
    { id: Page.ALPHA_LAB, label: '因子挖掘', icon: Icons.Terminal },
    { id: Page.ALPHA_ENGINE, label: '因子引擎', icon: Icons.Cpu },
    { id: Page.CULTURAL_PROJECTION, label: '文化窗口', icon: Icons.Compass },
    { id: Page.XUANXUE_LAB, label: '国学视角', icon: Icons.Crosshair },
    { id: Page.SENTIMENT_LAB, label: '情绪实验室', icon: Icons.Flame },
    { id: Page.SENTIMENT_STRATEGY, label: '情绪策略', icon: Icons.Sliders },
    { id: Page.NEWS_LAB, label: '新闻实验室', icon: Icons.News },
    { id: Page.AI_LAB, label: 'AI 实验室', icon: Icons.AI },
  ];

  return (
    <aside className="w-20 lg:w-64 h-screen bg-background border-r border-border flex flex-col fixed left-0 top-0 z-50 transition-all duration-300">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border">
        <div className="w-8 h-8 bg-gradient-to-tr from-primary to-cyan rounded-lg flex items-center justify-center shadow-glow-blue">
          <Icons.Activity className="text-white w-5 h-5" />
        </div>
        <span className="hidden lg:block ml-3 font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          QuantFlow
        </span>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`
                flex items-center p-3 rounded-lg transition-all duration-200 group shrink-0
                ${isActive 
                  ? 'bg-primary/10 text-cyan border border-primary/20 shadow-[0_0_15px_rgba(43,196,168,0.1)]' 
                  : 'text-text-muted hover:bg-surface hover:text-text-main'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan drop-shadow-[0_0_5px_rgba(43,196,168,0.8)]' : 'group-hover:text-white'}`} />
              <span className="hidden lg:block ml-3 font-medium text-sm whitespace-nowrap">{item.label}</span>
              {isActive && (
                <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#2BC4A8]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={() => setPage(Page.SETTINGS)}
          className={`flex items-center justify-center lg:justify-start p-2 w-full rounded-lg transition-colors
            ${activePage === Page.SETTINGS ? 'text-cyan bg-surface' : 'text-text-muted hover:text-white hover:bg-surface'}
          `}
        >
          <Icons.Settings className="w-5 h-5" />
          <span className="hidden lg:block ml-3 text-sm">设置</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
