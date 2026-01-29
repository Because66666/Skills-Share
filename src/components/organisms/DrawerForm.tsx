import React, { useState } from 'react';
import { SmartForm, SmartFormProps } from './SmartForm';
import { Drawer } from '@/components/molecules/Drawer';

interface DrawerFormProps extends Omit<SmartFormProps, 'onFinish'> {
  title?: React.ReactNode;
  trigger?: React.ReactNode;
  width?: number | string;
  placement?: 'left' | 'right';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFinish?: (values: Record<string, any>) => Promise<void> | void;
}

export const DrawerForm: React.FC<DrawerFormProps> = ({
  title,
  trigger,
  width,
  placement,
  open: controlledOpen,
  onOpenChange,
  onFinish,
  submitText = '提交',
  resetText = '取消',
  ...formProps
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleFinish = async (values: Record<string, any>) => {
    await onFinish?.(values);
    handleOpenChange(false);
  };

  return (
    <>
      {trigger && (
        <div onClick={() => handleOpenChange(true)} className="inline-block">
          {trigger}
        </div>
      )}
      
      <Drawer
        isOpen={isOpen}
        onClose={() => handleOpenChange(false)}
        title={title}
        width={width}
        placement={placement}
      >
        <SmartForm
          {...formProps}
          onFinish={handleFinish}
          onReset={() => handleOpenChange(false)}
          submitText={submitText}
          resetText={resetText}
          className="h-full flex flex-col"
          showActions={true} // Ensure actions are shown
          extraActions={null}
        />
      </Drawer>
    </>
  );
};
