import React from 'react';
import { BarChart } from '@/components/charts/BarChart';
import { DemoBlock } from '../components/DemoBlock';

export const BarChartDemo: React.FC = () => {
  const data = [
    { month: '1月', sales: 4000 },
    { month: '2月', sales: 3000 },
    { month: '3月', sales: 2000 },
    { month: '4月', sales: 2780 },
    { month: '5月', sales: 1890 },
    { month: '6月', sales: 2390 },
  ];

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="基础柱状图" 
        description="展示月度销售额的简单柱状图。"
        code={`<BarChart 
  title="月度销售额"
  data={data} 
  xField="month" 
  yField="sales" 
/>`}
      >
        <div className="max-w-2xl">
          <BarChart 
            title="月度销售额"
            data={data} 
            xField="month" 
            yField="sales" 
          />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="自定义颜色" 
        description="带有自定义颜色的柱状图。"
        code={`<BarChart 
  color="#f97316"
  data={data} 
  xField="month" 
  yField="sales" 
/>`}
      >
        <div className="max-w-2xl">
          <BarChart 
            color="#f97316"
            title="销售额 (橙色)"
            data={data} 
            xField="month" 
            yField="sales" 
          />
        </div>
      </DemoBlock>
    </div>
  );
};
