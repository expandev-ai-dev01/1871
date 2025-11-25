import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/authService';
import type { UseRegisterOptions, UseRegisterReturn } from './types';
import type { RegisterFormData, RegisterError } from '../../types/auth';

export const useRegister = (options?: UseRegisterOptions): UseRegisterReturn => {
  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) => authService.register(data),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      const registerError: RegisterError = {
        message: error.response?.data?.message || 'Erro ao cadastrar usuário',
        code: error.response?.data?.code || 'UNKNOWN_ERROR',
        errors: error.response?.data?.errors,
      };
      options?.onError?.(registerError);
    },
  });

  return {
    register: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error
      ? {
          message: (mutation.error as any).response?.data?.message || 'Erro ao cadastrar usuário',
          code: (mutation.error as any).response?.data?.code || 'UNKNOWN_ERROR',
          errors: (mutation.error as any).response?.data?.errors,
        }
      : null,
    data: mutation.data || null,
  };
};
