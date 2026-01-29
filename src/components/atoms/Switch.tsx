import React from 'react';
import { cn } from '@/utils/cn';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const Switch: React.FC<SwitchProps> = ({
  checked: checkedProp,
  defaultChecked,
  onChange,
  disabled,
  className,
  size = 'md',
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const sizes = {
    sm: { w: 'w-8', h: 'h-4', circle: 'h-3 w-3', translate: 'translate-x-4' },
    md: { w: 'w-11', h: 'h-6', circle: 'h-5 w-5', translate: 'translate-x-5' },
  };

  const currentSize = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleChange}
      className={cn(
        "relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20",
        currentSize.w,
        currentSize.h,
        checked ? "bg-orange-500" : "bg-gray-200",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span
        className={cn(
          "inline-block transform bg-white rounded-full transition-transform shadow-sm",
          currentSize.circle,
          "translate-x-0.5", // initial offset
          checked && currentSize.translate
        )}
      />
    </button>
  );
};
