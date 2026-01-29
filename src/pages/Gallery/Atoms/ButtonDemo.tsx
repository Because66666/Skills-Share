import React from 'react';
import { Button } from '@/components/atoms/Button';
import { DemoBlock } from '../components/DemoBlock';
import { Plus, Trash, Save, Download } from 'lucide-react';

export const ButtonDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="按钮变体" 
        description="主要、次要、轮廓、幽灵、危险和链接样式。"
        code={`<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="danger">危险按钮</Button>
<Button variant="link">链接按钮</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="danger">危险按钮</Button>
          <Button variant="link">链接按钮</Button>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="按钮尺寸" 
        description="小、默认和大尺寸。"
        code={`<Button size="sm">小号</Button>
<Button size="md">默认</Button>
<Button size="lg">大号</Button>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">小号</Button>
          <Button size="md">默认</Button>
          <Button size="lg">大号</Button>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="按钮状态" 
        description="加载中和禁用状态。"
        code={`<Button loading>加载中</Button>
<Button disabled>已禁用</Button>
<Button variant="outline" disabled>禁用轮廓</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button loading>加载中</Button>
          <Button disabled>已禁用</Button>
          <Button variant="outline" disabled>禁用轮廓</Button>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="带图标" 
        description="带有前置或后置图标的按钮。"
        code={`<Button leftIcon={<Plus className="w-4 h-4" />}>添加项目</Button>
<Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>下载</Button>
<Button variant="danger" leftIcon={<Trash className="w-4 h-4" />}>删除</Button>
<Button variant="ghost" leftIcon={<Save className="w-4 h-4" />}>保存</Button>`}
      >
        <div className="flex flex-wrap gap-4">
          <Button leftIcon={<Plus className="w-4 h-4" />}>添加项目</Button>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>下载</Button>
          <Button variant="danger" leftIcon={<Trash className="w-4 h-4" />}>删除</Button>
          <Button variant="ghost" leftIcon={<Save className="w-4 h-4" />}>保存</Button>
        </div>
      </DemoBlock>
    </div>
  );
};
