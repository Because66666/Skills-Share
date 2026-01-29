
export interface TemplateCategory {
  id: string;
  name: string;
  parentId?: string;
  tags?: string[];
  count: number;
}

export interface TemplateVariable {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'select' | 'money';
  required: boolean;
  options?: string[]; // for select type
  defaultValue?: string;
}

export type TemplateStatus = 'draft' | 'pending' | 'published' | 'archived';

export interface ContractTemplate {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  content: string;
  version: string;
  status: TemplateStatus;
  variables: TemplateVariable[];
  createdBy: string;
  updatedAt: string;
  createdAt: string;
  description?: string;
  usageCount: number;
  tags?: string[];
}

export interface TemplateReview {
  id: string;
  templateId: string;
  templateName: string;
  submitter: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
}

// Mock Categories
export const mockCategories: TemplateCategory[] = [
  { id: '1', name: '房产交易', count: 12, tags: ['不动产'] },
  { id: '1-1', name: '房屋租赁', parentId: '1', count: 8, tags: ['租赁', '住宅'] },
  { id: '1-2', name: '房屋买卖', parentId: '1', count: 4, tags: ['买卖', '产权'] },
  { id: '2', name: '劳动人事', count: 15, tags: ['HR', '合规'] },
  { id: '2-1', name: '劳动合同', parentId: '2', count: 10, tags: ['全职', '兼职'] },
  { id: '2-2', name: '保密协议', parentId: '2', count: 5, tags: ['竞业限制'] },
  { id: '3', name: '商务合作', count: 20, tags: ['B2B'] },
  { id: '3-1', name: '采购合同', parentId: '3', count: 8, tags: ['供应链'] },
  { id: '3-2', name: '服务协议', parentId: '3', count: 12, tags: ['外包'] },
  { id: '4', name: '知识产权', count: 6, tags: ['IP'] },
];

// Mock Variables
const commonVariables: TemplateVariable[] = [
  { key: 'party_a', label: '甲方名称', type: 'text', required: true },
  { key: 'party_b', label: '乙方名称', type: 'text', required: true },
  { key: 'sign_date', label: '签订日期', type: 'date', required: true },
];

const rentVariables: TemplateVariable[] = [
  ...commonVariables,
  { key: 'rent_amount', label: '月租金', type: 'money', required: true },
  { key: 'rent_period', label: '租赁期限(月)', type: 'number', required: true },
  { key: 'address', label: '房屋地址', type: 'text', required: true },
];

const laborVariables: TemplateVariable[] = [
  ...commonVariables,
  { key: 'position', label: '岗位名称', type: 'text', required: true },
  { key: 'salary', label: '月薪资', type: 'money', required: true },
  { key: 'contract_term', label: '合同期限', type: 'select', required: true, options: ['1年', '3年', '无固定期限'] },
];

// Mock Templates
export const mockTemplates: ContractTemplate[] = [
  {
    id: 't-001',
    title: '房屋租赁合同(标准版)',
    categoryId: '1-1',
    categoryName: '房屋租赁',
    content: `<h1 style="text-align: center;">房屋租赁合同</h1>
    <p><strong>甲方（出租方）：</strong><span class="variable" data-key="party_a">\${party_a}</span></p>
    <p><strong>乙方（承租方）：</strong><span class="variable" data-key="party_b">\${party_b}</span></p>
    <p>第一条 房屋基本情况</p>
    <p>甲方房屋（以下简称该房屋）坐落于：<span class="variable" data-key="address">\${address}</span>。</p>
    <p>第二条 租赁期限</p>
    <p>租赁期限为 <span class="variable" data-key="rent_period">\${rent_period}</span> 个月。</p>
    <p>第三条 租金</p>
    <p>该房屋月租金为（人民币）<span class="variable" data-key="rent_amount">\${rent_amount}</span>元整。</p>
    <p>第四条 签订日期</p>
    <p>本合同于 <span class="variable" data-key="sign_date">\${sign_date}</span> 签订。</p>`,
    version: 'v1.0',
    status: 'published',
    variables: rentVariables,
    createdBy: '张三',
    updatedAt: '2023-10-15',
    createdAt: '2023-10-01',
    usageCount: 156,
    tags: ['标准', '住宅']
  },
  {
    id: 't-002',
    title: '劳动合同(通用版)',
    categoryId: '2-1',
    categoryName: '劳动合同',
    content: `<h1 style="text-align: center;">劳动合同书</h1>
    <p><strong>甲方：</strong><span class="variable" data-key="party_a">\${party_a}</span></p>
    <p><strong>乙方：</strong><span class="variable" data-key="party_b">\${party_b}</span></p>
    <p>根据《中华人民共和国劳动法》等法律法规，甲乙双方经平等协商，自愿签订本合同。</p>
    <p>一、合同期限</p>
    <p>本合同期限为：<span class="variable" data-key="contract_term">\${contract_term}</span>。</p>
    <p>二、工作内容</p>
    <p>乙方从事 <span class="variable" data-key="position">\${position}</span> 岗位工作。</p>
    <p>三、劳动报酬</p>
    <p>乙方月工资为 <span class="variable" data-key="salary">\${salary}</span> 元。</p>`,
    version: 'v2.1',
    status: 'published',
    variables: laborVariables,
    createdBy: '李四',
    updatedAt: '2023-11-20',
    createdAt: '2023-09-10',
    usageCount: 342,
    tags: ['全职', '通用']
  },
  {
    id: 't-003',
    title: '保密协议',
    categoryId: '2-2',
    categoryName: '保密协议',
    content: `<h1>保密协议</h1><p>待补充...</p>`,
    version: 'v0.9',
    status: 'draft',
    variables: commonVariables,
    createdBy: '王五',
    updatedAt: '2024-01-10',
    createdAt: '2024-01-10',
    usageCount: 0,
    tags: ['内部']
  },
  {
    id: 't-004',
    title: '软件开发服务合同',
    categoryId: '3-2',
    categoryName: '服务协议',
    content: `<h1>软件开发服务合同</h1><p>待审核...</p>`,
    version: 'v1.0',
    status: 'pending',
    variables: commonVariables,
    createdBy: '赵六',
    updatedAt: '2024-01-15',
    createdAt: '2024-01-12',
    usageCount: 0,
    tags: ['外包', 'IT']
  }
];

// Mock Reviews
export const mockReviews: TemplateReview[] = [
  {
    id: 'r-001',
    templateId: 't-004',
    templateName: '软件开发服务合同',
    submitter: '赵六',
    submittedAt: '2024-01-15 14:30',
    status: 'pending',
  },
  {
    id: 'r-002',
    templateId: 't-005',
    templateName: '设备采购合同',
    submitter: '钱七',
    submittedAt: '2024-01-14 09:00',
    status: 'rejected',
    comment: '条款第三条有风险，请修改后重新提交。'
  }
];

// Mock Stats
export const mockTemplateStats = {
  totalTemplates: 45,
  activeTemplates: 32,
  totalUsage: 1250,
  recentUsage: [
    { date: '01-14', count: 12 },
    { date: '01-15', count: 15 },
    { date: '01-16', count: 18 },
    { date: '01-17', count: 10 },
    { date: '01-18', count: 22 },
    { date: '01-19', count: 16 },
    { date: '01-20', count: 20 },
  ],
  categoryDistribution: [
    { name: '房产交易', value: 12 },
    { name: '劳动人事', value: 15 },
    { name: '商务合作', value: 20 },
    { name: '知识产权', value: 6 },
  ]
};
