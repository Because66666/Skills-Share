import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/atoms/Card';
import { useChartTheme } from '@/hooks/useChartTheme';

export interface TrendChartProps {
  data: any[];
  xField: string;
  yField: string;
  color?: string;
  height?: number;
  title?: string;
  className?: string;
  gradient?: boolean;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  xField,
  yField,
  color = '#22c55e',
  height = 250,
  title,
  className,
  gradient = true,
}) => {
  const theme = useChartTheme();

  return (
    <Card className={className}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">{title}</h3>
        </div>
      )}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
             {gradient && (
              <defs>
                <linearGradient id={`color-${yField}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
            )}
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
              tickFormatter={(value) => `${value}`}
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
            />
            <Area 
              type="monotone" 
              dataKey={yField} 
              stroke={color} 
              strokeWidth={2}
              fill={gradient ? `url(#color-${yField})` : color}
              fillOpacity={gradient ? 1 : 0.1}
              activeDot={{ r: 6, strokeWidth: 0, fill: color }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
