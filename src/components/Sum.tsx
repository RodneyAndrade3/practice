import { useState } from 'react'

const Sum = () => {
    const [number1, setNumber1] = useState<string>('')
    const [number2, setNumber2] = useState<string>('')
    

    const sumar = () => {
        const left = Number(number1)
        const right = Number(number2)

        if (Number.isNaN(left) || Number.isNaN(right)) {
            alert('Ingresa dos números válidos.')
            return
        }

        alert(`Resultado: ${left + right}`)
    }

    const clean = () => {
        setNumber1('')
        setNumber2('')
    }

    return (
        <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-slate-900">Suma de dos números</h3>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
                <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-slate-700">
                    Número 1
                    <input
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                        inputMode="decimal"
                        placeholder="0"
                        value={number1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber1(e.target.value)}
                    />
                </label>

                <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-slate-700">
                    Número 2
                    <input
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                        inputMode="decimal"
                        placeholder="0"
                        value={number2}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber2(e.target.value)}
                    />
                </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <button
                    className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 active:translate-y-0"
                    onClick={sumar}
                >
                    Sumar
                </button>
                <button
                    className="inline-flex items-center justify-center rounded-2xl border border-amber-200 bg-amber-100 px-5 py-3 font-semibold text-slate-900 transition hover:bg-amber-200 active:translate-y-0"
                    onClick={clean}
                >
                    Limpiar
                </button>
            </div>

            {/* Resultado ahora mostrado mediante alert() al presionar Sumar */}
        </section>
    )
}

export default Sum;