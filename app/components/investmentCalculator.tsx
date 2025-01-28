"use client";

import { useState } from "react";

interface InvestmentCalculatorProps {
  symbols: string[];
}

type GrowthPeriod = "3 months" | "6 months" | "12 months";

export default function InvestmentCalculator({ symbols }: InvestmentCalculatorProps) {
  const [investment, setInvestment] = useState<number>(0);
  const [selectedSymbol, setSelectedSymbol] = useState<string>(symbols[0]);
  const [investmentError, setInvestmentError] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key in GrowthPeriod]: number | null }>({
    "3 months": null,
    "6 months": null,
    "12 months": null,
  });

  const estimatedGrowthRates: { [key in GrowthPeriod]: number } = {
    "3 months": 0.05,  // 5%
    "6 months": 0.10,  // 10%
    "12 months": 0.20, // 20% 
  };

  const handleCalculate = () => {
    if (investment <= 0) {
      setInvestmentError("El monto de inversión debe ser mayor a 0.");
      return;
    }
    setInvestmentError(null);

    const newResults = (Object.keys(estimatedGrowthRates) as GrowthPeriod[]).reduce((acc, period) => {
      const growthRate = estimatedGrowthRates[period];
      acc[period] = investment + (investment * growthRate);
      return acc;
    }, {} as { [key in GrowthPeriod]: number });

    setResults(newResults);
  };

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInvestment(Number(value));
    }
  };

  return (
    <div className="bg-[#FCB9B2] p-6 rounded-3xl shadow-md">
      <h2 className="text-xl font-semibold text-[#461220] mb-4">Calculadora de Inversiones</h2>
      <div className="mb-4">
        <label htmlFor="investment" className="block text-[#461220] mb-2">Monto para Invertir:</label>
        <input
          type="text"
          id="investment"
          value={investment}
          onChange={handleInvestmentChange}
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-full p-3 rounded-xl bg-[#FFF1F0] text-[#461220] border border-[#8C2F39] focus:ring-[#8C2F39]"
        />
        {investmentError && <p className="text-red-600 text-sm mt-2">{investmentError}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="symbol" className="block text-[#461220] mb-2">Selecciona una Acción:</label>
        <select
          id="symbol"
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#FFF1F0] text-[#461220] border border-[#8C2F39] focus:ring-[#8C2F39]"
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleCalculate}
        className="w-full py-3 bg-[#8C2F39] text-white rounded-xl shadow-lg hover:shadow-inner"
      >
        Calcular Ganancias
      </button>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-[#461220] mb-4">Resultados:</h3>
        <div className="text-[#461220]">
          {Object.keys(results).map((period) => (
            <p key={period}>
              <strong>{period}:</strong> {results[period as GrowthPeriod] !== null ? `$${results[period as GrowthPeriod]?.toFixed(2)}` : "N/A"}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}