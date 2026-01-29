import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const NotificationItem: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  duration = 4500,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to allow enter animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    
    if (duration > 0) {
      const closeTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300); // Wait for exit animation
      }, duration);
      return () => clearTimeout(closeTimer);
    }
    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
  };

  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform mb-3",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[type]}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={handleClose}
            >
              <span className="sr-only">关闭</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Singleton Manager
class NotificationManager {
  private listeners: ((notifications: NotificationProps[]) => void)[] = [];
  private notifications: NotificationProps[] = [];

  subscribe(listener: (notifications: NotificationProps[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l([...this.notifications]));
  }

  add(notification: Omit<NotificationProps, 'onClose'>) {
    const id = notification.id || Math.random().toString(36).substr(2, 9);
    this.notifications = [...this.notifications, { ...notification, id, onClose: this.remove.bind(this) }];
    this.notify();
  }

  remove(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notify();
  }
}

const manager = new NotificationManager();

export const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    return manager.subscribe(setNotifications);
  }, []);

  return createPortal(
    <div className="fixed top-0 right-0 z-50 flex flex-col p-4 sm:items-end pointer-events-none w-full sm:w-auto">
      {notifications.map(n => (
        <NotificationItem key={n.id} {...n} />
      ))}
    </div>,
    document.body
  );
};

export const notification = {
  success: (title: string, message?: string, duration?: number) => manager.add({ id: '', type: 'success', title, message, duration }),
  error: (title: string, message?: string, duration?: number) => manager.add({ id: '', type: 'error', title, message, duration }),
  info: (title: string, message?: string, duration?: number) => manager.add({ id: '', type: 'info', title, message, duration }),
  warning: (title: string, message?: string, duration?: number) => manager.add({ id: '', type: 'warning', title, message, duration }),
};
