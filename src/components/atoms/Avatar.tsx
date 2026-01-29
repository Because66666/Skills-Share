import React from 'react';
import { cn } from '@/utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  icon?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, size = 'md', className, icon }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div className={cn('relative inline-block rounded-full overflow-hidden bg-gray-100 border border-gray-100', sizes[size], className)}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium bg-gray-100">
          {icon || fallback || alt?.charAt(0).toUpperCase() || '?'}
        </div>
      )}
    </div>
  );
};
