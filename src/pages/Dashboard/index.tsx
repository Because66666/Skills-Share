import React, { useState } from 'react';
import { Space } from '@/components/layouts/Space';
import { 
  legalMetrics, 
  caseTrendData, 
  caseTypeData, 
  contractStatusData, 
  riskRadarData,
  moduleOverviews,
  highRiskItems,
  todoItems
} from '@/mock/dashboard/legalData';

// Components
import { LegalMetricCard } from '@/components/organisms/Dashboard/LegalMetricCard';
import { RiskWarningBanner } from '@/components/organisms/Dashboard/RiskWarningBanner';
import { ModuleOverviewCard } from '@/components/organisms/Dashboard/ModuleOverviewCard';
import { TodoListWidget } from '@/components/organisms/Dashboard/TodoListWidget';
import { CaseTrendChart } from '@/components/organisms/Dashboard/Charts/CaseTrendChart';
import { TypeDistributionChart } from '@/components/organisms/Dashboard/Charts/TypeDistributionChart';
import { ContractStatusChart } from '@/components/organisms/Dashboard/Charts/ContractStatusChart';
import { RiskRadarChart } from '@/components/organisms/Dashboard/Charts/RiskRadarChart';

/**
 * Dashboard - 智慧法务仪表盘主页
 * 
 * 包含：
 * 1. 风险预警 Banner
 * 2. 关键指标卡片 (Metrics)
 * 3. 数据图表分析 (Charts)
 * 4. 待办事项 (Todos)
 * 5. 业务模块导航 (Modules)
 */
export const Dashboard: React.FC = () => {
  const [showRiskBanner, setShowRiskBanner] = useState(true);

  return (
    <Space direction="vertical" size="lg" className="w-full pb-8 animate-fade-in">
      {/* 1. 风险预警 Banner */}
      {showRiskBanner && highRiskItems.length > 0 && (
        <RiskWarningBanner 
          risks={highRiskItems} 
          onClose={() => setShowRiskBanner(false)} 
        />
      )}

      {/* 2. 关键指标区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {legalMetrics.map((metric, index) => (
          <LegalMetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* 3. 核心业务区 (图表 + 待办) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 左侧：图表分析 */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* 案件趋势 (Line/Area Chart) */}
          <CaseTrendChart data={caseTrendData} />
          
          {/* 详细分布 (Pie + Bar Chart) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TypeDistributionChart 
              title="案件类型分布" 
              data={caseTypeData} 
            />
            <ContractStatusChart 
              data={contractStatusData} 
            />
          </div>
        </div>

        {/* 右侧：待办 + 风险雷达 */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex-1">
            <TodoListWidget todos={todoItems} />
          </div>
          <div className="h-[300px]">
             <RiskRadarChart data={riskRadarData} />
          </div>
        </div>
      </div>

      {/* 4. 业务模块概览区 */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 px-1">
          业务模块概览
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {moduleOverviews.map((module) => (
            <ModuleOverviewCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </Space>
  );
};
