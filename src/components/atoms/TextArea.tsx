import React, { useState } from 'react';
import { cn } from '@/utils/cn';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, helperText, showCount, maxLength, onChange, value, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState<string | number | readonly string[] | undefined>(
      value || props.defaultValue || ''
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);
      if (onChange) onChange(e);
    };

    // Sync if value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const currentLength = String(internalValue).length;

    return (
      <div className="w-full">
        <div className="relative">
          <textarea
            ref={ref}
            maxLength={maxLength}
            value={internalValue}
            onChange={handleChange}
            className={cn(
              'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all disabled:opacity-50 disabled:bg-gray-50 resize-y min-h-[80px]',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props}
          />
          {showCount && maxLength && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white/80 px-1 rounded pointer-events-none">
              {currentLength} / {maxLength}
            </div>
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

TextArea.displayName = 'TextArea';
