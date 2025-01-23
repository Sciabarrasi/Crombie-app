import { useState, useCallback } from "react";
import axios from "axios";
import { Expense } from "@prisma/client";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/expense");
      setExpenses(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error al obtener los gastos: ", err.message);
      } else {
        console.error("Error desconocido al obtener los gastos: ", err);
      }
    } finally {
      setLoading(false);
    }

  }, []);

  const addExpense = useCallback(async (newExpense: Partial<Expense>) => {
    setLoading(true);
    setError(null);

    if (!newExpense.title || !newExpense.amount) {
      setError("El título y monto son requeridos.");
      setLoading(false);
      return;
    }

    try {
      const expenseData = {
        name: newExpense.title,
        amount: newExpense.amount,
      };

      const response = await axios.post("/api/expense", expenseData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setExpenses((prev) => [...prev, response.data]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error al agregar el gasto: ", err.message);
      } else {
        console.error("Error desconocido al agregar el gasto: ", err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExpense = useCallback(
    async (id: string, updateExpense: Partial<Expense>) => {
      setLoading(true);
      setError(null);
  
      if (!id || !updateExpense.title || !updateExpense.amount || isNaN(Number(updateExpense.amount))) {
        setError("El ID, título y monto son requeridos para actualizar un gasto y el monto debe ser válido.");
        setLoading(false);
        return;
      }
  
      const sanitizedUpdateExpense = {
        id,
        title: updateExpense.title.trim(),
        amount: Number(updateExpense.amount),
        description: updateExpense.description?.trim() || null,
      };
  
      try {
        const response = await axios.put(`/api/expense`, sanitizedUpdateExpense);
  
        if (response.data) {
          setExpenses((prev) =>
            prev.map((expense) =>
              Number(expense.id) === Number(id)
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
        } else {
          console.error("Error desconocido al actualizar el gasto: ", err);
        }
      } finally {
        setLoading(false);
      }
    },
    [setExpenses, setError, setLoading]
  );
  

  const deleteExpense = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/expense?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setExpenses((prev) => prev.filter((expense) => expense.id !== Number(id)));
      } else {
        const { error } = await response.json();
        setError(error || "Error al eliminar el gasto.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al eliminar el gasto.");
    } finally {
      setLoading(false);
    }
  };

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
