import React, { useState, useMemo } from 'react';
import { 
  Search, HelpCircle, MessageCircle, ExternalLink, User, Shield, Plus, Minus,
  Play, Eye, ArrowRight, Scale, Users, Sparkles, BookOpen, ArrowLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { faqData, faqCategories, popularSearches, roleGuides, videoTutorials } from '@/mock/helpData';
import { documentSections } from '@/mock/documentData';
import logo from '@/assets/images/logo.svg';

export const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const filteredFAQs = useMemo(() => {
    return faqData.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return Shield;
      case 'Scale': return Scale;
      case 'Users': return Users;
      case 'Sparkles': return Sparkles;
      default: return User;
    }
  };

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pb-16 pt-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <img src={logo} alt="Logo" className="w-8 h-8" />
                <span className="font-bold text-xl text-gray-900 dark:text-gray-100">帮助中心</span>
            </div>
            <Link to="/dashboard" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> 返回工作台
            </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-900/10 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            你好，我们需要什么帮助？
          </h1>
          
          <div className="relative max-w-2xl mx-auto mb-6">
            <input
              type="text"
              placeholder="搜索问题、文档或功能..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-orange-500/20 dark:focus:ring-orange-900/50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 text-lg transition-all"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>热门搜索：</span>
            {popularSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(term)}
                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        
        {/* Role Based Navigation */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">我是...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roleGuides.map((guide) => {
              const Icon = getRoleIcon(guide.icon);
              return (
                <button
                  key={guide.id}
                  onClick={() => navigate(guide.link)}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left group"
                >
                  <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{guide.role}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{guide.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Documentation Shortcuts */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">帮助文档</h2>
            <Link to="/document-center" className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentSections.slice(0, 3).map((doc) => (
              <button
                key={doc.id}
                onClick={() => navigate(`/document-center?section=${doc.id}`)}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 group-hover:text-orange-600 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-orange-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {doc.content.slice(0, 60).replace(/[#*`]/g, '')}...
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Video Tutorials */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">视频教程</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTutorials.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className={`relative aspect-video rounded-xl overflow-hidden mb-3 ${video.thumbnail}`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-orange-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1 group-hover:text-orange-600 transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {video.views} 次观看</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-10">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">常见问题</h2>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                全部
              </button>
              {faqCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <div 
                    key={faq.id}
                    className={`border rounded-xl transition-all duration-200 overflow-hidden
                      ${expandedId === faq.id 
                        ? 'border-orange-200 dark:border-orange-900/50 bg-orange-50/30 dark:bg-orange-900/10' 
                        : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-orange-200 dark:hover:border-orange-800'
                      }`}
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                      className="w-full flex items-start text-left p-4 gap-4"
                    >
                      <span className={`mt-0.5 p-1 rounded-full transition-colors ${expandedId === faq.id ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                        {expandedId === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                      <div className="flex-1">
                        <h3 className={`font-medium text-base transition-colors ${expandedId === faq.id ? 'text-orange-700 dark:text-orange-300' : 'text-gray-900 dark:text-gray-100'}`}>
                          {faq.question}
                        </h3>
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${expandedId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-4 pt-0 pl-14 pr-8 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {faq.answer}
                      </div>
                      <div className="px-14 pb-4 flex gap-4">
                        <button className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1">
                          <span className="text-lg">👍</span> 有帮助
                        </button>
                        <button className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1">
                          <span className="text-lg">👎</span> 没帮助
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">未找到相关问题</p>
                  <p className="text-sm mt-1">请尝试更换关键词，或直接联系客服</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">仍需帮助？</h3>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                    如果上述内容无法解决您的问题，请联系我们的专业技术支持团队。
                  </p>
                  <div className="space-y-3">
                    <button className="w-full bg-white text-blue-600 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      在线咨询
                    </button>
                    <button className="w-full bg-blue-800/50 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      提交工单
                    </button>
                  </div>
                </div>
                {/* Decor */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
