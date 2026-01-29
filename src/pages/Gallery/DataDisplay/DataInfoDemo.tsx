import React from 'react';
import { Statistic } from '@/components/data-display/Statistic';
import { Descriptions } from '@/components/data-display/Descriptions';
import { Timeline, TimelineItem } from '@/components/data-display/Timeline';
import { Empty } from '@/components/data-display/Empty';
import { DemoBlock } from '../components/DemoBlock';
import { TrendingUp } from 'lucide-react';

export const DataInfoDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <DemoBlock 
        title="统计数值 (Statistic)" 
        description="展示统计数值。"
        code={`<Statistic title="总销售额" value={112893} prefix="¥" />
<Statistic title="增长率" value={11.28} suffix="%" valueStyle={{ color: '#3f8600' }} prefix={<TrendingUp className="w-4 h-4" />} />`}
      >
        <div className="flex gap-12">
          <Statistic title="总销售额" value={112893} prefix="¥" />
          <Statistic 
            title="增长率" 
            value={11.28} 
            suffix="%" 
            valueStyle={{ color: '#10b981' }} 
            prefix={<TrendingUp className="w-4 h-4 text-emerald-500" />} 
          />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="描述列表 (Descriptions)" 
        description="成组展示多个只读字段。"
        code={`<Descriptions title="用户信息" items={[...]} />`}
      >
        <Descriptions 
          title="用户信息" 
          items={[
            { label: '用户名', value: 'Zhou Maomao' },
            { label: '电话', value: '1810000000' },
            { label: '居住地', value: '浙江省杭州市' },
            { label: '备注', value: '无' },
            { label: '地址', value: '浙江省杭州市西湖区万塘路18号' },
          ]} 
        />
      </DemoBlock>

      <DemoBlock 
        title="时间轴 (Timeline)" 
        description="垂直展示的时间流信息。"
        code={`<Timeline items={[...]} />`}
      >
        <Timeline>
          <TimelineItem label="2015-09-01">创建服务站点</TimelineItem>
          <TimelineItem label="2015-09-01">解决初期网络问题</TimelineItem>
          <TimelineItem label="2015-09-01">技术测试</TimelineItem>
          <TimelineItem label="2015-09-01">网络问题解决中</TimelineItem>
        </Timeline>
      </DemoBlock>

      <DemoBlock 
        title="空状态 (Empty)" 
        description="空状态时的展示。"
        code={`<Empty description="暂无数据" />`}
      >
        <Empty description="暂无数据" />
      </DemoBlock>
    </div>
  );
};
