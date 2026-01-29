import React from 'react';
import { TableDemo } from './TableDemo';
import { DataInfoDemo } from './DataInfoDemo';
import { PopupsDemo } from './PopupsDemo';
import { TreeDemo } from './TreeDemo';
import { InteractiveDisplayDemo } from './InteractiveDisplayDemo';

export const DataDisplayGallery: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">数据展示 (Data Display)</h2>
        <p className="text-gray-500">用于以各种方式展示数据的组件。</p>
      </div>

      <section id="table">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">表格 (Table)</h3>
        <TableDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="info">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">信息展示 (Information)</h3>
        <DataInfoDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="popups">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">弹出提示 (Popups)</h3>
        <PopupsDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="tree">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">树形控件 (Tree)</h3>
        <TreeDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="interactive">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">交互展示 (Interactive)</h3>
        <InteractiveDisplayDemo />
      </section>
    </div>
  );
};
