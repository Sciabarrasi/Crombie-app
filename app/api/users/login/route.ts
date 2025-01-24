import { NextRequest, NextResponse } from "next/server";
import prisma from "lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "El email y la contraseña son obligatorios" },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "El formato del email es inválido" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        const { id, name } = user;
        return NextResponse.json(
            {
                message: "Login exitoso",
                user: { id, name, email },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: "Hubo un error al procesar el login" },
            { status: 500 }
        );
    }
}
