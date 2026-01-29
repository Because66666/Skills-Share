import React from 'react';
import { cn } from '@/utils/cn';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | [number, number];
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

export const Row: React.FC<RowProps> = ({ 
  children, 
  className, 
  gutter = 0,
  align = 'top',
  justify = 'start',
  style,
  ...props 
}) => {
  const horizontalGutter = Array.isArray(gutter) ? gutter[0] : gutter;
  const verticalGutter = Array.isArray(gutter) ? gutter[1] : gutter;

  const aligns = {
    top: 'items-start',
    middle: 'items-center',
    bottom: 'items-end',
  };

  const justifies = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    'space-around': 'justify-around',
    'space-between': 'justify-between',
  };

  return (
    <div 
      className={cn('flex flex-wrap', aligns[align], justifies[justify], className)}
      style={{
        marginLeft: -horizontalGutter / 2,
        marginRight: -horizontalGutter / 2,
        marginTop: -verticalGutter / 2,
        marginBottom: -verticalGutter / 2,
        ...style
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement<any>;
          const childProps = childElement.props || {};
          return React.cloneElement(childElement, {
            ...childProps,
            style: {
              ...(childProps.style || {}),
              paddingLeft: horizontalGutter ? horizontalGutter / 2 : undefined,
              paddingRight: horizontalGutter ? horizontalGutter / 2 : undefined,
              paddingTop: verticalGutter / 2,
              paddingBottom: verticalGutter / 2,
            }
          });
        }
        return child;
      })}
    </div>
  );
};

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number; // 1-24
}

export const Col: React.FC<ColProps> = ({ span, className, style, ...props }) => {
  const width = span ? `${(span / 24) * 100}%` : '100%';
  
  return (
    <div 
      className={cn('max-w-full', className)} 
      style={{ width, flex: `0 0 ${width}`, ...style }}
      {...props} 
    />
  );
};

export const Grid = {
  Row,
  Col,
};
