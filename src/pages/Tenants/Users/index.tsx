import React, { useState, useEffect } from 'react';
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
import { Plus, Search, Edit, Trash2, KeyRound } from 'lucide-react';
import { userService, User } from '@/services/userService';
import { roleService, Role } from '@/services/roleService';

export const TenantUsersPage: React.FC = () => {
  const message = useMessage();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await roleService.getRoles();
        setRoles(data);
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };
    fetchRoles();
  }, []);

  // Fetch users when filters change
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers({
        search: searchTerm,
        roleId: roleFilter
      });
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simple debounce for search
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, roleFilter]);

  const { currentData, paginationProps } = useClientPagination(users);

  const getStatusBadge = (_?: string) => {
    // Current user model doesn't have status, assume active if exists
    return <Badge variant="success">正常</Badge>;
  };

  const columns: Column<User>[] = [
    {
      key: 'name',
      title: '用户信息',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(record.name || 'User')}&background=random`} 
            alt={record.name} 
            className="w-8 h-8 rounded-full" 
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{record.name || '未命名'}</span>
            <span className="text-xs text-gray-500">{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'orgName',
      title: '所属组织',
      render: (_, record) => <span className="text-sm text-gray-700">{record.tenant?.name || '-'}</span>,
    },
    {
      key: 'roleName',
      title: '角色',
      render: (_, record) => <Badge variant="primary">{record.role?.name || '-'}</Badge>,
    },
    {
      key: 'status',
      title: '状态',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'createdAt',
      title: '创建时间',
      render: (value) => value ? new Date(value).toLocaleString() : '-',
    },
    {
      key: 'actions',
      title: '操作',
      align: 'right',
      render: (_, record) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => message.info(`重置密码: ${record.name}`)}>
            <KeyRound className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => message.info(`编辑用户: ${record.name}`)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={async () => {
            if (window.confirm(`确定要删除用户 ${record.name} 吗？`)) {
              try {
                await userService.deleteUser(record.id);
                message.success('删除成功');
                fetchUsers();
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

  const roleOptions = [
    { label: '全部角色', value: 'all' },
    ...roles.map(r => ({ label: r.name, value: r.id }))
  ];

  return (
    <PageContainer
      title="用户管理"
      subtitle="管理租户下的所有用户账户及权限"
      breadcrumb={[
        { label: '首页', href: '/dashboard' },
        { label: '系统设置', href: '/SystemSettings' },
        { label: '用户管理' },
      ]}
      extra={
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => message.info('新建用户功能待开发')}>
          新建用户
        </Button>
      }
    >
      <Card className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input 
                placeholder="搜索用户姓名或邮箱..." 
                leftIcon={<Search className="w-4 h-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-40">
              <Select
                placeholder="角色筛选"
                options={roleOptions}
                value={roleFilter}
                onChange={(val) => setRoleFilter(val as string)}
              />
            </div>
          </div>
          <Button variant="outline">批量导入</Button>
        </div>

        <Table columns={columns} dataSource={currentData} loading={loading} rowKey="id" />
        
        <Pagination {...paginationProps} />
      </Card>
    </PageContainer>
  );
};

