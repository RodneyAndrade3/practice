import { useState } from "react";

const buttons = [
    "C", "⌫", "/", "*",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "=",
    "0", ".",
] as const;

const Calculator = () => {
    const [expression, setExpression] = useState<string>("");

    const evaluateExpression = (value: string) => {
        if (!value.trim()) {
            return "";
        }

        const result = Function(`"use strict"; return (${value});`)();

        if (typeof result !== "number" || Number.isNaN(result) || !Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        return String(result);
    };

    const handlePress = (value: string) => {
        if (value === "C") {
            setExpression("");
            return;
        }

        if (value === "⌫") {
            setExpression((currentExpression) => currentExpression.slice(0, -1));
            return;
        }

        if (value === "=") {
            try {
                setExpression((currentExpression) => evaluateExpression(currentExpression));
            } catch {
                setExpression("Error");
            }
            return;
        }

        setExpression((currentExpression) => (currentExpression === "Error" ? value : currentExpression + value));
    };

    return (
        <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-slate-900">Calculadora</h3>
            </div>

            <div className="mx-auto w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                <div className="rounded-xl border border-gray-100 bg-white px-3 py-3 text-right">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Pantalla</p>
                    <p className="mt-2 break-all text-xl font-semibold text-slate-900">
                        {expression || "0"}
                    </p>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-2">
                    {buttons.map((value) => {
                        const isPrimary = value === "=";
                        const isDanger = value === "C";
                        const isAccent = value === "⌫";

                        return (
                            <button
                                key={value}
                                className={`h-10 flex items-center justify-center rounded-xl text-base font-semibold px-2 transition hover:-translate-y-0.5 active:translate-y-0 ${
                                                                isPrimary
                                                                                ? "bg-blue-600 text-white hover:bg-blue-500"
                                                                                : isDanger
                                                                                    ? "bg-rose-500 text-white hover:bg-rose-400"
                                                                                    : isAccent
                                                                                        ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
                                                                                        : "bg-gray-100 text-slate-900 hover:bg-gray-200"
                                }`}
                                onClick={() => handlePress(value)}
                            >
                                {value}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Calculator;