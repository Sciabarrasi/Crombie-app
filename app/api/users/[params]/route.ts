import { NextRequest, NextResponse } from "next/server";
import prisma from "lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const userId = parseInt(params.id)

    if(isNaN(userId)) {
        return NextResponse.json({ error: 'ID de usuario invalido'}, { status: 400});
    }

    try{
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if(!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch(error: unknown){
        const errorMessage = error instanceof Error ? error.message : 'Ocurrio un error';
        console.error(errorMessage);
        return NextResponse.json({ error: errorMessage}, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { name, email, password } = await request.json();
    const userId = parseInt(params.id);

    if(isNaN(userId)) {
        return NextResponse.json({ error: 'ID de usuario invalido'}, { status: 400 });
    }

    const updateData: Prisma.UserUpdateInput = {};
    if(name) updateData.name = name;
    if(email) updateData.email = email;
    if(password) updateData.password = password;

    try{
        const updateUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
        return NextResponse.json(updateUser);
    } catch (error: unknown ){
        const errorMessage = error instanceof Error ? error.message : 'Ocurrio un error';
        console.error(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });

    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string} }) {
    const userId = parseInt(params.id);

    if(isNaN(userId)){
        return NextResponse.json({error: 'ID de usuario invalido'}, { status: 400 });
    }

    try{
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        return NextResponse.json({ message: 'Usuario eliminado', user: deletedUser });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'; 
        console.error(errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}