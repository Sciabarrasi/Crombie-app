"use client";

import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#FCB9B2] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-[#461220] mb-4 text-center">
          Sobre Nuestro Gestor de Gastos
        </h1>
        <p className="text-[#461220] text-lg mb-4">
          Nuestro gestor de gastos está diseñado para ayudarte a organizar y
          controlar tus finanzas, ya sea que lo uses para tu empresa o para tus
          gastos personales. Con nuestra herramienta, podrás:
        </p>
        <ul className="list-disc pl-6 text-[#461220] mb-4">
          <li>Registrar tus ingresos y egresos de manera sencilla.</li>
          <li>Visualizar tus gastos en categorías específicas.</li>
          <li>Generar reportes claros y detallados para tomar mejores decisiones.</li>
          <li>Establecer límites y metas financieras personalizadas.</li>
        </ul>
        <p className="text-[#461220] text-lg">
          Administrar tus finanzas nunca había sido tan fácil. Nuestro objetivo
          es brindarte las herramientas necesarias para que puedas tener un
          control total de tu dinero y alcanzar tus metas financieras de manera
          eficiente y efectiva.
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-[#8C2F39] text-white rounded-md hover:bg-[#6B1F2C] transition"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
