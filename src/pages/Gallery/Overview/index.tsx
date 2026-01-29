import React from 'react';
import { ColorPalette } from './ColorPalette';
import { TypographyDemo } from './TypographyDemo';

export const GalleryOverview: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">设计概览</h2>
        <p className="text-gray-500">设计系统的基础，包括颜色和排版。</p>
      </div>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">调色板</h3>
        <ColorPalette />
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <section>
        <TypographyDemo />
      </section>
    </div>
  );
};
