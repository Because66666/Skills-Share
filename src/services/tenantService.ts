import api from './api';

export interface Tenant {
  id: string;
  name: string;
  code: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const tenantService = {
  getTenants: async (params?: any) => {
    return api.get<any, Tenant[]>('/tenants', { params });
  },
  
  createTenant: async (data: any) => {
    return api.post<any, Tenant>('/tenants', data);
  },

  updateTenant: async (id: string, data: any) => {
    return api.patch<any, Tenant>(`/tenants/${id}`, data);
  },

  deleteTenant: async (id: string) => {
    return api.delete<any, Tenant>(`/tenants/${id}`);
  }
};
