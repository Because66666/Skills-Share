import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  ChevronDown,
  Layers,
  ChevronUp,
  User,
  Moon,
  HelpCircle,
  Search,
  Keyboard,
  Book,
  FileSearch,
  KeyRound,
} from 'lucide-react';
import logo from '@/assets/images/logo.svg';
import { currentUser } from '@/mock/dashboardData';
import { Popover } from '@/components/data-display/Popover';
import { useMessage } from '@/components/feedback/Message';
import { useTheme } from '@/contexts/ThemeContext';
import { useAnnotationContext } from '@/contexts/AnnotationContext';
import { Switch } from '@/components/atoms/Switch';

interface MenuItem {
  icon?: React.ElementType;
  label: string;
  path: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: '仪表盘', path: '/dashboard' },
  { 
    icon: User, 
    label: '个人中心', 
    path: '/profile',
  },
  { 
    icon: Settings, 
    label: '系统设置', 
    path: '/settings',
  },
  { icon: Layers, label: '组件库', path: '/gallery' },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = useMessage();
  const { theme, setTheme } = useTheme();
  const { isAnnotationMode, setAnnotationMode } = useAnnotationContext();
  
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Monitor window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize expanded menus based on current path
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.children && item.children.some(child => location.pathname.startsWith(child.path))) {
        setExpandedMenus(prev => [...new Set([...prev, item.path])]);
      }
    });
  }, [location.pathname]);

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleLogout = () => {
    message.success('已成功退出登录');
    navigate('/login');
  };

  const handleThemeToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    message.success(`已切换至${newTheme === 'dark' ? '深色' : '浅色'}模式`);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowChangePassword(false);
    message.success('密码修改成功');
  };

  // Dummy usage
  useEffect(() => {
    if (showShortcuts) console.log('Show shortcuts modal');
    if (showChangePassword) console.log('Show change password modal');
    void handlePasswordSubmit;
  }, [showShortcuts, showChangePassword]);

  const isActive = (path: string) => {
    if (path === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')) {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleSubmenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const active = isActive(item.path);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.path);
    const Icon = item.icon;

    // Check if any child is active to highlight parent
    const isChildActive = hasChildren && item.children?.some(child => isActive(child.path));

    return (
      <div key={item.path} className="flex flex-col">
        <div 
          onClick={() => {
            if (hasChildren) {
              toggleSubmenu(item.path);
            } else {
              navigate(item.path);
            }
          }}
          className={`
            flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors mb-1
            ${level > 0 ? 'ml-4' : ''}
            ${active || (hasChildren && isChildActive)
              ? 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }
          `}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5" />}
            <span className="font-medium text-sm">{item.label}</span>
          </div>
          {hasChildren && (
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="flex flex-col space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const sidebarWidthClass = windowWidth < 1500 ? 'w-56' : 'w-64';

  return (
    <aside className={`${sidebarWidthClass} bg-white dark:bg-gray-900 h-full flex flex-col rounded-2xl shadow-sm border border-gray-100/50 dark:border-gray-800 relative z-20 transition-all duration-300`}>
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-center gap-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="font-bold text-xl text-gray-900 dark:text-gray-100">后端管理</span>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="搜索" 
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-full text-sm dark:text-gray-200 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-400"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto thin-scrollbar">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* User Profile */}
      <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-800">
        <Popover
          position="right-bottom-align"
          className={`${sidebarWidthClass} p-1 mb-0`}
          containerClassName="w-full block"
          trigger={
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group w-full">
              <img 
                src={currentUser.avatar}  
                alt={currentUser.name} 
                className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-700"
              />
              <div className="flex-1 min-w-0 text-left">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{currentUser.name}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate block" title={currentUser.roles?.join(' / ') || currentUser.role}>
                  {currentUser.roles?.join(' / ') || currentUser.role}
                </span>
              </div>
              <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors rotate-90" />
            </div>
          }
          content={
            <div className="flex flex-col">
              {/* Group 1 */}
              <div className="p-1">
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>个人中心</span>
                </button>
                <button 
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>账号设置</span>
                </button>
              </div>
              
              <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
              
              {/* Group 2 */}
              <div className="p-1">
                <button 
                  onClick={() => setShowShortcuts(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <Keyboard className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>快捷键指南</span>
                </button>
                <button 
                  onClick={() => navigate('/document-center')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <Book className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>文档中心</span>
                </button>

                <button 
                  onClick={() => navigate('/help-center')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <HelpCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>帮助中心</span>
                </button>
                <button 
                  onClick={() => setShowChangePassword(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <KeyRound className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>修改密码</span>
                </button>
                
                <div 
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setAnnotationMode(!isAnnotationMode);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>演示模式</span>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Switch 
                      checked={isAnnotationMode} 
                      onChange={setAnnotationMode}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleThemeToggle}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{isDark ? '浅色模式' : '深色模式'}</span>
                </button>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />

              {/* Group 3 */}
              <div className="p-1">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>退出登录</span>
                </button>
              </div>
            </div>
          }
        />
      </div>
    </aside>
  );
};
