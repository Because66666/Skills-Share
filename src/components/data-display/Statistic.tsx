import React from 'react';
import { cn } from '@/utils/cn';

interface StatisticProps {
  title: React.ReactNode;
  value: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number;
  valueStyle?: React.CSSProperties;
  className?: string;
}

export const Statistic: React.FC<StatisticProps> = ({
  title,
  value,
  prefix,
  suffix,
  valueStyle,
  className,
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="flex items-baseline gap-1" style={valueStyle}>
        {prefix && <span className="text-lg text-gray-600">{prefix}</span>}
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
      </div>
    </div>
  );
};
