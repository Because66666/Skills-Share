import React from 'react';
import { Spin } from '@/components/atoms/Spin';
import { Skeleton } from '@/components/atoms/Skeleton';
import { DemoBlock } from '../components/DemoBlock';
import { Card } from '@/components/atoms/Card';

export const StatusDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="加载中 (Spin)" 
        description="不同尺寸的加载指示器。"
        code={`<Spin size="sm" />
<Spin size="md" />
<Spin size="lg" />`}
      >
        <div className="flex items-center gap-8">
          <Spin size="sm" />
          <Spin size="md" />
          <Spin size="lg" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="骨架屏 (Skeleton)" 
        description="加载状态的占位符。"
        code={`<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="text" width={200} />
<Skeleton variant="rectangular" width="100%" height={100} />`}
      >
        <div className="space-y-4 max-w-md">
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="space-y-2 flex-1">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
          <Skeleton variant="rectangular" width="100%" height={100} className="rounded-lg" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="卡片加载示例" 
        description="在卡片中组合使用骨架屏。"
        code={`<Card>
  <div className="flex gap-4">
    <Skeleton variant="circular" width={48} height={48} />
    <div className="space-y-2 flex-1">
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  </div>
</Card>`}
      >
        <div className="max-w-md">
          <Card>
            <div className="flex gap-4">
              <Skeleton variant="circular" width={48} height={48} />
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </div>
            </div>
          </Card>
        </div>
      </DemoBlock>
    </div>
  );
};
