import React from 'react';
import { Table } from '@/components/data-display/Table';
import { DemoBlock } from '../components/DemoBlock';
import { Badge } from '@/components/atoms/Badge';

export const TableDemo: React.FC = () => {
  const columns = [
    { title: '姓名', key: 'name' as const },
    { title: '年龄', key: 'age' as const },
    { title: '角色', key: 'role' as const, render: (val: string) => <Badge variant={val === 'Admin' ? 'success' : 'default'}>{val === 'Admin' ? '管理员' : '用户'}</Badge> },
    { title: '地址', key: 'address' as const },
  ];

  const data = [
    { id: '1', name: '约翰·多伊', age: 32, role: 'Admin', address: '纽约市第一湖畔公园' },
    { id: '2', name: '简·多伊', age: 24, role: 'User', address: '伦敦市第一湖畔公园' },
    { id: '3', name: '乔·布莱克', age: 28, role: 'User', address: '悉尼市第一湖畔公园' },
  ];

  return (
    <DemoBlock 
      title="表格 (Table)" 
      description="带有列定义的基础表格。"
      code={`<Table 
  columns={columns} 
  data={data} 
  rowKey="id"
/>`}
    >
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id"
      />
    </DemoBlock>
  );
};
