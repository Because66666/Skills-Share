import React from 'react';
import { Collapse, CollapseItemProps } from '@/components/layouts/Collapse';
import { DemoBlock } from '../components/DemoBlock';

export const CollapseDemo: React.FC = () => {
  const items: CollapseItemProps[] = [
    {
      key: '1',
      title: '面板标题 1',
      children: <p>狗是一种驯化的动物。它们以忠诚和忠实而闻名，是世界各地许多家庭中受欢迎的客人。</p>,
    },
    {
      key: '2',
      title: '面板标题 2',
      children: <p>猫是一种小型食肉哺乳动物。它是猫科动物中唯一的驯化物种，通常被称为家猫，以区别于该家族的野生成员。</p>,
    },
    {
      key: '3',
      title: '面板标题 3',
      children: <p>鸟类是鸟纲的成员，这是一群温血脊椎动物，其特征是羽毛、无齿喙、产硬壳蛋、高代谢率、四腔心脏和坚固而轻便的骨骼。</p>,
    },
  ];

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="基础折叠面板" 
        description="可以同时展开多个面板。"
        code={`<Collapse items={items} defaultActiveKey={['1']} />`}
      >
        <div className="max-w-xl">
          <Collapse items={items} defaultActiveKey={['1']} />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="手风琴模式" 
        description="每次只能展开一个面板。"
        code={`<Collapse accordion items={items} />`}
      >
        <div className="max-w-xl">
          <Collapse accordion items={items} />
        </div>
      </DemoBlock>
    </div>
  );
};
