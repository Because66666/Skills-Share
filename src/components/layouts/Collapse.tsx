import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

export interface CollapseItemProps {
  key: string;
  title: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface CollapseProps {
  items: CollapseItemProps[];
  defaultActiveKey?: string[];
  activeKey?: string[];
  onChange?: (keys: string[]) => void;
  accordion?: boolean;
  className?: string;
  bordered?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({
  items,
  defaultActiveKey = [],
  activeKey: propActiveKey,
  onChange,
  accordion = false,
  className,
  bordered = true,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string[]>(defaultActiveKey);

  const activeKeys = propActiveKey || internalActiveKey;

  const handleItemClick = (key: string) => {
    let newActiveKeys: string[];

    if (accordion) {
      newActiveKeys = activeKeys.includes(key) ? [] : [key];
    } else {
      newActiveKeys = activeKeys.includes(key)
        ? activeKeys.filter((k) => k !== key)
        : [...activeKeys, key];
    }

    if (propActiveKey === undefined) {
      setInternalActiveKey(newActiveKeys);
    }

    if (onChange) {
      onChange(newActiveKeys);
    }
  };

  return (
    <div className={cn('w-full', bordered && 'border border-gray-200 rounded-xl overflow-hidden', className)}>
      {items.map((item, index) => {
        const isActive = activeKeys.includes(item.key);
        return (
          <div
            key={item.key}
            className={cn(
              'bg-white',
              bordered && index !== items.length - 1 && 'border-b border-gray-100'
            )}
          >
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && handleItemClick(item.key)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 text-left transition-colors',
                item.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50',
                isActive && !bordered && 'bg-gray-50'
              )}
            >
              <span className="font-medium text-gray-900">{item.title}</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-gray-400 transition-transform duration-200',
                  isActive && 'transform rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-in-out',
                isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-1 text-gray-600 text-sm">
                  {item.children}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
