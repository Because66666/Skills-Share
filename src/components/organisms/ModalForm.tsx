import React, { useState } from 'react';
import { SmartForm, SmartFormProps } from './SmartForm';
import { Modal } from '@/components/molecules/Modal';

interface ModalFormProps extends Omit<SmartFormProps, 'onFinish'> {
  title?: React.ReactNode;
  trigger?: React.ReactNode;
  width?: number | string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFinish?: (values: Record<string, any>) => Promise<void> | void;
  children?: React.ReactNode;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  title,
  trigger,
  width,
  open: controlledOpen,
  onOpenChange,
  onFinish,
  children, // SmartForm doesn't take children in the same way, but we might want to support it if we change SmartForm
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
      
      <Modal
        isOpen={isOpen}
        onClose={() => handleOpenChange(false)}
        title={title}
        width={width}
        footer={null} // We let SmartForm handle actions
      >
        <SmartForm
          {...formProps}
          onFinish={handleFinish}
          onReset={() => handleOpenChange(false)} // Reset acts as Cancel
          submitText={submitText}
          resetText={resetText}
          className="mt-0" // Remove default margin
        />
      </Modal>
    </>
  );
};
