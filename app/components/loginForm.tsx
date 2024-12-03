"use client"
import { useState } from "react";
import '../globals.css'
import Image from "next/image";

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
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
                <div className="relative sm:max-w-sm w-full">
                {/* Tarjetas de fondo con transformaciones */}
                <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
              
                {/* Contenedor del formulario */}
                <div className="relative w-full rounded-3xl px-6 py-4 bg-white shadow-md">
                    <h1 className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                    Login
                    </h1>
                
                    {/* Mostrar error si existe */}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit} className="mt-10">
                    {/* Campo de correo electrónico */}
                    <div>
                        <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100    focus:ring-0"
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
                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100    focus:ring-0"
                        />
                    </div>
                  
                    {/* Botón de login */}
                    <div className="mt-7">
                        <button
                        type="submit"
                        className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition   duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                        >
                        Login
                        </button>
                    </div>

                    {/* Alternativa */}
                    <div className="mt-6 text-sm text-center text-gray-600">Or continue with</div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-100">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Google__G__Logo.svg"
                            alt="Google"
                            width={20}
                            height={20}
                        />
                        <span className="ml-2 text-sm">Google</span>
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