import { RegisterForm } from '@/domain/auth/components/RegisterForm';
import { useNavigation } from '@/core/hooks/useNavigation';

function RegisterPage() {
  const { navigate } = useNavigation();

  const handleSuccess = () => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <RegisterForm onSuccess={handleSuccess} />
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export { RegisterPage };
