import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Star } from 'lucide-react';

interface RateProps {
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  allowHalf?: boolean; // Simplifying to full stars for now to keep it robust without complex SVG masking
  className?: string;
}

export const Rate: React.FC<RateProps> = ({
  count = 5,
  value: propValue,
  defaultValue = 0,
  onChange,
  disabled,
  className,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [localValue, setLocalValue] = useState(defaultValue);
  
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : localValue;
  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleClick = (index: number) => {
    if (disabled) return;
    const newValue = index + 1;
    if (!isControlled) {
      setLocalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleMouseEnter = (index: number) => {
    if (disabled) return;
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverValue(null);
  };

  return (
    <div 
      className={cn("flex items-center gap-1", className)} 
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "w-5 h-5 transition-colors cursor-pointer",
            index < displayValue ? "fill-orange-400 text-orange-400" : "text-gray-300",
            disabled && "cursor-not-allowed opacity-60"
          )}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};
