import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillsService, type Skill } from '@/services/skillsService';
import { SkillCard } from '@/components/organisms/Skill/SkillCard';
import { Input } from '@/components/atoms/Input';
import { Search, Filter, X } from 'lucide-react';
import { useMessage } from '@/components/feedback/Message';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/utils/cn';
import { downloadSkill } from '@/utils/download';
import { Empty } from '@/components/data-display/Empty';
import { Spin } from '@/components/atoms/Spin';

export const Home = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const navigate = useNavigate();
  const message = useMessage();
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        console.log('Home: starting fetchSkills');
        const data = await skillsService.findAll();
        console.log('Home: fetchSkills result', data);
        
        if (Array.isArray(data)) {
          setSkills(data);
          if (data.length === 0) {
            console.warn('Home: fetched data is an empty array');
          }
        } else {
          console.error('Home: fetched data is not an array', data);
          setSkills([]);
        }
      } catch (error) {
        console.error('Failed to fetch skills', error);
        message.error('获取 Skill 列表失败');
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [message]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    if (!Array.isArray(skills)) return [];
    skills.forEach(skill => {
      if (skill.tags && Array.isArray(skill.tags)) {
        skill.tags.forEach(tag => tags.add(typeof tag === 'string' ? tag : tag.name));
      }
    });
    return Array.from(tags).sort();
  }, [skills]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    if (!Array.isArray(skills)) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return skills.filter(skill => {
      const matchesSearch = skill.title?.toLowerCase().includes(lowerQuery) ||
                            skill.description?.toLowerCase().includes(lowerQuery);
      const matchesTag = selectedTag ? skill.tags?.some(tag => (typeof tag === 'string' ? tag : tag.name) === selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [skills, searchQuery, selectedTag]);

  const handlePreview = (skill: Skill) => {
    navigate(`/skill/${skill.id}`);
  };

  const handleDownload = (skill: Skill) => {
    downloadSkill(skill, message);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col gap-8 pb-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm isolate">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 bg-white dark:bg-gray-900 transition-colors duration-300" />
        
        {/* Animated Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-400/30 dark:bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Noise Texture (Optional subtle texture) */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            发现无限可能 Skills 分享站
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            汇聚全网最实用的效率工具、设计资源与开发利器。一站式检索、预览、下载，让工作更高效，让创造更简单。
          </p>
          
          <div className="w-full max-w-xl mx-auto mt-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500" />
              <Input 
                placeholder="搜索你想要的 Skills..." 
                className="relative h-14 pl-12 pr-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-lg transition-all"
                leftIcon={<Search className="w-6 h-6 text-gray-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
            <Filter className="w-5 h-5" />
            <span>热门标签</span>
            {selectedTag && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-red-500 h-6 px-2 ml-2 text-xs"
                onClick={() => setSelectedTag(null)}
              >
                清除筛选 <X className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm transition-all border",
                selectedTag === tag 
                  ? "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700 shadow-sm font-medium transform scale-105" 
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-orange-300 hover:text-orange-500"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map(skill => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              onPreview={handlePreview}
              onDownload={handleDownload}
              onClick={handlePreview}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 flex justify-center">
          <Empty description="没有找到相关的 Skills，换个关键词试试？" />
        </div>
      )}
    </div>
  );
};
