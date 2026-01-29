import React from 'react';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Select } from '@/components/molecules/Select';

export interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
  showTotal?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize = 20,
  onChange,
  onPageSizeChange,
  pageSizeOptions = [20, 50, 100],
  className,
  showTotal = true,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  // If no data, render nothing or just total? 
  // Let's at least render the total and page size switcher even if 0 pages to keep layout stable
  // But original code returned null if totalPages <= 1. 
  // Requirement says "default 20 items per page, max switch to 100".
  // If total is 0, totalPages is 0. 
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== current) {
      onChange?.(page);
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= 0) return null;
    
    const pages = [];
    const showMax = 5;

    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      
      if (current > 2 && current < totalPages - 1) {
        pages.push(current - 1);
        pages.push(current);
        pages.push(current + 1);
      } else if (current <= 2) {
        pages.push(2);
        pages.push(3);
      } else {
        pages.push(totalPages - 2);
        pages.push(totalPages - 1);
      }

      if (current < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    const uniquePages = Array.from(new Set(pages));

    return uniquePages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
            <MoreHorizontal className="w-4 h-4" />
          </span>
        );
      }
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page as number)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
            current === page
              ? "bg-orange-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4 w-full", className)}>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        {showTotal && <span>共 {total} 条</span>}
        {onPageSizeChange && (
          <div className="w-24">
            <Select
              value={pageSize}
              onChange={(val) => onPageSizeChange(Number(val))}
              options={pageSizeOptions.map(opt => ({ label: `${opt} 条/页`, value: opt }))}
              className="w-full"
              placement="auto"
            />
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(current - 1)}
            disabled={current === 1}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {renderPageNumbers()}

          <button
            onClick={() => handlePageChange(current + 1)}
            disabled={current === totalPages}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
