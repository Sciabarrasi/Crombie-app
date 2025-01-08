import { NextRequest, NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try{
        const { id } = params;

        const expense = await prisma.expense.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!expense){
            return NextResponse.json({ error: 'Gasto no encontrado'}, { status: 404 });
        }
        return NextResponse.json(expense, {status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else { 
            console.error("Error desconocido", error);
            return NextResponse.json({error: "Error al hacer el fetch" }, { status: 500 });
        }
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try{
        const { id } = params;
        const { title, amount, description, date }= await request.json();

        const existingExpense = await prisma.expense.findUnique({
            where:{
                id: parseInt(id),
            },
        });

        if(!existingExpense){
            return NextResponse.json({ error: "Gasto no encontrado"}, { status: 404 });
        }

        const updatedExpense = await prisma.expense.update({
            where: { id: parseInt(id) },
            data: { title, amount, description, date },
        });
        return NextResponse.json(updatedExpense, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else { 
            console.error("Error desconocido", error);
            return NextResponse.json({ error: 'Error al actualizar el gasto'}, { status: 500 });
        }
    }
}

export async function DELETE(request: NextRequest, { params } : { params: { id: string } }) {
    try{
        const { id } = params; 

        const existExpense = await prisma.expense.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if(!existExpense) {
            return NextResponse.json({ error: 'Gasto no encontrado' }, { status: 404 });
        }
        
        await prisma.expense.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ message: 'Gasto eliminado'}, { status: 200})
    } catch (error: unknown) {
        if (error instanceof Error){
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else { 
            console.error("Error desconocido", error);
            return NextResponse.json({ error:'Error al eliminar el gasto' }, { status: 500 });
        }
    }
}