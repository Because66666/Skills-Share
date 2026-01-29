import React from 'react';
import { Card } from '@/components/atoms/Card';
import { GrowthData } from '@/mock/dashboardData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useChartTheme } from '@/hooks/useChartTheme';

interface GrowthChartWidgetProps {
  data: GrowthData[];
  className?: string;
}

export const GrowthChartWidget: React.FC<GrowthChartWidgetProps> = ({ data, className }) => {
  const { gridColor, textColor, tooltipBg, tooltipBorder } = useChartTheme();

  return (
    <Card className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">增长趋势</h3>
        <div className="flex items-center gap-2">
           <select className="bg-transparent text-gray-500 dark:text-gray-400 text-sm border-none focus:ring-0 cursor-pointer outline-none font-medium">
            <option>按年</option>
            <option>按月</option>
          </select>
        </div>
      </div>
      
      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: `1px solid ${tooltipBorder}`, 
                backgroundColor: tooltipBg,
                color: textColor,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#22c55e" 
              strokeWidth={2}
              fill="url(#colorValue)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#22c55e' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
