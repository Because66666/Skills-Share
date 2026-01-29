import { 
  Scale, 
  FileText, 
  ShieldAlert, 
  Gavel, 
  BrainCircuit, 
  MessageSquare, 
  BookOpen, 
  Search,
  Building,
  CreditCard
} from 'lucide-react';

// --- Interfaces ---

export interface LegalMetric {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  description?: string;
  icon?: any;
  color?: string; // Tailwind class for text/bg color
  link?: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}

export interface TrendData {
  name: string;
  value: number;
}

export interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface ModuleOverview {
  id: string;
  title: string;
  icon: any;
  items: { label: string; value: string | number; color?: string }[];
  link: string;
}

export interface RiskItem {
  id: string;
  title: string;
  type: 'case' | 'contract' | 'ip' | 'punishment' | 'fee';
  date: string;
  severity: 'high' | 'medium' | 'low';
}

export interface TodoItem {
  id: string;
  title: string;
  type: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'processing' | 'completed';
}

// --- Mock Data ---

// 1. Key Metrics
export const legalMetrics: LegalMetric[] = [
  {
    title: '案件总数',
    value: 128,
    trend: { value: '12%', direction: 'up' },
    description: '待处理 15 件',
    icon: Scale,
    color: 'blue',
    link: '/case-search/dashboard'
  },
  {
    title: '合同审查',
    value: 342,
    trend: { value: '5%', direction: 'up' },
    description: '待审核 8 件',
    icon: FileText,
    color: 'indigo',
    link: '/ai-review/overview'
  },
  {
    title: '风险预警',
    value: 12,
    trend: { value: '2%', direction: 'down' },
    description: '高风险 3 件',
    icon: ShieldAlert,
    color: 'red',
    link: '/cases/risk'
  },
  {
    title: '知识产权',
    value: 86,
    trend: { value: '8%', direction: 'up' },
    description: '即将到期 5 件',
    icon: BrainCircuit,
    color: 'purple',
    link: '/intellectual-property/dashboard'
  },
];

// 2. Charts Data
export const caseTrendData: TrendData[] = [
  { name: '1月', value: 12 },
  { name: '2月', value: 18 },
  { name: '3月', value: 15 },
  { name: '4月', value: 25 },
  { name: '5月', value: 20 },
  { name: '6月', value: 32 },
];

export const caseTypeData: ChartData[] = [
  { name: '合同纠纷', value: 45, color: '#0088FE' },
  { name: '劳动争议', value: 25, color: '#00C49F' },
  { name: '知识产权', value: 20, color: '#FFBB28' },
  { name: '侵权责任', value: 10, color: '#FF8042' },
];

export const contractStatusData: ChartData[] = [
  { name: '履行中', value: 150, color: '#4CAF50' },
  { name: '待审核', value: 20, color: '#FF9800' },
  { name: '已归档', value: 80, color: '#9E9E9E' },
  { name: '已终止', value: 10, color: '#F44336' },
];

export const riskRadarData: RadarData[] = [
  { subject: '合同风险', A: 120, fullMark: 150 },
  { subject: '合规风险', A: 98, fullMark: 150 },
  { subject: '诉讼风险', A: 86, fullMark: 150 },
  { subject: 'IP风险', A: 99, fullMark: 150 },
  { subject: '劳资风险', A: 85, fullMark: 150 },
  { subject: '财务风险', A: 65, fullMark: 150 },
];

export const ipTypeData: ChartData[] = [
  { name: '商标', value: 40, color: '#8884d8' },
  { name: '专利', value: 30, color: '#82ca9d' },
  { name: '著作权', value: 20, color: '#ffc658' },
  { name: '域名', value: 10, color: '#ff7300' },
];

export const punishmentTrendData: TrendData[] = [
  { name: '2019', value: 5 },
  { name: '2020', value: 8 },
  { name: '2021', value: 3 },
  { name: '2022', value: 6 },
  { name: '2023', value: 2 },
  { name: '2024', value: 4 },
];

// 3. Module Overview
export const moduleOverviews: ModuleOverview[] = [
  {
    id: 'case',
    title: '案件纠纷管理',
    icon: Scale,
    items: [
      { label: '本月新增', value: '12 件' },
      { label: '待开庭', value: '5 件', color: 'text-orange-500' },
    ],
    link: '/case-search/dashboard',
  },
  {
    id: 'contract',
    title: '合同管理',
    icon: FileText,
    items: [
      { label: '本周新增', value: '24 份' },
      { label: '待审核', value: '8 份', color: 'text-red-500' },
    ],
    link: '/ai-review/overview',
  },
  {
    id: 'ip',
    title: '知识产权',
    icon: BrainCircuit,
    items: [
      { label: '总资产', value: '86 件' },
      { label: '即将续费', value: '3 件', color: 'text-orange-500' },
    ],
    link: '/intellectual-property/dashboard',
  },
  {
    id: 'laws',
    title: '法律法规',
    icon: BookOpen,
    items: [
      { label: '最新法规', value: '156 条' },
      { label: '本周收藏', value: '12 条' },
    ],
    link: '/laws/dashboard',
  },
  {
    id: 'ai-qa',
    title: 'AI 智答',
    icon: MessageSquare,
    items: [
      { label: '今日咨询', value: '45 次' },
      { label: '累计节省', value: '120 小时' },
    ],
    link: '/ai-qa',
  },
  {
    id: 'search',
    title: '类案检索',
    icon: Search,
    items: [
      { label: '今日检索', value: '28 次' },
      { label: '收藏案例', value: '5 篇' },
    ],
    link: '/case-search/search',
  },
  {
    id: 'punishment',
    title: '行政处罚',
    icon: Gavel,
    items: [
      { label: '累计案件', value: '2 件' },
      { label: '待处理', value: '0 件', color: 'text-green-500' },
    ],
    link: '/punishment/overview',
  },
  {
    id: 'fee',
    title: '物业费催收',
    icon: Building,
    items: [
      { label: '催收中', value: '1,240 户' },
      { label: '本月回款', value: '¥ 45.2w' },
    ],
    link: '/property-fees/overview',
  },
  {
    id: 'claims',
    title: '债权申报',
    icon: CreditCard,
    items: [
      { label: '监控企业', value: '12 家' },
      { label: '新增公告', value: '3 条', color: 'text-blue-500' },
    ],
    link: '/claims/overview',
  },
];

// 4. Risks
export const highRiskItems: RiskItem[] = [
  { id: '1', title: '关于XX公司买卖合同纠纷案即将开庭', type: 'case', date: '2024-03-25', severity: 'high' },
  { id: '2', title: 'XX采购合同将于3天后到期', type: 'contract', date: '2024-03-24', severity: 'medium' },
  { id: '3', title: '商标“智慧法务”续费提醒', type: 'ip', date: '2024-04-01', severity: 'medium' },
];

// 5. Todos
export const todoItems: TodoItem[] = [
  { id: '1', title: '审核XX公司采购合同', type: '合同审核', deadline: '今天 18:00', priority: 'high', status: 'pending' },
  { id: '2', title: '录入XX案件一审判决书', type: '案件管理', deadline: '明天 12:00', priority: 'medium', status: 'pending' },
  { id: '3', title: '准备XX专利申请材料', type: '知识产权', deadline: '本周五', priority: 'medium', status: 'pending' },
  { id: '4', title: '回复业务部门法律咨询', type: '法律咨询', deadline: '今天 17:00', priority: 'low', status: 'completed' },
];
