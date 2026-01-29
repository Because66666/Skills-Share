import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Download, Eye, Star, User } from 'lucide-react';
import { Skill } from '@/services/skillsService';
import { cn } from '@/utils/cn';
import { getIconComponent } from '@/utils/iconMap';

interface SkillCardProps {
  skill: Skill;
  onPreview?: (skill: Skill) => void;
  onDownload?: (skill: Skill) => void;
  onClick?: (skill: Skill) => void;
}

/**
 * SkillCard Component
 * 展示单个 Skill 的信息卡片
 */
export const SkillCard: React.FC<SkillCardProps> = ({ skill, onPreview, onDownload, onClick }) => {
  const IconComponent = typeof skill.icon === 'string' ? getIconComponent(skill.icon) : skill.icon;

  const renderStatusBadge = () => {
    if (skill.status === 'pending') {
      return (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
          审核中
        </span>
      );
    }
    if (skill.status === 'rejected') {
      return (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
          已拒绝
        </span>
      );
    }
    return null;
  };

  return (
    <Card 
      className={cn(
        "h-full flex flex-col hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-800 relative",
        onClick && "cursor-pointer"
      )} 
      padding="p-0"
      onClick={() => onClick?.(skill)}
    >
      {renderStatusBadge()}
      <div className="p-6 flex-1 flex flex-col gap-4">
        {/* Header: Icon & Title */}
        <div className="flex items-start gap-4">
          <div className={cn("p-3 rounded-xl flex-shrink-0", skill.color || "bg-gray-100 text-gray-600")}>
            {IconComponent && <IconComponent className="w-8 h-8" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate mb-1" title={skill.title}>
              {skill.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <User className="w-3.5 h-3.5" />
              <span className="truncate">{skill.author}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 flex-1">
          {skill.description}
        </p>


      </div>

      {/* Footer: Stats & Actions */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/20 rounded-b-[24px]">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1" title="下载量">
            <Download className="w-3.5 h-3.5" />
            <span>{skill.downloadCount > 1000 ? `${(skill.downloadCount / 1000).toFixed(1)}k` : skill.downloadCount}</span>
          </div>
          <div className="flex items-center gap-1" title="评分">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span>{skill.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-primary hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(skill);
            }}
            title="预览"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-primary hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              onDownload?.(skill);
            }}
            title="下载"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
