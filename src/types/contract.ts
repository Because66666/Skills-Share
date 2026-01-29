export type ContractStatus = 
  | 'draft'           // 草稿
  | 'pending_approval'// 审批中
  | 'approved'        // 审批通过
  | 'signing'         // 签署中
  | 'performing'      // 履行中
  | 'fulfilled'       // 已履行/已归档
  | 'terminated';     // 已终止

export const ContractStatusMap: Record<ContractStatus, { label: string; color: string }> = {
  draft: { label: '草稿', color: 'gray' },
  pending_approval: { label: '审批中', color: 'blue' },
  approved: { label: '审批通过', color: 'cyan' },
  signing: { label: '签署中', color: 'purple' },
  performing: { label: '履行中', color: 'green' },
  fulfilled: { label: '已归档', color: 'slate' },
  terminated: { label: '已终止', color: 'red' },
};

export interface Contract {
  id: string;
  code: string;
  name: string;
  type: '销售' | '采购' | '劳动' | '租赁' | '服务' | '其他';
  status: ContractStatus;
  amount: number;
  currency: 'CNY' | 'USD';
  signDate: string;
  startDate: string;
  endDate: string;
  parties: {
    primary: string; // 甲方
    secondary: string; // 乙方
  };
  creator: string;
  createTime: string;
  department: string;
  riskLevel: 'low' | 'medium' | 'high';
  templateId?: string;
  description?: string;
  performance: {
    totalAmount: number;
    paidAmount: number;
    progress: number;
    nextPaymentDate?: string;
    nextPaymentAmount?: number;
  };
  auditLog: {
    id: string;
    action: string;
    operator: string;
    time: string;
    comment?: string;
  }[];
}
