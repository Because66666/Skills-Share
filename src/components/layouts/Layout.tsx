import React from 'react';
import { cn } from '@/utils/cn';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  hasSider?: boolean;
}

const LayoutContext = React.createContext<{ hasSider: boolean }>({ hasSider: false });

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, hasSider, ...props }, ref) => {
    // Auto-detect Sider could be implemented by inspecting children, 
    // but explicit prop is safer for SSR/Simple implementation.
    return (
      <LayoutContext.Provider value={{ hasSider: !!hasSider }}>
        <div
          ref={ref}
          className={cn(
            "flex flex-col min-h-0 w-full flex-1",
            hasSider && "flex-row",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </LayoutContext.Provider>
    );
  }
);
Layout.displayName = 'Layout';

export const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn("flex-shrink-0", className)}
      {...props}
    />
  )
);
Header.displayName = 'Layout.Header';

export const Footer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn("flex-shrink-0", className)}
      {...props}
    />
  )
);
Footer.displayName = 'Layout.Footer';

export const Content = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn("flex-auto min-h-0 overflow-auto", className)}
      {...props}
    />
  )
);
Content.displayName = 'Layout.Content';

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  collapsed?: boolean;
  collapsedWidth?: number;
}

export const Sider = React.forwardRef<HTMLDivElement, SiderProps>(
  ({ className, width = 200, collapsed, collapsedWidth = 80, style, ...props }, ref) => {
    const w = collapsed ? collapsedWidth : width;
    return (
      <aside
        ref={ref}
        className={cn("flex-shrink-0 transition-all duration-200 ease-in-out", className)}
        style={{ width: w, ...style }}
        {...props}
      />
    );
  }
);
Sider.displayName = 'Layout.Sider';
