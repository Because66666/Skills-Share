import React from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { DemoBlock } from '../components/DemoBlock';
import { User } from 'lucide-react';

export const AvatarDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="头像类型" 
        description="图片、文本和图标头像。"
        code={`<Avatar src="https://i.pravatar.cc/150?u=1" alt="User 1" />
<Avatar alt="John Doe" />
<Avatar icon={<User className="w-5 h-5" />} />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <Avatar src="https://i.pravatar.cc/150?u=1" alt="用户 1" />
          <Avatar alt="约翰·多伊" />
          <Avatar icon={<User className="w-5 h-5" />} />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="头像尺寸" 
        description="小、中、大和超大尺寸。"
        code={`<Avatar size="sm" alt="SM" />
<Avatar size="md" alt="MD" />
<Avatar size="lg" alt="LG" />
<Avatar size="xl" alt="XL" />`}
      >
        <div className="flex flex-wrap gap-4 items-end">
          <Avatar size="sm" alt="小" />
          <Avatar size="md" alt="中" />
          <Avatar size="lg" alt="大" />
          <Avatar size="xl" alt="超大" />
        </div>
      </DemoBlock>
    </div>
  );
};
