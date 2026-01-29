import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Deal } from '@/mock/dashboardData';
import { Plus } from 'lucide-react';

interface NewDealsWidgetProps {
  deals: Deal[];
}

export const NewDealsWidget: React.FC<NewDealsWidgetProps> = ({ deals }) => {
  return (
    <Card className="h-full">
      <h3 className="font-bold text-xl mb-6">新交易</h3>
      <div className="flex flex-wrap gap-3">
        {deals.map(deal => (
          <button 
            key={deal.id} 
            className="px-4 py-2 bg-orange-50 text-orange-800 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-100 transition-colors"
          >
            <Plus className="w-4 h-4 text-orange-400" /> 
            {deal.name}
          </button>
        ))}
      </div>
    </Card>
  );
};
