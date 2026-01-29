import React from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsSidebar } from './SettingsSidebar';

export const SettingsLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden p-4 gap-4">
      <SettingsSidebar />
      <main className="flex-1 overflow-y-auto rounded-2xl">
        <div className="max-w-7xl mx-auto h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
