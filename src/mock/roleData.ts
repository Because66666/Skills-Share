
export interface Permission {
  id: string;
  name: string;
  code: string;
}

export interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  permissions: Permission[]; // 简化的权限列表
  userCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const roles: Role[] = [
  {
    id: 'r1',
    name: '超级管理员',
    code: 'SUPER_ADMIN',
    description: '拥有系统所有权限，包括系统配置、租户管理等核心功能。',
    permissions: [
      { id: 'p1', name: '用户管理', code: 'user:manage' },
      { id: 'p2', name: '角色管理', code: 'role:manage' },
      { id: 'p3', name: '系统设置', code: 'system:settings' },
    ],
    userCount: 5,
    status: 'active',
    createdAt: '2023-01-01',
  },
  {
    id: 'r2',
    name: '租户管理员',
    code: 'TENANT_ADMIN',
    description: '负责管理特定租户下的用户和资源，无法访问系统级配置。',
    permissions: [
      { id: 'p1', name: '用户管理', code: 'user:manage' },
      { id: 'p4', name: '报表查看', code: 'report:view' },
    ],
    userCount: 12,
    status: 'active',
    createdAt: '2023-01-05',
  },
  {
    id: 'r3',
    name: '普通用户',
    code: 'USER',
    description: '基础权限用户，仅能访问被授权的业务功能。',
    permissions: [
      { id: 'p4', name: '报表查看', code: 'report:view' },
    ],
    userCount: 156,
    status: 'active',
    createdAt: '2023-02-10',
  },
  {
    id: 'r4',
    name: '财务专员',
    code: 'FINANCE',
    description: '负责处理财务相关数据和报表。',
    permissions: [
      { id: 'p5', name: '财务管理', code: 'finance:manage' },
    ],
    userCount: 8,
    status: 'active',
    createdAt: '2023-06-15',
  },
  {
    id: 'r5',
    name: '人力资源经理',
    code: 'HR_MANAGER',
    description: '负责员工招聘、入职、培训及绩效管理。',
    permissions: [
      { id: 'p6', name: '人员管理', code: 'hr:manage' },
    ],
    userCount: 4,
    status: 'active',
    createdAt: '2023-03-01',
  },
  {
    id: 'r6',
    name: '销售经理',
    code: 'SALES_MANAGER',
    description: '管理销售团队，查看销售报表和客户数据。',
    permissions: [
      { id: 'p7', name: '销售管理', code: 'sales:manage' },
    ],
    userCount: 6,
    status: 'active',
    createdAt: '2023-03-05',
  },
  {
    id: 'r7',
    name: '市场专员',
    code: 'MARKETING_SPEC',
    description: '负责市场推广活动的策划与执行。',
    permissions: [
      { id: 'p8', name: '市场活动', code: 'marketing:activity' },
    ],
    userCount: 5,
    status: 'active',
    createdAt: '2023-03-10',
  },
  {
    id: 'r8',
    name: 'IT管理员',
    code: 'IT_ADMIN',
    description: '负责公司内部IT设备和网络维护。',
    permissions: [
      { id: 'p9', name: 'IT维护', code: 'it:maintenance' },
    ],
    userCount: 3,
    status: 'active',
    createdAt: '2023-01-20',
  },
  {
    id: 'r9',
    name: '产品经理',
    code: 'PRODUCT_MANAGER',
    description: '负责产品规划、需求分析和版本迭代。',
    permissions: [
      { id: 'p10', name: '产品规划', code: 'product:plan' },
    ],
    userCount: 7,
    status: 'active',
    createdAt: '2023-02-15',
  },
  {
    id: 'r10',
    name: '研发工程师',
    code: 'DEVELOPER',
    description: '负责软件系统的开发与维护。',
    permissions: [
      { id: 'p11', name: '代码提交', code: 'dev:commit' },
    ],
    userCount: 30,
    status: 'active',
    createdAt: '2023-02-01',
  },
  {
    id: 'r11',
    name: '测试工程师',
    code: 'QA_ENGINEER',
    description: '负责软件质量保证和测试工作。',
    permissions: [
      { id: 'p12', name: '测试管理', code: 'qa:manage' },
    ],
    userCount: 10,
    status: 'active',
    createdAt: '2023-02-05',
  },
  {
    id: 'r12',
    name: 'UI/UX设计师',
    code: 'DESIGNER',
    description: '负责产品界面设计和用户体验优化。',
    permissions: [
      { id: 'p13', name: '设计资源', code: 'design:assets' },
    ],
    userCount: 5,
    status: 'active',
    createdAt: '2023-02-20',
  },
  {
    id: 'r13',
    name: '数据分析师',
    code: 'DATA_ANALYST',
    description: '负责业务数据的收集、整理和分析。',
    permissions: [
      { id: 'p14', name: '数据分析', code: 'data:analyze' },
    ],
    userCount: 4,
    status: 'active',
    createdAt: '2023-04-01',
  },
  {
    id: 'r14',
    name: '客户支持专员',
    code: 'CUSTOMER_SUPPORT',
    description: '负责解答客户咨询，处理客户投诉。',
    permissions: [
      { id: 'p15', name: '工单处理', code: 'support:ticket' },
    ],
    userCount: 15,
    status: 'active',
    createdAt: '2023-03-15',
  },
  {
    id: 'r15',
    name: '运营经理',
    code: 'OPS_MANAGER',
    description: '负责公司日常运营管理和流程优化。',
    permissions: [
      { id: 'p16', name: '运营管理', code: 'ops:manage' },
    ],
    userCount: 3,
    status: 'active',
    createdAt: '2023-03-20',
  },
  {
    id: 'r16',
    name: '法务顾问',
    code: 'LEGAL_ADVISOR',
    description: '负责公司合同审核和法律风险防控。',
    permissions: [
      { id: 'p17', name: '合同审核', code: 'legal:contract' },
    ],
    userCount: 2,
    status: 'active',
    createdAt: '2023-05-01',
  },
  {
    id: 'r17',
    name: '合规专员',
    code: 'COMPLIANCE_OFFICER',
    description: '确保公司业务符合相关法律法规要求。',
    permissions: [
      { id: 'p18', name: '合规检查', code: 'compliance:check' },
    ],
    userCount: 2,
    status: 'active',
    createdAt: '2023-05-05',
  },
  {
    id: 'r18',
    name: '采购专员',
    code: 'PROCUREMENT',
    description: '负责公司物资和服务的采购工作。',
    permissions: [
      { id: 'p19', name: '采购管理', code: 'procurement:manage' },
    ],
    userCount: 3,
    status: 'active',
    createdAt: '2023-06-01',
  },
  {
    id: 'r19',
    name: '物流协调员',
    code: 'LOGISTICS',
    description: '负责货物运输和仓储协调。',
    permissions: [
      { id: 'p20', name: '物流跟踪', code: 'logistics:track' },
    ],
    userCount: 4,
    status: 'active',
    createdAt: '2023-06-10',
  },
  {
    id: 'r20',
    name: '安全主管',
    code: 'SECURITY_OFFICER',
    description: '负责公司信息安全和物理安全。',
    permissions: [
      { id: 'p21', name: '安全监控', code: 'security:monitor' },
    ],
    userCount: 2,
    status: 'active',
    createdAt: '2023-01-10',
  },
  {
    id: 'r21',
    name: '审计员',
    code: 'AUDITOR',
    description: '负责内部审计和风险评估。',
    permissions: [
      { id: 'p22', name: '审计报告', code: 'audit:report' },
    ],
    userCount: 3,
    status: 'inactive',
    createdAt: '2023-07-01',
  },
  {
    id: 'r22',
    name: '培训专员',
    code: 'TRAINING_SPEC',
    description: '负责员工入职培训和技能提升培训。',
    permissions: [
      { id: 'p23', name: '培训计划', code: 'training:plan' },
    ],
    userCount: 2,
    status: 'active',
    createdAt: '2023-04-15',
  },
  {
    id: 'r23',
    name: '内容编辑',
    code: 'CONTENT_EDITOR',
    description: '负责公司对外宣传内容的撰写和编辑。',
    permissions: [
      { id: 'p24', name: '内容发布', code: 'content:publish' },
    ],
    userCount: 4,
    status: 'active',
    createdAt: '2023-04-20',
  },
];
