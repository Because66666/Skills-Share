import React from 'react';
import { cn } from '@/utils/cn';

interface ProgressProps {
  percent?: number;
  status?: 'active' | 'success' | 'exception';
  showInfo?: boolean;
  strokeColor?: string;
  trailColor?: string;
  height?: number;
  className?: string;
  type?: 'line' | 'circle';
  width?: number; // for circle
}

export const Progress: React.FC<ProgressProps> = ({
  percent = 0,
  status = 'active',
  showInfo = true,
  strokeColor,
  trailColor = '#e5e7eb', // gray-200
  height = 8,
  className,
  type = 'line',
  width = 120,
}) => {
  const normalizedPercent = Math.min(Math.max(percent, 0), 100);

  const statusColors = {
    active: 'bg-orange-500',
    success: 'bg-green-500',
    exception: 'bg-red-500',
  };

  const currentColor = strokeColor || (status === 'active' ? 'bg-orange-500' : statusColors[status]);

  if (type === 'circle') {
    const strokeWidth = 6;
    const radius = 50 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (normalizedPercent / 100) * circumference;

    return (
      <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width, height: width }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={trailColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-300 ease-out", status === 'active' ? 'text-orange-500' : (status === 'success' ? 'text-green-500' : 'text-red-500'))}
            style={strokeColor ? { color: strokeColor } : undefined}
          />
        </svg>
        {showInfo && (
          <span className="absolute text-sm font-medium text-gray-700">
            {normalizedPercent}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className="flex-1 rounded-full overflow-hidden" 
        style={{ height, backgroundColor: trailColor }}
      >
        <div
          className={cn("h-full transition-all duration-300 ease-out rounded-full", currentColor)}
          style={{ 
            width: `${normalizedPercent}%`,
            backgroundColor: strokeColor 
          }}
        />
      </div>
      {showInfo && (
        <span className="text-sm font-medium text-gray-500 min-w-[3em] text-right">
          {normalizedPercent}%
        </span>
      )}
    </div>
  );
};
