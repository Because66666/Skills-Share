// ----------------------------------------------------------------------
// 类型定义
// ----------------------------------------------------------------------

export type IPType = 'patent' | 'trademark' | 'copyright' | 'domain' | 'secret';
export type IPStatus = 'applying' | 'examination' | 'authorized' | 'invalid' | 'expired';

export interface IPAsset {
  id: string;
  name: string; // 专利名称/商标名称
  type: IPType;
  subType: string; // 发明专利/实用新型...
  applicationNo: string; // 申请号
  registrationNo?: string; // 注册号
  status: IPStatus;
  owner: string; // 权利人
  inventors?: string[]; // 发明人
  applicationDate: string;
  authorizationDate?: string;
  expiryDate?: string; // 到期日/下次缴费日
  description?: string;
  cost?: number; // 累计费用
}

export interface IPSearchResult {
  id: string;
  title: string;
  abstract: string;
  applicant: string;
  date: string;
  score: number; // 相似度/相关度
  type: string;
}

export interface IPProtectionCase {
  id: string;
  title: string;
  type: 'infringement' | 'dispute' | 'monitor';
  status: 'investigating' | 'evidence_collection' | 'litigation' | 'settled' | 'closed';
  target: string; // 侵权方/对象
  date: string;
  progress: number;
}

export interface IPUsageRecord {
  id: string;
  assetId: string;
  assetName: string;
  type: 'licensing' | 'transfer' | 'pledge' | 'investment';
  party: string; // 被许可方/受让方
  amount: number;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'terminated';
}

export interface IPComplianceReview {
  id: string;
  projectName: string;
  type: 'new_product' | 'collaboration' | 'marketing';
  submitter: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface IPFilter {
  keywords?: string;
  type?: string;
  status?: string;
  year?: string;
}

// ----------------------------------------------------------------------
// Mock 数据生成
// ----------------------------------------------------------------------

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (startYear: number, endYear: number): string => {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 0, 1);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const generateAssets = (count: number): IPAsset[] => {
  const types: IPType[] = ['patent', 'trademark', 'copyright', 'domain', 'secret'];
  const companies = ['智慧法务科技有限公司', '未来科技集团', '创新动力实验室'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = getRandomItem(types);
    let subType = '';
    let name = '';
    
    if (type === 'patent') {
      subType = getRandomItem(['发明专利', '实用新型', '外观设计']);
      name = `一种基于${getRandomItem(['AI', '区块链', '云计算', '大数据'])}的${getRandomItem(['数据处理', '图像识别', '隐私保护', '网络优化'])}方法`;
    } else if (type === 'trademark') {
      subType = getRandomItem(['商品商标', '服务商标']);
      name = getRandomItem(['智法宝', '律盾', '法信通', '慧眼查']) + '商标';
    } else if (type === 'copyright') {
      subType = getRandomItem(['软件著作权', '文字作品', '美术作品']);
      name = getRandomItem(['智慧法务系统', '移动端APP', '数据分析平台']) + 'V1.0';
    } else {
        subType = '其他';
        name = '商业秘密-' + getRandomInt(1000, 9999);
    }
    
    return {
      id: `ip-${i + 1}`,
      name,
      type,
      subType,
      applicationNo: `CN${getRandomInt(2020, 2025)}${getRandomInt(100000000, 999999999)}`,
      status: getRandomItem(['applying', 'examination', 'authorized', 'invalid', 'expired']),
      owner: getRandomItem(companies),
      inventors: [getRandomItem(['张三', '李四', '王五', '赵六']), getRandomItem(['陈七', '刘八'])],
      applicationDate: getRandomDate(2020, 2024),
      expiryDate: getRandomDate(2025, 2030),
      cost: getRandomInt(1000, 50000),
    };
  });
};

export const mockIPAssets = generateAssets(50);

export const mockIPSearchResults: IPSearchResult[] = Array.from({ length: 10 }, (_, i) => ({
  id: `search-${i}`,
  title: `一种${getRandomItem(['高效', '智能', '分布式'])}的${getRandomItem(['存储', '计算', '传输'])}系统`,
  abstract: '本发明公开了一种...技术，解决了...问题，具有...优点。',
  applicant: getRandomItem(['某某科技公司', '某某大学', '某某研究所']),
  date: getRandomDate(2022, 2024),
  score: getRandomInt(60, 99),
  type: getRandomItem(['发明专利', '实用新型']),
}));

export const mockProtectionCases: IPProtectionCase[] = Array.from({ length: 15 }, (_, i) => ({
  id: `case-${i}`,
  title: `关于${getRandomItem(['A公司', 'B工厂', 'C店铺'])}的侵权监测`,
  type: getRandomItem(['infringement', 'dispute', 'monitor']),
  status: getRandomItem(['investigating', 'evidence_collection', 'litigation', 'settled', 'closed']),
  target: getRandomItem(['A公司', 'B工厂', 'C店铺']),
  date: getRandomDate(2023, 2024),
  progress: getRandomInt(0, 100),
}));

export const mockUsageRecords: IPUsageRecord[] = Array.from({ length: 20 }, (_, i) => ({
  id: `usage-${i}`,
  assetId: `ip-${getRandomInt(1, 50)}`,
  assetName: `专利-${getRandomInt(100, 999)}`,
  type: getRandomItem(['licensing', 'transfer', 'pledge', 'investment']),
  party: getRandomItem(['甲公司', '乙企业', '丙机构']),
  amount: getRandomInt(10000, 1000000),
  startDate: getRandomDate(2023, 2024),
  endDate: getRandomDate(2025, 2026),
  status: getRandomItem(['active', 'completed', 'terminated']),
}));

export const mockComplianceReviews: IPComplianceReview[] = Array.from({ length: 12 }, (_, i) => ({
  id: `review-${i}`,
  projectName: getRandomItem(['新产品X', '合作项目Y', '营销活动Z']) + '上线合规审查',
  type: getRandomItem(['new_product', 'collaboration', 'marketing']),
  submitter: getRandomItem(['张经理', '王主管']),
  date: getRandomDate(2024, 2024),
  status: getRandomItem(['pending', 'approved', 'rejected']),
  riskLevel: getRandomItem(['low', 'medium', 'high']),
}));

export const searchIPs = async (filter: IPFilter): Promise<IPAsset[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  let results = [...mockIPAssets];

  if (filter.keywords) {
    const q = filter.keywords.toLowerCase();
    results = results.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.applicationNo.toLowerCase().includes(q) ||
      item.owner.toLowerCase().includes(q)
    );
  }

  if (filter.type && filter.type !== 'all') {
    results = results.filter(item => item.type === filter.type);
  }

  if (filter.status && filter.status !== 'all') {
    results = results.filter(item => item.status === filter.status);
  }

  if (filter.year) {
    const currentYear = new Date().getFullYear();
    if (filter.year === '3') {
      results = results.filter(item => parseInt(item.applicationDate.substring(0, 4)) >= currentYear - 3);
    } else if (filter.year === '5') {
      results = results.filter(item => parseInt(item.applicationDate.substring(0, 4)) >= currentYear - 5);
    } else if (filter.year === '10') {
      results = results.filter(item => parseInt(item.applicationDate.substring(0, 4)) >= currentYear - 10);
    }
  }

  return results;
};
