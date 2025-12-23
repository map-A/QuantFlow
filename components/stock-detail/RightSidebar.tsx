import React, { useState } from 'react';
import { Icons } from '../Icons';
import { Stock } from '../../types';
import OrderBookPanel from './OrderBookPanel';
import TickStreamPanel from './TickStreamPanel';
import AIAnalysisPanel from './AIAnalysisPanel';
import FundamentalsPanel from './FundamentalsPanel';

interface RightSidebarProps {
  stock: Stock;
  aiAnalysis: string;
}

type ActiveTab = 'quote' | 'ai' | 'fund';

const RightSidebar: React.FC<RightSidebarProps> = ({ stock, aiAnalysis }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quote');

  const tabs: { id: ActiveTab; label: string; icon: any }[] = [
    { id: 'quote', label: '盘口', icon: Icons.Market },
    { id: 'ai', label: 'AI 决策', icon: Icons.AI },
    { id: 'fund', label: 'F10', icon: Icons.File },
  ];

  return (
    <div className="col-span-12 lg:col-span-3 bg-surface/30 flex flex-col overflow-hidden">
      {/* Tab Selector */}
      <div className="h-9 border-b border-border flex items-center px-1 gap-1 bg-background/20">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1 h-7 text-xs font-medium rounded transition-all
              ${activeTab === tab.id ? 'text-white border-b-2 border-primary bg-primary/5' : 'text-text-muted hover:text-white'}
            `}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {activeTab === 'quote' && (
          <div className="flex flex-col h-full">
            <OrderBookPanel stock={stock} />
            <TickStreamPanel stock={stock} />
          </div>
        )}

        {activeTab === 'ai' && <AIAnalysisPanel aiAnalysis={aiAnalysis} />}

        {activeTab === 'fund' && <FundamentalsPanel stock={stock} />}
      </div>
    </div>
  );
};

export default RightSidebar;
