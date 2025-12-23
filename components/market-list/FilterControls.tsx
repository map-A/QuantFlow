import React from 'react';

interface FilterCriteria {
  id: string;
  label: string;
  type: 'range' | 'select' | 'boolean' | 'multi-select';
  options?: string[];
  unit?: string;
}

interface FilterControlsProps {
  filters: FilterCriteria[];
  onFilterChange: (key: string, value: any) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="pl-4 pr-2 py-2 space-y-4 bg-background/50 rounded-b-lg mb-2 animate-in slide-in-from-top-2 border-l-2 border-primary/20 ml-2">
      {filters.map(filter => (
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
                onChange={(e) => onFilterChange(`${filter.id}Min`, e.target.value)}
                className="w-full bg-background border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary" 
              />
              <span className="text-text-muted text-xs">-</span>
              <input 
                type="number" 
                placeholder="Max"
                onChange={(e) => onFilterChange(`${filter.id}Max`, e.target.value)}
                className="w-full bg-background border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary" 
              />
            </div>
          )}
          
          {filter.type === 'select' && (
            <select 
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
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
                onChange={(e) => onFilterChange(filter.id, e.target.checked)}
                className="accent-primary"
              />
              <span className="text-xs text-text-muted">启用</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterControls;
