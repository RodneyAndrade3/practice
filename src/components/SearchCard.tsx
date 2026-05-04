import { useEffect, useState } from 'react'
import Card from './Card';

type YgoCard = {
    id: number;
    name: string;
    desc: string;
    type: string;
    race: string;
    attribute?: string;
    atk?: number;
    def?: number;
    card_images: Array<{
        image_url: string;
        image_url_small: string;
    }>;
};

type ApiResponse = {
    data: YgoCard[];
};

function SearchCard() {
    const [search, setSearch] = useState<string>("")
    const [list, setList] = useState<YgoCard[]>([])
    const [selectedCard, setSelectedCard] = useState<YgoCard | null>(null)
    const [featuredCard, setFeaturedCard] = useState<YgoCard | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        let isMounted = true

        const loadCards = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0")

                if (!response.ok) {
                    throw new Error("No se pudo cargar el listado inicial")
                }

                const data = await response.json() as ApiResponse

                if (isMounted) {
                    setList(data.data)
                }
            } catch {
                if (isMounted) {
                    setError("No se pudo cargar el listado de cartas.")
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadCards()

        return () => {
            isMounted = false
        }
    }, [])

    const obtenerCarta = async (name: string) => {
        const trimmedName = name.trim()

        if (!trimmedName) {
            setFeaturedCard(null)
            setError("")
            return
        }

        try {
            setLoading(true)
            setError("")

            const response = await fetch(
                `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(trimmedName.toLowerCase())}`,
            )

            if (!response.ok) {
                throw new Error("Carta no encontrada")
            }

            const data = await response.json() as ApiResponse
            setFeaturedCard(data.data[0] ?? null)
        } catch {
            setFeaturedCard(null)
            setError("Carta no encontrada.")
        } finally {
            setLoading(false)
        }
    }

    if (selectedCard) {
        return (
            <div className="flex flex-col gap-5">
                <button
                    className="w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5"
                    onClick={() => setSelectedCard(null)}
                >
                    Volver
                </button>

                <div className="grid gap-5 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm lg:grid-cols-[320px_1fr]">
                    <img
                        src={selectedCard.card_images[0].image_url}
                        alt={selectedCard.name}
                        className="w-full rounded-3xl object-cover shadow-sm"
                    />

                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                                Vista detallada
                            </p>
                            <h3 className="mt-2 text-3xl font-semibold text-slate-900">{selectedCard.name}</h3>
                        </div>

                        <p className="rounded-2xl border border-gray-200 bg-white p-4 text-sm leading-6 text-slate-700">
                            {selectedCard.desc}
                        </p>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Tipo</p>
                                <p className="mt-2 text-slate-900">{selectedCard.type}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Raza</p>
                                <p className="mt-2 text-slate-900">{selectedCard.race}</p>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Atributo</p>
                                <p className="mt-2 text-slate-900">{selectedCard.attribute || "Spell/Trap"}</p>
                            </div>
                            {selectedCard.atk !== undefined && (
                                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">ATK / DEF</p>
                                    <p className="mt-2 text-slate-900">
                                        {selectedCard.atk}/{selectedCard.def}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-white">Buscador de cartas</h3>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <input
                    className="flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                    type="text"
                    placeholder="Buscar carta por nombre"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(e.target.value)
                        setFeaturedCard(null)
                        setError("")
                    }}
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 active:translate-y-0"
                        onClick={() => { void obtenerCarta(search) }}
                    >
                        Buscar
                    </button>
                    <button
                        className="rounded-2xl border border-amber-200 bg-amber-100 px-5 py-3 font-semibold text-slate-900 transition hover:bg-amber-200 active:translate-y-0"
                        onClick={() => {
                            setSearch("")
                            setFeaturedCard(null)
                            setError("")
                        }}
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            {error && (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                    Cargando cartas...
                </div>
            ) : featuredCard ? (
                <div className="grid gap-4">
                    <h4 className="text-lg font-semibold text-white">Resultado de tu búsqueda</h4>
                    <Card
                        nombre={featuredCard.name}
                        imagen={featuredCard.card_images[0].image_url_small}
                        id={featuredCard.id}
                        attribute={featuredCard.attribute || "Spell/Trap"}
                        onClick={() => setSelectedCard(featuredCard)}
                    />
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {list.map((carta) => (
                        <Card
                            key={carta.id}
                            nombre={carta.name}
                            imagen={carta.card_images[0].image_url_small}
                            id={carta.id}
                            attribute={carta.attribute || "Spell/Trap"}
                            onClick={() => setSelectedCard(carta)}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default SearchCard;