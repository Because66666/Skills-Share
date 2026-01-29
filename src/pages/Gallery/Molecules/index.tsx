import React from 'react';
import { NavigationDemo } from './NavigationDemo';
import { FeedbackDemo } from './FeedbackDemo';
import { FormComponentsDemo } from './FormComponentsDemo';
import { AdvancedInputDemo } from './AdvancedInputDemo';
import { ProgressDemo } from './ProgressDemo';

export const MoleculesGallery: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">分子组件 (Molecule Components)</h2>
        <p className="text-gray-500">由原子组件构建的更复杂的组件。</p>
      </div>

      <section id="navigation">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">导航 (Navigation)</h3>
        <NavigationDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="form">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">表单组件 (Form Components)</h3>
        <FormComponentsDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="advanced">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">高级输入 (Advanced Input)</h3>
        <AdvancedInputDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="feedback">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">反馈 (Feedback)</h3>
        <FeedbackDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="progress">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">进度 (Progress)</h3>
        <ProgressDemo />
      </section>
    </div>
  );
};
