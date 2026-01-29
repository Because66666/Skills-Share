export type CaseStatus = 'pending_assign' | 'processing' | 'reviewing' | 'completed' | 'archived';

export interface PenaltyCase {
  id: string;
  caseNo: string; // 案件编号
  projectName: string; // 涉及项目
  region: string; // 所属地区公司
  penaltyType: string; // 处罚类型 (消防/环保/安监/市容/其他)
  penaltyAmount: number; // 处罚金额
  penaltyDate: string; // 处罚日期
  deadline: string; // 处理截止日期
  status: CaseStatus;
  assigneeId?: string; // 当前负责人ID
  assigneeName?: string; // 当前负责人姓名
  description: string; // 处罚事由
  attachments: string[]; // 证据材料URL
  isReconsideration: boolean; // 是否涉及复议
  createdAt: string;
}

export interface Reconsideration {
  id: string;
  originalCaseId: string; // 关联原案件ID
  originalCaseNo: string; // 关联原案件编号
  applicant: string; // 申请人
  respondent: string; // 被申请人
  request: string; // 复议请求
  reason: string; // 复议理由
  status: 'applied' | 'accepted' | 'hearing' | 'decided' | 'rejected';
  applicationDate: string; // 申请日期
  deadline: string; // 复议截止日期
  result?: string; // 复议结果
}

export interface KPI {
  pendingCases: number;
  overdueCases: number;
  reconsiderationCases: number;
  monthlyFine: number;
  monthlyFineTrend: number; // 环比增长率
}
