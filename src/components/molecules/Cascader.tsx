import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { ChevronRight, ChevronDown, Check } from 'lucide-react';

export interface CascaderOption {
  value: string | number;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

interface CascaderProps {
  options: CascaderOption[];
  value?: (string | number)[];
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Cascader: React.FC<CascaderProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Select...',
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<(string | number)[]>([]);
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

  const getSelectedLabels = () => {
    if (!value || value.length === 0) return '';
    
    const labels: string[] = [];
    let currentOptions = options;
    
    for (const val of value) {
      const option = currentOptions.find(opt => opt.value === val);
      if (option) {
        labels.push(option.label);
        currentOptions = option.children || [];
      } else {
        break;
      }
    }
    return labels.join(' / ');
  };

  const handleOptionClick = (option: CascaderOption, depth: number) => {
    if (option.disabled) return;

    const newActiveValue = activeValue.slice(0, depth);
    newActiveValue[depth] = option.value;
    setActiveValue(newActiveValue);

    if (!option.children || option.children.length === 0) {
      // Leaf node selected
      const selectedOptions: CascaderOption[] = [];
      let currentOpts = options;
      newActiveValue.forEach(val => {
          const opt = currentOpts.find(o => o.value === val);
          if (opt) {
              selectedOptions.push(opt);
              currentOpts = opt.children || [];
          }
      });

      onChange?.(newActiveValue, selectedOptions);
      setIsOpen(false);
    }
  };

  const renderColumn = (columnOptions: CascaderOption[], depth: number) => {
    return (
      <div className="w-48 max-h-60 overflow-y-auto border-r border-gray-100 last:border-r-0">
        {columnOptions.map(option => {
          const isActive = activeValue[depth] === option.value;
          
          return (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option, depth)}
              className={cn(
                "px-4 py-2 cursor-pointer flex items-center justify-between text-sm hover:bg-gray-50",
                isActive && "bg-orange-50 text-orange-600 font-medium",
                option.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="truncate">{option.label}</span>
              {option.children && option.children.length > 0 ? (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              ) : (
                isActive && <Check className="w-3 h-3 text-orange-600" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDropdown = () => {
    const columns = [];
    let currentOptions = options;
    columns.push(renderColumn(currentOptions, 0));

    for (let i = 0; i < activeValue.length; i++) {
      const selectedOption = currentOptions.find(opt => opt.value === activeValue[i]);
      if (selectedOption && selectedOption.children && selectedOption.children.length > 0) {
        currentOptions = selectedOption.children;
        columns.push(renderColumn(currentOptions, i + 1));
      } else {
        break;
      }
    }

    return (
      <div className="absolute z-10 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg flex overflow-hidden">
        {columns}
      </div>
    );
  };

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-left text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:border-gray-300",
          isOpen && "border-orange-500 ring-2 ring-orange-500/10"
        )}
      >
        <span className={cn("block truncate", value.length > 0 ? "text-gray-900" : "text-gray-400")}>
          {getSelectedLabels() || placeholder}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "transform rotate-180")} />
      </button>

      {isOpen && renderDropdown()}
    </div>
  );
};
