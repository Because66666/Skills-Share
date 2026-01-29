import React from 'react';
import { cn } from '@/utils/cn';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  showIcon = true,
  className,
}) => {
  const styles = {
    success: 'bg-green-50 text-green-800 border-green-100',
    info: 'bg-blue-50 text-blue-800 border-blue-100',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-100',
    error: 'bg-red-50 text-red-800 border-red-100',
  };

  const icons = {
    success: CheckCircle,
    info: Info,
    warning: AlertCircle,
    error: XCircle,
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "p-4 rounded-xl border flex items-start gap-3",
        styles[type],
        className
      )}
      role="alert"
    >
      {showIcon && <Icon className="w-5 h-5 shrink-0 mt-0.5" />}
      <div className="flex-1">
        {title && <h5 className="font-semibold mb-1">{title}</h5>}
        <div className="text-sm opacity-90">{message}</div>
      </div>
    </div>
  );
};
