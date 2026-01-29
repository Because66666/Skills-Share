import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        variant === 'text' && "h-4 w-full rounded",
        variant === 'circular' && "rounded-full",
        variant === 'rectangular' && "rounded-none",
        variant === 'rounded' && "rounded-xl",
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};
