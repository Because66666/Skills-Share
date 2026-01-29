import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import { Tag } from '@/components/atoms/Tag';
import { DemoBlock } from '../components/DemoBlock';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export const BadgeTagDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="徽标变体" 
        description="状态指示器。"
        code={`<Badge variant="default">默认</Badge>
<Badge variant="success">成功</Badge>
<Badge variant="warning">警告</Badge>
<Badge variant="danger">危险</Badge>
<Badge variant="primary">主要</Badge>`}
      >
        <div className="flex flex-wrap gap-4">
          <Badge variant="default">默认</Badge>
          <Badge variant="success">成功</Badge>
          <Badge variant="warning">警告</Badge>
          <Badge variant="danger">危险</Badge>
          <Badge variant="primary">主要</Badge>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="标签" 
        description="交互式标签/纸片。"
        code={`<Tag label="标签 1" />
<Tag label="标签 2" icon={<CheckCircle className="w-3 h-3" />} />
<Tag label="可移除" onClose={() => alert('已关闭')} />`}
      >
        <div className="flex flex-wrap gap-4">
          <Tag label="标签 1" />
          <Tag label="标签 2" icon={<CheckCircle className="w-3 h-3" />} />
          <Tag label="可移除" onClose={() => console.log('已关闭')} />
          <Tag label="错误" icon={<AlertTriangle className="w-3 h-3" />} className="bg-red-50 text-red-700 border-red-200" />
        </div>
      </DemoBlock>
    </div>
  );
};
