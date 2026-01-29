import React, { useMemo, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { documentSections } from '@/mock/documentData';
import { SimpleMarkdown } from '@/components/data-display/SimpleMarkdown';
import { ArrowLeft, ArrowRight, Clock, Edit2, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

export const DocumentContent: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const [activeHeading, setActiveHeading] = useState<string>('');

  const sectionIndex = documentSections.findIndex(s => s.id === docId);
  const section = documentSections[sectionIndex];

  const headings = useMemo(() => {
    if (!section) return [];
    return section.content.split('\n')
      .filter(line => line.startsWith('## ') || line.startsWith('### '))
      .map(line => ({
        level: line.startsWith('### ') ? 3 : 2,
        text: line.replace(/^#{2,3}\s+/, '').trim()
      }));
  }, [section]);

  if (!section) {
    return <Navigate to="/document-center/intro" replace />;
  }

  const prevSection = sectionIndex > 0 ? documentSections[sectionIndex - 1] : null;
  const nextSection = sectionIndex < documentSections.length - 1 ? documentSections[sectionIndex + 1] : null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveHeading(id);
    }
  };

  return (
    <div className="flex gap-12 relative animate-fade-in">
      {/* Main Content Column */}
      <div className="flex-1 min-w-0">
        <div className="pb-12">
          {/* Header Info */}
          <div className="mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => navigate('/document-center')}>文档中心</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-200 font-medium">{section.title}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              {section.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>更新于 2024-01-20</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-orange-500 cursor-pointer transition-colors">
                <Edit2 className="w-4 h-4" />
                <span>在 GitHub 上编辑此页</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-orange max-w-none dark:prose-invert">
            <SimpleMarkdown content={section.content} />
          </div>

          {/* Feedback Section */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">这篇文档对您有帮助吗？</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">您的反馈能帮助我们做得更好</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:text-orange-600 hover:border-orange-500 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  有帮助
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-400 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  没帮助
                </button>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-6">
            {prevSection ? (
              <button
                onClick={() => navigate(`/document-center/${prevSection.id}`)}
                className="group flex flex-col items-start p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500/50 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all text-left"
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                  <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                  上一篇
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {prevSection.title}
                </span>
              </button>
            ) : <div />}

            {nextSection ? (
              <button
                onClick={() => navigate(`/document-center/${nextSection.id}`)}
                className="group flex flex-col items-end p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500/50 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all text-right"
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                  下一篇
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {nextSection.title}
                </span>
              </button>
            ) : <div />}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Table of Contents */}
      {headings.length > 0 && (
        <div className="hidden xl:block w-64 flex-shrink-0">
          <div className="fixed top-24 w-64 pr-8 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider pl-4 border-l-2 border-transparent">
              本页目录
            </h4>
            <nav className="flex flex-col gap-1">
              {headings.map((heading, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToHeading(heading.text)}
                  className={`
                    text-left text-sm py-1.5 pl-4 border-l-2 transition-all duration-200
                    ${heading.level === 3 ? 'ml-4' : ''}
                    ${activeHeading === heading.text
                      ? 'border-orange-500 text-orange-600 font-medium' 
                      : 'border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  {heading.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
