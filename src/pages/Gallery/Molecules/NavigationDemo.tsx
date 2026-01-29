import React, { useState } from 'react';
import { Tabs } from '@/components/molecules/Tabs';
import { Steps } from '@/components/molecules/Steps';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { Pagination } from '@/components/molecules/Pagination';
import { DemoBlock } from '../components/DemoBlock';
import { Home, User, Settings } from 'lucide-react';

interface DemoTabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
}

export const NavigationDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('1');

  const tabItems: DemoTabItem[] = [
    { key: '1', label: <span className="flex items-center gap-2"><User className="w-4 h-4" /> 账户</span>, children: <div className="p-4 bg-gray-50 rounded">账户内容</div> },
    { key: '2', label: <span className="flex items-center gap-2"><Settings className="w-4 h-4" /> 设置</span>, children: <div className="p-4 bg-gray-50 rounded">设置内容</div> },
    { key: '3', label: '禁用', children: '已禁用' },
  ];

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="标签页 (Tabs)" 
        description="标签导航。"
        code={`<Tabs 
  items={[
    { key: '1', label: '账户', icon: <User className="w-4 h-4" />, children: '账户内容' },
    { key: '2', label: '设置', icon: <Settings className="w-4 h-4" />, children: '设置内容' },
  ]} 
  activeKey={activeTab}
  onChange={setActiveTab}
/>`}
      >
        <Tabs 
            items={tabItems} 
            defaultActiveKey={activeTab}
            onChange={setActiveTab}
          />
      </DemoBlock>

      <DemoBlock 
        title="步骤条 (Steps)" 
        description="步骤指示器。"
        code={`<Steps 
  current={currentStep} 
  items={[
    { title: '登录', description: '输入凭证' },
    { title: '验证', description: '检查邮件' },
    { title: '完成', description: '设置资料' }
  ]} 
/>`}
      >
        <div className="space-y-4">
          <Steps 
            current={currentStep} 
            items={[
              { title: '登录', description: '输入凭证' },
              { title: '验证', description: '检查邮件' },
              { title: '完成', description: '设置资料' }
            ]} 
          />
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-200 rounded text-sm" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>上一步</button>
            <button className="px-3 py-1 bg-gray-200 rounded text-sm" onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}>下一步</button>
          </div>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="面包屑 (Breadcrumb)" 
        description="路径导航。"
        code={`<Breadcrumb 
  items={[
    { title: '首页', href: '/', icon: <Home className="w-4 h-4" /> },
    { title: '组件库', href: '/gallery' },
    { title: '分子组件' }
  ]} 
/>`}
      >
        <Breadcrumb 
          items={[
            { label: <span className="flex items-center gap-1"><Home className="w-4 h-4" /> 首页</span>, href: '/' },
            { label: '组件库', href: '/gallery' },
            { label: '分子组件' }
          ]} 
        />
      </DemoBlock>

      <DemoBlock 
        title="分页 (Pagination)" 
        description="页面导航。"
        code={`<Pagination current={currentPage} total={50} pageSize={10} onChange={setCurrentPage} />`}
      >
        <Pagination current={currentPage} total={50} pageSize={10} onChange={setCurrentPage} />
      </DemoBlock>
    </div>
  );
};
