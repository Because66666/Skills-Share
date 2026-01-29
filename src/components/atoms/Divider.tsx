import React from 'react';
import { cn } from '@/utils/cn';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className }) => {
  return (
    <div
      className={cn(
        'bg-gray-100',
        orientation === 'horizontal' ? 'w-full h-[1px] my-4' : 'h-full w-[1px] mx-4',
        className
      )}
    />
  );
};
