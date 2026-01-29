import { Zap, Database, Image as ImageIcon, Code, FileText, Search, BarChart2, Shield, Globe, Cpu } from 'lucide-react';
import smartDataCleanerContent from './Skills/smart-data-cleaner.md?raw';
import aiImageGeneratorContent from './Skills/ai-image-generator.md?raw';
import codeFormatConverterContent from './Skills/code-format-converter.md?raw';
import pdfSmartExtractorContent from './Skills/pdf-smart-extractor.md?raw';
import webSentimentMonitorContent from './Skills/web-sentiment-monitor.md?raw';
import websiteSecurityScanContent from './Skills/website-security-scan.md?raw';

export interface Skill {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  downloadCount: number;
  rating: number;
  publishDate: string;
  icon?: any; // Lucide icon component
  color?: string; // Background color for icon wrapper
  content?: string; // Markdown content
  status?: 'pending' | 'approved' | 'rejected';
}

export const skillsData: Skill[] = [
  {
    id: '1',
    title: '智能数据清洗',
    description: '自动识别并修复表格中的异常数据，支持 CSV/Excel 格式，内置多种常见错误处理规则。',
    author: 'DataMaster',
    tags: ['数据处理', '自动化', 'Excel'],
    downloadCount: 1250,
    rating: 4.8,
    publishDate: '2023-10-15',
    icon: Database,
    color: 'bg-blue-100 text-blue-600',
    content: smartDataCleanerContent,
    status: 'approved'
  },
  {
    id: '2',
    title: 'AI 图像生成器',
    description: '基于最新扩散模型，一键生成高质量商业插画、Logo 和社交媒体配图。',
    author: 'CreativeAI',
    tags: ['AI', '图像处理', '设计'],
    downloadCount: 3400,
    rating: 4.9,
    publishDate: '2023-11-20',
    icon: ImageIcon,
    color: 'bg-purple-100 text-purple-600',
    content: aiImageGeneratorContent,
    status: 'approved'
  },
  {
    id: '3',
    title: '代码格式转换',
    description: '支持 JSON, XML, YAML 等多种格式互转，并提供语法高亮和错误校验功能。',
    author: 'DevTools',
    tags: ['开发工具', '格式转换'],
    downloadCount: 890,
    rating: 4.5,
    publishDate: '2023-09-05',
    icon: Code,
    color: 'bg-green-100 text-green-600',
    content: codeFormatConverterContent,
    status: 'approved'
  },
  {
    id: '4',
    title: 'PDF 智能提取',
    description: '从复杂的 PDF 文档中提取文本、表格和图片，保持原有排版结构。',
    author: 'DocWizard',
    tags: ['文档处理', 'PDF', 'OCR'],
    downloadCount: 2100,
    rating: 4.7,
    publishDate: '2023-12-01',
    icon: FileText,
    color: 'bg-red-100 text-red-600',
    content: pdfSmartExtractorContent,
    status: 'approved'
  },
  {
    id: '5',
    title: '全网舆情监控',
    description: '实时监控社交媒体关键词，自动生成情感分析报告，助您把握市场风向。',
    author: 'MarketSense',
    tags: ['营销', '数据分析', '舆情'],
    downloadCount: 560,
    rating: 4.2,
    publishDate: '2023-08-10',
    icon: Search,
    color: 'bg-orange-100 text-orange-600',
    content: webSentimentMonitorContent,
    status: 'approved'
  },
  {
    id: '6',
    title: '销售数据可视化',
    description: '提供多种炫酷图表模板，一键将枯燥的销售数据转化为直观的仪表盘。',
    author: 'ChartPro',
    tags: ['数据可视化', '图表', '商业智能'],
    downloadCount: 1800,
    rating: 4.6,
    publishDate: '2023-10-30',
    icon: BarChart2,
    color: 'bg-indigo-100 text-indigo-600',
    content: smartDataCleanerContent,
    status: 'approved'
  },
  {
    id: '7',
    title: '网站安全扫描',
    description: '快速扫描网站漏洞，检测 XSS, SQL 注入等常见安全风险，并提供修复建议。',
    author: 'SecGuard',
    tags: ['安全', 'Web', '测试'],
    downloadCount: 950,
    rating: 4.8,
    publishDate: '2023-09-25',
    icon: Shield,
    color: 'bg-gray-100 text-gray-600',
    content: websiteSecurityScanContent
  },
  {
    id: '8',
    title: '多语言翻译助手',
    description: '支持 100+ 种语言互译，提供文档翻译和实时语音翻译功能，准确率高。',
    author: 'GlobalTalk',
    tags: ['翻译', '语言', 'AI'],
    downloadCount: 4200,
    rating: 4.5,
    publishDate: '2023-11-10',
    icon: Globe,
    color: 'bg-cyan-100 text-cyan-600',
    content: smartDataCleanerContent
  },
  {
    id: '9',
    title: '智能流程自动化',
    description: '通过简单的拖拽编排，自动化处理日常重复性工作，提升工作效率。',
    author: 'AutoBot',
    tags: ['RPA', '效率', '自动化'],
    downloadCount: 1500,
    rating: 4.4,
    publishDate: '2023-10-05',
    icon: Cpu,
    color: 'bg-pink-100 text-pink-600',
    content: smartDataCleanerContent
  },
  {
    id: '10',
    title: '快速原型设计',
    description: '内置丰富的 UI 组件库，帮助产品经理快速搭建高保真产品原型。',
    author: 'DesignKit',
    tags: ['设计', '原型', '产品'],
    downloadCount: 2800,
    rating: 4.7,
    publishDate: '2023-12-15',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    content: smartDataCleanerContent
  }
];
