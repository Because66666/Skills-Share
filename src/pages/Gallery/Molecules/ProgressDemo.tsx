import React from 'react';
import { Progress } from '@/components/molecules/Progress';
import { DemoBlock } from '../components/DemoBlock';

export const ProgressDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="线性进度条" 
        description="标准进度条。"
        code={`<Progress percent={30} />
<Progress percent={50} status="active" />
<Progress percent={70} status="exception" />
<Progress percent={100} status="success" />`}
      >
        <div className="max-w-md space-y-4">
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} status="success" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="环形进度条" 
        description="圆形进度指示器。"
        code={`<Progress type="circle" percent={75} />
<Progress type="circle" percent={100} status="success" />
<Progress type="circle" percent={40} status="exception" />`}
      >
        <div className="flex gap-8">
          <Progress type="circle" percent={75} />
          <Progress type="circle" percent={100} status="success" />
          <Progress type="circle" percent={40} status="exception" />
        </div>
      </DemoBlock>
    </div>
  );
};
