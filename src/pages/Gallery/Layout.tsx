import React from 'react';
import { Outlet } from 'react-router-dom';
import { GallerySidebar } from './layouts/GallerySidebar';

export const GalleryLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden p-4 gap-4">
      <GallerySidebar />
      <main className="flex-1 overflow-y-auto rounded-2xl">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
