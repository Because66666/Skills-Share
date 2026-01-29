import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Customer } from '@/mock/dashboardData';

interface StatHighlightCardProps {
  type: 'month' | 'year' | 'buyer';
  data: {
    month?: string;
    year?: string | number;
    value?: string;
    buyer?: Customer;
  };
}

export const StatHighlightCard: React.FC<StatHighlightCardProps> = ({ type, data }) => {
  if (type === 'month') {
    return (
      <Card className="h-full flex flex-col justify-center min-h-[140px]">
         <span className="text-gray-400 text-sm mb-1 font-medium">最佳月份</span>
         <h4 className="text-orange-800 text-xl font-bold mb-1">{data.month}</h4>
         <span className="text-orange-500 font-bold text-lg">{data.year}</span>
      </Card>
    );
  }

  if (type === 'year') {
    return (
      <Card className="h-full flex flex-col justify-center min-h-[140px]">
         <span className="text-gray-400 text-sm mb-1 font-medium">最佳年份</span>
         <h4 className="text-orange-800 text-xl font-bold mb-1">{data.year}</h4>
         <span className="text-gray-900 text-sm font-medium">{data.value}</span>
      </Card>
    );
  }

  if (type === 'buyer' && data.buyer) {
    return (
      <Card className="h-full flex flex-col justify-center min-h-[140px]">
         <span className="text-gray-400 text-sm mb-3 font-medium">最佳买家</span>
         <div className="flex items-center gap-3">
           <img 
            src={data.buyer.avatar} 
            alt={data.buyer.name}
            className="w-10 h-10 rounded-full object-cover" 
           />
           <div className="overflow-hidden">
             <h5 className="font-bold text-sm truncate">{data.buyer.name}</h5>
             <p className="text-[10px] text-gray-400 truncate">{data.buyer.company}</p>
           </div>
         </div>
      </Card>
    );
  }

  return null;
};
