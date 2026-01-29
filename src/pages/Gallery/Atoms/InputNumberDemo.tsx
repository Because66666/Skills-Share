import React from 'react';
import { InputNumber } from '@/components/atoms/InputNumber';
import { DemoBlock } from '../components/DemoBlock';

export const InputNumberDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="基础数字输入" 
        description="带有控制按钮的标准数字输入框。"
        code={`<InputNumber placeholder="输入金额" />`}
      >
        <div className="max-w-xs">
          <InputNumber placeholder="输入金额" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="最小值、最大值和步长" 
        description="设置限制 (0-10) 和步长 (0.5)。"
        code={`<InputNumber min={0} max={10} step={0.5} defaultValue={5} />`}
      >
        <div className="max-w-xs">
          <InputNumber min={0} max={10} step={0.5} defaultValue={5} />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="状态" 
        description="禁用和错误状态。"
        code={`<InputNumber disabled defaultValue={10} />
<InputNumber error helperText="无效的值" defaultValue={0} />`}
      >
        <div className="max-w-xs space-y-4">
          <InputNumber disabled defaultValue={10} />
          <InputNumber error helperText="无效的值" defaultValue={0} />
        </div>
      </DemoBlock>
    </div>
  );
};
