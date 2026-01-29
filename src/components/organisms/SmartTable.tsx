import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Table, Column } from '@/components/data-display/Table';
import { Pagination } from '@/components/molecules/Pagination';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SmartTableRef {
  reload: () => void;
}

export interface SmartTableProps<T> {
  columns: Column<T>[];
  request: (params: { current: number; pageSize: number; [key: string]: any }) => Promise<{
    data: T[];
    total: number;
    success?: boolean;
  }>;
  rowKey?: string;
  title?: React.ReactNode;
  toolBarRender?: () => React.ReactNode;
  searchFormRender?: (props: { search: (params: any) => void }) => React.ReactNode;
  defaultPageSize?: number;
  className?: string;
}

export const SmartTable = forwardRef<SmartTableRef, SmartTableProps<any>>((props, ref) => {
  const {
    columns,
    request,
    rowKey = 'id',
    title,
    toolBarRender,
    searchFormRender,
    defaultPageSize = 10,
    className,
  } = props;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request({
        current,
        pageSize,
        ...searchParams,
      });
      
      if (response.success !== false) {
        setData(response.data);
        setTotal(response.total);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [current, pageSize, request, searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useImperativeHandle(ref, () => ({
    reload: () => fetchData(),
  }));

  const handleSearch = (params: any) => {
    setSearchParams(params);
    setCurrent(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    setCurrent(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrent(1); // Reset to first page when page size changes
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Search Form Area */}
      {searchFormRender && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
          {searchFormRender({ search: handleSearch })}
        </div>
      )}

      {/* Table Area */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
        {/* Toolbar */}
        {(title || toolBarRender) && (
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
            {title && <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>}
            <div className="flex items-center gap-2">
              {toolBarRender?.()}
              <button
                onClick={fetchData}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative">
           <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey={rowKey}
            className="border-none"
          />
          
          {error && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center">
              <div className="text-red-500 text-sm font-medium">{error}</div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <Pagination
            current={current}
            total={total}
            pageSize={pageSize}
            onChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </div>
      </div>
    </div>
  );
});

SmartTable.displayName = 'SmartTable';
