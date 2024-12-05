"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

///rehacer el login teniendo en cuenta los cambios del register
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if( storedUser.email === email && storedUser.password === password){
            alert("Sesión iniciada con éxito");
        }else{
            setError("Nombre de usuario inexistente.")
        }

        setEmail("");
        setPassword("");
    }
    
    
    return (
        <>
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-custom-background">
                <div className="relative sm:max-w-sm w-full">
                    {/* Tarjetas de fondo con transformaciones */}
                    <div className="card bg-[#8C2F39] shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-[#B23A48] shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
              
                    {/* Contenedor del formulario con nuevo color de fondo */}
                    <div className="relative w-full rounded-3xl px-6 py-4 bg-[#FCB9B2] shadow-md">
                        <h1 className="block mt-3 text-sm text-[#461220] text-center font-semibold">
                            Login
                        </h1>
                
                        {/* Mostrar error si existe */}
                        {error && <p className="text-[#FED0BB] text-center">{error}</p>}
                
                        <form onSubmit={handleSubmit} className="mt-10">
                            {/* Campo de correo electrónico */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-    [#B23A48] focus:ring-0 placeholder-black"
                                />
                            </div>
                      
                            {/* Campo de contraseña */}
                            <div className="mt-7">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-    [#B23A48] focus:ring-0 placeholder-black"
                                />
                            </div>
                      
                            {/* Botón de login */}
                            <div className="mt-7">
                                <button
                                    type="submit"
                                    className="bg-[#8C2F39] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none   transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                    Login
                                </button>
                            </div>

                            <div className="mt-4 text-right">
                                <Link href="/signup" className="text-[#B23A48] hover:underline">
                                    Registrarse
                                </Link>
                            </div>

                            {/* Alternativas de sesion */}
                            <div className="mt-6 text-sm text-center text-[#FCB9B2]">También puedes iniciar sesión con</div>

                            <div className="mt-4 flex gap-4">
                                <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-[#B23A48] border-black">
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                                        alt="Google"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="ml-2 text-sm text-[#461220]">Google</span>
                                </button>

                                <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-[#B23A48] border-black">
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=yGcWL8copNNQ&format=png&color=000000"
                                        alt="Facebook"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="ml-2 text-sm text-[#461220]">Facebook</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}