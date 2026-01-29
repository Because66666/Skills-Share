import React from 'react';
import { cn } from '@/utils/cn';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

type ResultStatus = 'success' | 'error' | 'warning' | 'info' | '403' | '404' | '500';

interface ResultProps {
  status: ResultStatus;
  title: string;
  subTitle?: string;
  extra?: React.ReactNode;
  className?: string;
}

export const Result: React.FC<ResultProps> = ({
  status,
  title,
  subTitle,
  extra,
  className,
}) => {
  const icons = {
    success: <CheckCircle className="w-20 h-20 text-green-500" />,
    error: <XCircle className="w-20 h-20 text-red-500" />,
    warning: <AlertTriangle className="w-20 h-20 text-yellow-500" />,
    info: <Info className="w-20 h-20 text-blue-500" />,
    '403': <div className="text-8xl font-bold text-gray-200">403</div>,
    '404': <div className="text-8xl font-bold text-gray-200">404</div>,
    '500': <div className="text-8xl font-bold text-gray-200">500</div>,
  };

  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="mb-6">
        {icons[status]}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      {subTitle && <p className="text-gray-500 mb-8 max-w-md">{subTitle}</p>}
      {extra && <div className="flex gap-4">{extra}</div>}
    </div>
  );
};
