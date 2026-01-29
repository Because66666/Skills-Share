import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import {
  Search,
  Book,
  FileText,
  Home,
  HelpCircle,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { skillsData } from '@/mock/skillsData';
import { useTheme } from '@/contexts/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, setIsOpen]);

  const runCommand = (command: () => void) => {
    setIsOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
    >
      <div className="w-full max-w-[640px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-3">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <Command.Input 
            className="flex-1 h-12 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-sm"
            placeholder="搜索页面、技能或更改主题..." 
          />
        </div>
        
        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scroll-py-2 thin-scrollbar">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            未找到结果
          </Command.Empty>

          <Command.Group heading="页面跳转" className="text-xs font-medium text-gray-400 px-2 mb-2">
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/home'))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <Home className="w-4 h-4" />
              <span>首页</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/guide'))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <Book className="w-4 h-4" />
              <span>使用指南</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/faq'))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <HelpCircle className="w-4 h-4" />
              <span>常见问题</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => navigate('/about'))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <FileText className="w-4 h-4" />
              <span>关于我们</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="热门技能" className="text-xs font-medium text-gray-400 px-2 mb-2 mt-2">
            {skillsData.slice(0, 5).map(skill => (
              <Command.Item 
                key={skill.id}
                onSelect={() => runCommand(() => navigate(`/skill/${skill.id}`))}
                className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                   {/* We assume icon is a component, but in cmdk we just need to render it. 
                       Since skill.icon is a component, we can render it. */}
                   {skill.icon && React.createElement(skill.icon, { className: "w-4 h-4" })}
                </div>
                <span>{skill.title}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="主题设置" className="text-xs font-medium text-gray-400 px-2 mb-2 mt-2">
            <Command.Item 
              onSelect={() => runCommand(() => setTheme('light'))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <Sun className="w-4 h-4" />
              <span>浅色模式</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => setTheme('dark'))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <Moon className="w-4 h-4" />
              <span>深色模式</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => setTheme('system'))}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
            >
              <Monitor className="w-4 h-4" />
              <span>跟随系统</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};
