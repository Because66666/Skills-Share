import React from 'react';
import { Card } from '@/components/atoms/Card';
import { ChartData } from '@/mock/dashboard/legalData';
import { useChartTheme } from '@/hooks/useChartTheme';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';

interface TypeDistributionChartProps {
  data: ChartData[];
  title: string;
}

export const TypeDistributionChart: React.FC<TypeDistributionChartProps> = ({ data, title }) => {
  const theme = useChartTheme();

  return (
    <Card title={title} className="h-full min-h-[300px]">
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
              ))}
            </Pie>
            <Tooltip 
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
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => <span style={{ color: theme.textColor }} className="text-sm ml-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
