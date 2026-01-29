import React from 'react';
import { cn } from '@/utils/cn';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'body-xs' | 'caption';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  component?: React.ElementType;
  color?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  component,
  className,
  children,
  color,
  weight,
  ...props
}) => {
  const styles = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-bold tracking-tight',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    body: 'text-base',
    'body-sm': 'text-sm',
    'body-xs': 'text-xs',
    caption: 'text-xs text-gray-500',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const Component = component || 
    (variant.startsWith('h') ? (variant as React.ElementType) : 'p');

  return (
    <Component
      className={cn(
        styles[variant],
        weight && weights[weight],
        color, // Allow passing Tailwind color classes directly like 'text-gray-500'
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
