import React from 'react';

interface TablePaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPrevious,
  onNext
}) => {
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="p-3 border-t border-border flex items-center justify-between bg-surface/50 text-xs text-text-muted">
      <span>显示 {startIndex}-{endIndex} 共 {totalItems} 条</span>
      <div className="flex gap-2">
        <button 
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-background border border-border rounded hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一页
        </button>
        <button 
          onClick={onNext}
          disabled={endIndex >= totalItems}
          className="px-3 py-1 bg-background border border-border rounded hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
