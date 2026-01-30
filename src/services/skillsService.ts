import api from './api';

export interface Tag {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

export interface Rating {
  id: string;
  value: number;
  userId: string;
}

export interface Attachment {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  path: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  content?: string;
  author: string;
  tags: Tag[];
  downloadCount: number;
  rating: number;
  publishDate: string;
  icon: string;
  color: string;
  status: 'pending' | 'approved' | 'rejected';
  user?: User; // Author details
  comments?: Comment[];
  ratings?: Rating[];
  attachments?: Attachment[];
}

export interface CreateSkillRequest {
  title: string;
  description: string;
  content?: string;
  tags?: string[];
  icon?: string;
  color?: string;
  attachmentIds?: string[];
}

// 辅助函数：从 skills.json 获取数据
const fetchSkills = async (): Promise<Skill[]> => {
    try {
        console.log('Fetching skills from /skills.json...');
        const response = await api.get('/skills.json');
        console.log('Skills fetched:', response);
        
        // If response is the array itself (due to interceptor)
        if (Array.isArray(response)) {
            return response as unknown as Skill[];
        }
        
        // If response is an object with data property (in case interceptor didn't work as expected or structure changed)
        // @ts-ignore
        if (response && Array.isArray(response.data)) {
            // @ts-ignore
            return response.data as Skill[];
        }

        console.warn('Unexpected response structure:', response);
        return [];
    } catch (error) {
        console.error('Failed to load skills.json', error);
        return [];
    }
};

export const skillsService = {
  // --- 读取类 API (核心功能：基于静态 JSON 文件) ---

  findAll: async (): Promise<Skill[]> => {
    return fetchSkills();
  },

  findOne: async (id: string): Promise<Skill> => {
    const skills = await fetchSkills();
    const skill = skills.find(s => s.id === id);
    if (!skill) throw new Error('Skill not found');
    return skill;
  },

  findByUser: async (userId: string): Promise<Skill[]> => {
    const skills = await fetchSkills();
    // 模拟根据用户ID筛选：匹配 user.id 或 author 字段
    return skills.filter(s => s.user?.id === userId || s.author === userId);
  },

  findAllAdmin: async (status?: string): Promise<Skill[]> => {
    const skills = await fetchSkills();
    if (status && status !== 'all') {
      return skills.filter(s => s.status === status);
    }
    return skills;
  },

  // --- 写入类 API (静态模式下不支持) ---
  // 保留以下方法存根以兼容前端组件调用，防止编译错误。

  uploadFile: async (file: File): Promise<Attachment> => {
    console.debug('Static mode: uploadFile called', file);
    return Promise.reject(new Error('Static mode: Upload not supported'));
  },

  create: async (data: CreateSkillRequest): Promise<Skill> => {
    console.debug('Static mode: create called', data);
    return Promise.reject(new Error('Static mode: Create not supported'));
  },

  update: async (id: string, data: Partial<CreateSkillRequest>): Promise<Skill> => {
    console.debug('Static mode: update called', id, data);
    return Promise.reject(new Error('Static mode: Update not supported'));
  },

  remove: async (id: string): Promise<void> => {
    console.debug('Static mode: remove called', id);
    return Promise.reject(new Error('Static mode: Delete not supported'));
  },

  hardDelete: async (id: string): Promise<void> => {
    console.debug('Static mode: hardDelete called', id);
    return Promise.reject(new Error('Static mode: Hard delete not supported'));
  },

  getCleanupStats: async (): Promise<{ count: number; size: number }> => {
    return Promise.resolve({ count: 0, size: 0 });
  },

  cleanupOrphans: async (): Promise<{ deletedCount: number; deletedSize: number }> => {
    return Promise.resolve({ deletedCount: 0, deletedSize: 0 });
  },

  addComment: async (id: string, content: string): Promise<Comment> => {
    console.debug('Static mode: addComment called', id, content);
    return Promise.reject(new Error('Static mode: Comments not supported'));
  },

  updateStatus: async (id: string, status: 'approved' | 'rejected'): Promise<Skill> => {
    console.debug('Static mode: updateStatus called', id, status);
    return Promise.reject(new Error('Static mode: Update status not supported'));
  },

  addRating: async (id: string, value: number): Promise<Rating> => {
    console.debug('Static mode: addRating called', id, value);
    return Promise.reject(new Error('Static mode: Rating not supported'));
  }
};
