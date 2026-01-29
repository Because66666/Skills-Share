import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface PopoverProps {
  content: React.ReactNode;
  trigger: React.ReactNode;
  title?: React.ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right' | 'right-bottom-align';
  className?: string;
  containerClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  trigger,
  title,
  position = 'bottom',
  className,
  containerClassName,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleOpenChange(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isControlled, onOpenChange]);

  const positions = {
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    'right-bottom-align': 'left-[100%] bottom-0 ml-2',
  };

  return (
    <div className={cn("relative inline-block", containerClassName)} ref={containerRef}>
      <div onClick={() => handleOpenChange(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={cn(
            "absolute z-50 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4",
            positions[position],
            className
          )}
        >
          {title && (
            <div className="font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
              {title}
            </div>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};
