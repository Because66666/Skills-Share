import React from 'react';
import { Card } from '@/components/atoms/Card';
import { TodoItem } from '@/mock/dashboard/legalData';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface TodoListWidgetProps {
  todos: TodoItem[];
}

export const TodoListWidget: React.FC<TodoListWidgetProps> = ({ todos }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'low': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <Card title="待办事项" className="h-full">
      <div className="flex flex-col gap-3">
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-green-500 transition-colors">
                {todo.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${todo.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                  {todo.title}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{todo.type}</span>
                  <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {todo.deadline}
                  </span>
                </div>
              </div>
            </div>
            
            <div className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(todo.priority)}`}>
              {todo.priority === 'high' ? '紧急' : todo.priority === 'medium' ? '重要' : '普通'}
            </div>
          </div>
        ))}
        {todos.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            暂无待办事项
          </div>
        )}
      </div>
    </Card>
  );
};
