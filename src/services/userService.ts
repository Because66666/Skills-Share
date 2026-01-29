// import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  tenantId: string;
  role?: {
    id: string;
    name: string;
    description: string;
  };
  tenant?: {
    id: string;
    name: string;
    code: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersParams {
  skip?: number;
  take?: number;
  search?: string;
  roleId?: string;
}

export const userService = {
  getUsers: async (params?: GetUsersParams): Promise<User[]> => {
    console.log(params);
    // return api.get('/users', { params });
    return Promise.resolve([
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        roleId: 'admin',
        tenantId: '1',
        role: {
          id: 'admin',
          name: 'Admin',
          description: 'Administrator'
        },
        tenant: {
          id: '1',
          name: 'Default Tenant',
          code: 'default'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  getUserById: async (id: string): Promise<User> => {
    // return api.get(`/users/${id}`);
    return Promise.resolve({
      id: id,
      name: 'Admin User',
      email: 'admin@example.com',
      roleId: 'admin',
      tenantId: '1',
      role: {
        id: 'admin',
        name: 'Admin',
        description: 'Administrator'
      },
      tenant: {
        id: '1',
        name: 'Default Tenant',
        code: 'default'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  },

  createUser: async (data: Partial<User>): Promise<User> => {
    console.log(data);
    // return api.post('/users', data);
    return Promise.reject(new Error('Static mode: Create user not supported'));
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    console.log(id, data);
    // return api.patch(`/users/${id}`, data);
    return Promise.reject(new Error('Static mode: Update user not supported'));
  },

  deleteUser: async (id: string): Promise<User> => {
    console.log(id);
    // return api.delete(`/users/${id}`);
    return Promise.reject(new Error('Static mode: Delete user not supported'));
  }
};
