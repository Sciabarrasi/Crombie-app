import Footer from "./components/footer";
import InfoPage from "./info/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <InfoPage />
      </div>
      
      <Footer />
    </div>
  );
}
