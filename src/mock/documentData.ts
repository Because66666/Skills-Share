import { Zap, Code, Terminal, Mail, Book, FileText, Server, HelpCircle, Palette, Info, ListTodo, History } from 'lucide-react';
import introContent from './docs/intro.md?raw';
import quickStartContent from './docs/quick-start.md?raw';
import userManualContent from './docs/user-manual.md?raw';
import devContent from './docs/dev.md?raw';
import deploymentContent from './docs/deployment.md?raw';
import apiContent from './docs/api.md?raw';
import faqContent from './docs/faq.md?raw';
import markdownExampleContent from './docs/markdown-example.md?raw';
import readmeContent from '../../README.md?raw';
import todoContent from '../../TODO.md?raw';
import changelogContent from '../../CHANGELOG.md?raw';
import contactContent from './docs/contact.md?raw';

export interface DocSection {
  id: string;
  title: string;
  icon: any;
  content: string; // Markdown or HTML string content
}

export const documentSections: DocSection[] = [
  {
    id: 'intro',
    title: '产品简介',
    icon: Book,
    content: introContent
  },
  {
    id: 'quick-start',
    title: '快速入门',
    icon: Zap,
    content: quickStartContent
  },
  {
    id: 'user-manual',
    title: '用户操作手册',
    icon: FileText,
    content: userManualContent
  },
  {
    id: 'dev',
    title: '开发文档',
    icon: Code,
    content: devContent
  },
  {
    id: 'api',
    title: 'API调用文档',
    icon: Terminal,
    content: apiContent
  },
  {
    id: 'faq',
    title: '常见问题',
    icon: HelpCircle,
    content: faqContent
  },
  {
    id: 'markdown-example',
    title: 'Markdown 示例',
    icon: Palette,
    content: markdownExampleContent
  },
  {
    id: 'readme',
    title: 'README',
    icon: Info,
    content: readmeContent
  },
  {
    id: 'todo',
    title: 'TODO',
    icon: ListTodo,
    content: todoContent
  },
  {
    id: 'changelog',
    title: 'CHANGELOG',
    icon: History,
    content: changelogContent
  },
  {
    id: 'contact',
    title: '联系我们',
    icon: Mail,
    content: contactContent
  }
];


