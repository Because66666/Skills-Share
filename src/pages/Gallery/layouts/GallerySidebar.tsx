import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { LayoutGrid, Atom, Cuboid, Box, Layers, Palette, BarChart3 } from 'lucide-react';

const menuItems = [
  { path: '/gallery', label: '概览', icon: Palette, exact: true },
  { path: '/gallery/atoms', label: '原子组件 (Atoms)', icon: Atom },
  { path: '/gallery/molecules', label: '分子组件 (Molecules)', icon: Cuboid },
  { path: '/gallery/data-display', label: '数据展示 (Data Display)', icon: Layers },
  { path: '/gallery/organisms', label: '生物组件 (Organisms)', icon: LayoutGrid },
  { path: '/gallery/layouts', label: '布局 (Layouts)', icon: Box },
  { path: '/gallery/charts', label: '图表 (Charts)', icon: BarChart3 },
];

export const GallerySidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white h-full flex flex-col rounded-2xl shadow-sm border border-gray-100/50">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-lg">G</span>
          组件库
        </h1>
        <p className="text-xs text-gray-500 mt-1">通用组件库</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
          组件列表
        </div>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-orange-50 text-orange-600'
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
