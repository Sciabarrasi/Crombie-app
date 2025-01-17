"use client";

import React, { useState } from "react";
import { Expense } from "@prisma/client";

interface ExpenseEditorProps { 
  expense: Expense;
  onSave: (id: number, updateData: Partial<Expense>) => Promise<void>;
  onCancel: () => void;
}

const ExpenseEditor: React.FC<ExpenseEditorProps> = ({
  expense,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [description, setDescription] = useState(expense.description || "");
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!title.trim() || isNaN(amount) || amount <= 0) {
      setError("Todos los campos son obligatorios y el monto debe ser mayor a 0.");
      return;
    }

    onSave(expense.id, { title, amount, description });
    setError(null);

    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-4 bg-[#FCB9B2] rounded-xl shadow-md w-full sm:w-[500px]">
        <h2 className="text-lg font-semibold text-[#461220] mb-4">Editar Gasto</h2>
  
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm text-[#461220] mb-1">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              className="w-full p-2 rounded bg-white text-[#461220] border border-[#8C2F39] focus:ring-2 focus:ring-[#8C2F39] outline-none"
            />
          </div>
  
          <div>
            <label htmlFor="amount" className="block text-sm text-[#461220] mb-1">
              Monto
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="Monto"
              className="w-full p-2 rounded bg-white text-[#461220] border border-[#8C2F39] focus:ring-2 focus:ring-[#8C2F39] outline-none"
            />
          </div>
  
          <div>
            <label
              htmlFor="description"
              className="block text-sm text-[#461220] mb-1"
            >
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
              className="w-full p-2 rounded bg-white text-[#461220] border border-[#8C2F39] focus:ring-2 focus:ring-[#8C2F39] outline-none"
            />
          </div>
  
          {error && <p className="text-red-600 text-sm">{error}</p>}
  
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#8C2F39] text-white rounded-md hover:bg-[#6B1F2C] transition"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default ExpenseEditor;