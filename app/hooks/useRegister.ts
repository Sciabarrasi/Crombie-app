import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const register = async (name: string, email: string, password: string) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        setError("Correo electrónico no válido");
        setLoading(false);
        return;
      }

      if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres");
        setLoading(false);
        return;
      }

      const response = await axios.post("/api/users", { name, email, password }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setSuccess("Usuario registrado exitosamente");
        router.push("/login");
      }
    } catch (err: unknown) {
      console.error("Error: ", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error desconocido");
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    success,
    loading,
    register,
  };
};