import { publicClient } from '@/core/lib/api';
import type { RegisterFormData, RegisterResponse } from '../types/auth';

/**
 * @service Authentication Service
 * @domain auth
 * @type Public API
 */
export const authService = {
  /**
   * Register a new user account
   * @param credentials - User registration data (name, email, password)
   * @returns Promise with user data and success message
   */
  async register(credentials: RegisterFormData): Promise<RegisterResponse> {
    const { data } = await publicClient.post<{ data: RegisterResponse }>('/register', credentials);
    return data.data;
  },
};
