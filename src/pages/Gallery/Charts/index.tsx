import React from 'react';
import { BarChartDemo } from './BarChartDemo';
import { PieChartDemo } from './PieChartDemo';
import { TrendChartDemo } from './TrendChartDemo';

export const ChartsGallery: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">图表 (Charts)</h2>
        <p className="text-gray-500">使用 Recharts 进行数据的可视化展示。</p>
      </div>

      <section id="bar">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">柱状图 (Bar Chart)</h3>
        <BarChartDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="pie">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">饼图 (Pie Chart)</h3>
        <PieChartDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="trend">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">趋势图 (Trend Chart)</h3>
        <TrendChartDemo />
      </section>
    </div>
  );
};
