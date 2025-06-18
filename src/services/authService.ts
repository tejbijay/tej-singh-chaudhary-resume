
/**
 * Authentication service for admin functionalities
 */

import { toast } from 'sonner';

// Mock admin credentials - in a real app, these would be stored securely on a backend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
  token: 'mock-jwt-token-for-admin-authentication'
};

export const authService = {
  login: (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('adminToken', ADMIN_CREDENTIALS.token);
      localStorage.setItem('adminUsername', username);
      return true;
    }
    return false;
  },
  
  logout: (): void => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    toast.success('Logged out successfully');
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem('adminToken') === ADMIN_CREDENTIALS.token;
  },
  
  getUsername: (): string => {
    return localStorage.getItem('adminUsername') || '';
  }
};

