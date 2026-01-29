import React from 'react';
import { cn } from '@/utils/cn';
import { PackageOpen } from 'lucide-react';

interface EmptyProps {
  description?: React.ReactNode;
  image?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const Empty: React.FC<EmptyProps> = ({
  description = 'No Data',
  image,
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-8 text-center", className)}>
      <div className="mb-4 text-gray-300">
        {image || <PackageOpen className="w-16 h-16 mx-auto" strokeWidth={1} />}
      </div>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};
