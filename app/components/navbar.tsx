"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function NavBar() {
  const { status } = useSession();

  return (
    <nav className="bg-[#461220] text-[#FED0BB] px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/" className="hover:text-[#FCB9B2]">
            Gestor
          </Link>
        </div>

        <div className="flex space-x-6 items-center">
          <Link href="/about" className="hover:text-[#FCB9B2]">
            Info
          </Link>
          <Link href="/dashboard" className="hover:text-[#FCB9B2]">
            Panel de Usuario
          </Link>
          <Link href="/stockmarketpage" className="hover:text-[#FCB9B2]">
            Bolsa de Valores
          </Link>
          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-[#FCB9B2] text-[#461220] px-3 py-2 rounded-md text-sm hover:bg-[#FED0BB] hover:text-[#8C2F39] transition duration-300 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
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