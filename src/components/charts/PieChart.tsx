import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/atoms/Card';
import { useChartTheme } from '@/hooks/useChartTheme';

export interface PieChartProps {
  data: any[];
  angleField: string;
  colorField: string;
  colors?: string[];
  height?: number;
  title?: string;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const PieChart: React.FC<PieChartProps> = ({
  data,
  angleField,
  colorField,
  colors = DEFAULT_COLORS,
  height = 300,
  title,
  className,
  innerRadius = 0,
  outerRadius = 80,
}) => {
  const theme = useChartTheme();

  return (
    <Card className={className}>
      {title && <h3 className="font-bold text-xl mb-6">{title}</h3>}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey={angleField}
              nameKey={colorField}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
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
            />
            <Legend verticalAlign="bottom" height={36}/>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
