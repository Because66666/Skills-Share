
export interface ClaimKPI {
  totalDeclared: number;
  totalRecovered: number;
  recoveryRate: number;
  newCases: number;
}

export interface ClaimAlert {
  id: string;
  caseNo: string;
  debtor: string;
  deadline: string;
  daysLeft: number;
  status: 'urgent' | 'warning' | 'normal';
}

export interface MonitorItem {
  id: string;
  source: string;
  debtorName: string;
  caseNo: string;
  court: string;
  publishDate: string;
  tags: string[];
  status: 'pending' | 'processed' | 'ignored';
  arrearsAmount?: number; // Added for V2
  publicTitle?: string; // Added for V3
  publicType?: string; // Added for V3
  deadline?: string; // Added for V3
  administrator?: string; // Added for V3
}

export interface PrincipalItem {
  type: string;
  amount: number;
  memo?: string;
}

export interface ObjectionItem {
  id: string;
  date: string;
  objector: 'manager' | 'creditor' | 'debtor';
  content: string;
  amountInDispute: number;
  status: 'pending' | 'resolved' | 'litigation';
  resolution?: string;
  files?: { name: string; url: string }[];
}

export interface LedgerItem {
  id: string;
  caseNo: string;
  debtorName: string;
  deadline: string;
  declaredAmount: number;
  confirmedAmount?: number;
  status: 'declaring' | 'confirming' | 'meeting' | 'repaying' | 'closed';
  court: string;
  manager: string;
  managerPhone: string;
  principals: PrincipalItem[];
  interest: number;
  nature: 'general' | 'common';
  publishDate: string;
  objections?: ObjectionItem[];
  declarant?: string;
  claimStatus?: 'declared' | 'not_declared' | 'expired';
  processStatus?: 'draft' | 'auditing' | 'audited' | 'pending_modification' | 'audit_failed';
  agent?: string;
  agentPhone?: string;
  claimFormationProcess?: string;
  riskAssessment?: string;
}

export interface RecoveryItem {
  id: string;
  claimId: string;
  debtorName: string;
  batch: string;
  method: 'cash' | 'asset';
  amount: number;
  receivedDate: string;
  status: 'received' | 'processing';
  assetDesc?: string;
}

// --- V2 New Types ---
export interface DebtorItem {
  id: string;
  name: string;
  creditCode: string;
  arrearsAmount: number;
  lastArrearsDate: string;
  source: 'ERP' | '单一大业主' | '公开公告' | '财务应收款';
  status: 'active' | 'inactive';
  matchedCount: number;
  arrearsCycle: string[];
  entryDate: string;
  updateDate: string;
}

export interface PublicNoticeItem {
  id: string;
  title: string;
  partyName: string;
  type: string;
  court: string;
  date: string;
  matchStatus: 'matched' | 'unmatched';
  debtorId?: string;
  sourceUrl: string;
}

// --- Data ---

export const claimKPI: ClaimKPI = {
  totalDeclared: 15800000.00,
  totalRecovered: 3200000.00,
  recoveryRate: 0.2025,
  newCases: 5
};

export const claimAlerts: ClaimAlert[] = [
  {
    id: "101",
    caseNo: "（2024）粤01破123号",
    debtor: "广州XX房地产开发有限公司",
    deadline: "2026-02-01",
    daysLeft: 3,
    status: "urgent"
  },
  {
    id: "102",
    caseNo: "（2024）京03破申45号",
    debtor: "北京XX置业发展有限公司",
    deadline: "2026-02-05",
    daysLeft: 7,
    status: "warning"
  }
];

export const monitorData: MonitorItem[] = [
  {
    "id": "raw_1001",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "天津FJ建设有限公司",
    "caseNo": "（2024）川5破565号",
    "court": "西安市中级人民法院",
    "publishDate": "2025-12-26",
    "tags": [
      "上市公司"
    ],
    "status": "processed",
    "arrearsAmount": 567139,
    "publicTitle": "关于天津FJ建设有限公司破产受理的公告",
    "publicType": "破产受理",
    "deadline": "2026-03-26",
    "administrator": "大成律师事务所"
  },
  {
    "id": "raw_1002",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "北京PE服务有限公司",
    "caseNo": "（2023）沪7破838号",
    "court": "北京市第一中级人民法院",
    "publishDate": "2026-01-14",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 1349595,
    "publicTitle": "关于北京PE服务有限公司债权申报的公告",
    "publicType": "债权申报",
    "deadline": "2026-04-14",
    "administrator": "中伦律师事务所"
  },
  {
    "id": "raw_1003",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "青岛XR文化有限公司",
    "caseNo": "（2024）鄂9破059号",
    "court": "西安市中级人民法院",
    "publishDate": "2026-01-23",
    "tags": [
      "核心客户"
    ],
    "status": "processed",
    "arrearsAmount": 842832,
    "publicTitle": "关于青岛XR文化有限公司重整裁定的公告",
    "publicType": "重整裁定",
    "deadline": "2026-04-23",
    "administrator": "金杜律师事务所"
  },
  {
    "id": "raw_1004",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "天津TY投资有限公司",
    "caseNo": "（2023）浙5破423号",
    "court": "广州市中级人民法院",
    "publishDate": "2026-01-06",
    "tags": [],
    "status": "pending",
    "arrearsAmount": 1635917,
    "publicTitle": "关于天津TY投资有限公司清算公告",
    "publicType": "清算公告",
    "deadline": "2026-04-06",
    "administrator": "君合律师事务所"
  },
  {
    "id": "raw_1005",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "上海MO实业有限公司",
    "caseNo": "（2025）京5破766号",
    "court": "杭州市中级人民法院",
    "publishDate": "2025-10-21",
    "tags": [
      "供应商"
    ],
    "status": "ignored",
    "arrearsAmount": 1331440,
    "publicTitle": "关于上海MO实业有限公司破产受理的公告",
    "publicType": "破产受理",
    "deadline": "2026-01-21",
    "administrator": "方达律师事务所"
  },
  {
    "id": "raw_1006",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "长沙TB咨询有限公司",
    "caseNo": "（2025）浙9破532号",
    "court": "深圳市中级人民法院",
    "publishDate": "2025-10-23",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 578917,
    "publicTitle": "关于长沙TB咨询有限公司债权申报的公告",
    "publicType": "债权申报",
    "deadline": "2026-01-23"
  },
  {
    "id": "raw_1007",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "青岛LH服务有限公司",
    "caseNo": "（2024）苏3破299号",
    "court": "苏州市中级人民法院",
    "publishDate": "2025-10-03",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 1652316,
    "publicTitle": "关于青岛LH服务有限公司重整裁定的公告",
    "publicType": "重整裁定",
    "deadline": "2026-01-03"
  },
  {
    "id": "raw_1008",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "上海HP服务有限公司",
    "caseNo": "（2023）鄂10破698号",
    "court": "深圳市中级人民法院",
    "publishDate": "2025-11-22",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 1131315,
    "publicTitle": "关于上海HP服务有限公司清算公告",
    "publicType": "清算公告",
    "deadline": "2026-02-22"
  },
  {
    "id": "raw_1009",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "郑州OX建设有限公司",
    "caseNo": "（2024）川3破429号",
    "court": "南京市中级人民法院",
    "publishDate": "2026-01-03",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 389235,
    "publicTitle": "关于郑州OX建设有限公司破产受理的公告",
    "publicType": "破产受理",
    "deadline": "2026-04-03"
  },
  {
    "id": "raw_1010",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "广州HN电子有限公司",
    "caseNo": "（2025）陕3破426号",
    "court": "上海市第三中级人民法院",
    "publishDate": "2025-10-03",
    "tags": [
      "核心客户"
    ],
    "status": "processed",
    "arrearsAmount": 450740,
    "publicTitle": "关于广州HN电子有限公司债权申报的公告",
    "publicType": "债权申报",
    "deadline": "2026-01-03"
  },
  {
    "id": "raw_1011",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "南京SD物资有限公司",
    "caseNo": "（2025）苏8破474号",
    "court": "西安市中级人民法院",
    "publishDate": "2026-01-17",
    "tags": [
      "关联方"
    ],
    "status": "pending",
    "arrearsAmount": 147862,
    "publicTitle": "关于南京SD物资有限公司重整裁定的公告",
    "publicType": "重整裁定",
    "deadline": "2026-04-17"
  },
  {
    "id": "raw_1012",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "深圳PW控股有限公司",
    "caseNo": "（2025）沪1破718号",
    "court": "苏州市中级人民法院",
    "publishDate": "2026-01-09",
    "tags": [],
    "status": "processed",
    "arrearsAmount": 1597778,
    "publicTitle": "关于深圳PW控股有限公司清算公告",
    "publicType": "清算公告",
    "deadline": "2026-04-09"
  },
  {
    "id": "raw_1013",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "苏州TJ置业有限公司",
    "caseNo": "（2025）川5破431号",
    "court": "南京市中级人民法院",
    "publishDate": "2025-10-29",
    "tags": [],
    "status": "pending",
    "arrearsAmount": 1894707,
    "publicTitle": "关于苏州TJ置业有限公司破产受理的公告",
    "publicType": "破产受理",
    "deadline": "2026-01-29"
  },
  {
    "id": "raw_1014",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "长沙PD装饰有限公司",
    "caseNo": "（2025）鄂4破202号",
    "court": "南京市中级人民法院",
    "publishDate": "2025-11-21",
    "tags": [],
    "status": "processed",
    "arrearsAmount": 1576178,
    "publicTitle": "关于长沙PD装饰有限公司债权申报的公告",
    "publicType": "债权申报",
    "deadline": "2026-02-21"
  },
  {
    "id": "raw_1015",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "青岛WN餐饮有限公司",
    "caseNo": "（2025）鄂8破695号",
    "court": "武汉市中级人民法院",
    "publishDate": "2025-10-16",
    "tags": [
      "上市公司"
    ],
    "status": "pending",
    "arrearsAmount": 368667,
    "publicTitle": "关于青岛WN餐饮有限公司重整裁定的公告",
    "publicType": "重整裁定",
    "deadline": "2026-01-16"
  },
  {
    "id": "raw_1016",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "成都QC置业有限公司",
    "caseNo": "（2023）沪9破936号",
    "court": "杭州市中级人民法院",
    "publishDate": "2025-10-27",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 1833316,
    "publicTitle": "关于成都QC置业有限公司清算公告",
    "publicType": "清算公告",
    "deadline": "2026-01-27"
  },
  {
    "id": "raw_1017",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "郑州YA科技有限公司",
    "caseNo": "（2025）沪10破859号",
    "court": "成都市中级人民法院",
    "publishDate": "2025-10-07",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 241601,
    "publicTitle": "关于郑州YA科技有限公司破产受理的公告",
    "publicType": "破产受理",
    "deadline": "2026-01-07"
  },
  {
    "id": "raw_1018",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "广州FS装饰有限公司",
    "caseNo": "（2023）川10破496号",
    "court": "上海市第三中级人民法院",
    "publishDate": "2026-01-25",
    "tags": [
      "上市公司"
    ],
    "status": "pending",
    "arrearsAmount": 1120145,
    "publicTitle": "关于广州FS装饰有限公司债权申报的公告",
    "publicType": "债权申报",
    "deadline": "2026-04-25"
  },
  {
    "id": "raw_1019",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "青岛OW服务有限公司",
    "caseNo": "（2023）川1破050号",
    "court": "上海市第三中级人民法院",
    "publishDate": "2025-12-24",
    "tags": [],
    "status": "processed",
    "arrearsAmount": 207446,
    "publicTitle": "关于青岛OW服务有限公司重整裁定的公告",
    "publicType": "重整裁定",
    "deadline": "2026-03-24"
  },
  {
    "id": "raw_1020",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "重庆OI装饰有限公司",
    "caseNo": "（2025）鄂2破617号",
    "court": "南京市中级人民法院",
    "publishDate": "2025-10-23",
    "tags": [],
    "status": "processed",
    "arrearsAmount": 842679,
    "publicTitle": "关于重庆OI装饰有限公司清算公告",
    "publicType": "清算公告",
    "deadline": "2026-01-23"
  },
  {
    "id": "raw_1021",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "重庆XD商贸有限公司",
    "caseNo": "（2024）川2破680号",
    "court": "深圳市中级人民法院",
    "publishDate": "2025-11-17",
    "tags": [
      "上市公司"
    ],
    "status": "processed",
    "arrearsAmount": 1392118,
    "publicTitle": "关于重庆XD商贸有限公司破产受理的公告",
    "publicType": "破产受理",
    "deadline": "2026-02-17"
  },
  {
    "id": "raw_1022",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "北京UZ装饰有限公司",
    "caseNo": "（2023）陕6破783号",
    "court": "武汉市中级人民法院",
    "publishDate": "2025-10-04",
    "tags": [],
    "status": "pending",
    "arrearsAmount": 1173953,
    "publicTitle": "关于北京UZ装饰有限公司债权申报的公告",
    "publicType": "债权申报",
    "deadline": "2026-01-04"
  },
  {
    "id": "raw_1023",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "杭州GI物资有限公司",
    "caseNo": "（2023）京6破875号",
    "court": "杭州市中级人民法院",
    "publishDate": "2026-01-19",
    "tags": [],
    "status": "pending",
    "arrearsAmount": 1459822,
    "publicTitle": "关于杭州GI物资有限公司重整裁定的公告",
    "publicType": "重整裁定",
    "deadline": "2026-04-19"
  },
  {
    "id": "raw_1024",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "青岛BO房地产有限公司",
    "caseNo": "（2023）苏3破704号",
    "court": "南京市中级人民法院",
    "publishDate": "2026-01-03",
    "tags": [],
    "status": "processed",
    "arrearsAmount": 473697,
    "publicTitle": "关于青岛BO房地产有限公司清算公告",
    "publicType": "清算公告",
    "deadline": "2026-04-03"
  },
  {
    "id": "raw_1025",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "西安MH服务有限公司",
    "caseNo": "（2024）沪6破317号",
    "court": "广州市中级人民法院",
    "publishDate": "2025-12-08",
    "tags": [
      "上市公司"
    ],
    "status": "pending",
    "arrearsAmount": 637164,
    "publicTitle": "关于西安MH服务有限公司破产受理的公告",
    "publicType": "破产受理",
    "deadline": "2026-03-08"
  },
  {
    "id": "raw_1026",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "杭州AV置业有限公司",
    "caseNo": "（2023）川4破179号",
    "court": "苏州市中级人民法院",
    "publishDate": "2025-12-09",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 1479029,
    "publicTitle": "关于杭州AV置业有限公司债权申报的公告",
    "publicType": "债权申报",
    "deadline": "2026-03-09"
  },
  {
    "id": "raw_1027",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "苏州EU科技有限公司",
    "caseNo": "（2024）京7破576号",
    "court": "苏州市中级人民法院",
    "publishDate": "2025-10-24",
    "tags": [],
    "status": "processed",
    "arrearsAmount": 150211,
    "publicTitle": "关于苏州EU科技有限公司重整裁定的公告",
    "publicType": "重整裁定",
    "deadline": "2026-01-24"
  },
  {
    "id": "raw_1028",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "上海WH科技有限公司",
    "caseNo": "（2023）鄂1破564号",
    "court": "西安市中级人民法院",
    "publishDate": "2025-11-18",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 1355353,
    "publicTitle": "关于上海WH科技有限公司清算公告",
    "publicType": "清算公告",
    "deadline": "2026-02-18"
  },
  {
    "id": "raw_1029",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "重庆YV服务有限公司",
    "caseNo": "（2025）粤1破797号",
    "court": "南京市中级人民法院",
    "publishDate": "2025-12-27",
    "tags": [],
    "status": "ignored",
    "arrearsAmount": 1982634,
    "publicTitle": "关于重庆YV服务有限公司破产受理的公告",
    "publicType": "破产受理",
    "deadline": "2026-03-27"
  },
  {
    "id": "raw_1030",
    "source": "全国企业破产重整案件信息网",
    "debtorName": "郑州CA咨询有限公司",
    "caseNo": "（2025）浙5破386号",
    "court": "武汉市中级人民法院",
    "publishDate": "2025-10-04",
    "tags": [
      "核心客户"
    ],
    "status": "pending",
    "arrearsAmount": 1654725,
    "publicTitle": "关于郑州CA咨询有限公司债权申报的公告",
    "publicType": "债权申报",
    "deadline": "2026-01-04"
  }
];

export const ledgerData: LedgerItem[] = [
  {
    "id": "claim_2024001",
    "caseNo": "（2023）沪8破403号",
    "debtorName": "青岛JX实业有限公司",
    "deadline": "2026-04-18",
    "declaredAmount": 539600,
    "status": "closed",
    "court": "杭州市中级人民法院",
    "manager": "国浩律师事务所",
    "managerPhone": "13991985804",
    "principals": [
      {
        "type": "会所管理成本",
        "amount": 460355,
        "memo": "服务费"
      },
      {
        "type": "其他",
        "amount": 79245
      }
    ],
    "interest": 36025,
    "nature": "general",
    "publishDate": "2025-09-07",
    "declarant": "杭州分公司",
    "claimStatus": "declared",
    "processStatus": "audited",
    "agent": "王律师",
    "agentPhone": "13912345678",
    "claimFormationProcess": "2023年签订物业服务合同，自2023年6月起拖欠物业费及相关费用。",
    "riskAssessment": "债务人资产主要为待售房产，变现周期较长，预计回收率约30%。"
  },
  {
    "id": "claim_2024002",
    "caseNo": "（2024）京1破050号",
    "debtorName": "长沙QV文化有限公司",
    "deadline": "2026-11-17",
    "declaredAmount": 473923,
    "confirmedAmount": 426530,
    "status": "confirming",
    "court": "上海市第三中级人民法院",
    "manager": "盈科律师事务所",
    "managerPhone": "13345679032",
    "principals": [
      {
        "type": "车位服务费",
        "amount": 324701,
        "memo": "服务费"
      },
      {
        "type": "车位服务费",
        "amount": 149222
      }
    ],
    "interest": 24828,
    "nature": "general",
    "publishDate": "2025-09-07",
    "objections": [
      {
        "id": "obj_001",
        "date": "2026-01-15",
        "objector": "manager",
        "content": "对车位服务费计算标准存疑，建议核减2000元",
        "amountInDispute": 2000,
        "status": "pending"
      }
    ],
    "declarant": "长沙项目部",
    "claimStatus": "declared",
    "processStatus": "pending_modification",
    "agent": "李律师",
    "agentPhone": "13887654321",
    "claimFormationProcess": "欠付2023-2024年度车位管理服务费。",
    "riskAssessment": "存在管理人异议，需补充证据材料。"
  },
  {
    "id": "claim_2024003",
    "caseNo": "（2023）浙5破029号",
    "debtorName": "苏州ZM置业有限公司",
    "deadline": "2026-07-05",
    "declaredAmount": 537214,
    "status": "declaring",
    "court": "广州市中级人民法院",
    "manager": "国浩律师事务所",
    "managerPhone": "13331278057",
    "principals": [
      {
        "type": "其他房屋委托经营服务费",
        "amount": 388919,
        "memo": "服务费"
      },
      {
        "type": "会所物业费",
        "amount": 148295
      }
    ],
    "interest": 31529,
    "nature": "common",
    "publishDate": "2025-11-01",
    "declarant": "苏州分公司",
    "claimStatus": "not_declared",
    "processStatus": "draft",
    "agent": "张律师",
    "agentPhone": "13600000000",
    "claimFormationProcess": "长期拖欠委托经营服务费。",
    "riskAssessment": "正在准备申报材料，风险可控。"
  },
  {
    "id": "claim_2024004",
    "caseNo": "（2024）苏9破593号",
    "debtorName": "苏州OB电子有限公司",
    "deadline": "2026-11-23",
    "declaredAmount": 370696,
    "confirmedAmount": 333626,
    "status": "repaying",
    "court": "武汉市中级人民法院",
    "manager": "海问律师事务所",
    "managerPhone": "13639327784",
    "principals": [
      {
        "type": "赠送物业费",
        "amount": 229443,
        "memo": "服务费"
      },
      {
        "type": "其他",
        "amount": 141253
      }
    ],
    "interest": 27962,
    "nature": "common",
    "publishDate": "2025-09-11",
    "declarant": "苏州项目部",
    "claimStatus": "declared",
    "processStatus": "audited",
    "agent": "陈律师",
    "agentPhone": "13711112222",
    "claimFormationProcess": "历史遗留物业费问题。",
    "riskAssessment": "已进入清偿阶段，预计年底回款。"
  },
  {
    "id": "claim_2024013",
    "caseNo": "（2024）鄂6破624号",
    "debtorName": "武汉MI服务有限公司",
    "deadline": "2026-07-27",
    "declaredAmount": 292713,
    "confirmedAmount": 263441,
    "status": "declaring",
    "court": "武汉市中级人民法院",
    "manager": "锦天城律师事务所",
    "managerPhone": "13296342518",
    "principals": [
      {
        "type": "会所物业费",
        "amount": 248925,
        "memo": "服务费"
      },
      {
        "type": "其他房屋委托经营服务费",
        "amount": 43788
      }
    ],
    "interest": 24052,
    "nature": "general",
    "publishDate": "2025-11-30",
    "declarant": "武汉分公司",
    "claimStatus": "declared",
    "processStatus": "auditing",
    "agent": "刘律师",
    "agentPhone": "13533334444",
    "claimFormationProcess": "合同纠纷导致的欠款。",
    "riskAssessment": "正在审核中，需关注管理人反馈。"
  },
  {
    "id": "claim_2024017",
    "caseNo": "（2023）苏5破537号",
    "debtorName": "广州NS房地产有限公司",
    "deadline": "2026-07-29",
    "declaredAmount": 337588,
    "confirmedAmount": 303829,
    "status": "declaring",
    "court": "武汉市中级人民法院",
    "manager": "君合律师事务所",
    "managerPhone": "13015413000",
    "principals": [
      {
        "type": "分户验收服务费",
        "amount": 298772,
        "memo": "服务费"
      },
      {
        "type": "车位服务费",
        "amount": 38816
      }
    ],
    "interest": 6262,
    "nature": "common",
    "publishDate": "2024-11-02",
    "declarant": "广州分公司",
    "claimStatus": "declared",
    "processStatus": "audited",
    "agent": "赵律师",
    "agentPhone": "13955556666",
    "claimFormationProcess": "验收服务费拖欠。",
    "riskAssessment": "已收到部分分配款。"
  },
  {
    "id": "claim_2024018",
    "caseNo": "（2024）鄂6破666号",
    "debtorName": "南京MI传媒有限公司",
    "deadline": "2026-05-26",
    "declaredAmount": 601247,
    "confirmedAmount": 541122,
    "status": "confirming",
    "court": "武汉市中级人民法院",
    "manager": "盈科律师事务所",
    "managerPhone": "13422510859",
    "principals": [
      {
        "type": "空置房物业管理费（含能耗费等）",
        "amount": 410093,
        "memo": "服务费"
      },
      {
        "type": "开荒保洁",
        "amount": 191154
      }
    ],
    "interest": 19672,
    "nature": "common",
    "publishDate": "2025-09-22",
    "declarant": "南京分公司",
    "claimStatus": "declared",
    "processStatus": "audited",
    "agent": "孙律师",
    "agentPhone": "13899998888",
    "claimFormationProcess": "空置房物业费。",
    "riskAssessment": "确认金额较高，回收预期乐观。"
  }
];

export const recoveryData: RecoveryItem[] = [
  {
    "id": "rec_001",
    "claimId": "claim_2024017",
    "debtorName": "成都KX商贸有限公司",
    "batch": "第四期分配",
    "method": "cash",
    "amount": 73423,
    "receivedDate": "2026-08-17",
    "status": "received"
  },
  {
    "id": "rec_002",
    "claimId": "claim_2024018",
    "debtorName": "长沙DL管理有限公司",
    "batch": "第三期分配",
    "method": "cash",
    "amount": 145024,
    "receivedDate": "2026-01-22",
    "status": "processing"
  },
  {
    "id": "rec_003",
    "claimId": "claim_2024013",
    "debtorName": "西安DQ咨询有限公司",
    "batch": "第二期分配",
    "method": "cash",
    "amount": 15948,
    "receivedDate": "2026-02-26",
    "status": "received"
  },
  {
    "id": "rec_004",
    "claimId": "claim_2024015",
    "debtorName": "深圳RP电子有限公司",
    "batch": "第三期分配",
    "method": "asset",
    "amount": 450429,
    "receivedDate": "2026-07-23",
    "status": "received",
    "assetDesc": "存货若干"
  },
  {
    "id": "rec_005",
    "claimId": "claim_2024030",
    "debtorName": "西安CS咨询有限公司",
    "batch": "第二期分配",
    "method": "asset",
    "amount": 212629,
    "receivedDate": "2026-12-15",
    "status": "processing",
    "assetDesc": "车辆若干"
  },
  {
    "id": "rec_006",
    "claimId": "claim_2024005",
    "debtorName": "北京NB房地产有限公司",
    "batch": "第四期分配",
    "method": "cash",
    "amount": 256978,
    "receivedDate": "2026-12-09",
    "status": "received"
  },
  {
    "id": "rec_007",
    "claimId": "claim_2024019",
    "debtorName": "武汉LA餐饮有限公司",
    "batch": "第一期分配",
    "method": "cash",
    "amount": 305214,
    "receivedDate": "2026-03-30",
    "status": "processing"
  },
  {
    "id": "rec_008",
    "claimId": "claim_2024017",
    "debtorName": "南京NJ物流有限公司",
    "batch": "第三期分配",
    "method": "cash",
    "amount": 178798,
    "receivedDate": "2026-10-17",
    "status": "received"
  },
  {
    "id": "rec_009",
    "claimId": "claim_2024016",
    "debtorName": "青岛NL咨询有限公司",
    "batch": "第二期分配",
    "method": "asset",
    "amount": 162181,
    "receivedDate": "2026-05-22",
    "status": "received",
    "assetDesc": "设备若干"
  },
  {
    "id": "rec_010",
    "claimId": "claim_2024018",
    "debtorName": "武汉LW商贸有限公司",
    "batch": "第四期分配",
    "method": "cash",
    "amount": 218698,
    "receivedDate": "2026-02-13",
    "status": "received"
  },
  {
    "id": "rec_011",
    "claimId": "claim_2024007",
    "debtorName": "武汉GS餐饮有限公司",
    "batch": "第三期分配",
    "method": "cash",
    "amount": 318065,
    "receivedDate": "2026-05-31",
    "status": "processing"
  },
  {
    "id": "rec_012",
    "claimId": "claim_2024028",
    "debtorName": "杭州YV投资有限公司",
    "batch": "第二期分配",
    "method": "cash",
    "amount": 318648,
    "receivedDate": "2026-01-27",
    "status": "processing"
  },
  {
    "id": "rec_013",
    "claimId": "claim_2024020",
    "debtorName": "深圳KS管理有限公司",
    "batch": "第一期分配",
    "method": "cash",
    "amount": 474752,
    "receivedDate": "2026-09-30",
    "status": "received"
  },
  {
    "id": "rec_014",
    "claimId": "claim_2024029",
    "debtorName": "上海FK物流有限公司",
    "batch": "第一期分配",
    "method": "cash",
    "amount": 440640,
    "receivedDate": "2026-01-15",
    "status": "received"
  },
  {
    "id": "rec_015",
    "claimId": "claim_2024029",
    "debtorName": "重庆FY装饰有限公司",
    "batch": "第三期分配",
    "method": "cash",
    "amount": 186394,
    "receivedDate": "2026-02-13",
    "status": "received"
  },
  {
    "id": "rec_016",
    "claimId": "claim_2024014",
    "debtorName": "广州RQ传媒有限公司",
    "batch": "第四期分配",
    "method": "cash",
    "amount": 498233,
    "receivedDate": "2026-12-24",
    "status": "received"
  },
  {
    "id": "rec_017",
    "claimId": "claim_2024005",
    "debtorName": "南京XI物流有限公司",
    "batch": "第一期分配",
    "method": "cash",
    "amount": 384869,
    "receivedDate": "2026-12-24",
    "status": "received"
  },
  {
    "id": "rec_018",
    "claimId": "claim_2024029",
    "debtorName": "苏州OL科技有限公司",
    "batch": "第一期分配",
    "method": "cash",
    "amount": 294973,
    "receivedDate": "2026-09-23",
    "status": "received"
  },
  {
    "id": "rec_019",
    "claimId": "claim_2024024",
    "debtorName": "杭州JQ商贸有限公司",
    "batch": "第二期分配",
    "method": "asset",
    "amount": 97712,
    "receivedDate": "2026-06-10",
    "status": "received",
    "assetDesc": "房产若干"
  },
  {
    "id": "rec_020",
    "claimId": "claim_2024009",
    "debtorName": "青岛OD管理有限公司",
    "batch": "第一期分配",
    "method": "asset",
    "amount": 265259,
    "receivedDate": "2026-03-30",
    "status": "processing",
    "assetDesc": "设备若干"
  },
  {
    "id": "rec_021",
    "claimId": "claim_2024018",
    "debtorName": "杭州ME咨询有限公司",
    "batch": "第二期分配",
    "method": "cash",
    "amount": 485507,
    "receivedDate": "2026-09-28",
    "status": "received"
  },
  {
    "id": "rec_022",
    "claimId": "claim_2024027",
    "debtorName": "郑州HN建设有限公司",
    "batch": "第三期分配",
    "method": "asset",
    "amount": 82203,
    "receivedDate": "2026-10-15",
    "status": "received",
    "assetDesc": "股权若干"
  },
  {
    "id": "rec_023",
    "claimId": "claim_2024015",
    "debtorName": "成都ZP集团有限公司",
    "batch": "第二期分配",
    "method": "asset",
    "amount": 150892,
    "receivedDate": "2026-01-08",
    "status": "processing",
    "assetDesc": "存货若干"
  },
  {
    "id": "rec_024",
    "claimId": "claim_2024012",
    "debtorName": "西安JJ建材有限公司",
    "batch": "第二期分配",
    "method": "cash",
    "amount": 420475,
    "receivedDate": "2026-09-10",
    "status": "received"
  },
  {
    "id": "rec_025",
    "claimId": "claim_2024022",
    "debtorName": "成都DL置业有限公司",
    "batch": "第三期分配",
    "method": "cash",
    "amount": 337434,
    "receivedDate": "2026-01-15",
    "status": "processing"
  },
  {
    "id": "rec_026",
    "claimId": "claim_2024016",
    "debtorName": "天津SC服务有限公司",
    "batch": "第四期分配",
    "method": "cash",
    "amount": 77201,
    "receivedDate": "2026-03-04",
    "status": "received"
  },
  {
    "id": "rec_027",
    "claimId": "claim_2024018",
    "debtorName": "长沙NP文化有限公司",
    "batch": "第二期分配",
    "method": "asset",
    "amount": 199556,
    "receivedDate": "2026-05-27",
    "status": "processing",
    "assetDesc": "设备若干"
  },
  {
    "id": "rec_028",
    "claimId": "claim_2024010",
    "debtorName": "青岛LH传媒有限公司",
    "batch": "第一期分配",
    "method": "cash",
    "amount": 447195,
    "receivedDate": "2026-11-23",
    "status": "processing"
  },
  {
    "id": "rec_029",
    "claimId": "claim_2024028",
    "debtorName": "上海TH商贸有限公司",
    "batch": "第三期分配",
    "method": "asset",
    "amount": 392782,
    "receivedDate": "2026-08-16",
    "status": "received",
    "assetDesc": "股权若干"
  },
  {
    "id": "rec_030",
    "claimId": "claim_2024025",
    "debtorName": "上海CR建设有限公司",
    "batch": "第三期分配",
    "method": "cash",
    "amount": 52516,
    "receivedDate": "2026-06-08",
    "status": "received"
  }
];

export const principalTypes = [
  "前期服务费",
  "案场清洁",
  "开荒保洁",
  "空置房物业管理费（含能耗费等）",
  "车位服务费",
  "会所物业费",
  "会所经营佣金",
  "会所管理成本",
  "其他房屋委托经营服务费",
  "分户验收服务费",
  "维保修服务费",
  "智慧社区运营费",
  "车位协销",
  "赠送物业费",
  "其他"
];

// --- V2 Mock Data ---

export const debtorData: DebtorItem[] = [
  {
    "id": "d_001",
    "name": "杭州FF置业有限公司",
    "creditCode": "91937660CMA6752XXXXXX",
    "arrearsAmount": 2915040,
    "lastArrearsDate": "2024-03-02",
    "source": "ERP",
    "status": "inactive",
    "matchedCount": 2,
    "arrearsCycle": ["2023年", "2024年"],
    "entryDate": "2024-01-15",
    "updateDate": "2024-03-05"
  },
  {
    "id": "d_002",
    "name": "北京LT建设有限公司",
    "creditCode": "91462970FMA3461XXXXXX",
    "arrearsAmount": 2514821,
    "lastArrearsDate": "2024-04-05",
    "source": "公开公告",
    "status": "active",
    "matchedCount": 2,
    "arrearsCycle": ["2022年", "2023年", "2024年"],
    "entryDate": "2023-11-20",
    "updateDate": "2024-04-10"
  },
  {
    "id": "d_003",
    "name": "成都GA置业有限公司",
    "creditCode": "91577132CMA1415XXXXXX",
    "arrearsAmount": 336453,
    "lastArrearsDate": "2023-03-08",
    "source": "单一大业主",
    "status": "inactive",
    "matchedCount": 0,
    "arrearsCycle": ["2023年"],
    "entryDate": "2023-02-10",
    "updateDate": "2023-03-15"
  },
  {
    "id": "d_004",
    "name": "天津IJ科技有限公司",
    "creditCode": "91115732CMA1355XXXXXX",
    "arrearsAmount": 4851961,
    "lastArrearsDate": "2024-10-14",
    "source": "ERP",
    "status": "inactive",
    "matchedCount": 1,
    "arrearsCycle": ["2022年", "2024年"],
    "entryDate": "2024-05-12",
    "updateDate": "2024-10-20"
  },
  {
    "id": "d_005",
    "name": "长沙AS传媒有限公司",
    "creditCode": "91965323CMA5814XXXXXX",
    "arrearsAmount": 1648740,
    "lastArrearsDate": "2024-10-09",
    "source": "财务应收款",
    "status": "inactive",
    "matchedCount": 2,
    "arrearsCycle": ["2024年"],
    "entryDate": "2024-08-01",
    "updateDate": "2024-10-15"
  },
  {
    "id": "d_006",
    "name": "深圳BT电子有限公司",
    "creditCode": "91799502BMA6386XXXXXX",
    "arrearsAmount": 3678656,
    "lastArrearsDate": "2024-06-22",
    "source": "公开公告",
    "status": "active",
    "matchedCount": 2,
    "arrearsCycle": ["2023年", "2024年"],
    "entryDate": "2024-01-05",
    "updateDate": "2024-06-25"
  },
  {
    "id": "d_007",
    "name": "成都HF集团有限公司",
    "creditCode": "91581839CMA9404XXXXXX",
    "arrearsAmount": 325622,
    "lastArrearsDate": "2023-02-26",
    "source": "单一大业主",
    "status": "active",
    "matchedCount": 1,
    "arrearsCycle": ["2022年", "2023年"],
    "entryDate": "2022-12-10",
    "updateDate": "2023-03-01"
  },
  {
    "id": "d_008",
    "name": "苏州IY投资有限公司",
    "creditCode": "91385719EMA3904XXXXXX",
    "arrearsAmount": 3176923,
    "lastArrearsDate": "2024-10-14",
    "source": "公开公告",
    "status": "active",
    "matchedCount": 1,
    "arrearsCycle": ["2021年", "2022年", "2023年", "2024年"],
    "entryDate": "2024-02-20",
    "updateDate": "2024-10-18"
  },
  {
    "id": "d_009",
    "name": "武汉FO餐饮有限公司",
    "creditCode": "91580604FMA3470XXXXXX",
    "arrearsAmount": 3296514,
    "lastArrearsDate": "2023-05-22",
    "source": "公开公告",
    "status": "active",
    "matchedCount": 0,
    "arrearsCycle": ["2023年"],
    "entryDate": "2023-01-15",
    "updateDate": "2023-05-25"
  },
  {
    "id": "d_010",
    "name": "天津UR餐饮有限公司",
    "creditCode": "91826321CMA2330XXXXXX",
    "arrearsAmount": 1832286,
    "lastArrearsDate": "2023-04-24",
    "source": "单一大业主",
    "status": "active",
    "matchedCount": 2,
    "arrearsCycle": ["2022年", "2023年"],
    "entryDate": "2023-02-28",
    "updateDate": "2023-05-01"
  },
  {
    "id": "d_011",
    "name": "杭州IH服务有限公司",
    "creditCode": "91882809EMA5765XXXXXX",
    "arrearsAmount": 2767185,
    "lastArrearsDate": "2024-04-03",
    "source": "公开公告",
    "status": "active",
    "matchedCount": 1,
    "arrearsCycle": ["2023年", "2024年"],
    "entryDate": "2023-10-10",
    "updateDate": "2024-04-05"
  },
  {
    "id": "d_012",
    "name": "苏州MQ咨询有限公司",
    "creditCode": "91318301FMA7678XXXXXX",
    "arrearsAmount": 785061,
    "lastArrearsDate": "2024-01-11",
    "source": "公开公告",
    "status": "active",
    "matchedCount": 1,
    "arrearsCycle": ["2023年"],
    "entryDate": "2023-11-05",
    "updateDate": "2024-01-15"
  },
  {
    "id": "d_013",
    "name": "长沙NR咨询有限公司",
    "creditCode": "91648929CMA2156XXXXXX",
    "arrearsAmount": 3420793,
    "lastArrearsDate": "2024-07-15",
    "source": "财务应收款",
    "status": "inactive",
    "matchedCount": 0,
    "arrearsCycle": ["2022年", "2023年", "2024年"],
    "entryDate": "2024-01-20",
    "updateDate": "2024-07-20"
  },
  {
    "id": "d_014",
    "name": "青岛TN服务有限公司",
    "creditCode": "91724790FMA9323XXXXXX",
    "arrearsAmount": 2210434,
    "lastArrearsDate": "2023-09-14",
    "source": "公开公告",
    "status": "active",
    "matchedCount": 2,
    "arrearsCycle": ["2023年"],
    "entryDate": "2023-05-10",
    "updateDate": "2023-09-18"
  },
  {
    "id": "d_015",
    "name": "杭州CJ物资有限公司",
    "creditCode": "91278804EMA7856XXXXXX",
    "arrearsAmount": 477048,
    "lastArrearsDate": "2023-06-15",
    "source": "财务应收款",
    "status": "active",
    "matchedCount": 1,
    "arrearsCycle": ["2023年"],
    "entryDate": "2023-02-15",
    "updateDate": "2023-06-20"
  }
];

export const publicNoticeData: PublicNoticeItem[] = [
  {
    "id": "pub_99801",
    "title": "长沙MP建材有限公司破产清算案公告",
    "partyName": "长沙MP建材有限公司",
    "type": "破产审查案件",
    "court": "北京市第一中级人民法院",
    "date": "2025-06-09",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99802",
    "title": "青岛OQ咨询有限公司破产清算案公告",
    "partyName": "青岛OQ咨询有限公司",
    "type": "破产案件",
    "court": "杭州市中级人民法院",
    "date": "2025-10-28",
    "matchStatus": "matched",
    "debtorId": "d_022",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99803",
    "title": "郑州QL文化有限公司破产清算案公告",
    "partyName": "郑州QL文化有限公司",
    "type": "强制清算申请审查案件",
    "court": "杭州市中级人民法院",
    "date": "2025-09-08",
    "matchStatus": "matched",
    "debtorId": "d_026",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99804",
    "title": "青岛NB物流有限公司破产清算案公告",
    "partyName": "青岛NB物流有限公司",
    "type": "强制清算案件",
    "court": "南京市中级人民法院",
    "date": "2025-06-12",
    "matchStatus": "matched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99805",
    "title": "重庆AN餐饮有限公司破产重整案公告",
    "partyName": "重庆AN餐饮有限公司",
    "type": "强制清算上诉案件",
    "court": "成都市中级人民法院",
    "date": "2025-12-26",
    "matchStatus": "matched",
    "debtorId": "d_029",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99806",
    "title": "广州KT商贸有限公司破产重整案公告",
    "partyName": "广州KT商贸有限公司",
    "type": "破产上诉案件",
    "court": "深圳市中级人民法院",
    "date": "2025-02-14",
    "matchStatus": "unmatched",
    "debtorId": "d_025",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99807",
    "title": "天津EB餐饮有限公司破产清算案公告",
    "partyName": "天津EB餐饮有限公司",
    "type": "破产监督案件",
    "court": "广州市中级人民法院",
    "date": "2025-12-04",
    "matchStatus": "unmatched",
    "debtorId": "d_020",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99808",
    "title": "苏州IW文化有限公司破产清算案公告",
    "partyName": "苏州IW文化有限公司",
    "type": "强制清算监督案件",
    "court": "武汉市中级人民法院",
    "date": "2025-08-09",
    "matchStatus": "matched",
    "debtorId": "d_009",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99809",
    "title": "上海XU置业有限公司破产重整案公告",
    "partyName": "上海XU置业有限公司",
    "type": "破产审查案件",
    "court": "南京市中级人民法院",
    "date": "2025-04-10",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99810",
    "title": "广州FF控股有限公司破产重整案公告",
    "partyName": "广州FF控股有限公司",
    "type": "破产案件",
    "court": "杭州市中级人民法院",
    "date": "2025-12-24",
    "matchStatus": "unmatched",
    "debtorId": "d_021",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99811",
    "title": "长沙ZT实业有限公司破产清算案公告",
    "partyName": "长沙ZT实业有限公司",
    "type": "强制清算申请审查案件",
    "court": "苏州市中级人民法院",
    "date": "2025-03-10",
    "matchStatus": "unmatched",
    "debtorId": "d_025",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99812",
    "title": "天津OD房地产有限公司破产清算案公告",
    "partyName": "天津OD房地产有限公司",
    "type": "强制清算案件",
    "court": "杭州市中级人民法院",
    "date": "2025-06-26",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99813",
    "title": "广州BN装饰有限公司破产清算案公告",
    "partyName": "广州BN装饰有限公司",
    "type": "强制清算上诉案件",
    "court": "武汉市中级人民法院",
    "date": "2025-03-21",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99814",
    "title": "深圳ZZ文化有限公司破产重整案公告",
    "partyName": "深圳ZZ文化有限公司",
    "type": "破产上诉案件",
    "court": "武汉市中级人民法院",
    "date": "2025-12-12",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99815",
    "title": "上海VY实业有限公司破产清算案公告",
    "partyName": "上海VY实业有限公司",
    "type": "破产监督案件",
    "court": "北京市第一中级人民法院",
    "date": "2025-01-21",
    "matchStatus": "matched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99816",
    "title": "南京XS建材有限公司破产重整案公告",
    "partyName": "南京XS建材有限公司",
    "type": "强制清算监督案件",
    "court": "上海市第三中级人民法院",
    "date": "2025-10-07",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99817",
    "title": "杭州BO管理有限公司破产重整案公告",
    "partyName": "杭州BO管理有限公司",
    "type": "破产审查案件",
    "court": "南京市中级人民法院",
    "date": "2025-08-31",
    "matchStatus": "matched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99818",
    "title": "广州WK建材有限公司破产重整案公告",
    "partyName": "广州WK建材有限公司",
    "type": "破产案件",
    "court": "广州市中级人民法院",
    "date": "2025-04-03",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99819",
    "title": "天津BL物资有限公司破产清算案公告",
    "partyName": "天津BL物资有限公司",
    "type": "强制清算申请审查案件",
    "court": "西安市中级人民法院",
    "date": "2025-12-03",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99820",
    "title": "深圳ZT餐饮有限公司破产清算案公告",
    "partyName": "深圳ZT餐饮有限公司",
    "type": "强制清算案件",
    "court": "西安市中级人民法院",
    "date": "2025-07-15",
    "matchStatus": "matched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99821",
    "title": "郑州CP商贸有限公司破产清算案公告",
    "partyName": "郑州CP商贸有限公司",
    "type": "强制清算上诉案件",
    "court": "西安市中级人民法院",
    "date": "2025-09-03",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99822",
    "title": "杭州TA服务有限公司破产重整案公告",
    "partyName": "杭州TA服务有限公司",
    "type": "破产上诉案件",
    "court": "北京市第一中级人民法院",
    "date": "2025-10-17",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99823",
    "title": "成都NY物资有限公司破产重整案公告",
    "partyName": "成都NY物资有限公司",
    "type": "破产监督案件",
    "court": "成都市中级人民法院",
    "date": "2025-10-08",
    "matchStatus": "matched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99824",
    "title": "天津ED置业有限公司破产重整案公告",
    "partyName": "天津ED置业有限公司",
    "type": "强制清算监督案件",
    "court": "西安市中级人民法院",
    "date": "2025-11-03",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99825",
    "title": "郑州WP实业有限公司破产清算案公告",
    "partyName": "郑州WP实业有限公司",
    "type": "破产审查案件",
    "court": "广州市中级人民法院",
    "date": "2025-05-31",
    "matchStatus": "unmatched",
    "debtorId": "d_003",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99826",
    "title": "长沙FQ集团有限公司破产重整案公告",
    "partyName": "长沙FQ集团有限公司",
    "type": "破产案件",
    "court": "北京市第一中级人民法院",
    "date": "2025-05-15",
    "matchStatus": "unmatched",
    "debtorId": "d_024",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99827",
    "title": "郑州DS餐饮有限公司破产清算案公告",
    "partyName": "郑州DS餐饮有限公司",
    "type": "强制清算申请审查案件",
    "court": "北京市第一中级人民法院",
    "date": "2025-06-10",
    "matchStatus": "matched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99828",
    "title": "深圳QR服务有限公司破产重整案公告",
    "partyName": "深圳QR服务有限公司",
    "type": "强制清算案件",
    "court": "成都市中级人民法院",
    "date": "2025-10-01",
    "matchStatus": "unmatched",
    "debtorId": "d_004",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99829",
    "title": "苏州YZ物流有限公司破产重整案公告",
    "partyName": "苏州YZ物流有限公司",
    "type": "强制清算上诉案件",
    "court": "上海市第三中级人民法院",
    "date": "2025-06-14",
    "matchStatus": "matched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  },
  {
    "id": "pub_99830",
    "title": "成都TQ物流有限公司破产重整案公告",
    "partyName": "成都TQ物流有限公司",
    "type": "破产上诉案件",
    "court": "武汉市中级人民法院",
    "date": "2026-01-25",
    "matchStatus": "unmatched",
    "sourceUrl": "https://pccz.court.gov.cn/"
  }
];

// --- V2.1 New Types (Creditors Meeting & Prediction) ---

export interface ProposalItem {
  id: string;
  title: string;
  content: string;
  voteStatus: 'pending' | 'agreed' | 'rejected' | 'abstained';
  voteDeadline: string;
}

export interface MeetingItem {
  id: string;
  caseNo: string;
  debtorName: string;
  meetingName: string;
  meetingDate: string;
  meetingType: 'offline' | 'online' | 'mixed';
  status: 'upcoming' | 'ongoing' | 'ended';
  location?: string;
  link?: string;
  proposals: ProposalItem[];
  documents: { name: string; url: string }[];
}

export interface PredictionItem {
  month: string;
  predictedAmount: number;
  actualAmount: number;
  probability: number; // 0-1
}

export interface AssetDisposalItem {
  id: string;
  assetName: string;
  valuation: number;
  currentPrice: number;
  status: 'listing' | 'auctioning' | 'sold' | 'failed';
  expectedDealDate: string;
  platform: string;
}

// --- V2.1 Mock Data ---

export const meetingsData: MeetingItem[] = [
  {
    id: 'mtg_001',
    caseNo: '（2024）粤01破123号',
    debtorName: '广州XX房地产开发有限公司',
    meetingName: '第一次债权人会议',
    meetingDate: '2026-03-15 09:30',
    meetingType: 'online',
    status: 'upcoming',
    link: 'https://meeting.court.gov.cn/room/123456',
    proposals: [
      {
        id: 'prop_001',
        title: '关于财产管理方案的议案',
        content: '管理人拟定的财产管理方案，主要包括...',
        voteStatus: 'pending',
        voteDeadline: '2026-03-15 12:00'
      },
      {
        id: 'prop_002',
        title: '关于破产财产变价方案的议案',
        content: '管理人拟定的财产变价方案，建议通过阿里拍卖平台...',
        voteStatus: 'pending',
        voteDeadline: '2026-03-15 12:00'
      }
    ],
    documents: [
      { name: '第一次债权人会议会议手册.pdf', url: '#' },
      { name: '财产状况报告.pdf', url: '#' }
    ]
  },
  {
    id: 'mtg_002',
    caseNo: '（2024）京03破申45号',
    debtorName: '北京XX置业发展有限公司',
    meetingName: '第二次债权人会议',
    meetingDate: '2026-02-10 14:00',
    meetingType: 'mixed',
    status: 'ongoing',
    location: '北京市第三中级人民法院第一法庭',
    link: 'https://meeting.court.gov.cn/room/789012',
    proposals: [
      {
        id: 'prop_003',
        title: '关于重整计划草案的议案',
        content: '重整投资人提交的重整计划草案...',
        voteStatus: 'pending',
        voteDeadline: '2026-02-10 17:00'
      }
    ],
    documents: [
      { name: '重整计划草案.pdf', url: '#' },
      { name: '偿债能力分析报告.pdf', url: '#' }
    ]
  },
  {
    id: 'mtg_003',
    caseNo: '（2023）沪7破838号',
    debtorName: '上海MO实业有限公司',
    meetingName: '第一次债权人会议',
    meetingDate: '2025-12-20 09:00',
    meetingType: 'offline',
    status: 'ended',
    location: '上海市第三中级人民法院第五法庭',
    proposals: [
      {
        id: 'prop_004',
        title: '关于财产分配方案的议案',
        content: '第一期财产分配方案...',
        voteStatus: 'agreed',
        voteDeadline: '2025-12-20 12:00'
      }
    ],
    documents: [
      { name: '会议纪要.pdf', url: '#' },
      { name: '表决结果报告.pdf', url: '#' }
    ]
  }
];

export const predictionData: PredictionItem[] = [
  { month: '2026-02', predictedAmount: 500000, actualAmount: 0, probability: 0.9 },
  { month: '2026-03', predictedAmount: 1200000, actualAmount: 0, probability: 0.8 },
  { month: '2026-04', predictedAmount: 800000, actualAmount: 0, probability: 0.7 },
  { month: '2026-05', predictedAmount: 2000000, actualAmount: 0, probability: 0.6 },
  { month: '2026-06', predictedAmount: 1500000, actualAmount: 0, probability: 0.5 },
  { month: '2026-07', predictedAmount: 300000, actualAmount: 0, probability: 0.4 }
];

export const assetDisposalData: AssetDisposalItem[] = [
  {
    id: 'asset_001',
    assetName: '广州天河区办公楼一层',
    valuation: 5000000,
    currentPrice: 3800000,
    status: 'auctioning',
    expectedDealDate: '2026-03-20',
    platform: '阿里拍卖'
  },
  {
    id: 'asset_002',
    assetName: '北京朝阳区商铺',
    valuation: 8000000,
    currentPrice: 7200000,
    status: 'listing',
    expectedDealDate: '2026-05-15',
    platform: '京东拍卖'
  },
  {
    id: 'asset_003',
    assetName: '上海浦东新区住宅一套',
    valuation: 12000000,
    currentPrice: 11500000,
    status: 'sold',
    expectedDealDate: '2025-12-10',
    platform: '公拍网'
  }
];

// --- V3 New Interfaces ---

// 扩展 KPI 接口
export interface ExtendedClaimKPI extends ClaimKPI {
  totalCases: number;        // 累计案件数
  confirmedAmount: number;   // 确权金额
  confirmationRate: number;  // 确权率
  recoveryRateFromConfirmed: number; // 回款率(基数确权)
}

// 趋势数据接口
export interface TrendData {
  period: string; // '2023-Q1' or '2023-01'
  declared: number;
  undeclared: number;
  expired: number;
}

// 代理排行接口
export interface AgencyRankItem {
  id: string;
  name: string;
  type: 'law_firm' | 'employee' | 'pioneer';
  caseCount: number;
  declaredAmount: number;
  confirmedAmount: number;
  recoveredAmount: number;
  // 计算属性在前端计算：确权率、回款率
}

// 会议预警接口
export interface MeetingAlert {
  id: string;
  caseNo: string;
  debtor: string;
  meetingDate: string;
  meetingType: '第一次' | '第二次' | '临时';
  location: string; // 或 '线上'
}

// 债权性质分布接口
export interface NatureDistributionItem {
  name: string;
  value: number;
}

// 代理方式分布接口
export interface AgencyDistributionItem {
  name: string;
  value: number;
}

// 地区分布接口
export interface RegionDistributionItem {
  name: string;
  value: number;
}

// --- V3 New Data ---

export const extendedClaimKPI: ExtendedClaimKPI = {
  ...claimKPI,
  totalCases: 128,
  confirmedAmount: 11500000.00,
  confirmationRate: 0.7278,
  recoveryRateFromConfirmed: 0.2783
};

export const trendData: TrendData[] = [
  { period: '2025-01', declared: 12, undeclared: 3, expired: 0 },
  { period: '2025-02', declared: 15, undeclared: 2, expired: 1 },
  { period: '2025-03', declared: 18, undeclared: 4, expired: 0 },
  { period: '2025-04', declared: 10, undeclared: 1, expired: 0 },
  { period: '2025-05', declared: 22, undeclared: 5, expired: 2 },
  { period: '2025-06', declared: 20, undeclared: 3, expired: 0 },
];

export const agencyRankData: AgencyRankItem[] = [
  { id: '1', name: '金杜律师事务所', type: 'law_firm', caseCount: 15, declaredAmount: 5000000, confirmedAmount: 4500000, recoveredAmount: 1000000 },
  { id: '2', name: '中伦律师事务所', type: 'law_firm', caseCount: 12, declaredAmount: 3000000, confirmedAmount: 2800000, recoveredAmount: 800000 },
  { id: '3', name: '张三', type: 'employee', caseCount: 8, declaredAmount: 1200000, confirmedAmount: 1000000, recoveredAmount: 200000 },
  { id: '4', name: '李四', type: 'employee', caseCount: 5, declaredAmount: 800000, confirmedAmount: 750000, recoveredAmount: 150000 },
  { id: '5', name: '先锋A队', type: 'pioneer', caseCount: 20, declaredAmount: 2500000, confirmedAmount: 2000000, recoveredAmount: 500000 },
];

export const meetingAlerts: MeetingAlert[] = [
  { id: 'm1', caseNo: '（2024）粤01破123号', debtor: '广州XX房地产开发有限公司', meetingDate: '2026-02-15', meetingType: '第一次', location: '线上' },
  { id: 'm2', caseNo: '（2024）京03破申45号', debtor: '北京XX置业发展有限公司', meetingDate: '2026-02-20', meetingType: '临时', location: '北京市第三中级人民法院第一法庭' },
];

export const natureDistributionData: NatureDistributionItem[] = [
  { name: '工程款', value: 35 },
  { name: '借款', value: 25 },
  { name: '租金', value: 15 },
  { name: '货款', value: 10 },
  { name: '服务费', value: 10 },
  { name: '其他', value: 5 },
];

export const agencyDistributionData: AgencyDistributionItem[] = [
  { name: '外委律师', value: 45 },
  { name: '员工代理', value: 30 },
  { name: '先锋代理', value: 25 },
];

export const regionDistributionData: RegionDistributionItem[] = [
  { name: '广东', value: 40 },
  { name: '北京', value: 25 },
  { name: '上海', value: 20 },
  { name: '江苏', value: 10 },
  { name: '浙江', value: 5 },
];
