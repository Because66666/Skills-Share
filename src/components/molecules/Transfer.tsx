import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

interface TransferProps {
  dataSource: TransferItem[];
  targetKeys: string[];
  onChange?: (nextTargetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  titles?: [string, string];
  className?: string;
}

export const Transfer: React.FC<TransferProps> = ({
  dataSource,
  targetKeys,
  onChange,
  titles = ['Source', 'Target'],
  className,
}) => {
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState<string[]>([]);
  const [targetSelectedKeys, setTargetSelectedKeys] = useState<string[]>([]);

  // Filter data
  const sourceData = dataSource.filter(item => !targetKeys.includes(item.key));
  const targetData = dataSource.filter(item => targetKeys.includes(item.key));

  const handleSelectChange = (direction: 'left' | 'right', key: string, checked: boolean) => {
    const setter = direction === 'left' ? setSourceSelectedKeys : setTargetSelectedKeys;
    const currentKeys = direction === 'left' ? sourceSelectedKeys : targetSelectedKeys;

    if (checked) {
      setter([...currentKeys, key]);
    } else {
      setter(currentKeys.filter(k => k !== key));
    }
  };

  const moveToRight = () => {
    const newTargetKeys = [...targetKeys, ...sourceSelectedKeys];
    onChange?.(newTargetKeys, 'right', sourceSelectedKeys);
    setSourceSelectedKeys([]);
  };

  const moveToLeft = () => {
    const newTargetKeys = targetKeys.filter(key => !targetSelectedKeys.includes(key));
    onChange?.(newTargetKeys, 'left', targetSelectedKeys);
    setTargetSelectedKeys([]);
  };

  const renderList = (title: string, data: TransferItem[], direction: 'left' | 'right') => {
    const selectedKeys = direction === 'left' ? sourceSelectedKeys : targetSelectedKeys;
    
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col h-64 w-64">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-700 flex justify-between items-center">
          <span>{title}</span>
          <span className="text-xs text-gray-400">{selectedKeys.length} / {data.length}</span>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-1">
          {data.map(item => (
            <div
              key={item.key}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !item.disabled && handleSelectChange(direction, item.key, !selectedKeys.includes(item.key))}
            >
              <Checkbox
                checked={selectedKeys.includes(item.key)}
                disabled={item.disabled}
                onChange={() => {}} // Handled by div click
                className="pointer-events-none"
              />
              <span className="text-sm text-gray-700">{item.title}</span>
            </div>
          ))}
          {data.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No Data
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {renderList(titles[0], sourceData, 'left')}
      
      <div className="flex flex-col gap-2">
        <Button
          size="sm"
          disabled={sourceSelectedKeys.length === 0}
          onClick={moveToRight}
          className="px-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={targetSelectedKeys.length === 0}
          onClick={moveToLeft}
          className="px-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {renderList(titles[1], targetData, 'right')}
    </div>
  );
};
