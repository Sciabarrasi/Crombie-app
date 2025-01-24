import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { config as authOptions } from "@/auth.config";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { IncomingMessage, ServerResponse } from "http";

async function getSession(request: NextRequest) {
    const cookies = request.headers.get('cookie') || '';
    const req = {
        headers: { cookie: cookies }
    } as unknown as IncomingMessage & { cookies: Partial<{ [key: string]: string }> };

    const res = {
        getHeader: () => null,
        setCookie: () => null,
        setHeader: () => null,
        removeHeader: () => null,
        writeHead: () => null,
        end: () => null
    } as unknown as ServerResponse<IncomingMessage>;

    return await getServerSession(req, res, authOptions);
}

export async function GET(request: NextRequest) {
    try {
        const session = await getSession(request);
        if (!session) {
            return NextResponse.json({ error: "No autenticado." }, { status: 401 });
        }

        const url = new URL(request.url);
        const userId = url.searchParams.get("id");

        if (userId) {
            const parsedUserId = Number(userId);
            if (isNaN(parsedUserId)) {
                return NextResponse.json({ error: "El ID proporcionado no es válido." }, { status: 400 });
            }

            const user = await prisma.user.findUnique({
                where: { id: parsedUserId },
            });

            if (!user) {
                return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
            }

            return NextResponse.json(user, { status: 200 });
        } else {
            const users = await prisma.user.findMany({
                select: { id: true, name: true, email: true },
            });
            return NextResponse.json(users, { status: 200 });
        }
    } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
        return NextResponse.json({ error: "Hubo un error al obtener los usuarios" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "El email ya está registrado." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error al crear el usuario: ", error);
        return NextResponse.json({ error: "Hubo un error al crear el usuario" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getSession(request);
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: "No autenticado." }, { status: 401 });
        }

        const { id, name, email, password } = await request.json();

        const parsedId = Number(id);
        if (isNaN(parsedId) || !name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        if (session.user.id !== id) {
            return NextResponse.json({ error: "No autorizado para actualizar este usuario." }, { status: 403 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: parsedId },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: { id: parsedId },
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar el usuario: ", error);
        return NextResponse.json({ error: "Hubo un error al actualizar el usuario." }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession(request);
        if (!session) {
            return NextResponse.json({ error: "No autenticado." }, { status: 401 });
        }

        const { id } = await request.json();

        const parsedId = Number(id);
        if (isNaN(parsedId)) {
            return NextResponse.json({ error: "Se requiere un ID válido para eliminar el usuario." }, { status: 400 });
        }

        if (session.user.id !== id) {
            return NextResponse.json({ error: "No autorizado para eliminar este usuario." }, { status: 403 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: parsedId },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        await prisma.user.delete({
            where: { id: parsedId },
        });

        return NextResponse.json({ message: "Usuario eliminado con éxito." }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el usuario: ", error);
        return NextResponse.json({ error: "Hubo un error al eliminar el usuario." }, { status: 500 });
    }
}