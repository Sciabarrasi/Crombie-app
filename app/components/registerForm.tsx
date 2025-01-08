"use client"

import React, { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import Link from 'next/link';

export default function RegisterForm () {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true)

        if (!isMounted) return;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setError("Correo electrónico no válido");
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        try {
            const response = await axios.post("/api/users", { name, email, password }, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                setSuccess("Usuario registrado exitosamente");
                setName("");
                setEmail("");
                setPassword("");
                router.push("/login");
            }
        } catch (err: unknown) {
            console.error("Error: ", err);
            if (axios.isAxiosError(err)){
                setError(err.response?.data?.error || "Error desconocido");
            } else { 
                setError("Error desconocido");
            }
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-custom-background">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-[#8C2F39] shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-[#B23A48] shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>

                    <div className="relative w-full rounded-3xl px-6 py-4 bg-[#FCB9B2] shadow-md">
                        <h1 className="block mt-3 text-sm text-[#461220] text-center font-semibold">
                            Registro
                        </h1>

                        {error && <p className="text-[#FED0BB] text-center">{error}</p>}
                        {success && <p className="text-[#3B9F77] text-center">{success}</p>}

                        <form onSubmit={handleRegister} className="mt-10">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black"
                                    required
                                />
                            </div>

                            <div className="mt-7">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black"
                                    required
                                />
                            </div>

                            <div className="mt-7">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black"
                                    required
                                />
                            </div>

                            <div className="mt-7">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#8C2F39] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                                >
                                    {loading ? "Registrando..." : "Registrarse" }
                                </button>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href="/login" className="text-[#B23A48] hover:underline">
                                    ¿Ya tienes cuenta? Inicia sesión
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}