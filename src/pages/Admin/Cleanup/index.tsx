import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillsService } from '@/services/skillsService';
import { Button } from '@/components/atoms/Button';
import { ArrowLeft, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import { useMessage } from '@/components/feedback/Message';
import { Spin } from '@/components/atoms/Spin';

export const AdminCleanup = () => {
  const navigate = useNavigate();
  const message = useMessage();
  const [loading, setLoading] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [stats, setStats] = useState<{ count: number; size: number } | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await skillsService.getCleanupStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
      message.error('获取统计数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!stats || stats.count === 0) return;
    
    if (!window.confirm(`确定要清理 ${stats.count} 个无主附件吗？此操作将永久删除文件！`)) {
      return;
    }

    try {
      setCleaning(true);
      const result = await skillsService.cleanupOrphans();
      message.success(`清理成功！共删除 ${result.deletedCount} 个文件，释放 ${(result.deletedSize / 1024 / 1024).toFixed(2)} MB 空间`);
      fetchStats(); // Refresh stats
    } catch (error) {
      console.error('Cleanup failed', error);
      message.error('清理失败');
    } finally {
      setCleaning(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate('/home')} className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回首页
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">附件清理工具</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
            <AlertTriangle className="w-10 h-10" />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              孤儿附件清理
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              清理未关联任何 Skill 的附件文件（孤儿文件）。这些文件可能是用户上传但未提交 Skill 产生的残留文件。
              <br />
              <span className="text-xs text-orange-500">* 为安全起见，系统仅清理 1 小时前创建的文件。</span>
            </p>
          </div>

          {loading ? (
            <div className="py-8">
              <Spin />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">可清理文件数</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats?.count || 0}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">预计释放空间</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatSize(stats?.size || 0)}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={fetchStats} disabled={loading || cleaning}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              刷新数据
            </Button>
            <Button 
              onClick={handleCleanup} 
              disabled={loading || cleaning || !stats?.count}
              className="bg-red-600 hover:bg-red-700 text-white border-none shadow-md hover:shadow-lg transition-all"
            >
              {cleaning ? (
                <>
                  <Spin size="sm" className="mr-2 text-white" />
                  清理中...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  一键清理
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
