import defaultAvatar from '@/assets/images/头像.png';

export interface User {
  name: string;
  role: string;
  avatar: string;
  roles?: string[];
}

export interface Metric {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  description?: string;
  linkText?: string;
  type: 'stat' | 'goal';
  goalPercentage?: number;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  avatar: string;
}

export interface GrowthData {
  year: string;
  value: number;
}

export interface Chat {
  id: string;
  user: User;
  unread: boolean;
}

export interface StateStat {
  state: string;
  value: number;
  code: string;
}

export interface Deal {
  id: string;
  name: string;
}

export const currentUser: User = {
  name: '刘清鹏',
  role: '管理员',
  roles: ['法务员', '法务先锋', '法务合同管理', '集团法务员', '地区法务经理'],
  avatar: defaultAvatar,
};

export const metrics: Metric[] = [
  {
    title: '总收入',
    value: '15%',
    trend: { value: '', direction: 'up' },
    description: '较上周增长',
    linkText: '收入报告',
    type: 'stat',
  },
  {
    title: '丢失订单',
    value: '4%',
    description: '您完成了 100 个订单中的 96 个',
    linkText: '所有订单',
    type: 'stat',
  },
  {
    title: '季度目标',
    value: '84%',
    linkText: '所有目标',
    type: 'goal',
    goalPercentage: 84,
  },
];

export const customers: Customer[] = [
  { id: '1', name: '克里斯·弗里德克利', company: '维拉诺瓦超市', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: '玛吉·约翰逊', company: '绿洲有机食品公司', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: '盖尔·哈利', company: '纽约精品水果', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: '珍娜·沙利文', company: '沃尔玛', avatar: 'https://i.pravatar.cc/150?u=4' },
];

export const growthData: GrowthData[] = [
  { year: '2016', value: 10000 },
  { year: '2017', value: 15000 },
  { year: '2018', value: 45000 },
  { year: '2019', value: 60000 },
  { year: '2020', value: 15000 },
  { year: '2021', value: 25000 },
  { year: '2022', value: 65000 },
  { year: '2023', value: 90000 },
  { year: '2024', value: 120000 },
];

export const chats: Chat[] = [
  { id: '1', unread: true, user: { name: '用户 1', role: '用户', avatar: 'https://i.pravatar.cc/150?u=5' } },
  { id: '2', unread: true, user: { name: '用户 2', role: '用户', avatar: 'https://i.pravatar.cc/150?u=6' } },
  { id: '3', unread: false, user: { name: '用户 3', role: '用户', avatar: 'https://i.pravatar.cc/150?u=7' } },
  { id: '4', unread: false, user: { name: '用户 4', role: '用户', avatar: 'https://i.pravatar.cc/150?u=8' } },
];

export const topStates: StateStat[] = [
  { state: '纽约', code: 'NY', value: 120000 },
  { state: '马萨诸塞', code: 'MA', value: 80000 },
  { state: '新罕布什尔', code: 'NH', value: 70000 },
  { state: '俄勒冈', code: 'OR', value: 50000 },
];

export const newDeals: Deal[] = [
  { id: '1', name: 'Fruit2Go' },
  { id: '2', name: "Marshall's MKT" },
  { id: '3', name: 'CCNT' },
  { id: '4', name: 'Joana Mini-market' },
  { id: '5', name: 'Little Brazil Vegan' },
  { id: '6', name: 'Target' },
  { id: '7', name: 'Organic Place' },
  { id: '8', name: "Morello's" },
];
