import type { RegisterFormData, RegisterResponse, RegisterError } from '../../types/auth';

export interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: RegisterError) => void;
}

export interface UseRegisterReturn {
  register: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: RegisterError | null;
  data: RegisterResponse | null;
}
