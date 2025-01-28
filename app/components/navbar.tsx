"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { status } = useSession();

    return (
        <nav className="bg-[#461220] text-[#FED0BB] px-6 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/" className="hover:text-[#FCB9B2]">
                        Gestor
                    </Link>
                </div>

                <div className="flex space-x-6">
                    <Link href="/about" className="hover:text-[#FCB9B2]">
                        About
                    </Link>
                    <Link href="/dashboard" className="hover:text-[#FCB9B2]">
                        Dashboard
                    </Link>
                    {status === "authenticated" ? (
                        <button
                            onClick={() => signOut({callbackUrl: "/"})}
                            className="bg-[#FCB9B2] text-[#461220] px-2 py-1 rounded-md text-sm hover:bg-[#FED0BB] hover:text-[#8C2F39] transition duration-300"
                            
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link href="/signup" className="hover:text-[#FCB9B2]">
                            Registrarse
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}