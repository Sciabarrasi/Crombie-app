import React from 'react';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

const UnauthorizedPage = () => {
    return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-custom-background">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-[#8C2F39] shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-[#B23A48] shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>

                    <div className="relative w-full rounded-3xl px-6 py-4 bg-[#FCB9B2] shadow-md">
                        <div className="flex flex-col items-center">
                            <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
                            <h1 className="text-3xl font-bold text-[#461220] mb-4">
                                No Autorizado
                            </h1>
                            <p className="text-center text-[#461220] mb-4">
                                No tienes acceso a esta página. Por favor, inicia sesión para continuar.
                            </p>
                            <Link href="/login">
                                <button className="bg-[#8C2F39] w-full py-3 px-6 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-center">
                                    Ir a Iniciar Sesión
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;