import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';
import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

interface SimpleMarkdownProps {
  content: string;
  className?: string;
}

const MermaidChart = ({ chart }: { chart: string }) => {
  const [svg, setSvg] = useState('');
  const id = useMemo(() => `mermaid-${Math.random().toString(36).substr(2, 9)}`, []);

  useEffect(() => {
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error('Mermaid render error:', error);
        setSvg('<div class="text-red-500">Failed to render diagram</div>');
      }
    };
    renderChart();
  }, [chart, id]);

  return <div className="my-4 flex justify-center bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700" dangerouslySetInnerHTML={{ __html: svg }} />;
};

export const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          h1: ({ node, children, ...props }) => (
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0 tracking-tight" {...props}>
              {children}
            </h1>
          ),
          h2: ({ node, children, ...props }) => {
             const id = String(children).trim();
             return (
              <h2 id={id} className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-10 mb-5 pb-2 border-b border-gray-200 dark:border-gray-700 scroll-mt-24" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ node, children, ...props }) => {
             const id = String(children).trim();
             return (
              <h3 id={id} className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-8 mb-3 scroll-mt-24" {...props}>
                {children}
              </h3>
            );
          },
          p: ({ node, children, ...props }) => (
            <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4" {...props}>
              {children}
            </p>
          ),
          ul: ({ node, children, ...props }) => (
            <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300" {...props}>
              {children}
            </ul>
          ),
          ol: ({ node, children, ...props }) => (
            <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300" {...props}>
              {children}
            </ol>
          ),
          li: ({ node, children, ...props }) => (
            <li className="leading-7" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ node, children, ...props }) => (
            <blockquote className="border-l-4 border-orange-500 pl-4 py-2 my-4 bg-orange-50 dark:bg-orange-900/10 text-gray-700 dark:text-gray-300 italic rounded-r-lg" {...props}>
              {children}
            </blockquote>
          ),
          a: ({ node, children, href, ...props }) => {
            const isInternal = href?.startsWith('/');
            if (isInternal) {
              return (
                <Link 
                  to={href || '#'} 
                  className="text-orange-600 dark:text-orange-400 hover:underline font-medium" 
                  {...props as any}
                >
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} className="text-orange-600 dark:text-orange-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props}>
                {children}
              </a>
            );
          },
          table: ({ node, children, ...props }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ node, children, ...props }) => (
            <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ node, children, ...props }) => (
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ node, children, ...props }) => (
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props}>
              {children}
            </tr>
          ),
          th: ({ node, children, ...props }) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props}>
              {children}
            </th>
          ),
          td: ({ node, children, ...props }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300" {...props}>
              {children}
            </td>
          ),
          img: ({ node, src, alt, ...props }) => (
            <img src={src} alt={alt} className="max-w-full h-auto rounded-lg shadow-md my-6 mx-auto" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && language === 'mermaid') {
              return <MermaidChart chart={String(children).replace(/\n$/, '')} />;
            }

            return !inline && match ? (
              <div className="rounded-lg overflow-hidden my-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '1.5rem', fontSize: '0.9rem' }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={`${inline ? 'bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-orange-600 dark:text-orange-400 border border-gray-200 dark:border-gray-700' : ''} ${className}`} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};


