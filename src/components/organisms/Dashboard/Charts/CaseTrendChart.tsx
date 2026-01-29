import React from 'react';
import { Card } from '@/components/atoms/Card';
import { TrendData } from '@/mock/dashboard/legalData';
import { useChartTheme } from '@/hooks/useChartTheme';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface CaseTrendChartProps {
  data: TrendData[];
  title?: string;
}

export const CaseTrendChart: React.FC<CaseTrendChartProps> = ({ data, title = "案件趋势分析" }) => {
  const theme = useChartTheme();

  return (
    <Card title={title} className="h-full min-h-[300px]">
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
