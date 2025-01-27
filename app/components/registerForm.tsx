"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useRegister } from '../hooks/useRegister';

export default function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { error, success, loading, register } = useRegister();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMounted) return;
    await register(name, email, password);
  };

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-custom-background">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-[#8C2F39] shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div className="card bg-[#B23A48] shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>

          <div className="relative w-full rounded-3xl px-6 py-4 bg-[#FCB9B2] shadow-md">
            <h1 className="block mt-3 text-sm text-[#461220] text-center font-semibold">
              Registro
            </h1>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center gap-2"
                >
                  <AlertCircle className="text-red-500 w-5 h-5" />
                  <span className="text-[#FED0BB] text-center">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {success && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[#3B9F77] text-center"
                >
                  {success}
                </motion.p>
              )}
            </AnimatePresence>

            <form onSubmit={handleRegister} className="mt-10 space-y-7">
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="bg-[#8C2F39] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                >
                  {loading ? "Registrando..." : "Registrarse"}
                </motion.button>
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