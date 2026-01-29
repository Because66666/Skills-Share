import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import logo from '@/assets/images/logo.svg';

import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Search, Bell, Monitor } from 'lucide-react';
import { Dropdown } from '@/components/molecules/Dropdown';
import { Popover } from '@/components/data-display/Popover';
import { notifications as initialNotifications } from '@/mock/notificationData';
import { CommandPalette } from '@/components/molecules/CommandPalette';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Get current user from local storage
  const userStr = localStorage.getItem('user');
  const user = userStr && userStr !== 'null' && userStr !== 'undefined' ? JSON.parse(userStr) : null;
  const isAdmin = user?.role?.name === 'admin';

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: '首页', path: '/home' },
    { label: '使用指南', path: '/guide' },
    { label: '常见问题', path: '/faq' },
    { label: '关于我们', path: '/about' },
  ];
  
  if (isAdmin) {
    navItems.push({ label: '审核管理', path: '/admin/skills' });
  }

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id: string, link?: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    if (link) {
      navigate(link);
    }
  };

  // Theme Dropdown Menu
  const themeMenu = [
    {
      key: 'light',
      label: '浅色模式',
      icon: <Sun className="w-4 h-4" />,
      onClick: () => setTheme('light'),
      className: theme === 'light' ? 'text-orange-600 bg-orange-50' : ''
    },
    {
      key: 'dark',
      label: '深色模式',
      icon: <Moon className="w-4 h-4" />,
      onClick: () => setTheme('dark'),
      className: theme === 'dark' ? 'text-orange-600 bg-orange-50' : ''
    },
    {
      key: 'system',
      label: '跟随系统',
      icon: <Monitor className="w-4 h-4" />,
      onClick: () => setTheme('system'),
      className: theme === 'system' ? 'text-orange-600 bg-orange-50' : ''
    }
  ];

  // Notification Content
  const notificationContent = (
    <div className="w-80 max-h-[400px] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">通知</h3>
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllRead}
            className="text-xs text-orange-600 hover:text-orange-700 font-medium"
          >
            全部已读
          </button>
        )}
      </div>
      
      <div className="overflow-y-auto flex-1 thin-scrollbar">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">暂无通知</div>
        ) : (
          notifications.map(item => (
            <div 
              key={item.id}
              onClick={() => handleNotificationClick(item.id, item.link)}
              className={cn(
                "p-4 border-b border-gray-50 dark:border-gray-800 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 relative",
                !item.read && "bg-blue-50/30 dark:bg-blue-900/10"
              )}
            >
              {!item.read && (
                <span className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full" />
              )}
              <h4 className={cn("text-sm font-medium mb-1 pr-4", item.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-gray-100")}>
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                {item.description}
              </p>
              <span className="text-[10px] text-gray-400">
                {item.time}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <Link to="/home" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-xl text-gray-900 dark:text-gray-100 hidden sm:inline-block">Skills Share</span>
          </Link>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-foreground font-semibold" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="hidden lg:inline text-xs text-gray-400 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded kbd">Ctrl K</span>
            </button>

            {/* Theme Toggle Dropdown */}
            <Dropdown
              trigger={
                <div className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
              }
              menu={themeMenu}
              placement="bottom-right"
            />

            {/* Notifications Popover */}
            <Popover
              trigger={
                <div className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative cursor-pointer">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></span>
                  )}
                </div>
              }
              content={notificationContent}
              position="bottom"
              className="p-0 w-auto overflow-hidden"
            />

          </div>
        </div>
      </header>
      
      <CommandPalette isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </>
  );
};
