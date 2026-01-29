import React from 'react';
import { KeyMetricCard } from '@/components/organisms/KeyMetricCard';
import { GrowthChartWidget } from '@/components/organisms/GrowthChartWidget';
import { CustomersWidget } from '@/components/organisms/CustomersWidget';
import { ChatWidget } from '@/components/organisms/ChatWidget';
import { TopStatesWidget } from '@/components/organisms/TopStatesWidget';
import { NewDealsWidget } from '@/components/organisms/NewDealsWidget';
import { StatHighlightCard } from '@/components/organisms/StatHighlightCard';
import { DemoBlock } from '../components/DemoBlock';
import * as dashboardData from '@/mock/dashboardData';

export const OrganismsGallery: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">生物组件 (Organism Components)</h2>
        <p className="text-gray-500">复杂的业务组件。</p>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">指标卡片 (Metric Cards)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DemoBlock title="关键指标卡片">
            <KeyMetricCard 
              metric={{
                title: "总收入",
                value: "¥2,129,430",
                trend: { value: "+2.5%", direction: "up" },
                type: "stat"
              }}
            />
          </DemoBlock>
          <DemoBlock title="统计高亮卡片">
            <StatHighlightCard 
              type="buyer"
              data={{
                buyer: {
                  id: "1",
                  name: "玛吉·约翰逊",
                  company: "maggie@gmail.com",
                  avatar: "https://i.pravatar.cc/150?u=maggie"
                }
              }}
            />
          </DemoBlock>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">图表与部件 (Charts & Widgets)</h3>
        <div className="space-y-6">
          <DemoBlock title="增长图表">
            <GrowthChartWidget data={dashboardData.growthData} />
          </DemoBlock>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DemoBlock title="客户列表">
              <CustomersWidget customers={dashboardData.customers} />
            </DemoBlock>
            <DemoBlock title="消息部件">
              <ChatWidget chats={dashboardData.chats} />
            </DemoBlock>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DemoBlock title="热门地区">
              <TopStatesWidget states={dashboardData.topStates} />
            </DemoBlock>
            <DemoBlock title="新交易">
              <NewDealsWidget deals={dashboardData.newDeals} />
            </DemoBlock>
          </div>
        </div>
      </section>
    </div>
  );
};
