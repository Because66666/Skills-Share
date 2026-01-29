import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillsService, Skill } from '@/services/skillsService';
import { Button } from '@/components/atoms/Button';
import { useMessage } from '@/components/feedback/Message';
import { Check, X, Eye, AlertCircle } from 'lucide-react';
import { Card } from '@/components/atoms/Card';

export const SkillReview: React.FC = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  const fetchSkills = async () => {
    setLoading(true);
    try {
      // If filter is 'all', pass undefined to get all, otherwise pass 'pending'
      const status = filter === 'pending' ? 'pending' : undefined;
      const data = await skillsService.findAllAdmin(status);
      // Ensure data is an array
      setSkills(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('Failed to fetch skills', error);
      if (error.response?.status === 403) {
        message.error('无权访问');
        navigate('/home');
      } else {
        message.error('获取列表失败');
      }
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [filter]);

  const handleApprove = async (id: string) => {
    try {
      await skillsService.updateStatus(id, 'approved');
      message.success('已审核通过');
      fetchSkills(); // Refresh list
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm('确定要拒绝该 Skill 吗？')) return;
    try {
      await skillsService.updateStatus(id, 'rejected');
      message.success('已拒绝');
      fetchSkills();
    } catch (error) {
      message.error('操作失败');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Skill 审核管理</h1>
          <p className="text-gray-500">管理员可在此审核用户发布的 Skills</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              filter === 'pending' 
                ? 'bg-orange-50 text-orange-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            待审核
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              filter === 'all' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            全部
          </button>
        </div>
      </div>

      <Card padding="p-0" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Skill 名称</th>
                <th className="px-6 py-4 font-medium">作者</th>
                <th className="px-6 py-4 font-medium">提交时间</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    加载中...
                  </td>
                </tr>
              ) : skills.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-gray-300" />
                      <p>暂无相关记录</p>
                    </div>
                  </td>
                </tr>
              ) : (
                skills.map((skill) => (
                  <tr key={skill.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${skill.color || 'bg-gray-100 text-gray-500'}`}>
                          {/* We don't have IconComponent here easily without logic, simplify */}
                          <span className="text-xs font-bold">{skill.title[0]}</span>
                        </div>
                        <span 
                          className="hover:underline cursor-pointer"
                          onClick={() => window.open(`/skill/${skill.id}`, '_blank')}
                        >
                          {skill.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                         {skill.user?.avatar ? (
                           <img src={skill.user.avatar} className="w-6 h-6 rounded-full" alt="" />
                         ) : (
                           <div className="w-6 h-6 rounded-full bg-gray-200" />
                         )}
                         <span>{skill.user?.name || skill.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(skill.publishDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        skill.status === 'approved' 
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : skill.status === 'rejected'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {skill.status === 'approved' && '已发布'}
                        {skill.status === 'rejected' && '已拒绝'}
                        {skill.status === 'pending' && '待审核'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(`/skill/${skill.id}`, '_blank')}
                          title="查看详情"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {skill.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 hover:bg-green-50 hover:text-green-700 border-green-200"
                              onClick={() => handleApprove(skill.id)}
                              title="通过"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                              onClick={() => handleReject(skill.id)}
                              title="拒绝"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
