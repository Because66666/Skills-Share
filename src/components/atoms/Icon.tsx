import React from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
  spin?: boolean;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className, spin, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(spin && "animate-spin", className)}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
