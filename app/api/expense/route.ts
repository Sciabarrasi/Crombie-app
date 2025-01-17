import prisma from "lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateExpenseData, validateExpenseId } from "lib/validation";

export async function POST(req: Request) {
    const reqBody = await req.json();
    const { name, amount } = reqBody;

    const validationError = validateExpenseData({ name, amount });
    if (validationError) {
        return new Response(JSON.stringify({ error: validationError }), { status: 400 });
    }

    try {
        const newExpense = await prisma.expense.create({
            data: {
                title: name,
                amount: parseFloat(amount as string),
            },
        });
        return new Response(JSON.stringify(newExpense), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Error en la API al crear el gasto" }), { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const expenses = await prisma.expense.findMany({
            select: {
                id: true,
                title: true,
                amount: true,
                date: true,
            },
        });
        return NextResponse.json(expenses, { status: 200 });
    } catch (error) {
        console.error("Error al obtener los gastos: ", error.message, error.stack);
        return NextResponse.json({ error: "Error al obtener los gastos" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, title, amount, description } = await req.json(); // Eliminamos userId

        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return NextResponse.json(
                { error: "El ID debe ser un número válido y mayor a 0." },
                { status: 400 }
            );
        }

        if (!title || typeof title !== "string" || title.trim() === "") {
            return NextResponse.json(
                { error: "El título es obligatorio y debe ser un texto válido." },
                { status: 400 }
            );
        }

        const updateExpense = await prisma.expense.update({
            where: { id: Number(id) },
            data: {
                title: title.trim(),
                amount: parseFloat(amount),
                description: description?.trim() || null,
            },
        });

        return NextResponse.json(updateExpense, { status: 200 });
    } catch (err: any) {
        console.error("Error al actualizar el gasto: ", err.message);
        return NextResponse.json(
            { error: "Ocurrió un error al actualizar el gasto." },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const idValidationError = validateExpenseId(id);
    if (idValidationError) {
        return NextResponse.json({ error: idValidationError }, { status: 400 });
    }

    try {
        await prisma.expense.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: "Gasto eliminado correctamente" }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el gasto: ", error.message);
        return NextResponse.json({ error: "Error al borrar el gasto." }, { status: 500 });
    }
}
