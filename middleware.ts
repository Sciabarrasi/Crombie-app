import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Verifica si la ruta comienza con "/dashboard"
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // Si no hay token, redirige a la página de no autorizado
    if (!token) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Continúa con la siguiente respuesta si hay un token
  return NextResponse.next();
}

// Configuración del matcher para aplicar el middleware solo a rutas específicas
export const config = { matcher: ["/dashboard/:path*"] };