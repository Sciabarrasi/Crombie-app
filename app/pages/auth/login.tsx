"use client"
import { useState } from "react";

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
    return(
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    </div>
    );
}