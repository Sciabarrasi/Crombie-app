import { NextRequest, NextResponse } from "next/server";
import prisma from "lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

type RouteContext = {
    params: Promise<{ params: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
    const { params } = await context.params;

    if (isNaN(Number(params))) {
        return NextResponse.json(
            { error: "ID de usuario inválido" },
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(params) },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Usuario no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al obtener el usuario" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, context: RouteContext) {
    const { params } = await context.params;

    if (isNaN(Number(params))) {
        return NextResponse.json(
            { error: "ID de usuario inválido" },
            { status: 400 }
        );
    }

    try {
        const { name, email, password } = await request.json();

        if (!name && !email && !password) {
            return NextResponse.json(
                { error: "Debe proporcionar al menos un campo para actualizar" },
                { status: 400 }
            );
        }

        const updateData: Prisma.UserUpdateInput = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(params) },
            data: updateData,
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al actualizar el usuario" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
    const { params } = await context.params;

    if (isNaN(Number(params))) {
        return NextResponse.json(
            { error: "ID de usuario inválido" },
            { status: 400 }
        );
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: Number(params) },
        });

        return NextResponse.json(
            { message: "Usuario eliminado con éxito", user: deletedUser },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al eliminar el usuario" },
            { status: 500 }
        );
    }
}
