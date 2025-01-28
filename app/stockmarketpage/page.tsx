import StockMarket from "../components/stockMarket";

export default function StockMarketPage() {
  return (
    <div className="min-h-screen bg-[#F1B5A5] py-6">
      <div className="container mx-auto flex justify-center items-start">
        <StockMarket />
      </div>
    </div>
  );
}