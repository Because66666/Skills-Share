import React from 'react';
import { cn } from '@/utils/cn';

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | number;
  align?: 'start' | 'end' | 'center' | 'baseline';
  wrap?: boolean;
}

export const Space: React.FC<SpaceProps> = ({
  children,
  className,
  direction = 'horizontal',
  size = 'md',
  align,
  wrap = false,
  style,
  ...props
}) => {
  const sizes = {
    sm: 8,
    md: 16,
    lg: 24,
  };

  const gap = typeof size === 'number' ? size : sizes[size];

  const aligns = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
  };

  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        align && aligns[align],
        wrap && 'flex-wrap',
        className
      )}
      style={{ gap, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};
