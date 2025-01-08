import { NextRequest ,NextResponse } from "next/server";
import prisma from "lib/prisma";
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) { 
    try{
        const url = new URL(request.url);
        const userId = url.searchParams.get('id');

        if(userId){
            const user = await prisma.user.findUnique({
                where: { id: Number(userId) },
            });

            if(!user) {
                return NextResponse.json({ error: 'Usuario no encontrado'}, { status: 404 });
            }

            return NextResponse.json(user, { status: 200 });
        } else {
            const users = await prisma.user.findMany();
            return NextResponse.json(users, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Hubo un error al obtener los usuarios'}, { status: 500 });
    }
}

export async function POST(request: NextRequest) { 
    try{
        const { name, email, password } = await request.json();

        if(!name || !email || !password){
            return NextResponse.json({ error: 'Todos los campos son obligatorios'}, { status: 400 });
        }
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if(existingUser){
            return NextResponse.json({ error: 'El email ya está registrado'}, {status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { 
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Hubo un error alcrear el usuario' }, {status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try{
        const { id, name, email, password } = await req.json();

        if (!id || !name || !email || !password) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios'}, { status: 400})
        }

        const existUser = await prisma.user.findUnique({
            where: { id },
        });
        if(!existUser){
            return NextResponse.json({error: 'Usuario no encontrado'}, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Hubo un error al actualizar el usuario'}, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try{
        const { id } = await request.json();

        if(!id) {
            return NextResponse.json({ error: 'Se requiere un ID para eliminar el usuario'}, { status: 400 });
        }

        const existUser = await prisma.user.findUnique({
            where: { id },
        });

        if(!existUser){
            return NextResponse.json({ error: 'Usuario no encontrado'}, { status: 404 });
        }

        await prisma.user.delete({
            where: { id },
        });
        
        return NextResponse.json({ message: 'Usuario eliminado con éxito' }, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: 'Hubo un error al eliminar el usuario'}, { status: 500 })
    }
}