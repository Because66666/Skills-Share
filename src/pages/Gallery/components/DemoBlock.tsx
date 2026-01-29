import React, { useState } from 'react';
import { Code, Copy, Check, Moon, Sun } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/atoms/Button';

interface DemoBlockProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
  className?: string;
}

export const DemoBlock: React.FC<DemoBlockProps> = ({
  title,
  description,
  children,
  code,
  className,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn('border border-gray-200 rounded-xl overflow-hidden bg-white mb-8', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            title={isDark ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          {code && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                title="复制代码"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCode(!showCode)}
                className={cn(showCode && 'bg-gray-100')}
                title="查看代码"
              >
                <Code className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div className={cn(
        'p-6 transition-colors duration-200',
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      )}>
        {/* Force a wrapper div to ensure dark mode classes cascade if needed, 
            though typically dark mode is applied at the root or via specific classes.
            Here we simulate a dark context for the component. */}
        <div className={cn('w-full', isDark && 'dark')}>
          {children}
        </div>
      </div>

      {/* Code Area */}
      {showCode && code && (
        <div className="bg-gray-50 border-t border-gray-100 p-4 overflow-x-auto">
          <pre className="text-sm font-mono text-gray-700 whitespace-pre">
            {code}
          </pre>
        </div>
      )}
    </div>
  );
};
