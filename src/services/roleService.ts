// import api from './api';

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string; // JSON string
  createdAt: string;
  updatedAt: string;
}

export const roleService = {
  getRoles: async (params?: any) => {
    console.log(params);
    // return api.get<any, Role[]>('/roles', { params });
    return Promise.resolve([
      {
        id: 'admin',
        name: 'Admin',
        description: 'Administrator',
        permissions: '[]',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'user',
        name: 'User',
        description: 'Regular User',
        permissions: '[]',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },
  
  createRole: async (data: any) => {
    console.log(data);
    // return api.post<any, Role>('/roles', data);
    return Promise.reject(new Error('Static mode: Create role not supported'));
  },

  updateRole: async (id: string, data: any) => {
    console.log(id, data);
    // return api.patch<any, Role>(`/roles/${id}`, data);
    return Promise.reject(new Error('Static mode: Update role not supported'));
  },

  deleteRole: async (id: string) => {
    console.log(id);
    // return api.delete<any, Role>(`/roles/${id}`);
    return Promise.reject(new Error('Static mode: Delete role not supported'));
  }
};
