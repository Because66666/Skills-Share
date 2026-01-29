import React from 'react';
import { Navbar } from '@/components/layouts/Navbar';
import { Outlet } from 'react-router-dom';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children || <Outlet />}
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 py-8 mt-auto">
        <div className="max-w-[1600px] mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 Skills Share. From within Yingchuo.</p>
        </div>
      </footer>
    </div>
  );
};
