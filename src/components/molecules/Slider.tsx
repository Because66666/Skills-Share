import React, { useState, useRef } from 'react';
import { cn } from '@/utils/cn';

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value: propValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled,
  className,
}) => {
  const [localValue, setLocalValue] = useState(defaultValue);
  const trackRef = useRef<HTMLDivElement>(null);
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : localValue;

  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    updateValue(e.clientX);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    updateValue(e.clientX);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const updateValue = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const rawValue = (x / rect.width) * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    const newValue = Math.min(Math.max(steppedValue, min), max);
    
    if (!isControlled) {
      setLocalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div 
      className={cn(
        "relative w-full h-6 flex items-center cursor-pointer select-none touch-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onMouseDown={handleMouseDown}
      ref={trackRef}
    >
      {/* Track Background */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        {/* Active Track */}
        <div 
          className="h-full bg-orange-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Thumb */}
      <div 
        className={cn(
          "absolute w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-sm transform -translate-x-1/2 transition-transform hover:scale-110 active:scale-125",
          disabled && "border-gray-400 bg-gray-100"
        )}
        style={{ left: `${percentage}%` }}
      />
    </div>
  );
};
