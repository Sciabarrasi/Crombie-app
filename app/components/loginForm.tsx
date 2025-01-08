"use client"

import { useLoginForm } from 'app/hooks/useLoginForm';
import Image from 'next/image'
import Link from "next/link";
import AuthForm from './AuthForm';

export default function LoginForm () {
    const { email, password, error, loading, setEmail, setPassword, handleSubmit } = useLoginForm();

    return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-custom-background">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-[#8C2F39] shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-[#B23A48] shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                        
                    <div className="relative w-full rounded-3xl px-6 py-4 bg-[#FCB9B2] shadow-md">
                        <h1 className="block mt-3 text-sm text-[#461220] text-center font-semibold">
                            Login
                        </h1>
                        
                        <AuthForm 
                            email={email}
                            password={password}
                            error={error}
                            loading={loading}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}
                        />
    
                        <div className="mt-4 text-right">
                            <Link href="/signup" className="text-[#B23A48] hover:underline">
                                Registrarse
                            </Link>
                        </div>
    
                        <div className="mt-6 text-sm text-center text-[#FCB9B2]">También puedes iniciar sesión con</div>
    
                        <div className="mt-4 flex gap-4">
                            <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-[#B23A48] border-black">
                                <Image
                                    src="https://img.icons8.com/?size=100id=17949format=png&color=000000"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                <span className="ml-2 text-sm text-[#461220]">Google</span>
                            </button>
    
                            <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-[#B23A48] border-black">
                                <Image
                                    src="https://img.icons8.com/size=100id=yGcWL8copNNQ&format=png&color=000000"
                                    alt="Facebook"
                                    width={20}
                                    height={20}
                                />
                                <span className="ml-2 text-sm text-[#461220]">Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
