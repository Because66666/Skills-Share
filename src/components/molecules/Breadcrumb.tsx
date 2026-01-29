import React from 'react';
import { cn } from '@/utils/cn';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  className, 
  separator = <ChevronRight className="w-4 h-4 text-gray-400" /> 
}) => {
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-1 text-gray-400">{separator}</span>
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn("text-sm font-medium", isLast ? "text-gray-900" : "text-gray-500")}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
