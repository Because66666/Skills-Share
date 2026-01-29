import React from 'react';
import { PieChart } from '@/components/charts/PieChart';
import { DemoBlock } from '../components/DemoBlock';

export const PieChartDemo: React.FC = () => {
  const data = [
    { name: 'A 组', value: 400 },
    { name: 'B 组', value: 300 },
    { name: 'C 组', value: 300 },
    { name: 'D 组', value: 200 },
  ];

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="环形图" 
        description="带有内半径的饼图。"
        code={`<PieChart 
  title="分布"
  data={data} 
  angleField="value" 
  colorField="name" 
  innerRadius={60}
  outerRadius={100}
/>`}
      >
        <div className="max-w-2xl">
          <PieChart 
            title="分布"
            data={data} 
            angleField="value" 
            colorField="name" 
            innerRadius={60}
            outerRadius={100}
          />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="实心饼图" 
        description="标准饼图。"
        code={`<PieChart 
  data={data} 
  angleField="value" 
  colorField="name" 
  innerRadius={0}
/>`}
      >
        <div className="max-w-2xl">
          <PieChart 
            title="全分布"
            data={data} 
            angleField="value" 
            colorField="name" 
            innerRadius={0}
            outerRadius={100}
          />
        </div>
      </DemoBlock>
    </div>
  );
};
