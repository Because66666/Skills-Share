import React from 'react';
import { Tree } from '@/components/data-display/Tree';
import { DemoBlock } from '../components/DemoBlock';

export const TreeDemo: React.FC = () => {
  const treeData = [
    {
      title: '父节点 1',
      key: '0-0',
      children: [
        {
          title: '子节点 1-1',
          key: '0-0-0',
          children: [
            { title: '叶子节点 1-1-1', key: '0-0-0-0' },
            { title: '叶子节点 1-1-2', key: '0-0-0-1' },
          ],
        },
        {
          title: '子节点 1-2',
          key: '0-0-1',
          children: [
            { title: '叶子节点 1-2-1', key: '0-0-1-0' },
          ],
        },
      ],
    },
    {
      title: '父节点 2',
      key: '0-1',
      children: [
        { title: '子节点 2-1', key: '0-1-0' },
        { title: '子节点 2-2', key: '0-1-1' },
      ],
    },
  ];

  return (
    <DemoBlock 
      title="树形控件 (Tree)" 
      description="树形结构展示。"
      code={`<Tree treeData={treeData} defaultExpandedKeys={['0-0-0', '0-0-1']} />`}
    >
      <Tree 
        data={treeData} 
      />
    </DemoBlock>
  );
};
