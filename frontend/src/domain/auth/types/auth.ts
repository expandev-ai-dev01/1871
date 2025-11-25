import { z } from 'zod';
import { registerSchema } from '../validations/register';

export type RegisterFormData = z.infer<typeof registerSchema>;

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  message?: string;
}

export interface RegisterError {
  message: string;
  code: string;
  errors?: Array<{ path: string[]; message: string }>;
}
