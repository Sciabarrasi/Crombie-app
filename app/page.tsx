import Footer from "./components/footer";
import Navbar from "./components/navbar";
import About from "./pages/info/about";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Navbar />
        <About />
      </div>
      
      <Footer />
    </div>
  );
}
