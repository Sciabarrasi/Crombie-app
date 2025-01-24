"use client"

//import { useLoginForm } from 'app/hooks/useLoginForm';
//import AuthForm from './AuthForm';
//import { useRouter } from 'next/navigation';
//import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useState } from 'react';
import Image from 'next/image'
import { signIn } from 'next-auth/react';
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Mail, Lock } from "lucide-react";

//MODIFICAR LOS ESTILOS

export default function LoginForm () {
    //const { email, password, error, loading, setEmail, setPassword, handleSubmit } = useLoginForm();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { email: "", password: "" }
    });
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        setAuthError('');
        setIsLoading(true);
    
        try {
        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        });
      
        if (!res?.ok) {
            setAuthError('Usuario o contraseña incorrectos');
            setIsLoading(false);
        } else {
        // Esperar un poco menos y verificar la sesión antes de redirigir
            await new Promise(resolve => setTimeout(resolve, 500));
            window.location.href = '/dashboard';  // Usar redirección del navegador en lugar de router.push
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
        setAuthError('Ocurrió un error al iniciar sesión');
        setIsLoading(false);
        }
    });

    const errorVariants = {
        initial: { opacity: 0, y: -10, height: 0 },
        animate: { opacity: 1, y: 0, height: 'auto' },
        exit: { opacity: 0, y: -10, height: 0 }
      };
    
      const loadingVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.3 }
        },
        exit: { 
          opacity: 0,
          scale: 0.8,
          transition: { duration: 0.2 }
        }
      };
    
      const pulseVariants = {
        initial: { scale: 1 },
        animate: {
          scale: [1, 1.2, 1],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      };

      return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-custom-background">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-[#8C2F39] shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-[#B23A48] shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
    
                    <div className="relative w-full rounded-3xl px-6 py-4 bg-[#FCB9B2] shadow-md">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loading"
                                    variants={loadingVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="w-full max-w-md h-[400px] rounded-2xl bg-[#8C2F39] shadow-2xl flex flex-col items-center justify-center space-y-6"
                                >
                                    <motion.div
                                        variants={pulseVariants}
                                        initial="initial"
                                        animate="animate"
                                        className="bg-gradient-to-r from-pink-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="w-16 h-16 rounded-full border-4 border-white border-t-transparent"
                                        />
                                    </motion.div>
                                    <p className="text-xl font-medium text-white">Iniciando sesión...</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full max-w-md overflow-hidden rounded-2xl bg-[#FCB9B2] shadow-2xl"
                                >
                                    <form onSubmit={onSubmit} className="p-6 space-y-6">
                                        <div className="text-center">
                                            <Image 
                                                src="/logo 5.png" 
                                                alt="Profile" 
                                                width={100} 
                                                height={100} 
                                                className="mx-auto rounded-full mb-4"
                                            />
                                            <h1 className="text-3xl font-bold text-[#461220]">
                                                Iniciar Sesión
                                            </h1>
                                        </div>
    
                                        <AnimatePresence>
                                            {authError && (
                                                <motion.div
                                                    variants={errorVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center gap-2"
                                                >
                                                    <AlertCircle className="text-red-500 w-5 h-5" />
                                                    <span className="text-red-500">{authError}</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
    
                                        <Controller 
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: {
                                                    message: "El email es requerido",
                                                    value: true
                                                }
                                            }}
                                            render={({ field }) => (
                                                <div className="space-y-1">
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input 
                                                            type="email"
                                                            placeholder="email@domain.com"
                                                            className={`w-full bg-[#FCB9B2] text-[#461220] p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                                                errors.email ? 'ring-2 ring-red-500/50' : 'focus:ring-pink-500/50'
                                                            }`}
                                                            {...field}
                                                        />
                                                    </div>
                                                    <AnimatePresence>
                                                        {errors.email && (
                                                            <motion.div
                                                                variants={errorVariants}
                                                                initial="initial"
                                                                animate="animate"
                                                                exit="exit"
                                                                className="flex items-center gap-1 px-1"
                                                            >
                                                                <AlertCircle className="text-red-500 w-4 h-4" />
                                                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}
                                        />
    
                                        <Controller 
                                            name="password"
                                            control={control}
                                            rules={{
                                                required: {
                                                    message: "La contraseña es requerida",
                                                    value: true
                                                },
                                                minLength: {
                                                    value: 8,
                                                    message: "La contraseña debe tener al menos 8 caracteres",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <div className="space-y-1">
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input 
                                                            type="password"
                                                            placeholder="Contraseña"
                                                            className={`w-full bg-[#FCB9B2] text-[#461220] p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                                                errors.password ? 'ring-2 ring-red-500/50' : 'focus:ring-pink-500/50'
                                                            }`}
                                                            {...field}
                                                        />
                                                    </div>
                                                    <AnimatePresence>
                                                        {errors.password && (
                                                            <motion.div
                                                                variants={errorVariants}
                                                                initial="initial"
                                                                animate="animate"
                                                                exit="exit"
                                                                className="flex items-center gap-1 px-1"
                                                            >
                                                                <AlertCircle className="text-red-500 w-4 h-4" />
                                                                <span className="text-red-500 text-sm">{errors.password.message}</span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}
                                        />
    
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            className="w-full bg-[#8C2F39] text-white py-3 rounded-xl shadow-lg hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                                        >
                                            Entrar
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};
