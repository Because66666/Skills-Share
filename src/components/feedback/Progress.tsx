import React from 'react';
import { cn } from '@/utils/cn';

interface ProgressProps {
  percent: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  showInfo?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({ 
  percent, 
  size = 'md', 
  color = 'bg-blue-600', 
  className,
  showInfo = true 
}) => {
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 bg-gray-100 rounded-full overflow-hidden", heights[size])}>
        <div 
          className={cn("h-full transition-all duration-300 rounded-full", color)} 
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      {showInfo && (
        <span className="text-xs text-gray-500 font-medium w-8 text-right">{percent}%</span>
      )}
    </div>
  );
};
