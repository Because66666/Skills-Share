import React from 'react';
import { cn } from '@/utils/cn';

interface DescriptionsItemProps {
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
  className?: string;
}

export const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ children }) => <>{children}</>;

interface DescriptionsProps {
  title?: React.ReactNode;
  items: { label: React.ReactNode; value: React.ReactNode; span?: number }[];
  column?: number;
  className?: string;
}

export const Descriptions: React.FC<DescriptionsProps> = ({
  title,
  items,
  column = 3,
  className,
}) => {
  return (
    <div className={className}>
      {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
      <div className={cn("grid gap-4", `grid-cols-1 md:grid-cols-${column}`)}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={cn("flex flex-col", item.span && `col-span-${item.span}`)}
          >
            <span className="text-sm text-gray-500 mb-1">{item.label}</span>
            <span className="text-sm font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
