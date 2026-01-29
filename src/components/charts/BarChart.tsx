import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/atoms/Card';
import { useChartTheme } from '@/hooks/useChartTheme';

export interface BarChartProps {
  data: any[];
  xField: string;
  yField: string;
  color?: string;
  height?: number;
  title?: string;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xField,
  yField,
  color = '#3b82f6',
  height = 250,
  title,
  className,
}) => {
  const theme = useChartTheme();

  return (
    <Card className={className}>
      {title && <h3 className="font-bold text-xl mb-6">{title}</h3>}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={theme.gridColor} />
            <XAxis 
              dataKey={xField} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: theme.textColor, fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: theme.textColor, fontSize: 12 }}
            />
            <Tooltip 
               contentStyle={{ 
                 backgroundColor: theme.tooltipBg,
                 borderColor: theme.tooltipBorder,
                 color: theme.textColor,
                 borderRadius: '12px', 
                 borderWidth: '1px',
                 borderStyle: 'solid',
                 boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
               }}
               cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey={yField} fill={color} radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
