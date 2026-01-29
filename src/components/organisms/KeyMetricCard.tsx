import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Metric } from '@/mock/dashboardData';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface KeyMetricCardProps {
  metric: Metric;
}

export const KeyMetricCard: React.FC<KeyMetricCardProps> = ({ metric }) => {
  if (metric.type === 'goal') {
    const data = [
      { name: '已完成', value: metric.goalPercentage || 0 },
      { name: '剩余', value: 100 - (metric.goalPercentage || 0) },
    ];
    const COLORS = ['#f97316', '#ffe4c4']; // Orange-500, Orange-100 (approx)

    return (
      <Card className="flex flex-col justify-between h-[200px] relative overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <h3 className="font-bold text-lg">{metric.title}</h3>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pt-8">
           <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
           </div>
           <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
             <span className="text-4xl font-bold text-gray-900">{metric.value}</span>
           </div>
        </div>

        <div className="mt-auto z-10 text-center w-full">
          <a href="#" className="text-orange-800 text-sm font-medium hover:underline flex items-center justify-center gap-1">
            {metric.linkText} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col justify-between h-[200px]">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-bold text-lg">{metric.title}</h3>
        </div>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-5xl font-bold tracking-tight text-gray-900">{metric.value}</span>
          {metric.trend && (
            <span className="text-green-500 flex items-center mb-2 font-medium">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          )}
        </div>
        {metric.description && (
          <p className="text-gray-400 text-sm">{metric.description}</p>
        )}
      </div>
      <a href="#" className="text-orange-800 text-sm font-medium hover:underline flex items-center gap-1">
        {metric.linkText} <ArrowRight className="w-4 h-4" />
      </a>
    </Card>
  );
};
