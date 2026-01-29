import React from 'react';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';

interface TagProps {
  label?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'gray';
}

export const Tag: React.FC<TagProps> = ({ label, children, onClose, className, icon, color = 'orange' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    gray: 'bg-gray-50 text-gray-700 border-gray-100',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-sm border',
      colors[color],
      className
    )}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {label || children}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-1.5 hover:bg-black/5 rounded-full p-0.5 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
