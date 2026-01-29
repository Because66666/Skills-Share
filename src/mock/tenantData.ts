export interface Tenant {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive' | 'suspended';
  adminName: string;
  contactEmail: string;
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
  createdAt: string;
}

export const tenants: Tenant[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    code: 'TFS-001',
    status: 'active',
    adminName: '张伟',
    contactEmail: 'sarah.j@techflow.com',
    subscriptionPlan: 'Enterprise',
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'GreenLeaf Organic',
    code: 'GLO-002',
    status: 'active',
    adminName: '李军',
    contactEmail: 'mross@greenleaf.com',
    subscriptionPlan: 'Pro',
    createdAt: '2023-03-22',
  },
  {
    id: '3',
    name: 'Quantum Dynamics',
    code: 'QDY-003',
    status: 'suspended',
    adminName: '王芳',
    contactEmail: 'admin@quantum.io',
    subscriptionPlan: 'Basic',
    createdAt: '2023-06-10',
  },
  {
    id: '4',
    name: 'BlueSky Logistics',
    code: 'BSL-004',
    status: 'inactive',
    adminName: '赵敏',
    contactEmail: 'emily.w@bluesky.net',
    subscriptionPlan: 'Enterprise',
    createdAt: '2022-11-05',
  },
  {
    id: '5',
    name: 'Urban Coffee Roasters',
    code: 'UCR-005',
    status: 'active',
    adminName: '刘强',
    contactEmail: 'james@urbancoffee.co',
    subscriptionPlan: 'Pro',
    createdAt: '2023-08-14',
  },
  {
    id: '6',
    name: 'Nexus Innovations',
    code: 'NXI-006',
    status: 'active',
    adminName: '王丽莎',
    contactEmail: 'lisa.wong@nexus.tech',
    subscriptionPlan: 'Enterprise',
    createdAt: '2023-09-01',
  },
  {
    id: '7',
    name: 'Starlight Media',
    code: 'SLM-007',
    status: 'active',
    adminName: '汤姆',
    contactEmail: 'tom@starlight.media',
    subscriptionPlan: 'Basic',
    createdAt: '2023-09-20',
  },
];
