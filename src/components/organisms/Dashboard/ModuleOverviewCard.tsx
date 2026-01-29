import React from 'react';
import { Card } from '@/components/atoms/Card';
import { ModuleOverview } from '@/mock/dashboard/legalData';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModuleOverviewCardProps {
  module: ModuleOverview;
}

export const ModuleOverviewCard: React.FC<ModuleOverviewCardProps> = ({ module }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col"
      onClick={() => navigate(module.link)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
          <module.icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
          {module.title}
        </h3>
      </div>
      
      <div className="flex-1 space-y-3">
        {module.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
            <span className={`font-medium ${item.color || 'text-gray-900 dark:text-gray-100'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
        <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
          进入模块 <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Card>
  );
};
