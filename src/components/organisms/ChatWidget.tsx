import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Chat } from '@/mock/dashboardData';
import { ArrowRight } from 'lucide-react';

interface ChatWidgetProps {
  chats: Chat[];
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ chats }) => {
  const unreadCount = chats.filter(c => c.unread).length;

  return (
    <Card className="flex flex-col h-full min-h-[180px]">
      <div className="mb-4">
        <h3 className="font-bold text-xl mb-1">消息</h3>
        <p className="text-gray-400 text-sm">{unreadCount} 条未读消息</p>
      </div>
      
      <div className="flex -space-x-3 mb-6 overflow-hidden py-2 px-1">
        {chats.map(chat => (
          <div key={chat.id} className="relative transition-transform hover:-translate-y-1 hover:z-10 cursor-pointer">
            <img 
              src={chat.user.avatar} 
              alt={chat.user.name}
              className="w-12 h-12 rounded-full border-2 border-white object-cover" 
            />
            {chat.unread && (
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <a href="#" className="text-orange-800 text-sm font-medium hover:underline flex items-center gap-1">
          查看所有消息 <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </Card>
  );
};
