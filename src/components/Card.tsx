interface CardProps {
    imagen: string;
    nombre: string;
    id: number;
    attribute: string;
    onClick: () => void;
}


const Card = ({ imagen, nombre, id, attribute, onClick }: CardProps) => {
    return (
        <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1">
            <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
                <div className="flex items-center justify-center bg-slate-950/60 p-4 sm:w-2/5">
                    <img
                        src={imagen}
                        alt={nombre}
                        className="aspect-[3/4] w-full max-w-[180px] rounded-2xl object-cover shadow-lg shadow-black/30"
                    />
                </div>

                <div className="flex flex-1 flex-col justify-center gap-3 p-5 text-left">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                            Carta
                        </p>
                        <h4 className="mt-2 text-lg font-semibold leading-6 text-slate-900">
                            {nombre}
                        </h4>
                    </div>

                    <div className="space-y-1 text-sm text-slate-700">
                        <p>{attribute}</p>
                        <p>ID: {id}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                            Vista previa
                        </span>
                        <button
                            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
                            onClick={onClick}
                        >
                            Ver detalle
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Card;