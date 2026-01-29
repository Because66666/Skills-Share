export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isHot?: boolean;
}

export const faqCategories = [
  '账号与安全',
  '业务操作',
  '系统设置',
  '技术支持'
];

export const popularSearches = [
  '合同审查',
  '案件申报',
  '文书下载',
  '密码重置'
];

export const roleGuides = [
  {
    id: 'admin',
    role: '我是管理员',
    description: '系统配置、用户权限与数据维护',
    icon: 'Shield',
    link: '/document-center?section=dev'
  },
  {
    id: 'lawyer',
    role: '我是法务/律师',
    description: '案件处理、合同审查与风险评估',
    icon: 'Scale',
    link: '/document-center?section=quick-start'
  },
  {
    id: 'claimant',
    role: '我是债权人',
    description: '债权申报、会议投票与进度查询',
    icon: 'Users',
    link: '/document-center?section=intro'
  },
  {
    id: 'newbie',
    role: '我是新用户',
    description: '快速入门、基础操作与账号设置',
    icon: 'Sparkles',
    link: '/document-center?section=quick-start'
  }
];

export const videoTutorials = [
  {
    id: 'v1',
    title: '3分钟快速上手智慧法务系统',
    duration: '03:15',
    thumbnail: 'bg-blue-500', // Placeholder for actual image
    views: 1250
  },
  {
    id: 'v2',
    title: '如何进行高效的合同审查？',
    duration: '05:42',
    thumbnail: 'bg-purple-500',
    views: 890
  },
  {
    id: 'v3',
    title: '破产案件全流程操作演示',
    duration: '12:20',
    thumbnail: 'bg-orange-500',
    views: 2100
  }
];

export const faqData: FAQItem[] = [
  {
    id: '1',
    question: '如何修改登录密码？',
    answer: '您可以点击左侧导航栏底部的用户头像，在弹出的菜单中选择“修改密码”。输入原密码和新密码后保存即可。',
    category: '账号与安全',
    isHot: true
  },
  {
    id: '2',
    question: '忘记密码怎么办？',
    answer: '请在登录页面点击“忘记密码”链接，通过绑定的手机号或邮箱接收验证码进行重置。如果未绑定联系方式，请联系系统管理员重置。',
    category: '账号与安全',
    isHot: true
  },
  {
    id: '3',
    question: '如何发起一个新的案件？',
    answer: '进入“案件纠纷管理”模块，点击页面右上角的“新增案件”按钮，填写相关案件信息并保存即可。',
    category: '业务操作',
    isHot: true
  },
  {
    id: '4',
    question: '合同审查一般需要多长时间？',
    answer: 'AI智能审查通常在1分钟内完成。人工复审的时间取决于合同的复杂度和法务人员的工作量，通常在1-3个工作日内完成。',
    category: '业务操作',
    isHot: true
  },
  {
    id: '5',
    question: '如何导出报表数据？',
    answer: '在各个模块的统计报表页面，通常在右上角会有“导出”或“下载”图标，点击即可导出Excel或PDF格式的报表。',
    category: '业务操作'
  },
  {
    id: '6',
    question: '系统支持深色模式吗？',
    answer: '支持。点击左侧导航栏底部的用户头像，在菜单中可以切换“浅色模式”、“深色模式”或“跟随系统”。',
    category: '系统设置',
    isHot: true
  },
  {
    id: '7',
    question: '如何添加新的用户账号？',
    answer: '只有管理员权限可以添加用户。进入“系统设置” -> “用户管理”，点击“添加用户”，填写用户信息并分配角色。',
    category: '系统设置'
  },
  {
    id: '8',
    question: '系统支持哪些浏览器？',
    answer: '为了获得最佳体验，建议使用最新版本的 Chrome, Edge, Firefox 或 Safari 浏览器。不再支持 IE 浏览器。',
    category: '技术支持'
  },
  {
    id: '9',
    question: '上传文件大小有限制吗？',
    answer: '单个文件上传通常限制在 50MB 以内。如果有大文件传输需求，请联系技术支持获取专门的上传通道。',
    category: '技术支持'
  }
];
