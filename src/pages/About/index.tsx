import { 
  Github, Twitter, Mail, 
  Users, Heart, Globe, 
  Code2, Coffee,
  Target, Share2, Zap,
  MessageCircle
} from 'lucide-react';
import { useMessage } from '@/components/feedback/Message';

export const About = () => {
  const message = useMessage();

  return (
    <div className="max-w-5xl mx-auto space-y-20 py-16 px-6 animate-in fade-in duration-700 font-sans">
      {/* Header Section */}
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium text-sm mb-4">
          <Heart className="w-4 h-4" />
          <span>About Skills Share</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
          Connecting Minds, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Empowering AI Agents
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          我们致力于构建一个开放、共享的智能技能生态平台，让每一个开发者都能轻松复用顶尖的 AI 工程化经验。
        </p>
      </div>

      {/* Mission & Vision */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
            <Target className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">我们的使命</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">打破信息孤岛，加速 AI 应用落地</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">开放共享</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              我们相信知识的力量在于流动。所有的 Skills 都是开源透明的，鼓励社区共同维护和进化。
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">工程标准</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              不仅仅是 Prompt，我们定义了完整的 AI 交互标准，让自然语言指令转化为可靠的代码执行。
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">效率至上</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              拒绝重复造轮子。通过 Skills，一键复用资深工程师的调试经验和开发流程。
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 p-8 opacity-10">
          <Globe className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">100+</div>
            <div className="text-gray-400 font-medium">精选 Skills</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">50k+</div>
            <div className="text-gray-400 font-medium">开发者信赖</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">24/7</div>
            <div className="text-gray-400 font-medium">社区支持</div>
          </div>
        </div>
      </section>

      {/* Team/Contributors */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
            <Users className="w-8 h-8 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">核心团队</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">一群热爱 AI 与开源的开发者</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "我是十三", role: "Founder & Product Design", avatar: "/img/13.png", color: "bg-blue-500" },
            { name: "Because", role: "Core Dev", avatar: "/img/because.png", color: "bg-pink-500" },
          ].map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 transition-colors">
              <img 
                src={member.avatar} 
                alt={member.name}
                className="w-20 h-20 rounded-full mb-4 shadow-lg object-cover"
              />
              <h3 className="font-bold text-gray-900 dark:text-gray-100">{member.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer/Contact */}
      <section className="text-center space-y-8 pt-10 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">加入我们，一起定义未来</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => message.info('暂无，敬请期待')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </button>
          <button 
            onClick={() => message.info('暂无，敬请期待')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all hover:scale-105 shadow-lg"
          >
            <Twitter className="w-5 h-5" />
            <span>Twitter</span>
          </button>
          <button 
            onClick={() => window.open('https://applink.feishu.cn/client/message/link/open?token=Amkdsn6kAIzDaXhbM2oBDM0%3D', '_blank')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all hover:scale-105 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>飞书</span>
          </button>
          <button 
            onClick={() => message.info('暂无，敬请期待')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            <span>Email Us</span>
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-8">
          <Coffee className="w-4 h-4" />
          <span>Built with passion by the Trae Team</span>
        </div>
      </section>
    </div>
  );
};
