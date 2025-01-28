"use client";

import { useState, useEffect } from "react";
import { Expense } from "@prisma/client";
import ExpenseEditor from "app/components/expenseEditor";
import { useExpenses } from "app/hooks/useExpenses";
import Footer from "../components/footer";

export default function Dashboard() {
  const {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  const [newExpense, setNewExpense] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newExpense.trim() || Number(amount) <= 0 || isNaN(Number(amount))) {
      setFormError(
        "Todos los campos son requeridos y el monto debe ser mayor a 0."
      );
      return;
    }

    await addExpense({
      title: newExpense,
      amount: Number(amount),
      description,
    });

    setNewExpense("");
    setAmount("");
    setDescription("");
    setFormError(null);
  };

  const handleUpdateExpense = async (
    id: number,
    updateData: Partial<Expense>
  ) => {
    if (
      updateData.amount !== undefined &&
      (updateData.amount <= 0 || isNaN(updateData.amount))
    ) {
      setFormError("El monto debe ser mayor a 0.");
      return;
    }

    await updateExpense(id, updateData);
    setFormError(null);
    setEditingExpense(null);
  };

  const handleDeleteExpense = async (id: number) => {
    await deleteExpense(id);
  };

  return (
    <>
      <div className="min-h-screen bg-[#F1B5A5] flex justify-center items-start py-6">
        <div className="w-full sm:max-w-5xl p-6 bg-[#FCB9B2] shadow-md rounded-3xl flex gap-6">
          <div className="w-full sm:w-1/2">
            <div className="p-4 bg-[#FFF1F0] rounded-lg shadow-inner">
              <h1 className="text-center text-2xl font-semibold text-[#461220] mb-6">
                Añadir Nuevo Gasto
              </h1>
              <form onSubmit={handleAddExpense} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={newExpense}
                  onChange={(e) => setNewExpense(e.target.value)}
                  placeholder="Nuevo gasto"
                  className="w-full p-3 rounded-xl bg-[#FCB9B2] text-[#461220] border-none focus:ring-[#8C2F39]"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Monto"
                  className="w-full p-3 rounded-xl bg-[#FCB9B2] text-[#461220] border-none focus:ring-[#8C2F39]"
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción"
                  className="w-full p-3 rounded-xl bg-[#FCB9B2] text-[#461220] border-none focus:ring-[#8C2F39]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#8C2F39] rounded-xl text-white shadow-lg hover:shadow-inner"
                >
                  Agregar
                </button>
              </form>
              {formError && (
                <p className="text-red-600 text-sm mt-2">{formError}</p>
              )}
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <div className="p-4 bg-[#FFF1F0] rounded-lg shadow-inner">
              <h1 className="text-center text-2xl font-semibold text-[#461220] mb-6">
                Lista de Gastos
              </h1>
              <div>
                {loading ? (
                  <p className="text-center text-[#461220]">
                    Cargando gastos...
                  </p>
                ) : error ? (
                  <p className="text-center text-red-600">{error}</p>
                ) : (
                  <div>
                    {expenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex justify-between items-center mb-4 p-4 bg-white rounded-xl shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <input
                            type="text"
                            value={expense.title}
                            onChange={(e) =>
                              handleUpdateExpense(expense.id, {
                                title: e.target.value,
                              })
                            }
                            className="border-none bg-transparent w-full text-[#461220] focus:ring-0"
                          />
                          <input
                            type="number"
                            value={expense.amount}
                            onChange={(e) =>
                              handleUpdateExpense(expense.id, {
                                amount: parseFloat(e.target.value),
                              })
                            }
                            className="border-none bg-transparent w-full text-[#461220] focus:ring-0"
                          />
                          <input
                            type="text"
                            value={expense.description || ""}
                            onChange={(e) =>
                              handleUpdateExpense(expense.id, {
                                description: e.target.value,
                              })
                            }
                            className="border-none bg-transparent w-full text-[#461220] focus:ring-0"
                          />
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                          <button
                            onClick={() => setEditingExpense(expense)}
                            className="px-4 py-2 bg-[#8C2F39] text-white rounded-2xl shadow-md hover:bg-[#6B1F2C]"
                          >
                            Actualizar
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="px-4 py-2 bg-[#B23A48] text-white rounded-2xl shadow-md hover:bg-[#8C2F39]"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-8 flex gap-6">
                {editingExpense && (
                  <ExpenseEditor
                    expense={editingExpense}
                    onSave={handleUpdateExpense}
                    onCancel={() => setEditingExpense(null)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
