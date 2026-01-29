import React from 'react';
import { cn } from '@/utils/cn';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  className,
  logo,
  title,
  subtitle,
  footer
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className={cn("w-full max-w-md", className)}>
        <div className="text-center mb-8">
            {logo && <div className="flex justify-center mb-4">{logo}</div>}
            {title && <h2 className="text-3xl font-bold text-gray-900">{title}</h2>}
            {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
        </div>
        
        {children}

        {footer && (
            <div className="mt-8 text-center text-sm text-gray-500">
                {footer}
            </div>
        )}
      </div>
    </div>
  );
};
