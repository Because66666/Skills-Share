import React from 'react';
import { Card } from '@/components/atoms/Card';
import { StateStat } from '@/mock/dashboardData';

interface TopStatesWidgetProps {
  states: StateStat[];
}

export const TopStatesWidget: React.FC<TopStatesWidgetProps> = ({ states }) => {
  const maxValue = Math.max(...states.map(s => s.value));

  return (
    <Card className="h-full">
       <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-gray-100">热门地区</h3>
       <div className="space-y-4">
         {states.map(state => (
           <div key={state.code} className="relative h-9 bg-orange-50 dark:bg-orange-900/10 rounded-lg overflow-hidden">
             {/* Progress Bar Background */}
             <div 
               className="absolute top-0 left-0 h-full bg-orange-200 dark:bg-orange-800 transition-all duration-1000 ease-out" 
               style={{ width: `${(state.value / maxValue) * 100}%` }}
             />
             
             {/* Content Overlay */}
             <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-bold z-10 text-gray-800 dark:text-gray-200">
               <span className="uppercase">{state.state}</span>
               <span>{state.value / 1000}K</span>
             </div>
           </div>
         ))}
       </div>
    </Card>
  );
};
