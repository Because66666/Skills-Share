import React from 'react';
import { Card } from '@/components/atoms/Card';
import { LegalMetric } from '@/mock/dashboard/legalData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LegalMetricCardProps {
  metric: LegalMetric;
}

export const LegalMetricCard: React.FC<LegalMetricCardProps> = ({ metric }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (metric.link) {
      navigate(metric.link);
    }
  };

  const getTrendColor = (direction: 'up' | 'down') => {
    return direction === 'up' ? 'text-green-500' : 'text-red-500';
  };

  const TrendIcon = metric.trend?.direction === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {metric.icon && (
            <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${metric.color ? `text-${metric.color}-500` : 'text-gray-600'}`}>
              <metric.icon className="w-5 h-5" />
            </div>
          )}
          <h3 className="text-gray-600 dark:text-gray-400 font-medium">{metric.title}</h3>
        </div>
      </div>
      
      <div className="flex items-end gap-3 mt-4">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
        </span>
        {metric.trend && (
          <div className={`flex items-center text-sm font-medium mb-1 ${getTrendColor(metric.trend.direction)}`}>
            <TrendIcon className="w-4 h-4 mr-0.5" />
            {metric.trend.value}
          </div>
        )}
      </div>
      
      {metric.description && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          {metric.description}
        </p>
      )}
    </Card>
  );
};
