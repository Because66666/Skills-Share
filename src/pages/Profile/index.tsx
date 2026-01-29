import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Mail, Phone, MapPin, Calendar, Briefcase, Building, Plus } from 'lucide-react';
import { authService, LoginResponse } from '@/services/authService';
import { skillsService, Skill } from '@/services/skillsService';
import { SkillCard } from '@/components/organisms/Skill/SkillCard';
import { useMessage } from '@/components/feedback/Message';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response as any);
        
        // Fetch user skills if we have user ID
        if ((response as any).id) {
           try {
             const skills = await skillsService.findByUser((response as any).id);
             setMySkills(skills);
           } catch (err) {
             console.error('Failed to fetch user skills', err);
           } finally {
             setSkillsLoading(false);
           }
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
        message.error('获取个人信息失败');
        
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'null' && storedUser !== 'undefined') {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          // Try fetching skills with stored user ID
          if (parsedUser.id) {
             try {
               const skills = await skillsService.findByUser(parsedUser.id);
               setMySkills(skills);
             } catch (err) {
               console.error('Failed to fetch user skills', err);
             } finally {
               setSkillsLoading(false);
             }
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!user) {
    return <div>未登录</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-6">
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
          alt={user.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-orange-50"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>{(user as any).role?.name || (user as any).role || '普通用户'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              <span>{(user as any).tenant?.name || '默认组织'}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>上海市 · 徐汇区</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">更换头像</Button>
          <Button>编辑资料</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="md:col-span-2 space-y-6">
          <Card title="基本信息">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">真实姓名</label>
                <Input defaultValue={user.name} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">昵称</label>
                <Input defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">联系电话</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input defaultValue="138 0000 0000" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">电子邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input defaultValue={user.email} className="pl-10" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">入职日期</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input defaultValue="2023-05-12" disabled className="pl-10" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button>保存更改</Button>
            </div>
          </Card>

          <Card title="个人简介">
            <textarea 
              className="w-full min-h-[120px] p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-orange-500 transition-colors resize-y"
              defaultValue="热爱技术，专注于用户体验设计和前端开发。拥有多年的全栈开发经验，善于解决复杂的技术问题。"
            />
          </Card>

          <Card title={`我的 Skills (${mySkills.length})`}>
            {skillsLoading ? (
              <div className="text-center py-8 text-gray-500">加载中...</div>
            ) : mySkills.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mySkills.map((skill) => (
                  <div key={skill.id} className="h-[280px]">
                    <SkillCard 
                      skill={skill}
                      onClick={(s) => navigate(`/skill/${s.id}`)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <div className="text-gray-500 mb-4">暂无发布的 Skill</div>
                <Button size="sm" onClick={() => navigate('/skill/create')} className="gap-2">
                  <Plus className="w-4 h-4" />
                  发布第一个 Skill
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
          <Card title="账号安全">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-medium text-gray-900">账户密码</div>
                  <div className="text-xs text-gray-500">已设置</div>
                </div>
                <Button variant="link" size="sm">修改</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="text-sm font-medium text-gray-900">绑定手机</div>
                  <div className="text-xs text-gray-500">138****0000</div>
                </div>
                <Button variant="link" size="sm">更换</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-gray-900">MFA 认证</div>
                  <div className="text-xs text-gray-500">未开启</div>
                </div>
                <Button variant="link" size="sm">开启</Button>
              </div>
            </div>
          </Card>

          <Card title="团队成员">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                    alt="Member" 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">Team Member {i}</div>
                    <div className="text-xs text-gray-500 truncate">Developer</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* My Skills Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">我发布的 Skills</h2>
          <Button onClick={() => navigate('/skill/create')} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            发布新 Skill
          </Button>
        </div>
        
        {skillsLoading ? (
           <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : mySkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mySkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
            <p className="text-gray-500 mb-4">您还没有发布任何 Skill</p>
            <Button onClick={() => navigate('/skill/create')}>立即发布</Button>
          </div>
        )}
      </div>
    </div>
  );
};
