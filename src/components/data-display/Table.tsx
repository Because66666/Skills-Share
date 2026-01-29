import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';
import { Empty } from './Empty';

export interface Column<T> {
  key?: string;
  dataIndex?: string;
  title: React.ReactNode;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  className?: string;
  onRowClick?: (record: T) => void;
}

export function Table<T extends Record<string, any>>({
  columns,
  dataSource,
  loading,
  rowKey = 'id',
  className,
  onRowClick,
}: TableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key || col.dataIndex || index}
                className={cn(
                  "py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700",
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right',
                  col.fixed === 'right' && "sticky right-0 z-20 bg-gray-50 dark:bg-gray-800 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.15)]",
                  col.fixed === 'left' && "sticky left-0 z-20 bg-gray-50 dark:bg-gray-800 shadow-[6px_0_10px_-4px_rgba(0,0,0,0.15)]"
                )}
                style={{ width: col.width }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center border-b border-gray-50 dark:border-gray-800">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
              </td>
            </tr>
          ) : dataSource.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-12 border-b border-gray-50 dark:border-gray-800">
                <Empty description="No data available" />
              </td>
            </tr>
          ) : (
            dataSource.map((record, index) => {
              const key = typeof rowKey === 'function' ? rowKey(record) : record[rowKey];
              return (
                <tr
                  key={key}
                  onClick={() => onRowClick?.(record)}
                  className={cn(
                    "group transition-colors",
                    onRowClick 
                      ? "cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/20" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  )}
                >
                  {columns.map((col) => {
                    const value = record[col.dataIndex || col.key || '']; // Support dataIndex
                    return (
                      <td
                        key={col.key || col.dataIndex || index}
                        className={cn(
                          "py-3 px-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap border-b border-gray-50 dark:border-gray-800",
                          col.align === 'center' && 'text-center',
                          col.align === 'right' && 'text-right',
                          col.fixed === 'right' && "sticky right-0 z-10 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.15)]",
                          col.fixed === 'left' && "sticky left-0 z-10 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50 shadow-[6px_0_10px_-4px_rgba(0,0,0,0.15)]"
                        )}
                      >
                        {col.render ? col.render(value, record, index) : value}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
