import React from 'react';
import { Card } from '@/components/atoms/Card';
import { RadarData } from '@/mock/dashboard/legalData';
import { useChartTheme } from '@/hooks/useChartTheme';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface RiskRadarChartProps {
  data: RadarData[];
  title?: string;
}

export const RiskRadarChart: React.FC<RiskRadarChartProps> = ({ data, title = "风险多维分析" }) => {
  const theme = useChartTheme();

  return (
    <Card title={title} className="h-full min-h-[300px]">
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke={theme.gridColor} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: theme.textColor, fontSize: 12 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar
              name="风险指数"
              dataKey="A"
              stroke="#ef4444"
              strokeWidth={2}
              fill="#ef4444"
              fillOpacity={0.2}
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
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
