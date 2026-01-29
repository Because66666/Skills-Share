import React from 'react';
import { ButtonDemo } from './ButtonDemo';
import { InputDemo } from './InputDemo';
import { BadgeTagDemo } from './BadgeTagDemo';
import { AvatarDemo } from './AvatarDemo';
import { SelectionControlsDemo } from './SelectionControlsDemo';
import { InputNumberDemo } from './InputNumberDemo';
import { StatusDemo } from './StatusDemo';
import { ContainerDemo } from './ContainerDemo';

export const AtomsGallery: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">原子组件 (Atom Components)</h2>
        <p className="text-gray-500">界面的最小构建块。</p>
      </div>

      <section id="button">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">按钮 (Button)</h3>
        <ButtonDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="input">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">输入框 (Input)</h3>
        <InputDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="input-number">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">数字输入 (Input Number)</h3>
        <InputNumberDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="selection">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">选择控件 (Selection Controls)</h3>
        <SelectionControlsDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="badge-tag">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">徽标与标签 (Badge & Tag)</h3>
        <BadgeTagDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="avatar">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">头像 (Avatar)</h3>
        <AvatarDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="status">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">状态 (Spin & Skeleton)</h3>
        <StatusDemo />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section id="container">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">容器 (Card & Divider)</h3>
        <ContainerDemo />
      </section>
    </div>
  );
};
