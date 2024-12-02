"use client"
import { useRouter } from "next/router";

export default function CategoriaPage() {
    const router = useRouter();
    const { usuario, categoria } = router.query;

    //Maneja rutas como usuarios/john/categorias/viajes
    return(
        <div>
            <h1>Usuario: {usuario}, Categoria: {categoria}</h1>
        </div>
    )
}