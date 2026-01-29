import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Divider } from '@/components/atoms/Divider';
import { DemoBlock } from '../components/DemoBlock';

export const ContainerDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="卡片 (Card)" 
        description="带有阴影和内边距的简单容器。"
        code={`<Card>
  <h4 className="font-bold">卡片标题</h4>
  <p className="text-gray-500">卡片内容在这里。</p>
</Card>`}
      >
        <div className="max-w-md bg-gray-50 p-4 rounded-xl">
            <Card>
            <h4 className="font-bold mb-2">卡片标题</h4>
            <p className="text-gray-500 text-sm">
                卡片用于对相关信息和操作进行分组。
                它们提供干净的背景和阴影，将内容与页面分隔开。
            </p>
            </Card>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="分割线 (Divider)" 
        description="水平和垂直分割线。"
        code={`<Divider />
<div className="flex h-10 items-center">
  <span>链接 1</span>
  <Divider orientation="vertical" />
  <span>链接 2</span>
</div>`}
      >
        <div className="max-w-md space-y-6">
            <div>
                <p className="text-sm text-gray-500">段落 1</p>
                <Divider />
                <p className="text-sm text-gray-500">段落 2</p>
            </div>
            
            <div className="flex h-6 items-center text-sm text-gray-600 border border-gray-200 rounded-lg p-4 w-fit">
                <span>编辑</span>
                <Divider orientation="vertical" />
                <span>复制</span>
                <Divider orientation="vertical" />
                <span className="text-red-500">删除</span>
            </div>
        </div>
      </DemoBlock>
    </div>
  );
};
