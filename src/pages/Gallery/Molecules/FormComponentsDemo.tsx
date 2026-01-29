import React, { useState } from 'react';
import { Select } from '@/components/molecules/Select';
import { DatePicker } from '@/components/molecules/DatePicker';
import { Upload } from '@/components/molecules/Upload';
import { DemoBlock } from '../components/DemoBlock';

export const FormComponentsDemo: React.FC = () => {
  const [selectValue, setSelectValue] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="space-y-8">
      <DemoBlock 
        title="选择器 (Select)" 
        description="下拉选择器。"
        code={`<Select 
  options={[{ label: '选项 1', value: '1' }, { label: '选项 2', value: '2' }]} 
  value={value} 
  onChange={setValue} 
  placeholder="请选择"
/>`}
      >
        <div className="max-w-xs space-y-4">
          <Select 
            options={[
              { label: '苹果', value: 'apple' },
              { label: '香蕉', value: 'banana' },
              { label: '樱桃', value: 'cherry' },
              { label: '禁用选项', value: 'disabled', disabled: true },
            ]} 
            value={selectValue} 
            onChange={(val) => setSelectValue(String(val))} 
            placeholder="请选择水果"
          />
          <Select 
            options={[]} 
            value="" 
            onChange={() => {}} 
            placeholder="禁用选择器"
            disabled
          />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="日期选择器 (DatePicker)" 
        description="日期选择。"
        code={`<DatePicker selected={date} onChange={setDate} />`}
      >
        <div className="max-w-xs">
          <DatePicker value={date || undefined} onChange={setDate} placeholder="选择日期" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="上传 (Upload)" 
        description="文件上传。"
        code={`<Upload onUpload={(files) => console.log(files)} />`}
      >
        <Upload onUpload={(files) => console.log('已上传:', files)} />
      </DemoBlock>
    </div>
  );
};
