import { CourtEvent } from '@/types/court-calendar';
import { addDays, setHours, setMinutes, subDays } from 'date-fns';

const today = new Date();

export const mockCourtEvents: CourtEvent[] = [
  {
    id: '1',
    caseId: 'CASE-2024-001',
    caseName: '万科物业服务合同纠纷案',
    courtName: '深圳市南山区人民法院',
    courtRoom: '第五审判庭',
    startTime: setMinutes(setHours(addDays(today, 2), 9), 30).toISOString(),
    endTime: setMinutes(setHours(addDays(today, 2), 11), 30).toISOString(),
    judge: '张伟',
    lawyerId: 'L001',
    lawyerName: '李明律师',
    status: 'pending',
    reminders: [
      { type: 'system', time: 1440 }, // 1 day before
      { type: 'sms', time: 60 }
    ],
    description: '需携带原件，重点准备关于物业费计算标准的证据。',
    preparationItems: [
      { id: 'p1', label: '证据原件', completed: false },
      { id: 'p2', label: '授权委托书', completed: true },
      { id: 'p3', label: '律师证', completed: true }
    ]
  },
  {
    id: '2',
    caseId: 'CASE-2024-005',
    caseName: '腾讯科技劳动争议案',
    courtName: '深圳市劳动人事争议仲裁委员会',
    courtRoom: '仲裁二庭',
    startTime: setMinutes(setHours(subDays(today, 1), 14), 0).toISOString(),
    endTime: setMinutes(setHours(subDays(today, 1), 16), 0).toISOString(),
    judge: '王芳',
    lawyerId: 'L002',
    lawyerName: '张三律师',
    status: 'completed',
    reminders: [],
    description: '已完成开庭，等待裁决结果。',
    preparationItems: [
      { id: 'p1', label: '证据原件', completed: true },
      { id: 'p2', label: '答辩状', completed: true }
    ]
  },
  {
    id: '3',
    caseId: 'CASE-2024-008',
    caseName: '华为技术买卖合同纠纷案',
    courtName: '深圳市龙岗区人民法院',
    courtRoom: '第十审判庭',
    startTime: setMinutes(setHours(addDays(today, 5), 10), 0).toISOString(),
    endTime: setMinutes(setHours(addDays(today, 5), 12), 0).toISOString(),
    judge: '李四',
    lawyerId: 'L001',
    lawyerName: '李明律师',
    status: 'pending',
    reminders: [
      { type: 'system', time: 2880 } // 2 days before
    ],
    description: '对方申请延期举证，可能需要第二次开庭。',
    preparationItems: [
      { id: 'p1', label: '补充证据', completed: false }
    ]
  },
  {
    id: '4',
    caseId: 'CASE-2024-012',
    caseName: '大疆创新专利侵权案',
    courtName: '广州知识产权法院',
    courtRoom: '第三法庭',
    startTime: setMinutes(setHours(today, 15), 0).toISOString(),
    endTime: setMinutes(setHours(today, 17), 30).toISOString(),
    judge: '赵六',
    lawyerId: 'L003',
    lawyerName: '王五律师',
    status: 'pending',
    reminders: [
      { type: 'system', time: 30 }
    ],
    description: '技术调查官将出庭。',
    preparationItems: [
      { id: 'p1', label: '技术鉴定报告', completed: true },
      { id: 'p2', label: '侵权对比表', completed: true }
    ]
  },
  {
    id: '5',
    caseId: 'CASE-2024-015',
    caseName: '某商业保理合同纠纷',
    courtName: '深圳市福田区人民法院',
    startTime: setMinutes(setHours(addDays(today, 10), 9), 0).toISOString(),
    endTime: setMinutes(setHours(addDays(today, 10), 11), 0).toISOString(),
    lawyerId: 'L002',
    lawyerName: '张三律师',
    status: 'postponed',
    reminders: [],
    description: '因法官身体原因延期。'
  }
];
