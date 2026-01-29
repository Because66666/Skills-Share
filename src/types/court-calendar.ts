export type CourtEventStatus = 'pending' | 'completed' | 'cancelled' | 'postponed';

export type ReminderType = 'system' | 'email' | 'sms';

export interface Reminder {
  type: ReminderType;
  time: number; // minutes before event
}

export interface CourtEvent {
  id: string;
  caseId?: string;           // 关联案件ID
  caseName: string;          // 案件名称
  courtName: string;         // 法院名称
  courtRoom?: string;        // 法庭
  startTime: string;         // ISO 8601
  endTime: string;           // ISO 8601
  judge?: string;            // 法官
  lawyerId: string;          // 出庭律师ID
  lawyerName?: string;       // 出庭律师姓名 (Mock data convenience)
  status: CourtEventStatus;
  reminders: Reminder[];
  description?: string;      // 备注/准备事项
  preparationItems?: {       // 准备事项清单
    id: string;
    label: string;
    completed: boolean;
  }[];
}

export interface CourtCalendarState {
  events: CourtEvent[];
  view: 'month' | 'week' | 'day' | 'agenda';
  date: Date;
}
