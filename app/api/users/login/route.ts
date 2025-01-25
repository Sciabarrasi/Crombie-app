import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { config as authOptions } from "@/auth.config";
import { IncomingMessage, ServerResponse } from "http";

interface SessionWithUser {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export async function POST(request: NextRequest) {
    try {
        const cookies = request.headers.get('cookie') || '';

        console.log("cookies: ", cookies);

        const req = {
            headers: {
                cookie: cookies
            }
        } as unknown as IncomingMessage & {
            cookies: Partial<{ [key: string]: string }>
        };

        const res = {
            getHeader: () => null,
            setCookie: () => null,
            setHeader: () => null,
            removeHeader: () => null,
            writeHead: () => null,
            end: () => null
        } as unknown as ServerResponse<IncomingMessage>;

        const session = await getServerSession(req, res, authOptions) as SessionWithUser;
        console.log("session: ", session);

        if (session && session.user) {
            return NextResponse.json(
                {
                    message: "Login exitoso",
                    user: session.user, 
                },
                { status: 200 }
            );
        } else { 
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error al procesar la solicitud.", error.message);
        } else { 
            console.error("Error desconocido: ", error);
        }

        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}