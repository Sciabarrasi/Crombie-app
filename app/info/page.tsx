import Image from "next/image";
import Link from "next/link";

export default function InfoPage () {
    return (
        <div className="font-sans bg-custom-bg2 min-h-screen flex flex-col sm:justify-center items-center">
            <div className="w-full sm:max-w-2xl p-6 bg-[#FCB9B2] rounded-3xl border border-[#E4A8A1] shadow-md">
                <h1 className="text-3xl text-[#461220] text-center font-semibold">
                    Bienvenido al Gestor de Gastos
                </h1>
                <p className="mt-4 text-[#461220] text-center">
                    Un gestor de gastos es una herramienta esencial para tener un control total sobre tus finanzas. Te ayuda a realizar un seguimiento de tus ingresos y gastos, lo que te permite tomar decisiones más informadas y lograr tus objetivos financieros. 
                    ¡Comienza hoy mismo y mejora tu salud financiera!
                </p>

                
                <div className="mt-6 flex justify-center">
                    <Image
                        src="/images/finanzas2-removebg.png"
                        alt="Gestor de Gastos"
                        width={400}
                        height={250}
                        className="rounded-xl"
                    />
                </div>

                
                <div className="mt-8 text-center">
                    <Link href="/login" className="bg-[#8C2F39] py-3 px-6 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}