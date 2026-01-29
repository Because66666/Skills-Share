import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  block?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode; // Alias for leftIcon or standalone icon
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, block, leftIcon, rightIcon, icon, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm border border-transparent',
      secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700',
      outline: 'bg-transparent text-gray-900 border border-gray-200 hover:bg-gray-50 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm border border-transparent',
      link: 'bg-transparent text-orange-500 hover:underline p-0 h-auto',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-2 flex items-center justify-center',
    };

    const finalLeftIcon = leftIcon || icon;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          size !== 'icon' && sizes[size],
          size === 'icon' && 'h-9 w-9', // Specific override for icon button
          block && 'w-full',
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && finalLeftIcon && <span className={cn(children ? "mr-2" : "")}>{finalLeftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
