import React, { useState } from 'react';
import { Modal } from '@/components/molecules/Modal';
import { Drawer } from '@/components/molecules/Drawer';
import { Alert } from '@/components/molecules/Alert';
import { notification } from '@/components/molecules/Notification';
import { Popconfirm } from '@/components/molecules/Popconfirm';
import { Button } from '@/components/atoms/Button';
import { DemoBlock } from '../components/DemoBlock';

export const FeedbackDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showNotification = (type: 'success' | 'info' | 'warning' | 'error') => {
    const messages = {
      success: '这是一个成功通知',
      info: '这是一个信息通知',
      warning: '这是一个警告通知',
      error: '这是一个错误通知',
    };
    notification[type](messages[type]);
  };

  return (
    <div className="space-y-8">
      {/* notification usage has been updated to function call */}

      <DemoBlock 
        title="警告提示 (Alert)" 
        description="静态警告消息。"
        code={`<Alert type="info" message="信息提示" />
<Alert type="success" message="成功消息" showIcon />
<Alert type="warning" message="警告消息" />
<Alert type="error" message="错误消息" />`}
      >
        <div className="space-y-4">
          <Alert type="info" message="信息提示" />
          <Alert type="success" message="成功消息" showIcon />
          <Alert type="warning" message="警告消息" />
          <Alert type="error" message="错误消息" />
        </div>
      </DemoBlock>

      <DemoBlock 
        title="对话框 (Modal)" 
        description="模态对话框。"
        code={`<Modal title="基础对话框" open={isOpen} onCancel={close} onOk={ok}>...</Modal>`}
      >
        <Button onClick={() => setIsModalOpen(true)}>打开对话框</Button>
        <Modal 
            title="基础对话框" 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          >
          <p>一些内容...</p>
          <p>一些内容...</p>
          <p>一些内容...</p>
        </Modal>
      </DemoBlock>

      <DemoBlock 
        title="抽屉 (Drawer)" 
        description="侧边滑出面板。"
        code={`<Drawer title="基础抽屉" open={isOpen} onClose={close}>...</Drawer>`}
      >
        <Button onClick={() => setIsDrawerOpen(true)}>打开抽屉</Button>
        <Drawer 
            title="基础抽屉" 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)}
          >
          <p>一些内容...</p>
          <p>一些内容...</p>
          <p>一些内容...</p>
        </Drawer>
      </DemoBlock>

      <DemoBlock 
        title="通知提醒 (Notification)" 
        description="全局轻量级提示。"
        code={`showNotification('success')`}
      >
        <div className="flex gap-4">
          <Button onClick={() => showNotification('success')} variant="outline" className="text-green-600 border-green-200 bg-green-50">成功</Button>
          <Button onClick={() => showNotification('info')} variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">信息</Button>
          <Button onClick={() => showNotification('warning')} variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">警告</Button>
          <Button onClick={() => showNotification('error')} variant="outline" className="text-red-600 border-red-200 bg-red-50">错误</Button>
        </div>
      </DemoBlock>

      <DemoBlock 
        title="气泡确认框 (Popconfirm)" 
        description="点击元素弹出气泡确认框。"
        code={`<Popconfirm title="确定吗？" onConfirm={confirm}><Button>删除</Button></Popconfirm>`}
      >
        <Popconfirm 
          title="确定要删除此任务吗？" 
          onConfirm={() => showNotification('success')}
          okText="是"
          cancelText="否"
        >
          <Button variant="danger">删除任务</Button>
        </Popconfirm>
      </DemoBlock>
    </div>
  );
};
