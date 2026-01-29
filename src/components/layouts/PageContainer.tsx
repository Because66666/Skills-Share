import React from 'react';
import { cn } from '@/utils/cn';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';

export interface PageContainerProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  breadcrumb?: { label: React.ReactNode; href?: string }[];
  className?: string;
  loading?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  extra,
  content,
  children,
  breadcrumb,
  className,
  loading,
}) => {
  return (
    <div className={cn('min-h-full flex flex-col gap-6', className)}>
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        {breadcrumb && (
          <Breadcrumb items={breadcrumb} />
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-500 text-sm">
                {subtitle}
              </p>
            )}
          </div>
          
          {extra && (
            <div className="flex items-center gap-3">
              {extra}
            </div>
          )}
        </div>

        {content && (
          <div className="text-sm text-gray-600">
            {content}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={cn('flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500', loading && 'opacity-50 pointer-events-none')}>
        {children}
      </div>
    </div>
  );
};
