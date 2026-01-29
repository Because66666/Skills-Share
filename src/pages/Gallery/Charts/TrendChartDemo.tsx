import React from 'react';
import { TrendChart } from '@/components/charts/TrendChart';
import { DemoBlock } from '../components/DemoBlock';

export const TrendChartDemo: React.FC = () => {
  const data = [
    { name: '周一', uv: 4000, pv: 2400, amt: 2400 },
    { name: '周二', uv: 3000, pv: 1398, amt: 2210 },
    { name: '周三', uv: 2000, pv: 9800, amt: 2290 },
    { name: '周四', uv: 2780, pv: 3908, amt: 2000 },
    { name: '周五', uv: 1890, pv: 4800, amt: 2181 },
    { name: '周六', uv: 2390, pv: 3800, amt: 2500 },
    { name: '周日', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="趋势图" 
        description="带有渐变填充的面积图。"
        code={`<TrendChart 
  title="周趋势"
  data={data} 
  xField="name" 
  yField="uv" 
/>`}
      >
        <div className="max-w-2xl">
          <TrendChart 
            title="周趋势"
            data={data} 
            xField="name" 
            yField="uv" 
          />
        </div>
      </DemoBlock>
    </div>
  );
};
