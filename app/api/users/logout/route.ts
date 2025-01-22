import { NextResponse } from "next/server";

export async function POST() {
    try {
        return NextResponse.json(
            { message: "Logout exitoso" },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: "Hubo un error al procesar el logout" },
            { status: 500 }
        );
    }
}
