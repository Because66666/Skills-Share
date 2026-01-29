import React from 'react';
import { Space } from '@/components/layouts/Space';
import { Button } from '@/components/atoms/Button';
import { DemoBlock } from '../components/DemoBlock';

export const SpaceDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="基础间距" 
        description="避免直接使用 margin。"
        code={`<Space>
  <Button>按钮</Button>
  <Button>按钮</Button>
  <Button>按钮</Button>
</Space>`}
      >
        <Space>
          <Button variant="primary">主要</Button>
          <Button variant="secondary">次要</Button>
          <Button variant="outline">轮廓</Button>
        </Space>
      </DemoBlock>

      <DemoBlock 
        title="垂直间距" 
        description="垂直堆叠元素。"
        code={`<Space direction="vertical">
  <Card>卡片 1</Card>
  <Card>卡片 2</Card>
</Space>`}
      >
        <Space direction="vertical" className="w-full max-w-xs">
          <div className="bg-gray-50 p-4 rounded border">区块 1</div>
          <div className="bg-gray-50 p-4 rounded border">区块 2</div>
          <div className="bg-gray-50 p-4 rounded border">区块 3</div>
        </Space>
      </DemoBlock>

      <DemoBlock 
        title="尺寸" 
        description="控制间隙大小。"
        code={`<Space size="lg">...</Space>
<Space size={32}>...</Space>`}
      >
        <Space size="lg">
          <Button size="sm">大间距</Button>
          <Button size="sm">大间距</Button>
          <Button size="sm">大间距</Button>
        </Space>
      </DemoBlock>
    </div>
  );
};
