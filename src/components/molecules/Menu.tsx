import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronRight } from 'lucide-react';

export interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  disabled?: boolean;
}

interface MenuProps {
  items: MenuItem[];
  selectedKeys?: string[];
  defaultOpenKeys?: string[];
  onSelect?: (key: string) => void;
  className?: string;
  mode?: 'vertical' | 'inline';
}

const SubMenu: React.FC<{
  item: MenuItem;
  level: number;
  isOpen: boolean;
  selectedKeys: string[];
  onToggle: () => void;
  onSelect: (key: string) => void;
}> = ({ item, level, isOpen, selectedKeys, onToggle, onSelect }) => {
  return (
    <div className="w-full">
      <div
        onClick={onToggle}
        className={cn(
          "flex items-center justify-between px-4 py-2 cursor-pointer transition-colors text-sm font-medium",
          "hover:bg-orange-50 hover:text-orange-600",
          item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          isOpen ? "text-orange-600" : "text-gray-600"
        )}
        style={{ paddingLeft: level * 16 + 16 }}
      >
        <div className="flex items-center gap-2">
          {item.icon && <span className="w-4 h-4">{item.icon}</span>}
          <span>{item.label}</span>
        </div>
        <ChevronRight
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "transform rotate-90"
          )}
        />
      </div>
      {isOpen && (
        <div className="w-full overflow-hidden transition-all duration-200">
          {item.children?.map(child => (
            child.children ? (
              <SubMenu
                key={child.key}
                item={child}
                level={level + 1}
                isOpen={false} // State management for nested submenus needs full recursion, simplifying for now
                selectedKeys={selectedKeys}
                onToggle={() => {}} // Needs context or recursive state
                onSelect={onSelect}
              />
            ) : (
              <MenuItem
                key={child.key}
                item={child}
                level={level + 1}
                selected={selectedKeys.includes(child.key)}
                onSelect={onSelect}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};

const MenuItem: React.FC<{
  item: MenuItem;
  level: number;
  selected: boolean;
  onSelect: (key: string) => void;
}> = ({ item, level, selected, onSelect }) => {
  return (
    <div
      onClick={() => !item.disabled && onSelect(item.key)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors text-sm font-medium",
        item.disabled && "opacity-50 cursor-not-allowed",
        selected
          ? "bg-orange-50 text-orange-600 border-r-2 border-orange-500"
          : "text-gray-600 hover:bg-orange-50 hover:text-orange-600 border-r-2 border-transparent"
      )}
      style={{ paddingLeft: level * 16 + 16 }}
    >
      {item.icon && <span className="w-4 h-4">{item.icon}</span>}
      <span>{item.label}</span>
    </div>
  );
};

export const Menu: React.FC<MenuProps> = ({
  items,
  selectedKeys = [],
  defaultOpenKeys = [],
  onSelect,
  className,
  // mode = 'vertical', // Removed unused prop
}) => {
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const handleToggle = (key: string) => {
    setOpenKeys(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const handleSelect = (key: string) => {
    onSelect?.(key);
  };

  return (
    <div className={cn("w-full bg-white py-2", className)}>
      {items.map(item => (
        item.children ? (
          <SubMenu
            key={item.key}
            item={item}
            level={0}
            isOpen={openKeys.includes(item.key)}
            selectedKeys={selectedKeys}
            onToggle={() => handleToggle(item.key)}
            onSelect={handleSelect}
          />
        ) : (
          <MenuItem
            key={item.key}
            item={item}
            level={0}
            selected={selectedKeys.includes(item.key)}
            onSelect={handleSelect}
          />
        )
      ))}
    </div>
  );
};
