import React from 'react';
import { Icons } from '../Icons';

interface TabButtonProps {
  id: string;
  label: string;
  icon: any;
  active: string;
  onClick: (id: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon: Icon, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-6 py-3 text-xs font-bold border-b-2 transition-all hover:bg-white/5
      ${active === id ? 'border-primary text-white bg-white/5' : 'border-transparent text-text-muted'}
    `}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

interface ResultsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ResultsTabs: React.FC<ResultsTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-border bg-surface/30 sticky top-0 z-10">
      <TabButton 
        id="trades" 
        label="交易明细" 
        icon={Icons.List} 
        active={activeTab} 
        onClick={onTabChange} 
      />
      <TabButton 
        id="positions" 
        label="持仓分析" 
        icon={Icons.Pie} 
        active={activeTab} 
        onClick={onTabChange} 
      />
      <TabButton 
        id="stats" 
        label="统计详情" 
        icon={Icons.Market} 
        active={activeTab} 
        onClick={onTabChange} 
      />
      <TabButton 
        id="factors" 
        label="因子暴露" 
        icon={Icons.Layers} 
        active={activeTab} 
        onClick={onTabChange} 
      />
    </div>
  );
};

export default ResultsTabs;
