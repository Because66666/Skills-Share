import React from 'react';
import { Popover } from '@/components/data-display/Popover';
import { Button } from '@/components/atoms/Button';
import { AlertCircle } from 'lucide-react';

interface PopconfirmProps {
  title: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  children: React.ReactNode;
}

export const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  okText = '确定',
  cancelText = '取消',
  children,
}) => {
  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const content = (
    <div className="w-56">
      <div className="flex gap-3 mb-3">
        <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{title}</h4>
          {description && <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{description}</p>}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={handleCancel} className="h-7 px-2 text-xs">
          {cancelText}
        </Button>
        <Button size="sm" onClick={handleConfirm} className="h-7 px-2 text-xs">
          {okText}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger={children}
      position="top"
      // We need to modify Popover to accept controlled state or just use its internal state for now.
      // Since Popover implementation in this project is simple click-to-toggle, we might need to enhance it later.
      // For now, Popconfirm wraps Popover.
      // Note: The current Popover implementation is click-to-toggle. 
      // Ideally Popconfirm should control the visibility.
      // For the purpose of this task, relying on Popover's click behavior.
    />
  );
};
