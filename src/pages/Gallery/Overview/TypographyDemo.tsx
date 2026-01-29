import React from 'react';
import { DemoBlock } from '../components/DemoBlock';

export const TypographyDemo: React.FC = () => {
  return (
    <DemoBlock 
      title="排版 (Typography)" 
      description="标题和正文样式。"
      code={`<h1 className="text-3xl font-bold">H1 标题</h1>
<h2 className="text-2xl font-bold">H2 标题</h2>
<h3 className="text-xl font-semibold">H3 标题</h3>
<p className="text-base text-gray-600">正文内容...</p>`}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-100 pb-6">
          <span className="text-gray-400 text-sm font-mono">H1 / 30px / Bold</span>
          <h1 className="text-3xl font-bold text-gray-900">敏捷的棕色狐狸</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-100 pb-6">
          <span className="text-gray-400 text-sm font-mono">H2 / 24px / Bold</span>
          <h2 className="text-2xl font-bold text-gray-900">敏捷的棕色狐狸</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-100 pb-6">
          <span className="text-gray-400 text-sm font-mono">H3 / 20px / Semibold</span>
          <h3 className="text-xl font-semibold text-gray-900">敏捷的棕色狐狸</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-100 pb-6">
          <span className="text-gray-400 text-sm font-mono">Body / 16px / Regular</span>
          <p className="text-base text-gray-600">
            敏捷的棕色狐狸跳过了懒惰的狗。这是一个全字母句，包含了字母表中的每一个字母。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <span className="text-gray-400 text-sm font-mono">Small / 14px / Regular</span>
          <p className="text-sm text-gray-500">
            敏捷的棕色狐狸跳过了懒惰的狗。
          </p>
        </div>
      </div>
    </DemoBlock>
  );
};
