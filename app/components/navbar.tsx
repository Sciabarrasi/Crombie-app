import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-[#461220] text-[#FED0BB] px-6 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Título a la izquierda */}
                <div className="text-lg font-bold">
                    <Link href="/" className="hover:text-[#FCB9B2]">
                        Gestor
                    </Link>
                </div>

                {/* Items del lado derecho */}
                <div className="flex space-x-6">
                    <Link href="/about" className="hover:text-[#FCB9B2]">
                        About
                    </Link>
                    <Link href="/signup" className="hover:text-[#FCB9B2]">
                        Registrarse
                    </Link>
                    <Link href="/login" className="hover:text-[#FCB9B2]">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        </nav>
    );
}