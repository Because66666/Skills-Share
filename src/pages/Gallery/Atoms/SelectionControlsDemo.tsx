import React, { useState } from 'react';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Radio } from '@/components/atoms/Radio';
import { Switch } from '@/components/atoms/Switch';
import { DemoBlock } from '../components/DemoBlock';

export const SelectionControlsDemo: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="复选框 (Checkbox)" 
        description="单个和禁用的复选框。"
        code={`<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} label="接受条款" />
<Checkbox disabled label="已禁用" />
<Checkbox disabled checked label="禁用且选中" />`}
      >
        <div className="space-y-4">
          <Checkbox 
            checked={checked} 
            onChange={setChecked} 
            label="接受条款" 
          />
          <Checkbox disabled label="禁用复选框" />
          <Checkbox disabled checked label="禁用且选中复选框" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="单选组 (Radio Group)" 
        description="用于单选的单选按钮。"
        code={`<Radio name="demo" value="1" checked={radioValue === '1'} onChange={() => setRadioValue('1')} label="选项 1" />
<Radio name="demo" value="2" checked={radioValue === '2'} onChange={() => setRadioValue('2')} label="选项 2" />`}
      >
        <div className="space-y-4">
          <Radio 
            name="demo-radio" 
            value="1" 
            checked={radioValue === '1'} 
            onChange={() => setRadioValue('1')} 
            label="选项 1" 
          />
          <Radio 
            name="demo-radio" 
            value="2" 
            checked={radioValue === '2'} 
            onChange={() => setRadioValue('2')} 
            label="选项 2" 
          />
          <Radio 
            name="demo-radio" 
            value="3" 
            disabled 
            label="禁用选项" 
          />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="开关 (Switch)" 
        description="切换开关。"
        code={`<Switch checked={switchOn} onChange={setSwitchOn} />
<Switch disabled />`}
      >
        <div className="flex gap-8 items-center">
          <Switch checked={switchOn} onChange={setSwitchOn} />
          <Switch disabled />
          <Switch disabled checked />
        </div>
      </DemoBlock>
    </div>
  );
};
