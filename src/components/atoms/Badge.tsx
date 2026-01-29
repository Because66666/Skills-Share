import React from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', className, children, ...props }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-orange-100 text-orange-700',
    secondary: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-700',
    outline: 'bg-transparent border border-gray-200 text-gray-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
