import React from 'react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Layout, Content } from '@/components/layouts/Layout';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout - Dashboard 专用布局组件
 * 包含侧边栏和主要内容区域，使用 Flex 布局实现
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Layout className="h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden p-4 gap-4 transition-colors duration-300" hasSider>
      <Sidebar />
      <Content className="thin-scrollbar">
        <div className="w-full h-full">
          {children}
        </div>
      </Content>
    </Layout>
  );
};
