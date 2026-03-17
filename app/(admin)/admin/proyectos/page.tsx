export default function ProyectosPage() {
    return (
        <div className="flex flex-col gap-6 text-white h-[calc(100vh-8rem)]">
            <div>
                <h1 className="text-2xl font-bold">Proyectos Activos</h1>
                <p className="text-gray-400">Portal del cliente y seguimiento de entregables.</p>
            </div>

            <div className="bg-[#121212] border border-[#222] rounded-xl p-8 flex flex-col items-center justify-center text-center mt-6 h-full gap-4">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                </div>
                <h2 className="text-xl font-medium">Sitio en Construcción</h2>
                <p className="text-gray-400 max-w-md">La integración completa con hitos del cliente y documentos de diseño estará disponible próximamente en esta vista.</p>
            </div>
        </div>
    )
}
