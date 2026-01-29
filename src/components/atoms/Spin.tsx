import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface SpinProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spin: React.FC<SpinProps> = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <Loader2 className={cn('animate-spin text-orange-500', sizes[size], className)} />
  );
};
