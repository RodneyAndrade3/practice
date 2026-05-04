import { useState } from "react";
import Calculator from "./components/Calculator";
import SearchCard from "./components/SearchCard";
import Sum from "./components/Sum";

type View = "menu" | "sum" | "calculator" | "search";

type ModuleConfig = {
  id: Exclude<View, "menu">;
  title: string;
  description: string;
  badge: string;
};

const modules: ModuleConfig[] = [
  {
    id: "sum",
    title: "Ejercicio de suma",
    description: "Dos campos numéricos y un resultado visible sin salir de la pantalla.",
    badge: "Matemática básica",
  },
  {
    id: "calculator",
    title: "Calculadora",
    description: "Teclado funcional con evaluación de expresiones y limpieza rápida.",
    badge: "Interacción directa",
  },
  {
    id: "search",
    title: "Buscador de cartas",
    description: "Consulta cartas, abre el detalle y explora el listado inicial.",
    badge: "API + detalle",
  },
];

function App() {
  const [view, setView] = useState<View>("menu");

  

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          {/* Header removed per request: show only exercises/menu */}

          <main className="mt-6 flex flex-1 flex-col gap-6">
            {view === "menu" ? (
              <section className="flex min-h-[40vh] flex-col items-center justify-center gap-6">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    className="w-64 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-center shadow-sm transition hover:-translate-y-0.5"
                    onClick={() => setView(module.id)}
                  >
                    <div className="text-sm font-semibold text-slate-700">{module.title}</div>
                  </button>
                ))}
              </section>
            ) : (
              <section className="p-0">
                <div className="mb-4 flex items-center justify-start">
                  <button
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5"
                    onClick={() => setView("menu")}
                  >
                    Volver al menú
                  </button>
                </div>

                <div>
                  {view === "sum" && <Sum />}
                  {view === "calculator" && <Calculator />}
                  {view === "search" && <SearchCard />}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
