import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface Message {
  id: string;
  type: MessageType;
  content: React.ReactNode;
  duration?: number;
}

interface MessageContextType {
  success: (content: React.ReactNode, duration?: number) => void;
  error: (content: React.ReactNode, duration?: number) => void;
  info: (content: React.ReactNode, duration?: number) => void;
  warning: (content: React.ReactNode, duration?: number) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((type: MessageType, content: React.ReactNode, duration = 3000) => {
    const id = Math.random().toString(36).substring(7);
    setMessages((prev) => [...prev, { id, type, content, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, duration);
    }
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const success = (content: React.ReactNode, duration?: number) => addMessage('success', content, duration);
  const error = (content: React.ReactNode, duration?: number) => addMessage('error', content, duration);
  const info = (content: React.ReactNode, duration?: number) => addMessage('info', content, duration);
  const warning = (content: React.ReactNode, duration?: number) => addMessage('warning', content, duration);

  return (
    <MessageContext.Provider value={{ success, error, info, warning }}>
      {children}
      {createPortal(
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-full shadow-lg bg-white border animate-in slide-in-from-top-2 fade-in duration-300 min-w-[200px] max-w-[80vw]',
                'border-gray-100'
              )}
            >
              {msg.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
              {msg.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
              {msg.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
              {msg.type === 'warning' && <AlertCircle className="w-4 h-4 text-orange-500" />}
              
              <span className="text-sm font-medium text-gray-700">{msg.content}</span>
              
              <button
                onClick={() => removeMessage(msg.id)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </MessageContext.Provider>
  );
};
