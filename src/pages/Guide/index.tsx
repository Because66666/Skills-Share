import { 
  Command, 
  Folder, FileCode, CheckCircle2, Copy, 
  Zap, BrainCircuit, Box, Search, 
  Sparkles, Lightbulb, Rocket
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';

export const Guide = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-20 py-16 px-6 animate-in fade-in duration-700 font-sans">
      {/* Header Section */}
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          <span>AI 工程化最佳实践</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
          Trae Skills <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            让 AI 真正读懂你的代码
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          告别重复的 Prompt 调教。通过 Skills，将你的工程经验封装成 AI 可执行的标准化流程 (SOP)。
        </p>
      </div>

      {/* 1. The Problem: Prompt Engineering is Hard */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <BrainCircuit className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">为什么 Prompt 越来越难写？</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">随着项目复杂度提升，单纯的对话已无法满足需求</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Traditional Prompt */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:border-red-200 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Command className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <span className="text-3xl">😓</span> 传统 Prompt
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 text-sm">✕</div>
                  <span><strong className="text-gray-900 dark:text-gray-100">上下文丢失</strong>：每次新对话都要重新解释项目背景</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 text-sm">✕</div>
                  <span><strong className="text-gray-900 dark:text-gray-100">幻觉频发</strong>：AI 经常编造不存在的 API 或库</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 text-sm">✕</div>
                  <span><strong className="text-gray-900 dark:text-gray-100">难以复用</strong>：优秀的 Prompt 散落在聊天记录中，无法沉淀</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trae Skills */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-3xl border border-blue-200 dark:border-blue-800 relative overflow-hidden shadow-md group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-40 h-40 text-blue-600" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6 flex items-center gap-2">
                <span className="text-3xl">🚀</span> Trae Skills
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-200">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-sm">✓</div>
                  <span><strong className="text-blue-800 dark:text-blue-300">精准挂载</strong>：AI 自动识别需求，只加载相关的知识库</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-sm">✓</div>
                  <span><strong className="text-blue-800 dark:text-blue-300">SOP 标准化</strong>：将最佳实践固化为代码，保证输出质量</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-sm">✓</div>
                  <span><strong className="text-blue-800 dark:text-blue-300">团队共享</strong>：像代码一样管理 Prompt，全团队受益</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Anatomy Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <Folder className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">解剖：Skill 的物理形态</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">它本质上是一个包含特定配置文件的文件夹</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl border border-gray-800 p-8 shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* File Tree */}
            <div className="flex-1 font-mono text-sm space-y-6">
              <div className="flex items-center gap-3 text-blue-400">
                <Folder className="w-6 h-6 fill-blue-400/20" />
                <span className="font-bold text-lg">.trae/skills/my-awesome-skill/</span>
              </div>
              
              <div className="ml-4 space-y-4 border-l-2 border-gray-800 pl-8 relative">
                {/* SKILL.md */}
                <div className="relative group">
                  <div className="absolute -left-[39px] top-3 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-gray-900 group-hover:scale-125 transition-transform"></div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 group-hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <FileCode className="w-5 h-5 text-orange-400" />
                      <span className="font-bold text-orange-400 text-lg">SKILL.md</span>
                      <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded-full">必须</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      灵魂文件。定义了 Skill 的<span className="text-orange-300">触发条件</span>、<span className="text-orange-300">输入参数</span>和<span className="text-orange-300">执行逻辑</span>。支持自然语言描述。
                    </p>
                  </div>
                </div>

                {/* scripts/ */}
                <div className="relative group">
                  <div className="absolute -left-[39px] top-3 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-gray-900 group-hover:scale-125 transition-transform"></div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 group-hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Folder className="w-5 h-5 text-blue-400" />
                      <span className="font-bold text-blue-400 text-lg">scripts/</span>
                      <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">可选</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      能力扩展。存放 Python 或 JavaScript 脚本，用于执行复杂的数据处理、文件操作或 API 调用。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Preview */}
            <div className="flex-1 bg-gray-950 rounded-2xl p-6 border border-gray-800 font-mono text-xs md:text-sm text-gray-300 leading-relaxed overflow-x-auto">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-gray-500 mb-2"># SKILL.md 示例</p>
              <p><span className="text-purple-400">Name</span>: React Component Generator</p>
              <p><span className="text-purple-400">Description</span>: 生成符合团队规范的 React 组件</p>
              <br/>
              <p className="text-blue-400">## When to use</p>
              <p>当用户想要创建一个新的 React 组件、页面或 UI 元素时。</p>
              <br/>
              <p className="text-blue-400">## Rules</p>
              <p>1. 总是使用 TypeScript 接口定义 Props。</p>
              <p>2. 使用 Tailwind CSS 进行样式编写。</p>
              <p>3. 优先使用 named export。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Usage Guide */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
            <Rocket className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">3步上手指南</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">从安装到使用的完整流程</p>
          </div>
        </div>

        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-8 space-y-16 pb-4">
          {/* Step 1 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-4 border-blue-500"></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Step 1: 挑选心仪的 Skill</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
              在 AllSkills 市场浏览并下载你需要的技能包。无论是前端开发、后端架构还是数据分析，总有一款适合你。
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/')} size="lg" className="rounded-full px-8">
                <Search className="w-4 h-4 mr-2" /> 去市场逛逛
              </Button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-4 border-purple-500"></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Step 2: 放入指定目录</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
              将下载的 Skill 文件夹解压并移动到 IDE 的配置目录中。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <CodeBlock 
                label="Trae / VS Code" 
                code="~/.trae/skills/" 
                description="适用于 Trae IDE 用户"
              />
              <CodeBlock 
                label="Cursor / Claude" 
                code="~/.cursor/skills/" 
                description="适用于 Cursor 或 Claude 用户"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-4 border-green-500"></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Step 3: 见证魔法时刻</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
              重启 IDE，无需任何额外配置。当你再次提问时，Trae 会自动感知并挂载相关的 Skill。
            </p>
            <div className="bg-gray-900 rounded-2xl p-6 text-sm font-mono text-gray-300 shadow-lg">
              <div className="flex items-center gap-2 text-green-400 mb-4 border-b border-gray-800 pb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span>AI Agent Status: Active</span>
              </div>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <span className="text-blue-400 font-bold min-w-[60px]">User:</span>
                  <span>帮我写一个用户登录表单，用 React。</span>
                </div>
                <div className="flex gap-4 opacity-75">
                  <span className="text-purple-400 font-bold min-w-[60px]">System:</span>
                  <span className="italic">Detected intent: "React Component Creation". Loading skill "react-best-practices"...</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-green-400 font-bold min-w-[60px]">AI:</span>
                  <span>没问题！根据 <span className="text-orange-400">react-best-practices</span> 的规范，我为你生成了包含 Zod 验证和 Tailwind 样式的表单组件...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tips / Best Practices */}
      <section className="bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-8 md:p-12 border border-blue-100 dark:border-blue-900/30">
        <div className="flex items-center gap-4 mb-8">
          <Lightbulb className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">专家建议</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">保持原子性</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">一个 Skill 最好只做一件事。过于复杂的 Skill 会导致 AI 混淆。</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">多用示例</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">在 SKILL.md 中提供具体的 "Input" 和 "Output" 示例，效果通常比纯文字描述好。</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">持续迭代</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Skill 不是一成不变的。随着项目发展，记得更新你的 Skill 规则。</p>
          </div>
        </div>
      </section>

      {/* Footer Ecosystem */}
      <section className="py-12 border-t border-gray-100 dark:border-gray-800 text-center">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">已支持 Skills 标准的工具</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {['Trae', 'Cursor', 'VS Code', 'Claude'].map((tool) => (
            <div key={tool} className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-200">
              <Box className="w-6 h-6" />
              {tool}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const CodeBlock = ({ label, code, description }: { label: string; code: string; description?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-800">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-200">{label}</span>
          {description && <span className="text-xs text-gray-500">{description}</span>}
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          title="复制路径"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm text-green-400 overflow-x-auto whitespace-nowrap flex items-center flex-1">
        {code}
      </div>
    </div>
  );
};
