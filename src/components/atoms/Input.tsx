import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, leftIcon, rightIcon, onLeftIconClick, onRightIconClick, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {leftIcon && (
            <div 
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                onLeftIconClick ? "cursor-pointer pointer-events-auto hover:text-gray-600" : "pointer-events-none"
              )}
              onClick={onLeftIconClick}
            >
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all disabled:opacity-50 disabled:bg-gray-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div 
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                onRightIconClick ? "cursor-pointer pointer-events-auto hover:text-gray-600" : "pointer-events-none"
              )}
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p className={cn('mt-1 text-xs', error ? 'text-red-500' : 'text-gray-500')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
