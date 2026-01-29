import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Switch } from '@/components/atoms/Switch';
import { Button } from '@/components/atoms/Button';
import { Bell, Shield, Globe, Monitor, Moon, Smartphone } from 'lucide-react';

import { useTheme } from '@/contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">账号设置</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">管理您的账号偏好和系统设置</p>
      </div>

      {/* Notification Settings */}
      <Card 
        title={
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            <span>通知设置</span>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">邮件通知</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">当有重要更新或活动时发送邮件</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">系统消息</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">在应用内接收消息推送</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">营销推送</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">接收产品推荐和优惠信息</div>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card 
        title={
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-500" />
            <span>外观设置</span>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setTheme('system')}
            className={`p-4 border-2 rounded-xl text-left transition-all ${
              theme === 'system' 
                ? 'border-orange-500 bg-orange-50/50' 
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/30'
            }`}
          >
            <div className="mb-3 w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
              <Monitor className="w-5 h-5 text-orange-600" />
            </div>
            <div className="font-medium text-gray-900">跟随系统</div>
            <div className="text-xs text-gray-500 mt-1">自动适应系统主题</div>
          </button>
          <button 
            onClick={() => setTheme('light')}
            className={`p-4 border-2 rounded-xl text-left transition-all ${
              theme === 'light' 
                ? 'border-orange-500 bg-orange-50/50' 
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/30'
            }`}
          >
            <div className="mb-3 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <SunIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="font-medium text-gray-900">浅色模式</div>
            <div className="text-xs text-gray-500 mt-1">始终使用浅色外观</div>
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`p-4 border-2 rounded-xl text-left transition-all ${
              theme === 'dark' 
                ? 'border-orange-500 bg-orange-50/50' 
                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/30'
            }`}
          >
            <div className="mb-3 w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <div className="font-medium text-gray-900">深色模式</div>
            <div className="text-xs text-gray-500 mt-1">始终使用深色外观</div>
          </button>
        </div>
      </Card>

      {/* Security Settings */}
      <Card 
        title={
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span>登录与安全</span>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Chrome on Windows</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">上海 · 当前设备</div>
              </div>
            </div>
            <div className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full font-medium">在线</div>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">iPhone 14 Pro</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">杭州 · 2小时前</div>
              </div>
            </div>
            <Button variant="outline" size="sm">退出</Button>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 dark:bg-red-900/10 dark:border-red-900/30 dark:hover:bg-red-900/20">
            退出所有设备
          </Button>
        </div>
      </Card>
    </div>
  );
};

function SunIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
