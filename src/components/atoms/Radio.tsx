import React from 'react';
import { cn } from '@/utils/cn';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Radio: React.FC<RadioProps> = ({
  className,
  label,
  checked,
  onChange,
  disabled,
  ...props
}) => {
  return (
    <label className={cn("inline-flex items-center gap-2 cursor-pointer", disabled && "cursor-not-allowed opacity-50", className)}>
      <div className="relative flex items-center">
        <input
          type="radio"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          {...props}
        />
        <div className={cn(
          "w-5 h-5 border rounded-full transition-all flex items-center justify-center",
          checked 
            ? "border-orange-500" 
            : "bg-white border-gray-300 hover:border-orange-400",
          "peer-focus:ring-2 peer-focus:ring-orange-500/20"
        )}>
          {checked && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
        </div>
      </div>
      {label && <span className="text-sm text-gray-700 select-none">{label}</span>}
    </label>
  );
};
