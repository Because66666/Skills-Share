import React from 'react';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

export interface StepItem {
  title: string;
  description?: string;
}

interface StepsProps {
  current: number;
  items: StepItem[];
  direction?: 'horizontal' | 'vertical';
  className?: string;
  onChange?: (current: number) => void;
}

export const Steps: React.FC<StepsProps> = ({
  current,
  items,
  direction = 'horizontal',
  className,
  onChange,
}) => {
  return (
    <div 
      className={cn(
        "w-full flex",
        direction === 'vertical' ? 'flex-col gap-8' : 'flex-row items-center',
        className
      )}
    >
      {items.map((item, index) => {
        const status = index < current ? 'finish' : index === current ? 'process' : 'wait';
        const isLast = index === items.length - 1;

        return (
          <div 
            key={index} 
            className={cn(
              "flex-1 flex",
              direction === 'vertical' ? 'flex-row items-start' : 'items-center',
              isLast && "flex-none"
            )}
          >
            <div 
              className={cn(
                "flex items-center gap-3",
                direction === 'vertical' ? 'w-full' : 'relative'
              )}
              onClick={() => status !== 'wait' && onChange?.(index)}
            >
              {/* Icon */}
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors border-2 shrink-0 z-10 bg-white",
                  status === 'finish' && "bg-orange-500 border-orange-500 text-white cursor-pointer",
                  status === 'process' && "border-orange-500 text-orange-500",
                  status === 'wait' && "border-gray-200 text-gray-400"
                )}
              >
                {status === 'finish' ? <Check className="w-4 h-4" /> : index + 1}
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <span className={cn(
                  "text-sm font-medium",
                  status === 'finish' && "text-gray-900",
                  status === 'process' && "text-gray-900",
                  status === 'wait' && "text-gray-400"
                )}>
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-xs text-gray-400 mt-0.5">{item.description}</span>
                )}
              </div>
            </div>

            {/* Line */}
            {!isLast && (
              <div 
                className={cn(
                  "flex-1 bg-gray-200 mx-4 transition-colors",
                  direction === 'vertical' 
                    ? "absolute left-[15px] top-[32px] w-[2px] h-[calc(100%-16px)]" 
                    : "h-[2px]",
                  status === 'finish' && "bg-orange-500"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
