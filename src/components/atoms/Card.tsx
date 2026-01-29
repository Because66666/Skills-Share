import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, padding = 'p-6', title, extra, icon, ...props }) => {
  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-[24px] shadow-sm transition-colors duration-300 dark:border dark:border-gray-800", className)} {...props}>
      {(title || extra || icon) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-gray-500">{icon}</span>}
            {title && (typeof title === 'string' ? <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{title}</h3> : title)}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className={padding}>
        {children}
      </div>
    </div>
  );
};
