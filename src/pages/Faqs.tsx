import Header from "../components/Header";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function Faqs() {
  return (
    <div className="min-h-screen">
      <Header />

      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        role="main"
        aria-label="Preguntas frecuentes"
      >
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Faqs;
