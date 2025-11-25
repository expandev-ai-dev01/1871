import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { toast } from 'sonner';
import { registerSchema } from '../../validations/register';
import { useRegister } from '../../hooks/useRegister';
import type { RegisterFormData } from '../../types/auth';
import type { RegisterFormProps } from './types';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Label } from '@/core/components/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/card';
import { Alert, AlertDescription } from '@/core/components/alert';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

function RegisterForm({ onSuccess }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const {
    register: registerUser,
    isLoading,
    isError,
    error,
  } = useRegister({
    onSuccess: (data) => {
      toast.success('Cadastro realizado com sucesso!', {
        description: `Bem-vindo, ${data.name}!`,
      });
      onSuccess?.();
    },
    onError: (error) => {
      if (error.code === 'DUPLICATE_EMAIL') {
        toast.error('Email já cadastrado', {
          description: 'Este email já está em uso. Tente fazer login ou use outro email.',
        });
      } else {
        toast.error('Erro ao cadastrar', {
          description: error.message,
        });
      }
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const sanitizedData: RegisterFormData = {
      name: DOMPurify.sanitize(data.name),
      email: DOMPurify.sanitize(data.email),
      password: data.password,
    };

    await registerUser(sanitizedData);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <UserPlus className="size-5 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
        </div>
        <CardDescription>Preencha os dados abaixo para se cadastrar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isError && error && (
            <Alert variant="destructive">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <div className="relative">
              <User className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="João Silva"
                className="pl-10"
                disabled={isLoading}
                aria-invalid={!!errors.name}
                {...register('name')}
              />
            </div>
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="joao@exemplo.com"
                className="pl-10"
                disabled={isLoading}
                aria-invalid={!!errors.email}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                className="pl-10"
                disabled={isLoading}
                aria-invalid={!!errors.password}
                {...register('password')}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner className="mr-2" />
                Cadastrando...
              </>
            ) : (
              'Criar Conta'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export { RegisterForm };
