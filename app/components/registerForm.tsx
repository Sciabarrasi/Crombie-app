"use client"
import { useState } from "react";
import Link from "next/link";

export default function SignupPage () {
    const [email, setEmail] = useState("");
    const [name, setName ] = useState("");
    const [password, setPassword ] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    

        if (!name || !email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }
    
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = storedUsers.some((user: { email: string }) => user.email === email);
    
        if (userExists) {
            setError("Ya existe un usuario registrado con este correo.");
            return;
        }
    
        
        const newUser = { name, email, password };
        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    
        alert("Usuario registrado con éxito");
    
        setName("");
        setEmail("");
        setPassword("");
        setError("");
    };
    
    return(
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
                            Registro
                        </h1>

                        {/* Mostrar error si existe */}
                        {error && <p className="text-[#FED0BB] text-center">{error}</p>}

                        <form onSubmit={handleRegister} className="mt-10">
                            {/* Campo de nombre */}
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black"
                                />
                            </div>

                            {/* Campo de correo electrónico */}
                            <div className="mt-7">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full border-none bg-[#FCB9B2] h-11 rounded-xl shadow-lg hover:bg-[#B23A48] focus:bg-[#B23A48] focus:ring-0 placeholder-black"
                                />
                            </div>

                            {/* Botón de registro */}
                            <div className="mt-7">
                                <button
                                    type="submit"
                                    className="bg-[#8C2F39] w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                    Registrarse
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
        </>
    )
}