import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { 
  Zap, Code, Database, Layout, Box, Terminal, Cpu, Globe, 
  Server, Shield, Activity, FileText, Image, Music, Video,
  Search, Lock, Key, Cloud, Smartphone, Briefcase, Calculator,
  Calendar, Camera, CheckCircle, Clipboard, Compass, CreditCard
} from 'lucide-react';
import { cn } from '@/utils/cn';

// Map of common icons
const ICONS = {
  Zap, Code, Database, Layout, Box, Terminal, Cpu, Globe, 
  Server, Shield, Activity, FileText, Image, Music, Video,
  Search, Lock, Key, Cloud, Smartphone, Briefcase, Calculator,
  Calendar, Camera, CheckCircle, Clipboard, Compass, CreditCard
};

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get current icon component or fallback
  const CurrentIcon = (ICONS as any)[value] || Zap;

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <CurrentIcon className="w-4 h-4" />
          <span>{value}</span>
        </div>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 w-72 z-20 grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
            {Object.entries(ICONS).map(([name, Icon]) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  onChange(name);
                  setIsOpen(false);
                }}
                className={cn(
                  "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors aspect-square",
                  value === name && "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                )}
                title={name}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
