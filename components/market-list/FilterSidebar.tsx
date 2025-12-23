import React from 'react';
import { Icons } from '../Icons';
import FilterCategoryButton from './FilterCategoryButton';
import FilterControls from './FilterControls';

type FilterCategory = 'quote' | 'money' | 'fundamental' | 'technical' | 'sector' | 'risk' | 'ai';

interface FilterCriteria {
  id: string;
  label: string;
  category: FilterCategory;
  type: 'range' | 'select' | 'boolean' | 'multi-select';
  options?: string[];
  unit?: string;
}

interface FilterSidebarProps {
  activeTab: FilterCategory;
  setActiveTab: (tab: FilterCategory) => void;
  filters: FilterCriteria[];
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
  onSave: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  activeTab,
  setActiveTab,
  filters,
  onFilterChange,
  onReset,
  onSave
}) => {
  const categories: {id: FilterCategory, label: string, icon: any}[] = [
    { id: 'quote', label: '行情与盘口', icon: Icons.Market },
    { id: 'money', label: '资金博弈', icon: Icons.Wallet },
    { id: 'fundamental', label: '财务估值', icon: Icons.File },
    { id: 'technical', label: '技术形态', icon: Icons.Trade },
    { id: 'sector', label: '板块与事件', icon: Icons.Layers },
    { id: 'risk', label: '风控与情绪', icon: Icons.Alert },
    { id: 'ai', label: 'AI 深度智选', icon: Icons.AI },
  ];

  return (
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
            <FilterCategoryButton
              id={cat.id}
              label={cat.label}
              icon={cat.icon}
              isActive={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
            />
            
            {/* Expanded Filter Controls */}
            {activeTab === cat.id && (
              <FilterControls
                filters={filters.filter(f => f.category === cat.id)}
                onFilterChange={onFilterChange}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border flex gap-2">
        <button 
          onClick={onReset} 
          className="flex-1 py-2 text-xs text-text-muted hover:text-white border border-border rounded-lg transition-colors"
        >
          重置
        </button>
        <button 
          onClick={onSave}
          className="flex-1 py-2 text-xs bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          保存策略
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
