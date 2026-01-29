import React, { useState } from 'react';
import { Slider } from '@/components/molecules/Slider';
import { Rate } from '@/components/molecules/Rate';
import { Progress } from '@/components/molecules/Progress';
import { DemoBlock } from '../components/DemoBlock';

export const AdvancedInputDemo: React.FC = () => {
  const [sliderVal, setSliderVal] = useState(30);
  const [rateVal, setRateVal] = useState(3);

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="滑动输入 (Slider)" 
        description="范围输入。"
        code={`<Slider value={value} onChange={setValue} min={0} max={100} />`}
      >
        <div className="space-y-6 max-w-md">
          <Slider value={sliderVal} onChange={setSliderVal} />
          <Slider value={sliderVal} onChange={setSliderVal} disabled />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="评分 (Rate)" 
        description="星级评分。"
        code={`<Rate value={value} onChange={setValue} />`}
      >
        <div className="space-y-4">
          <Rate value={rateVal} onChange={setRateVal} />
          <Rate value={2.5} disabled allowHalf />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="进度条 (Progress)" 
        description="进度展示。"
        code={`<Progress percent={30} />
<Progress percent={70} status="exception" />
<Progress percent={100} status="success" />`}
      >
        <div className="space-y-4 max-w-md">
          <Progress percent={30} />
          <Progress percent={70} status="exception" />
          <Progress percent={100} status="success" />
          <Progress percent={50} showInfo={false} />
        </div>
      </DemoBlock>
    </div>
  );
};
