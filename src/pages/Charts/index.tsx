import { skillsData } from '@/mock/skillsData';
import { SkillCard } from '@/components/organisms/Skill/SkillCard';
import { Trophy } from 'lucide-react';
import { useMessage } from '@/components/feedback/Message';
import { useNavigate } from 'react-router-dom';
import { Skill } from '@/services/skillsService';
import { downloadSkill } from '@/utils/download';

export const Charts = () => {
  const navigate = useNavigate();
  const message = useMessage();
  // Sort skills by download count to simulate "Top Charts"
  const topSkills = [...skillsData].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 8);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl">
          <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">热门榜单</h1>
          <p className="text-gray-500 dark:text-gray-400">大家都在用的高频 Skills</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topSkills.map((skill, index) => {
          // Adapt mock skill to service skill interface
          const adaptedSkill: Skill = {
            ...skill,
            status: skill.status || 'approved',
            tags: skill.tags.map(tag => ({ id: tag, name: tag })),
            // Mock data icon can be component or string, service expects string (mostly), but SkillCard handles both.
            // We need to cast icon to any or string to satisfy TS if strict.
            icon: skill.icon as any,
            color: skill.color || 'bg-gray-100 text-gray-600'
          };

          return (
            <div key={skill.id} className="relative">
              {index < 3 && (
                <div className="absolute -top-3 -left-3 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white dark:ring-gray-900">
                  {index + 1}
                </div>
              )}
              <SkillCard 
                skill={adaptedSkill} 
                onPreview={() => navigate(`/skill/${skill.id}`)}
                onDownload={() => downloadSkill(adaptedSkill, message)}
                onClick={() => navigate(`/skill/${skill.id}`)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
