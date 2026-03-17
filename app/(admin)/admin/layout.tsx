import Link from 'next/link'
import { LayoutDashboard, Users, FolderOpen, LayoutTemplate, Trello, Search, Bell } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white font-sans">
            {/* Sidebar */}
            <aside className="hidden w-64 overflow-y-auto border-r border-[#222] bg-[#121212] md:flex flex-col flex-shrink-0">
                <div className="flex h-16 items-center border-b border-[#222] px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:opacity-80 transition-opacity">
                        <span className="text-orange-500">Estudio</span>Ve
                    </Link>
                </div>
                <nav className="flex flex-col gap-2 px-4 py-6">
                    <Link href="/admin" className="flex items-center gap-3 rounded-lg bg-orange-500/10 px-3 py-2 text-orange-500 transition-all hover:bg-orange-500/20">
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="text-sm font-medium">War Room</span>
                    </Link>
                    <Link href="/admin/leads" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:bg-[#222] hover:text-white">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium">Leads (Scraping)</span>
                    </Link>
                    <Link href="/admin/proyectos" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:bg-[#222] hover:text-white">
                        <FolderOpen className="h-4 w-4" />
                        <span className="text-sm font-medium">Proyectos Activos</span>
                    </Link>
                    <Link href="/admin/templates" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:bg-[#222] hover:text-white">
                        <LayoutTemplate className="h-4 w-4" />
                        <span className="text-sm font-medium">Catálogo Templates</span>
                    </Link>
                    <Link href="/admin/kanban" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:bg-[#222] hover:text-white">
                        <Trello className="h-4 w-4" />
                        <span className="text-sm font-medium">Kanban Interno</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#222] bg-[#0a0a0a]/80 px-6 backdrop-blur-sm">
                    <div className="flex flex-1 items-center gap-4">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-white transition-colors"><Search className="h-5 w-5" /></button>
                        <button className="text-gray-400 hover:text-white transition-colors"><Bell className="h-5 w-5" /></button>
                        <div className="h-8 w-8 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-500 text-sm font-bold cursor-pointer hover:bg-orange-500/30 transition-colors">V</div>
                    </div>
                </header>

                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
