import { HelpCircle, ChevronDown, Server, Cpu, Zap } from 'lucide-react';
import { useState } from 'react';

export const FAQ = () => {
  const faqs = [
    {
      question: "Skills 和 Prompt（提示词）有什么区别？",
      answer: "提示词是“临场指挥”，每次都需要输入且占用上下文窗口；而 Skills 是“预置能力”，按需加载，不占用上下文。就像把正确的做法固化成了流程（SOP），随取随用。举个例子，提示词是临时口头交代，Skills 是写好的员工手册。"
    },
    {
      question: "Skills 和 MCP (Model Context Protocol) 相比有什么优势？",
      answer: "MCP 更偏向于“接入与调用”，通常需要搭建服务器，门槛较高。而 Skills 更偏向于“把判断写进系统”，只需要一个 Markdown 文件即可运行，任何模型都能用，通用性极强。Django 联合创始人 Simon Willison 甚至预测 Skills 可能比 MCP 更重要。"
    },
    {
      question: "为什么说 Skills 是“工程化”的开始？",
      answer: "AI 的模型能力很强，但往往缺乏在特定场景下的稳定性。Skills 通过标准化的文件结构（SKILL.md），明确告诉 AI “在这个场景下什么才算做对”，把不确定的 AI 判断变成了确定的工程流程，从而实现规模化交付。"
    },
    {
      question: "使用 Skills 会消耗更多 Token 吗？",
      answer: "不会。Skills 是“按需挂载”的。AI Agent 启动时只会扫描 Skills 的描述，只有当任务匹配时才会加载具体内容。用完即走，不长期占用上下文，反而能把宝贵的上下文窗口留给当下的任务。"
    },
    {
      question: "什么是 Agent Skills？",
      answer: "Skills（又叫 Agent Skills）是 Anthropic 在 2025 年 10 月推出的一套标准，核心是一个包含 SKILL.md 文件的文件夹。目前 OpenAI Codex、Claude Code、Cursor 等主流工具均已支持。"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500 py-12 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3">
          <HelpCircle className="w-10 h-10 text-blue-500" />
          常见问题
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">关于 Skills 的深度解答</p>
      </div>

      <div className="grid gap-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <FeatureCard 
          icon={Server} 
          title="无需服务器" 
          desc="一个 Markdown 文件即可运行，零部署成本"
          color="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
        />
        <FeatureCard 
          icon={Cpu} 
          title="编程工具通用" 
          desc="Claude, TRAE, codebuddy 等AI编程工具均可调用"
          color="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
        />
        <FeatureCard 
          icon={Zap} 
          title="高效执行" 
          desc="按需加载，不浪费 Token 和上下文"
          color="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
        />
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer transition-all hover:shadow-lg group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{question}</h3>
        <div className={`p-2 rounded-full bg-gray-50 dark:bg-gray-700/50 transition-all duration-300 ${isOpen ? 'rotate-180 bg-blue-50 dark:bg-blue-900/30' : ''}`}>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-colors ${isOpen ? 'text-blue-500' : ''}`} />
        </div>
      </div>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-center hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
  </div>
);
