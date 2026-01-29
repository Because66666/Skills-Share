import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Customer } from '@/mock/dashboardData';
import { ArrowRight, MessageCircle, Star, Pencil, MoreVertical } from 'lucide-react';

interface CustomersWidgetProps {
  customers: Customer[];
  className?: string;
}

export const CustomersWidget: React.FC<CustomersWidgetProps> = ({ customers, className }) => {
  return (
    <Card className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl">客户</h3>
        <button className="text-gray-400 flex items-center gap-1 text-sm hover:text-gray-600 transition-colors">
          按最新排序 <ArrowRight className="w-3 h-3 rotate-90" />
        </button>
      </div>
      
      <div className="space-y-2 flex-1 overflow-y-auto pr-2">
        {customers.map((customer) => (
          <div key={customer.id} className="flex items-center justify-between p-3 hover:bg-orange-50 rounded-2xl transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
              <img 
                src={customer.avatar} 
                alt={customer.name} 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div>
                <h4 className="font-bold text-sm text-gray-900">{customer.name}</h4>
                <p className="text-xs text-gray-400">{customer.company}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                <Star className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-2">
        <a href="#" className="text-orange-800 text-sm font-medium hover:underline flex items-center gap-1">
          查看所有客户 <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </Card>
  );
};
