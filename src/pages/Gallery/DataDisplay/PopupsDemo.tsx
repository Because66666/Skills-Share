import React from 'react';
import { Tooltip } from '@/components/data-display/Tooltip';
import { Popover } from '@/components/data-display/Popover';
import { Button } from '@/components/atoms/Button';
import { DemoBlock } from '../components/DemoBlock';

interface TooltipWrapperProps {
  title: string;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ title, children, placement }) => (
  <Tooltip content={title} position={placement}>
    {children}
  </Tooltip>
);

export const PopupsDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="文字提示 (Tooltip)" 
        description="简单的文字提示气泡。"
        code={`<Tooltip title="提示文字"><Button>鼠标悬停</Button></Tooltip>`}
      >
        <div className="flex gap-4">
          <TooltipWrapper title="提示文字">
            <Button>鼠标悬停</Button>
          </TooltipWrapper>
          <TooltipWrapper title="较长的提示文字内容" placement="bottom">
            <Button variant="outline">底部位置</Button>
          </TooltipWrapper>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="气泡卡片 (Popover)" 
        description="复杂内容的弹出卡片。"
        code={`<Popover content={...} title="标题"><Button>点击我</Button></Popover>`}
      >
        <Popover 
          title="卡片标题" 
          content={
            <div className="w-48">
              <p>卡片内容段落一。</p>
              <p>卡片内容段落二。</p>
            </div>
          }
          trigger={<Button variant="secondary">点击我</Button>}
        />
      </DemoBlock>
    </div>
  );
};
