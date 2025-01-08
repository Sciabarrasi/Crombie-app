import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/users/login";

export function useLoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error en la autenticacion");
            }

            console.log("Login exitoso");
            router.push("/dashboard");
        } catch (err) {
            let errorMessage = "Error desconocido";

            if (err instanceof AxiosError){
                errorMessage = err.response?.data?.message || err.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage)
        } finally {
            setLoading(false);
        }
    };

    return { email, password, error, loading, setEmail, setPassword, handleSubmit };
}