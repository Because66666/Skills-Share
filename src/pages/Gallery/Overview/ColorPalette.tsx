import React from 'react';
import { cn } from '@/utils/cn';

const ColorSwatch: React.FC<{ name: string; value: string; className?: string }> = ({ name, value, className }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    // Could add toast here
  };

  return (
    <div 
      className="cursor-pointer group" 
      onClick={handleCopy}
    >
      <div className={cn("h-24 rounded-xl shadow-sm mb-3 transition-transform group-hover:scale-105", className)} style={{ backgroundColor: value }}></div>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500 font-mono uppercase">{value}</p>
        </div>
      </div>
    </div>
  );
};

export const ColorPalette: React.FC = () => {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-lg font-semibold mb-4">品牌色 (Brand Colors)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ColorSwatch name="主色橙" value="#f97316" className="bg-orange-500" />
          <ColorSwatch name="次色紫" value="#8b5cf6" className="bg-purple-500" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">功能色 (Functional Colors)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ColorSwatch name="成功色" value="#10b981" className="bg-emerald-500" />
          <ColorSwatch name="警告色" value="#f59e0b" className="bg-amber-500" />
          <ColorSwatch name="错误色" value="#ef4444" className="bg-red-500" />
          <ColorSwatch name="信息色" value="#3b82f6" className="bg-blue-500" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">中性色 (Neutral Colors)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ColorSwatch name="深黑 (Slate 900)" value="#0f172a" className="bg-slate-900" />
          <ColorSwatch name="灰黑 (Slate 800)" value="#1e293b" className="bg-slate-800" />
          <ColorSwatch name="中灰 (Slate 500)" value="#64748b" className="bg-slate-500" />
          <ColorSwatch name="浅灰 (Slate 200)" value="#e2e8f0" className="bg-slate-200" />
        </div>
      </section>
    </div>
  );
};
