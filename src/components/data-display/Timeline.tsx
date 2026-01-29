import React from 'react';
import { cn } from '@/utils/cn';

interface TimelineItemProps {
  children: React.ReactNode;
  label?: React.ReactNode; // Optional time/date label
  color?: string;
  dot?: React.ReactNode;
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ children, label, color = 'orange', dot, className }) => {
  return (
    <li className={cn("relative pl-8 pb-8 last:pb-0", className)}>
      {/* Line */}
      <div className="absolute left-[5px] top-2 h-full w-[2px] bg-gray-200 last:hidden" />
      
      {/* Dot */}
      <div 
        className={cn(
          "absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 bg-white z-10 box-border",
          color === 'orange' && "border-orange-500",
          color === 'blue' && "border-blue-500",
          color === 'green' && "border-green-500",
          color === 'red' && "border-red-500",
          color === 'gray' && "border-gray-400"
        )}
        style={{ borderColor: !['orange','blue','green','red','gray'].includes(color) ? color : undefined }}
      >
        {dot}
      </div>

      <div className="flex flex-col">
        {label && <span className="text-xs text-gray-400 mb-1">{label}</span>}
        <div className="text-sm text-gray-700">{children}</div>
      </div>
    </li>
  );
};

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ children, className }) => {
  return (
    <ul className={cn("", className)}>
      {children}
    </ul>
  );
};
