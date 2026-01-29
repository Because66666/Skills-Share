import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { cn } from '@/utils/cn';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: any) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  placement?: 'top' | 'bottom' | 'auto';
  multiple?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled,
  className,
  error,
  placement = 'auto',
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actualPlacement, setActualPlacement] = useState<'top' | 'bottom'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = multiple 
    ? options.filter(opt => Array.isArray(value) && value.includes(opt.value))
    : options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      if (placement !== 'auto') {
        setActualPlacement(placement);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const MENU_HEIGHT = 240; // Estimated max height

      // Prefer bottom, but flip to top if not enough space below AND enough space above
      if (spaceBelow < MENU_HEIGHT && spaceAbove > MENU_HEIGHT) {
        setActualPlacement('top');
      } else {
        setActualPlacement('bottom');
      }
    }
  }, [isOpen, placement]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];
      onChange?.(newValues);
      // Don't close on multiple select
    } else {
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  const displayValue = multiple
    ? (Array.isArray(selectedOptions) && selectedOptions.length > 0 
        ? selectedOptions.map(o => o.label).join(', ') 
        : placeholder)
    : (selectedOptions as SelectOption)?.label || placeholder;

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-left text-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:border-gray-300",
          isOpen && "border-orange-500 ring-2 ring-orange-500/10",
          error && "border-red-500 focus:ring-red-500/10",
          ((!multiple && !selectedOptions) || (multiple && Array.isArray(value) && value.length === 0)) && "text-gray-400"
        )}
      >
        <span className={cn("block truncate", 
          ((multiple && Array.isArray(value) && value.length > 0) || (!multiple && selectedOptions)) ? "text-gray-900" : "text-gray-400"
        )}>
          {displayValue}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "transform rotate-180")} />
      </button>

      {isOpen && (
        <div 
          className={cn(
            "absolute z-10 w-full bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-auto py-1 text-sm",
            actualPlacement === 'top' ? "bottom-full mb-1" : "top-full mt-1"
          )}
        >
          {options.length === 0 ? (
            <div className="px-4 py-2 text-gray-400 text-center">No options</div>
          ) : (
            options.map((option) => {
              const isSelected = multiple 
                ? Array.isArray(value) && value.includes(option.value)
                : value === option.value;

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "px-4 py-2 cursor-pointer flex items-center justify-between transition-colors",
                    option.disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-orange-50",
                    isSelected && "bg-orange-50 text-orange-600 font-medium"
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
