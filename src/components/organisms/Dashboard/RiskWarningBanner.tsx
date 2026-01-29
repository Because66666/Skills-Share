import React from 'react';
import { AlertTriangle, ChevronRight, X } from 'lucide-react';
import { RiskItem } from '@/mock/dashboard/legalData';
import { useNavigate } from 'react-router-dom';

interface RiskWarningBannerProps {
  risks: RiskItem[];
  onClose?: () => void;
}

export const RiskWarningBanner: React.FC<RiskWarningBannerProps> = ({ risks, onClose }) => {
  const navigate = useNavigate();
  
  if (risks.length === 0) return null;

  // Only show the most severe risk or the first one
  const topRisk = risks[0];

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg p-3 flex items-center justify-between shadow-sm mb-4">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="bg-red-100 dark:bg-red-800 p-1.5 rounded-full flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-300" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 overflow-hidden">
          <span className="font-bold text-red-800 dark:text-red-200 whitespace-nowrap">
            风险预警
          </span>
          <span className="text-red-700 dark:text-red-300 text-sm truncate">
            {topRisk.title}
          </span>
          <span className="text-red-500 dark:text-red-400 text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/40 rounded-full whitespace-nowrap">
             {topRisk.date} 到期
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <button 
          onClick={() => navigate('/cases/risk')}
          className="text-sm text-red-700 dark:text-red-300 hover:underline flex items-center whitespace-nowrap"
        >
          查看详情 <ChevronRight className="w-4 h-4" />
        </button>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
