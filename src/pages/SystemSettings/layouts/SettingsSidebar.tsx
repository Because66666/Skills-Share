import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Building2, Users, Shield, Network, Settings } from 'lucide-react';

const menuItems = [
  { path: '/SystemSettings/list', label: '租户列表', icon: Building2 },
  { path: '/SystemSettings/users', label: '用户管理', icon: Users },
  { path: '/SystemSettings/roles', label: '角色管理', icon: Shield },
  { path: '/SystemSettings/orgs', label: '组织架构', icon: Network },
];

export const SettingsSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white h-full flex flex-col rounded-2xl shadow-sm border border-gray-100/50">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">
            <Settings className="w-5 h-5" />
          </span>
          系统设置
        </h1>
        <p className="text-xs text-gray-500 mt-1">全局系统参数配置</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          管理菜单
        </div>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← 返回主页
        </NavLink>
      </div>
    </aside>
  );
};
