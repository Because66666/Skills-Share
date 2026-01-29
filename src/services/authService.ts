// import api from './api';

export interface LoginRequest {
  email?: string;
  username?: string; // Support both for flexibility, though backend uses email
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    // Backend expects 'email', map username to email if needed or just pass as is
    // const payload = {
    //   email: data.email || data.username,
    //   password: data.password,
    // };
    // return api.post('/auth/login', payload);
    
    // Mock login for static export
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          access_token: 'mock-token-static',
          user: {
            id: '1',
            email: data.email || data.username || 'admin@example.com',
            name: 'Admin User',
            role: 'admin'
          }
        });
      }, 500);
    });
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    // return api.post('/auth/register', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          access_token: 'mock-token-static',
          user: {
            id: '1',
            email: data.email,
            name: data.name,
            role: 'user'
          }
        });
      }, 500);
    });
  },

  getProfile: async () => {
    // return api.get('/auth/profile');
    return Promise.resolve({
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin'
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};
