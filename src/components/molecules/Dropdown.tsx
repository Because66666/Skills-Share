import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface DropdownItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  menu: DropdownItem[];
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  menu,
  placement = 'bottom-left',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
    setIsOpen(false);
  };

  const placementStyles = {
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1',
  };

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={cn(
            "absolute z-50 min-w-[160px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 overflow-hidden",
            placementStyles[placement]
          )}
        >
          {menu.map((item) => (
            <div
              key={item.key}
              onClick={() => handleItemClick(item)}
              className={cn(
                "px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-colors",
                item.disabled 
                  ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900" 
                  : "hover:bg-orange-50 dark:hover:bg-orange-900/20",
                item.danger 
                  ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" 
                  : "text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400"
              )}
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
