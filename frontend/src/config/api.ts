export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    refresh: `${API_BASE_URL}/api/auth/refresh`,
  },
  users: {
    profile: `${API_BASE_URL}/api/users/profile`,
    update: `${API_BASE_URL}/api/users/update`,
  },
  groups: {
    list: `${API_BASE_URL}/api/groups`,
    create: `${API_BASE_URL}/api/groups`,
    detail: (id: string) => `${API_BASE_URL}/api/groups/${id}`,
    update: (id: string) => `${API_BASE_URL}/api/groups/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/groups/${id}`,
  },
  expenses: {
    list: `${API_BASE_URL}/api/expenses`,
    create: `${API_BASE_URL}/api/expenses`,
    detail: (id: string) => `${API_BASE_URL}/api/expenses/${id}`,
    update: (id: string) => `${API_BASE_URL}/api/expenses/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/expenses/${id}`,
  },
};
