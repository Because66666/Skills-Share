import React from 'react';
import { Input } from '@/components/atoms/Input';
import { DemoBlock } from '../components/DemoBlock';
import { Search, Mail, Lock } from 'lucide-react';

export const InputDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="基础输入框" 
        description="标准输入字段。"
        code={`<Input placeholder="输入你的名字" />`}
      >
        <div className="max-w-md">
          <Input placeholder="输入你的名字" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="带图标的输入框" 
        description="带有左侧或右侧图标的输入框。"
        code={`<Input leftIcon={<Search className="w-4 h-4" />} placeholder="搜索..." />
<Input leftIcon={<Mail className="w-4 h-4" />} placeholder="电子邮件地址" />
<Input leftIcon={<Lock className="w-4 h-4" />} type="password" placeholder="密码" />`}
      >
        <div className="max-w-md space-y-4">
          <Input leftIcon={<Search className="w-4 h-4" />} placeholder="搜索..." />
          <Input leftIcon={<Mail className="w-4 h-4" />} placeholder="电子邮件地址" />
          <Input leftIcon={<Lock className="w-4 h-4" />} type="password" placeholder="密码" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="输入框状态" 
        description="错误和禁用状态。"
        code={`<Input error placeholder="错误状态" />
<Input disabled placeholder="禁用输入框" />`}
      >
        <div className="max-w-md space-y-4">
          <Input error placeholder="错误状态" />
          <Input disabled placeholder="禁用输入框" />
        </div>
      </DemoBlock>
    </div>
  );
};
