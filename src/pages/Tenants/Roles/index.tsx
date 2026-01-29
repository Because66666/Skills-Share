import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { Table, Column } from '@/components/data-display/Table';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Badge } from '@/components/atoms/Badge';
import { useMessage } from '@/components/feedback/Message';
import { Pagination } from '@/components/molecules/Pagination';
import { useClientPagination } from '@/hooks/useClientPagination';
import { Plus, Edit, Trash2, Shield, Search, RefreshCcw } from 'lucide-react';
import { roleService, Role } from '@/services/roleService';

export const TenantRolesPage: React.FC = () => {
  const message = useMessage();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const data = await roleService.getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      message.error('获取角色列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Filter roles
  const filteredRoles = roles.filter(role => {
    const matchesSearch = 
      role.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const { currentData, paginationProps } = useClientPagination(filteredRoles);

  const handleResetFilters = () => {
    setSearchTerm('');
    message.success('筛选条件已重置');
  };

  const columns: Column<Role>[] = [
    {
      key: 'name',
      title: '角色名称',
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{record.name}</span>
        </div>
      ),
    },
    {
      key: 'description',
      title: '描述',
      render: (value) => <span className="text-gray-500 text-sm truncate max-w-xs block" title={value}>{value || '-'}</span>,
    },
    {
      key: 'userCount',
      title: '绑定用户数',
      render: (_, record) => <Badge variant="secondary">{(record as any)._count?.users || 0} 人</Badge>,
    },
    {
      key: 'createdAt',
      title: '创建时间',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions',
      title: '操作',
      align: 'right',
      render: (_, record) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => message.info(`配置权限: ${record.name}`)}>
            <Shield className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => message.info(`编辑角色: ${record.name}`)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={async () => {
            if (window.confirm(`确定要删除角色 ${record.name} 吗？`)) {
              try {
                await roleService.deleteRole(record.id);
                message.success('删除成功');
                fetchRoles();
              } catch (error) {
                message.error('删除失败');
              }
            }
          }}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      title="角色管理"
      subtitle="定义系统角色及对应的功能权限"
      breadcrumb={[
        { label: '首页', href: '/dashboard' },
        { label: '系统设置', href: '/SystemSettings' },
        { label: '角色管理' },
      ]}
      extra={
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => message.info('新建角色')}>
          新建角色
        </Button>
      }
    >
      <Card className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input 
                placeholder="搜索角色名称..." 
                leftIcon={<Search className="w-4 h-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Button variant="outline" leftIcon={<RefreshCcw className="w-4 h-4" />} onClick={handleResetFilters}>
            重置
          </Button>
        </div>

        <Table columns={columns} dataSource={currentData} loading={loading} rowKey="id" />

        <Pagination {...paginationProps} />
      </Card>
    </PageContainer>
  );
};
