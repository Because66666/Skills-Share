import React, { useState } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { Table, Column } from '@/components/data-display/Table';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Badge } from '@/components/atoms/Badge';
import { Select } from '@/components/molecules/Select';
import { DatePicker } from '@/components/molecules/DatePicker';
import { useMessage } from '@/components/feedback/Message';
import { Pagination } from '@/components/molecules/Pagination';
import { useClientPagination } from '@/hooks/useClientPagination';
import { Plus, Search, Edit, Trash2, Eye, RefreshCcw } from 'lucide-react';
import { tenants, Tenant } from '@/mock/tenantData';

export const TenantListPage: React.FC = () => {
  const message = useMessage();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);
  
  // Advanced filters state
  const [filters, setFilters] = useState({
    status: 'all',
    plan: 'all',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  // Filter tenants logic
  const filteredTenants = tenants.filter(tenant => {
    // 1. Keyword search
    const matchesSearch = 
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tenant.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.adminName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Status filter
    const matchesStatus = filters.status === 'all' || tenant.status === filters.status;
    
    // 3. Plan filter
    const matchesPlan = filters.plan === 'all' || tenant.subscriptionPlan === filters.plan;
    
    // 4. Date range filter
    let matchesDate = true;
    if (filters.startDate || filters.endDate) {
      const tenantDate = new Date(tenant.createdAt);
      // Normalize dates to ignore time for easier comparison
      tenantDate.setHours(0, 0, 0, 0);
      
      if (filters.startDate) {
        const start = new Date(filters.startDate);
        start.setHours(0, 0, 0, 0);
        if (tenantDate < start) matchesDate = false;
      }
      
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        end.setHours(0, 0, 0, 0);
        if (tenantDate > end) matchesDate = false;
      }
    }

    return matchesSearch && matchesStatus && matchesPlan && matchesDate;
  });

  const { currentData, paginationProps } = useClientPagination(filteredTenants);

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({
      status: 'all',
      plan: 'all',
      startDate: undefined,
      endDate: undefined,
    });
    message.success('筛选条件已重置');
  };

  const handleCreate = () => {
    message.info('演示模式：新建租户功能仅做展示');
  };

  const handleEdit = (record: Tenant) => {
    message.info(`编辑租户: ${record.name}`);
  };

  const handleDelete = (record: Tenant) => {
    message.warning(`删除租户: ${record.name}`);
  };

  const getStatusBadge = (status: Tenant['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">正常</Badge>;
      case 'inactive':
        return <Badge variant="secondary">停用</Badge>;
      case 'suspended':
        return <Badge variant="danger">冻结</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const columns: Column<Tenant>[] = [
    {
      key: 'name',
      title: '租户名称',
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{record.name}</span>
          <span className="text-xs text-gray-500">{record.code}</span>
        </div>
      ),
    },
    {
      key: 'adminName',
      title: '管理员',
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="text-gray-900">{record.adminName}</span>
          <span className="text-xs text-gray-500">{record.contactEmail}</span>
        </div>
      ),
    },
    {
      key: 'subscriptionPlan',
      title: '订阅套餐',
      render: (value) => (
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100">
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      title: '状态',
      render: (value) => getStatusBadge(value),
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
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => message.info(`查看详情: ${record.name}`)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleEdit(record)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => handleDelete(record)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      title="租户列表"
      subtitle="管理系统中的所有租户企业信息及其订阅状态"
      breadcrumb={[
        { label: '首页', href: '/dashboard' },
        { label: '系统设置', href: '/SystemSettings' },
        { label: '租户列表' },
      ]}
      extra={
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreate}>
          新建租户
        </Button>
      }
    >
      <Card className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          {/* Left: Search + Filters */}
          <div className="flex flex-1 flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="w-full sm:w-72">
              <Input 
                placeholder="搜索租户名称、编码或管理员..." 
                leftIcon={<Search className="w-4 h-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-40">
                <Select 
                  placeholder="租户状态"
                  options={[
                    { label: '全部状态', value: 'all' },
                    { label: '正常', value: 'active' },
                    { label: '停用', value: 'inactive' },
                    { label: '冻结', value: 'suspended' }
                  ]}
                  value={filters.status}
                  onChange={(val) => setFilters(prev => ({ ...prev, status: val as string }))}
                />
              </div>
              
              <div className="w-full sm:w-auto flex items-center gap-2">
                <DatePicker 
                  placeholder="开始日期"
                  value={filters.startDate}
                  onChange={(date) => setFilters(prev => ({ ...prev, startDate: date }))}
                />
                <span className="text-gray-400">-</span>
                <DatePicker 
                  placeholder="结束日期"
                  value={filters.endDate}
                  onChange={(date) => setFilters(prev => ({ ...prev, endDate: date }))}
                />
              </div>
            </div>
          </div>

          <Button variant="outline" leftIcon={<RefreshCcw className="w-4 h-4" />} onClick={handleResetFilters}>
            重置
          </Button>
        </div>

        {/* Table */}
        <Table 
          columns={columns} 
          dataSource={currentData} 
          loading={loading}
          rowKey="id"
        />

        {/* Pagination */}
        <Pagination {...paginationProps} />
      </Card>
    </PageContainer>
  );
};
