"use client";

import { useState, useEffect } from "react";
import InvestmentCalculator from "./investmentCalculator";

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function StockMarket() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("AAPL");

  const API_KEY =
    process.env.MARKET_API_KEY || "cucgqppr01qri16nrhh0cucgqppr01qri16nrhhg";
  const BASE_URL = "https://finnhub.io/api/v1";

  const symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${BASE_URL}/quote?symbol=${selectedSymbol}&token=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();

        setStockData({
          symbol: selectedSymbol,
          price: data.c,
          change: data.d,
          changePercent: data.dp,
        });
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [API_KEY, selectedSymbol]);

  return (
    <>
      <div className="w-full sm:max-w-5xl p-6 bg-[#FCB9B2] shadow-md rounded-3xl">
        <h1 className="text-2xl font-semibold text-[#461220] mb-4">
          Bolsa de Valores
        </h1>
        <div className="mb-4">
          <label htmlFor="symbol" className="block text-[#461220] mb-2">
            Selecciona una acción:
          </label>
          <select
            id="symbol"
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#FCB9B2] text-[#461220] border border-[#8C2F39] focus:ring-[#8C2F39]"
          >
            {symbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p className="text-[#461220]">
            Cargando datos de la bolsa de valores...
          </p>
        ) : error ? (
          <p className="text-[#461220]">{error}</p>
        ) : (
          stockData && (
            <div className="text-[#461220]">
              <p>
                <strong>Símbolo:</strong> {stockData.symbol}
              </p>
              <p>
                <strong>Precio:</strong> ${stockData.price}
              </p>
              <p>
                <strong>Cambio:</strong> {stockData.change}
              </p>
              <p>
                <strong>Porcentaje de Cambio:</strong> {stockData.changePercent}
                %
              </p>
            </div>
          )
        )}
        <InvestmentCalculator symbols={symbols} />
      </div>
    </>
  );
}
