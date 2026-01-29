import React from 'react';
import { Card } from '@/components/atoms/Card';
import { ChartData } from '@/mock/dashboard/legalData';
import { useChartTheme } from '@/hooks/useChartTheme';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ContractStatusChartProps {
  data: ChartData[];
  title?: string;
}

export const ContractStatusChart: React.FC<ContractStatusChartProps> = ({ data, title = "合同状态分布" }) => {
  const theme = useChartTheme();

  return (
    <Card title={title} className="h-full min-h-[300px]">
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.gridColor} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: theme.textColor }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: theme.textColor }}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                backgroundColor: theme.tooltipBg,
                borderColor: theme.tooltipBorder,
                color: theme.textColor,
                borderRadius: '8px', 
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
