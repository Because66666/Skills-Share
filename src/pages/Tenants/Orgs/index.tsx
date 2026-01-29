import React, { useState } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { Table, Column } from '@/components/data-display/Table';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Badge } from '@/components/atoms/Badge';
import { Select } from '@/components/molecules/Select';
import { useMessage } from '@/components/feedback/Message';
import { Pagination } from '@/components/molecules/Pagination';
import { useClientPagination } from '@/hooks/useClientPagination';
import { Plus, Edit, Trash2, FolderTree, Search, RefreshCcw } from 'lucide-react';
import { organizations, Organization } from '@/mock/orgData';

export const TenantOrgsPage: React.FC = () => {
  const message = useMessage();
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Recursive filter function for tree data
  const filterOrgTree = (orgs: Organization[]): Organization[] => {
    return orgs.reduce<Organization[]>((acc, org) => {
      // Check if current node matches
      const matchesSearch = 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        org.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.leader.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
      
      const isMatch = matchesSearch && matchesStatus;

      // Process children
      const filteredChildren = org.children ? filterOrgTree(org.children) : undefined;

      // If current node matches, or has matching children, keep it
      if (isMatch || (filteredChildren && filteredChildren.length > 0)) {
        acc.push({
          ...org,
          children: filteredChildren && filteredChildren.length > 0 ? filteredChildren : undefined,
        });
      }

      return acc;
    }, []);
  };

  const filteredOrgs = filterOrgTree(organizations);

  const { currentData, paginationProps } = useClientPagination(filteredOrgs);

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    message.success('筛选条件已重置');
  };

  const columns: Column<Organization>[] = [
    {
      key: 'name',
      title: '组织名称',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-900">{record.name}</span>
        </div>
      ),
    },
    {
      key: 'code',
      title: '组织编码',
    },
    {
      key: 'leader',
      title: '负责人',
    },
    {
      key: 'status',
      title: '状态',
      render: (value) => value === 'active' ? <Badge variant="success">正常</Badge> : <Badge variant="secondary">停用</Badge>,
    },
    {
      key: 'createdAt',
      title: '创建时间',
    },
    {
      key: 'actions',
      title: '操作',
      align: 'right',
      render: (_, record) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => message.info(`新增子部门: ${record.name}`)}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => message.info(`编辑组织: ${record.name}`)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => message.warning(`删除组织: ${record.name}`)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      title="组织管理"
      subtitle="管理租户下的组织架构及部门信息"
      breadcrumb={[
        { label: '首页', href: '/dashboard' },
        { label: '系统设置', href: '/SystemSettings' },
        { label: '组织管理' },
      ]}
      extra={
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => message.info('新建一级组织')}>
          新建组织
        </Button>
      }
    >
      <Card className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input 
                placeholder="搜索组织名称、编码或负责人..." 
                leftIcon={<Search className="w-4 h-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-40">
              <Select
                placeholder="状态筛选"
                options={[
                  { label: '全部状态', value: 'all' },
                  { label: '正常', value: 'active' },
                  { label: '停用', value: 'inactive' },
                ]}
                value={statusFilter}
                onChange={(val) => setStatusFilter(val as string)}
              />
            </div>
          </div>
          
          <Button variant="outline" leftIcon={<RefreshCcw className="w-4 h-4" />} onClick={handleResetFilters}>
            重置
          </Button>
        </div>

        <Table 
          columns={columns} 
          dataSource={currentData} 
          loading={loading} 
          rowKey="id"
          // Assuming Table component handles children property automatically for tree structure
        />
        
        <Pagination {...paginationProps} />
      </Card>
    </PageContainer>
  );
};
