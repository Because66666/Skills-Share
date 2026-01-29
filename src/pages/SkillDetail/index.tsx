import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { skillsService, Skill } from '@/services/skillsService';
import { SimpleMarkdown } from '@/components/data-display/SimpleMarkdown';
import { Button } from '@/components/atoms/Button';
import { Tag } from '@/components/atoms/Tag';
import { TextArea } from '@/components/atoms/TextArea';
import { ArrowLeft, Download, Star, User, Calendar, Share2, MessageCircle, Edit, Trash2, File as FileIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { getIconComponent } from '@/utils/iconMap';
import { Spin } from '@/components/atoms/Spin';
import { useMessage } from '@/components/feedback/Message';

export const SkillDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const message = useMessage();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr && userStr !== 'null' && userStr !== 'undefined') {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchSkill = async () => {
      try {
        const data = await skillsService.findOne(id);
        setSkill(data);
      } catch (error) {
        console.error('Failed to fetch skill', error);
        message.error('获取 Skill 详情失败');
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="lg" />
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">未找到该 Skill</h2>
        <Button onClick={() => navigate('/home')}>返回首页</Button>
      </div>
    );
  }

  const renderStatusBanner = () => {
    if (skill.status === 'pending') {
      return (
        <div className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <p className="text-sm font-medium">该 Skill 正在审核中，审核通过后将在首页公开展示。</p>
        </div>
      );
    }
    if (skill.status === 'rejected') {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <p className="text-sm font-medium">该 Skill 未通过审核，请修改后重新提交。</p>
        </div>
      );
    }
    return null;
  };

  const handleDownload = (attachment?: any) => {
    if (attachment) {
        // Download specific attachment
        const url = `http://localhost:3000${attachment.path}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = attachment.originalName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        message.success(`开始下载 ${attachment.originalName}`);
    } else {
        // Fallback for "Get Skill" button if no specific attachment logic defined yet
        // For now, if there are attachments, download the first one, or show message
        if (skill.attachments && skill.attachments.length > 0) {
            handleDownload(skill.attachments[0]);
        } else {
            message.info('该 Skill 暂无附件可供下载');
        }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('链接已复制到剪贴板');
  };

  const handleEdit = () => {
    navigate(`/skill/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('确定要删除该 Skill 吗？（删除后可在管理员后台恢复）')) {
      try {
        await skillsService.remove(id!);
        message.success('Skill 已删除');
        navigate('/home');
      } catch (error) {
        message.error('删除失败');
      }
    }
  };

  const handleHardDelete = async () => {
      if (window.confirm('警告：确定要彻底删除该 Skill 吗？此操作将永久删除 Skill 及其关联的附件文件，且不可恢复！')) {
        try {
          await skillsService.hardDelete(id!);
          message.success('Skill 已彻底删除');
          navigate('/home');
        } catch (error) {
          message.error('删除失败');
        }
      }
    };

  const handleRate = async (value: number) => {
    try {
      await skillsService.addRating(id!, value);
      message.success('评分成功');
      const updated = await skillsService.findOne(id!);
      setSkill(updated);
    } catch (error) {
      message.error('评分失败');
    }
  };

  const handleSubmitComment = async () => {
    if (!commentContent.trim()) return;
    setSubmittingComment(true);
    try {
      await skillsService.addComment(id!, commentContent);
      message.success('评论已发布');
      setCommentContent('');
      const updated = await skillsService.findOne(id!);
      setSkill(updated);
    } catch (error) {
      message.error('评论失败');
    } finally {
      setSubmittingComment(false);
    }
  };

  const IconComponent = typeof skill.icon === 'string' ? getIconComponent(skill.icon) : skill.icon;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Back Button & Actions */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回列表</span>
        </button>

        <div className="flex gap-2">
           {currentUser && skill.user?.id === currentUser.id && (
             <>
               <Button variant="outline" size="sm" onClick={handleEdit}>
                 <Edit className="w-4 h-4 mr-2" /> 编辑
               </Button>
               <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleDelete}>
                 <Trash2 className="w-4 h-4 mr-2" /> 删除
               </Button>
             </>
           )}
           {currentUser && currentUser.role?.name === 'admin' && (
              <Button variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200" onClick={handleHardDelete}>
                <Trash2 className="w-4 h-4 mr-2" /> 彻底删除
              </Button>
           )}
        </div>
      </div>

      {renderStatusBanner()}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Metadata */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              <div className={cn("p-4 rounded-2xl", skill.color || "bg-gray-100 text-gray-600")}>
                {IconComponent && <IconComponent className="w-10 h-10" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{skill.title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <User className="w-4 h-4" />
                  <span>{skill.author}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {skill.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {skill.tags.map(tag => (
                  <Tag key={typeof tag === 'string' ? tag : tag.id} className="text-xs">
                    {typeof tag === 'string' ? tag : tag.name}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Attachments Section */}
            {skill.attachments && skill.attachments.length > 0 && (
                <div className="mb-8 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <FileIcon className="w-4 h-4" />
                        包含附件
                    </h3>
                    <div className="space-y-2">
                        {skill.attachments.map(attachment => (
                            <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700 group hover:border-blue-200 transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded bg-white dark:bg-gray-600 flex items-center justify-center text-gray-400">
                                        <FileIcon className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[150px]" title={attachment.originalName}>
                                            {attachment.originalName}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {(attachment.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleDownload(attachment)}>
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  下载量
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {skill.downloadCount > 1000 ? `${(skill.downloadCount / 1000).toFixed(1)}k` : skill.downloadCount}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  评分
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                  {skill.rating?.toFixed(1) || '0.0'}
                  <div className="flex ml-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={cn(
                          "w-3 h-3 cursor-pointer hover:scale-110 transition-transform", 
                          star <= Math.round(skill.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        )} 
                        onClick={() => handleRate(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl col-span-2">
                <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  发布日期
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {skill.publishDate ? new Date(skill.publishDate).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => handleDownload()}>
                <Download className="w-4 h-4 mr-2" />
                一键获取
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Content: Markdown & Comments */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px]">
            {skill.content ? (
              <div className="prose prose-orange max-w-none dark:prose-invert">
                <SimpleMarkdown content={skill.content} />
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                暂无详细文档
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              评论 ({skill.comments?.length || 0})
            </h3>

            <div className="mb-8">
               <TextArea 
                 placeholder="写下你的评论..." 
                 value={commentContent}
                 onChange={(e) => setCommentContent(e.target.value)}
                 className="mb-2"
               />
               <div className="flex justify-end">
                 <Button onClick={handleSubmitComment} disabled={submittingComment || !commentContent.trim()}>
                   {submittingComment ? '发布中...' : '发布评论'}
                 </Button>
               </div>
            </div>

            <div className="space-y-6">
              {skill.comments?.map((comment) => (
                <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {comment.user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{comment.user?.name || 'Unknown User'}</span>
                      <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                  </div>
                </div>
              ))}
              {(!skill.comments || skill.comments.length === 0) && (
                <div className="text-center text-gray-500 py-8">
                  暂无评论，快来抢沙发吧！
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
