import React from 'react';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
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
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          {...props}
        />
        <div className={cn(
          "w-5 h-5 border rounded-md transition-all flex items-center justify-center",
          checked 
            ? "bg-orange-500 border-orange-500 text-white" 
            : "bg-white border-gray-300 hover:border-orange-400",
          "peer-focus:ring-2 peer-focus:ring-orange-500/20"
        )}>
          {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
        </div>
      </div>
      {label && <span className="text-sm text-gray-700 select-none">{label}</span>}
    </label>
  );
};
