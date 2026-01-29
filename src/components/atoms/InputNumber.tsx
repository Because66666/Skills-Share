import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { Minus, Plus } from 'lucide-react';

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: boolean;
  helperText?: string;
  controls?: boolean;
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, value, defaultValue, onChange, min, max, step = 1, error, helperText, controls = true, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState<string>(
      value?.toString() ?? defaultValue?.toString() ?? ''
    );

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value.toString());
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
        setInternalValue(newValue);
        if (onChange) {
            const num = parseFloat(newValue);
            onChange(isNaN(num) ? null : num);
        }
      }
    };

    const handleBlur = () => {
        if (internalValue === '' || internalValue === '-') {
            if (onChange) onChange(null);
            return;
        }
        let num = parseFloat(internalValue);
        if (isNaN(num)) return;

        if (min !== undefined && num < min) num = min;
        if (max !== undefined && num > max) num = max;
        
        setInternalValue(num.toString());
        if (onChange) onChange(num);
    };

    const handleStep = (direction: 'up' | 'down') => {
      if (disabled) return;
      let current = parseFloat(internalValue) || 0;
      if (direction === 'up') {
        current += step;
      } else {
        current -= step;
      }

      // Precision fix
      const precision = step.toString().split('.')[1]?.length || 0;
      current = parseFloat(current.toFixed(precision));

      if (max !== undefined && current > max) current = max;
      if (min !== undefined && current < min) current = min;

      setInternalValue(current.toString());
      if (onChange) onChange(current);
    };

    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {controls && (
            <button
              type="button"
              onClick={() => handleStep('down')}
              disabled={disabled || (min !== undefined && parseFloat(internalValue || '0') <= min)}
              className="absolute left-1 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus size={16} />
            </button>
          )}
          
          <input
            ref={ref}
            type="text"
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={cn(
              'w-full bg-white border border-gray-200 rounded-xl py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all disabled:opacity-50 disabled:bg-gray-50 text-center',
              controls ? 'px-8' : 'px-4',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props}
          />

          {controls && (
            <button
              type="button"
              onClick={() => handleStep('up')}
              disabled={disabled || (max !== undefined && parseFloat(internalValue || '0') >= max)}
              className="absolute right-1 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
        {helperText && (
          <p className={cn('mt-1 text-xs', error ? 'text-red-500' : 'text-gray-500')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputNumber.displayName = 'InputNumber';
