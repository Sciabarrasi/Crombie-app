import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const [authError, setAuthError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setAuthError('');
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (!res?.ok) {
        setAuthError('Usuario o contraseña incorrectos');
        setIsLoading(false);
      } else {
        await new Promise(resolve => setTimeout(resolve, 500));
        router.push('/dashboard');  
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(`Ocurrió un error al iniciar sesión: ${error.message}`);
      } else {
        setAuthError('Ocurrió un error desconocido');
      }
      setIsLoading(false);
    }
  };

  return {
    authError,
    isLoading,
    login,
  };
};