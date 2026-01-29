import React from 'react';
import { GridDemo } from './GridDemo';
import { SpaceDemo } from './SpaceDemo';
import { CollapseDemo } from './CollapseDemo';

export const LayoutsGallery: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">布局组件 (Layout Components)</h2>
        <p className="text-gray-500">用于处理页面布局和结构的组件。</p>
      </div>

      <section id="grid">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">栅格系统 (Grid System)</h3>
        <GridDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="space">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">间距 (Space)</h3>
        <SpaceDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="collapse">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">折叠面板 (Collapse)</h3>
        <CollapseDemo />
      </section>
    </div>
  );
};
