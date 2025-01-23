interface ExpenseData {
    name: string;
    amount: number | string;
}

export function validateExpenseData(data: ExpenseData): string | null {
    if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
        return "El nombre es obligatorio y debe ser un string válido.";
    }
    if (isNaN(Number(data.amount)) || parseFloat(data.amount as string) < 0) {
        return "El monto debe ser un número válido o igual a 0.";
    }
    return null;
}

export function validateExpenseId(id: number | string): string | null {
    if (!id || isNaN(Number(id))) {
        return "El ID proporcionado no es válido.";
    }
    return null;
}
