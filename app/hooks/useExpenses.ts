import { useState, useCallback } from "react";
import axios from "axios";
import { Expense } from "@prisma/client";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = 1; // Replace this with the actual userId from your authentication logic

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/expense", {
        headers: {
          userId: userId.toString(),
        },
      });
      setExpenses(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error al obtener los gastos: ", err.message);
        setError("Ocurrió un error al obtener los gastos.");
      } else {
        console.error("Error desconocido al obtener los gastos: ", err);
        setError("Error desconocido al obtener los gastos.");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addExpense = useCallback(async (newExpense: Partial<Expense>) => {
    if (!newExpense.title || !newExpense.amount || isNaN(Number(newExpense.amount))) {
      setError("El título y el monto son requeridos y el monto debe ser válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const expenseData = {
        name: newExpense.title,
        amount: Number(newExpense.amount),
        description: newExpense.description || "",
        userId,
      };

      const response = await axios.post("/api/expense", expenseData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setExpenses((prev) => [...prev, response.data]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error al agregar el gasto: ", err.message);
        setError("Ocurrió un error al agregar el gasto.");
      } else {
        console.error("Error desconocido al agregar el gasto: ", err);
        setError("Error desconocido al agregar el gasto.");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateExpense = useCallback(async (id: number, updateData: Partial<Expense>) => {
    if (!id || !updateData.title || !updateData.amount || isNaN(Number(updateData.amount))) {
      setError("El ID, título y monto son requeridos para actualizar un gasto y el monto debe ser válido.");
      return;
    }

    setLoading(true);
    setError(null);

    const sanitizedUpdateExpense = {
      id,
      title: updateData.title.trim(),
      amount: Number(updateData.amount),
      description: updateData.description?.trim() || null,
      userId,
    };

    try {
      const response = await axios.put(`/api/expense`, sanitizedUpdateExpense, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setExpenses((prev) =>
          prev.map((expense) =>
            expense.id === id
              ? {
                  ...expense,
                  title: response.data.title,
                  amount: response.data.amount,
                  description: response.data.description,
                }
              : expense
          )
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error al actualizar el gasto: ", err.message);
        setError("Ocurrió un error al actualizar el gasto.");
      } else {
        console.error("Error desconocido al actualizar el gasto: ", err);
        setError("Error desconocido al actualizar el gasto.");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const deleteExpense = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`/api/expense`, {
        headers: {
          "Content-Type": "application/json",
          "userId": userId.toString(),
        },
        data: { id, userId },
      });

      if (response.status === 200) {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      } else {
        setError("Error al eliminar el gasto.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error al eliminar el gasto: ", err.message);
        setError("Ocurrió un error al eliminar el gasto.");
      } else {
        console.error("Error desconocido al eliminar el gasto: ", err);
        setError("Error desconocido al eliminar el gasto.");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};