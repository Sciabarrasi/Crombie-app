import Footer from "./components/footer";
import About from "./info/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <About />
      </div>
      
      <Footer />
    </div>
  );
}
