import React from 'react';
import { cn } from '@/utils/cn';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  layout?: 'horizontal' | 'vertical' | 'inline';
}

export const Form: React.FC<FormProps> = ({ 
  layout = 'vertical', 
  className, 
  children, 
  ...props 
}) => {
  return (
    <form 
      className={cn(
        "w-full",
        layout === 'inline' && "flex flex-wrap gap-4 items-end",
        className
      )} 
      {...props}
    >
      {children}
    </form>
  );
};

interface FormItemProps {
  label?: React.ReactNode;
  name?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  error,
  required,
  children,
  className,
}) => {
  return (
    <div className={cn("mb-4", className)}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {children}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};
