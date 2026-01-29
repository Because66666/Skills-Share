import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface TabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultActiveKey, activeKey: propsActiveKey, onChange, className }) => {
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey || items[0]?.key);
  
  const activeKey = propsActiveKey !== undefined ? propsActiveKey : internalActiveKey;

  const handleTabClick = (key: string) => {
    if (propsActiveKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="border-b border-gray-100 mb-4">
        <div className="flex gap-6">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => handleTabClick(item.key)}
              className={cn(
                "pb-3 text-sm font-medium transition-all relative",
                activeKey === item.key 
                  ? "text-orange-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {item.label}
              {activeKey === item.key && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="py-2">
        {items.find(item => item.key === activeKey)?.children}
      </div>
    </div>
  );
};
