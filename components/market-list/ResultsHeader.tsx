import React from 'react';
import { Icons } from '../Icons';

interface ResultsHeaderProps {
  resultCount: number;
  onSettingsClick?: () => void;
  onExportClick?: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ 
  resultCount, 
  onSettingsClick, 
  onExportClick 
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        筛选结果 
        <span className="px-1.5 py-0.5 bg-surface rounded text-[10px] text-text-muted border border-border">
          {resultCount}
        </span>
      </h3>
      <div className="flex gap-2">
        {onSettingsClick && (
          <button 
            onClick={onSettingsClick}
            className="p-1.5 hover:bg-surface rounded text-text-muted hover:text-white"
          >
            <Icons.Sliders className="w-4 h-4" />
          </button>
        )}
        {onExportClick && (
          <button 
            onClick={onExportClick}
            className="p-1.5 hover:bg-surface rounded text-text-muted hover:text-white"
          >
            <Icons.Download className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultsHeader;
