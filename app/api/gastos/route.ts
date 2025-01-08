import { NextRequest, NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function GET() {
    try{
        const expenses = await prisma.expense.findMany();
        return NextResponse.json(expenses, { status: 200 });
    } catch ( error: unknown ){
        if ( error instanceof Error){
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else { 
            console.error("Error desconocido: ", error);
            return NextResponse.json({ error: 'Error al obtener los gastos'}, {status: 500 });
        }
    }
}

export async function POST(request: NextRequest) { 
    try{
        const { title, amount, description, date, userId } = await request.json();
        if(!userId){
            return NextResponse.json({ error: 'ID de usuario es requerido'}, { status: 400 });
        }

        const newExpense = await prisma.expense.create({
            data: {
                title,
                amount,
                description,
                date,
                user: { connect: { id: userId } },
            },
        });

        return NextResponse.json(newExpense, { status: 201 });
    } catch ( error: unknown){ 
        if(error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({ error: error.message}, { status: 500 });
        } else { 
            console.error("Error desconocido", error);
            return NextResponse.json({ error: 'Error al crear el gasto'}, { status: 500 });
        }
    }
}