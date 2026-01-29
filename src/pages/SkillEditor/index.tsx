import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { skillsService, CreateSkillRequest } from '@/services/skillsService';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { TextArea } from '@/components/atoms/TextArea';
import { ArrowLeft, Save, Loader2, X, Plus, Code, Layout, Shuffle, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMessage } from '@/components/feedback/Message';
import { getIconComponent, IconMap } from '@/utils/iconMap';
import { ColorPicker, COLORS } from '@/components/molecules/ColorPicker';
import { IconPicker } from '@/components/molecules/IconPicker';
import { FileUploader } from '@/components/molecules/FileUploader';
import { cn } from '@/utils/cn';
import { extractKeywords } from '@/utils/tagExtractor';

export const SkillEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const message = useMessage();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<CreateSkillRequest>({
    title: '',
    description: '',
    content: '',
    tags: [],
    icon: 'Zap',
    color: 'bg-blue-100 text-blue-600',
    attachmentIds: [],
  });
  const [attachments, setAttachments] = useState<any[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [appearanceMode, setAppearanceMode] = useState<'random' | 'custom'>('random');

  useEffect(() => {
    if (isEditMode && id) {
      loadSkill(id);
      setAppearanceMode('custom'); // Editing existing skill defaults to custom (preserve)
    } else {
        // New skill defaults to random
        handleRandomize();
    }
  }, [id]);

  // Auto-tagging effect
  useEffect(() => {
    const timer = setTimeout(() => {
        if (formData.content && formData.content.length > 20) {
            const keywords = extractKeywords(formData.content);
            // Only update if extracted keywords are different and valid
            if (keywords.length > 0) {
                // To avoid being too intrusive, we could merge? 
                // But requirement says "Auto extract 5 tags".
                // Let's replace tags but maybe keep user added ones? 
                // The prompt implies automation. Let's just set them.
                setFormData(prev => {
                    // Check if tags are materially different to avoid unnecessary re-renders or updates
                    const currentTags = prev.tags || [];
                    const isSame = keywords.length === currentTags.length && keywords.every((k, i) => k === currentTags[i]);
                    if (isSame) return prev;
                    return { ...prev, tags: keywords };
                });
            }
        }
    }, 1000); // 1s debounce
    return () => clearTimeout(timer);
  }, [formData.content]);

  const handleRandomize = () => {
     const iconKeys = Object.keys(IconMap);
     const randomIcon = iconKeys[Math.floor(Math.random() * iconKeys.length)];
     const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)].value;
     setFormData(prev => ({ ...prev, icon: randomIcon, color: randomColor }));
  };

  const loadSkill = async (skillId: string) => {
    try {
      setFetching(true);
      const skill = await skillsService.findOne(skillId);
      setFormData({
        title: skill.title,
        description: skill.description,
        content: skill.content || '',
        tags: skill.tags.map(t => t.name),
        icon: skill.icon,
        color: skill.color,
        attachmentIds: skill.attachments?.map(a => a.id) || [],
      });
      setAttachments(skill.attachments || []);
    } catch (err) {
      message.error('加载 Skill 失败');
      navigate('/home');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title) {
        message.error('请输入标题');
        return;
    }
    setLoading(true);
    try {
      if (isEditMode && id) {
        await skillsService.update(id, formData);
        message.success('Skill 更新成功');
      } else {
        await skillsService.create(formData);
        message.success('Skill 创建成功');
      }
      navigate('/home');
    } catch (err) {
      console.error(err);
      message.error('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleAttachmentsChange = (newAttachments: any[]) => {
    setAttachments(newAttachments);
    setFormData({ ...formData, attachmentIds: newAttachments.map(a => a.id) });
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags?.includes(tag)) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tag] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter(t => t !== tag) });
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const IconPreview = getIconComponent(formData.icon || 'Zap');

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <h1 className="text-lg font-semibold text-gray-900">
            {isEditMode ? '编辑 Skill' : '创建新 Skill'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>取消</Button>
            <Button onClick={handleSubmit} disabled={loading} className="min-w-[100px] shadow-sm">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                {isEditMode ? '保存修改' : '立即发布'}
            </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Form & Editor */}
        <div className="flex-1 bg-white border-r border-gray-200 flex flex-col overflow-y-auto z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
            <div className="p-6 space-y-8">
                <section>
                    <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                        基本信息
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="text-xs text-gray-500">标题</span>
                            <Input 
                                placeholder="输入 Skill 标题" 
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                className="font-medium"
                            />
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-gray-500">简介</span>
                            <TextArea 
                                placeholder="简要描述 (用于卡片展示)" 
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                rows={1}
                                className="resize-none min-h-[42px]"
                            />
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section>
                    <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                             <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                             外观设置
                        </label>
    
                        {/* Mode Toggle */}
                        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                            <button
                                onClick={() => setAppearanceMode('random')}
                                className={cn(
                                    "flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                    appearanceMode === 'random' 
                                        ? "bg-white text-blue-600 shadow-sm" 
                                        : "text-gray-500 hover:text-gray-900"
                                )}
                            >
                                <Shuffle className="w-3.5 h-3.5" />
                                随机
                            </button>
                            <button
                                onClick={() => setAppearanceMode('custom')}
                                className={cn(
                                    "flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                    appearanceMode === 'custom' 
                                        ? "bg-white text-blue-600 shadow-sm" 
                                        : "text-gray-500 hover:text-gray-900"
                                )}
                            >
                                <Layout className="w-3.5 h-3.5" />
                                自定义
                            </button>
                        </div>
                    </div>
    
                        {appearanceMode === 'random' ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center gap-3">
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300", formData.color)}>
                                         {IconPreview && <IconPreview className="w-6 h-6" />}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        当前随机样式
                                    </div>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        onClick={handleRandomize}
                                        className="w-full"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5 mr-2" />
                                        换一个
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div>
                                    <span className="text-xs text-gray-500 mb-2 block">图标</span>
                                    <IconPicker 
                                        value={formData.icon || 'Zap'} 
                                        onChange={val => setFormData({...formData, icon: val})} 
                                    />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 mb-2 block">主题色</span>
                                    <ColorPicker 
                                        value={formData.color || 'bg-blue-100 text-blue-600'} 
                                        onChange={val => setFormData({...formData, color: val})} 
                                    />
                                </div>
                            </div>
                        )}
                    </section>
    
                    <section>
                        <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                             <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                             附件资源
                        </label>
                        <FileUploader 
                            value={attachments}
                            onChange={handleAttachmentsChange}
                            maxCount={1}
                        />
                    </section>
                </div>

                <section>
                    <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                         <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                         标签管理
                    </label>
                    <div className="flex flex-wrap gap-2 items-center">
                        {formData.tags?.map(tag => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 group hover:border-red-200 hover:bg-red-50 transition-colors cursor-default">
                                {tag}
                                <button onClick={() => handleRemoveTag(tag)} className="ml-1.5 text-gray-400 group-hover:text-red-500 opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                        
                        {/* Input and Add Button - placed after tags */}
                        <div className="flex gap-1 items-center" style={{ maxWidth: '200px' }}>
                            <Input
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                                placeholder="添加标签..."
                                className="h-7 text-xs w-24 px-2"
                            />
                            <Button size="sm" onClick={handleAddTag} variant="secondary" className="h-7 w-7 p-0 shrink-0">
                                <Plus className="w-3.5 h-3.5" />
                            </Button>
                        </div>

                        {(!formData.tags || formData.tags.length === 0) && tagInput === '' && (
                            <span className="text-xs text-gray-400 italic">暂无标签</span>
                        )}
                    </div>
                </section>

                <section className="flex-1 flex flex-col min-h-[500px]">
                    <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                         <span className="w-1 h-4 bg-gray-600 rounded-full"></span>
                         Markdown 内容
                    </label>
                    <div className="flex-1 flex flex-col border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 transition-shadow">
                        <div className="h-9 border-b border-gray-100 flex items-center justify-between px-3 bg-gray-50/50">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                <Code className="w-3 h-3" /> 编辑器
                            </span>
                             <span className="text-xs text-gray-400">
                                {formData.content?.length || 0} 字符
                            </span>
                        </div>
                        <textarea
                            className="flex-1 w-full p-4 resize-none outline-none text-sm font-mono text-gray-800 leading-relaxed overflow-y-auto selection:bg-blue-100 selection:text-blue-900 min-h-[400px]"
                            placeholder="# 开始编写 Skill 详细内容..."
                            value={formData.content}
                            onChange={e => setFormData({...formData, content: e.target.value})}
                            spellCheck={false}
                        />
                    </div>
                </section>
            </div>
        </div>

        {/* Right: Preview */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50/50 hidden lg:flex">
             <div className="h-10 border-b border-gray-200 flex items-center px-4 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Layout className="w-3 h-3" /> 实时预览
                </span>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[500px]">
                     {/* Preview Header */}
                     <div className="flex items-start gap-5 mb-8 pb-8 border-b border-gray-100">
                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300", formData.color)}>
                             {IconPreview && <IconPreview className="w-8 h-8" />}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{formData.title || '无标题'}</h1>
                            <p className="text-gray-500 leading-relaxed">{formData.description || '暂无描述'}</p>
                            <div className="flex gap-2 mt-4">
                                {formData.tags?.map(t => (
                                    <span key={t} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">#{t}</span>
                                ))}
                            </div>
                        </div>
                     </div>
                     {/* Markdown Content */}
                     <article className="prose prose-sm md:prose-base max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl prose-pre:bg-gray-900 prose-pre:text-gray-50">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {formData.content || '*预览区域...*'}
                        </ReactMarkdown>
                     </article>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
