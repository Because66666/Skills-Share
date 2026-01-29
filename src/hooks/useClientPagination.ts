import { useState, useEffect, useMemo } from 'react';
import { PaginationProps } from '@/components/molecules/Pagination';

export function useClientPagination<T>(data: T[], defaultPageSize = 10) {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Reset to first page when data length changes (e.g. filtering)
  useEffect(() => {
    setCurrent(1);
  }, [data.length]);

  const currentData = useMemo(() => {
    const start = (current - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, current, pageSize]);

  const paginationProps: PaginationProps = {
    current,
    pageSize,
    total: data.length,
    onChange: setCurrent,
    onPageSizeChange: (size) => {
      setPageSize(size);
      setCurrent(1); // Reset to first page when page size changes
    },
    pageSizeOptions: [10, 20, 50, 100],
  };

  return {
    currentData,
    paginationProps,
  };
}
