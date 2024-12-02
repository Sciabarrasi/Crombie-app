"use client"
import { useRouter } from "next/router";

export default function UsuarioPage() {
    const router = useRouter();
    const { usuario } = router.query;

    //maneja rutas como /usuarios/john
    return(
        <div>
            <h1>Usuario: {usuario} </h1>
        </div>
    )
}