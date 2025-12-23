import React from 'react';
import { Icons } from '../Icons';

type FilterCategory = 'quote' | 'money' | 'fundamental' | 'technical' | 'sector' | 'risk' | 'ai';

interface FilterCategoryButtonProps {
  id: FilterCategory;
  label: string;
  icon: any;
  isActive: boolean;
  onClick: () => void;
}

const FilterCategoryButton: React.FC<FilterCategoryButtonProps> = ({
  id,
  label,
  icon: Icon,
  isActive,
  onClick
}) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors
        ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-text-muted hover:bg-white/5 hover:text-white'}
      `}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <Icons.ArrowRight className={`w-3 h-3 transition-transform ${isActive ? 'rotate-90' : ''}`} />
    </button>
  );
};

export default FilterCategoryButton;
