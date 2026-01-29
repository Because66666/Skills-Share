import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { documentSections } from '@/mock/documentData';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import logo from '@/assets/images/logo.svg';

export const DocumentCenterLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-72 bg-gray-50/50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 flex flex-col backdrop-blur-sm">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              文档中心
            </h1>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 px-1 leading-relaxed">
            智慧法务平台开发与使用指南
          </p>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {documentSections.map((section) => {
            const Icon = section.icon;
            return (
              <NavLink
                key={section.id}
                to={`/document-center/${section.id}`}
                className={({ isActive }) => `
                  group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'active bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                <Icon className="w-4 h-4 transition-colors" />
                <span className="flex-1">{section.title}</span>
                <ChevronRight className="w-3 h-3 transition-opacity opacity-0 group-[.active]:opacity-100 group-hover:opacity-50" />
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 mb-4 px-2 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            返回工作台
          </Link>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-200 mb-1">需要帮助？</h4>
            <p className="text-xs text-orange-600 dark:text-orange-300 mb-3">
              如果在文档中找不到答案，请尝试搜索或联系我们。
            </p>
            <button className="text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-md transition-colors w-full">
              联系技术支持
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-7xl mx-auto px-8 py-10 min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
