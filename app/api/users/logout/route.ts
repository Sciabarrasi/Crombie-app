import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            { message: "Logout exitoso" },
            { status: 200 }
        );

        response.cookies.set("next-auth.session-token", "", { expires: new Date(0) });
        response.cookies.set("next-auth.csrf-token", "", { expires: new Date(0) });

        return response;
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: "Hubo un error al procesar el logout" },
            { status: 500 }
        );
    }
}