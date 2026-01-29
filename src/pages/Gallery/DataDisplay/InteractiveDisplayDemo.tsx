import React, { useState } from 'react';
import { Carousel } from '@/components/data-display/Carousel';
import { Tour, TourStep } from '@/components/data-display/Tour';
import { Watermark } from '@/components/data-display/Watermark';
import { Button } from '@/components/atoms/Button';
import { DemoBlock } from '../components/DemoBlock';
import { Card } from '@/components/atoms/Card';

export const InteractiveDisplayDemo: React.FC = () => {
  const [openTour, setOpenTour] = useState(false);

  const steps: TourStep[] = [
    {
      target: '#tour-start-btn',
      title: '开始导览',
      description: '点击这里开始导览。',
    },
    {
      target: '#tour-carousel',
      title: '轮播组件',
      description: '这是一个展示多张幻灯片的轮播。',
    },
    {
      target: '#tour-watermark',
      title: '水印',
      description: '使用水印保护您的内容。',
    },
  ];

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="轮播 (Carousel)" 
        description="带有导航的自动播放轮播。"
        code={`<Carousel autoplay>
  <div className="bg-blue-100 h-full flex items-center justify-center">幻灯片 1</div>
  <div className="bg-green-100 h-full flex items-center justify-center">幻灯片 2</div>
  <div className="bg-purple-100 h-full flex items-center justify-center">幻灯片 3</div>
</Carousel>`}
      >
        <div id="tour-carousel" className="max-w-2xl">
          <Carousel autoplay>
            <div className="bg-blue-100 h-full flex items-center justify-center text-blue-800 font-bold text-xl">幻灯片 1</div>
            <div className="bg-green-100 h-full flex items-center justify-center text-green-800 font-bold text-xl">幻灯片 2</div>
            <div className="bg-purple-100 h-full flex items-center justify-center text-purple-800 font-bold text-xl">幻灯片 3</div>
          </Carousel>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="水印 (Watermark)" 
        description="给容器添加水印。"
        code={`<Watermark content="机密">
  <div className="h-[200px] bg-gray-50 p-4">
    受保护的内容...
  </div>
</Watermark>`}
      >
        <div id="tour-watermark" className="max-w-md">
          <Watermark content="Trae Demo">
            <Card className="h-[200px] flex items-center justify-center bg-gray-50 border border-gray-100">
              <p className="text-gray-500 font-medium z-10 relative">
                此内容受水印保护。
              </p>
            </Card>
          </Watermark>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="漫游式引导 (Tour)" 
        description="引导用户了解您的界面。"
        code={`<Button onClick={() => setOpenTour(true)}>开始导览</Button>
<Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />`}
      >
        <div>
          <Button id="tour-start-btn" onClick={() => setOpenTour(true)}>开始导览</Button>
          <Tour 
            open={openTour} 
            onClose={() => setOpenTour(false)} 
            steps={steps} 
          />
        </div>
      </DemoBlock>
    </div>
  );
};
