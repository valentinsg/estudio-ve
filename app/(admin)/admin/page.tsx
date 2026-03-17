import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Plus } from "lucide-react"

export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-6">

            {/* Top row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Leads Widget */}
                <Card className="lg:col-span-2 bg-[#121212] border-[#222] text-white shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg font-medium text-gray-200">Pipeline de Leads (Scraping)</CardTitle>
                            <CardDescription className="text-gray-500">Últimos contactos obtenidos</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[#333] hover:bg-transparent">
                                        <TableHead className="text-gray-400">Nombre</TableHead>
                                        <TableHead className="text-gray-400">Email</TableHead>
                                        <TableHead className="text-gray-400">Teléfono</TableHead>
                                        <TableHead className="text-gray-400">Estado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "Gimnasio IronLife", email: "contacto@ironlife.com", phone: "+54 9 11 4455-6677", status: "Pendiente" },
                                        { name: "La Burger Co.", email: "info@laburger.com", phone: "+54 9 223 123-4567", status: "Contactado" },
                                        { name: "Estudio Jurídico R&M", email: "consultas@rymlaw.com", phone: "+54 9 11 9988-7766", status: "Pendiente de contacto" },
                                        { name: "Clínica Dental Sonrisas", email: "turnos@sonrisas.com", phone: "+54 9 351 222-3344", status: "Rechazado" },
                                    ].map((lead, i) => (
                                        <TableRow key={i} className="border-[#333] hover:bg-[#1a1a1a]">
                                            <TableCell className="font-medium">{lead.name}</TableCell>
                                            <TableCell className="text-gray-400">{lead.email}</TableCell>
                                            <TableCell className="text-gray-400">{lead.phone}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        lead.status.includes("Pendiente") ? "border-orange-500/50 text-orange-400 bg-orange-500/10" :
                                                            lead.status === "Contactado" ? "border-green-500/50 text-green-400 bg-green-500/10" :
                                                                "border-red-500/50 text-red-400 bg-red-500/10"
                                                    }
                                                >
                                                    {lead.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Project Widget */}
                <Card className="bg-[#121212] border-[#222] text-white shadow-2xl flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardDescription className="text-gray-500">Portal del Cliente</CardDescription>
                            <CardTitle className="text-xl font-medium mt-1">Proyecto Velmor</CardTitle>
                        </div>
                        <button className="text-gray-500 hover:text-white transition-colors"><MoreHorizontal className="h-5 w-5" /></button>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-center">
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="text-gray-400">Tiendanube</span>
                            <span className="text-orange-500 font-bold">85% Completo</span>
                        </div>
                        {/* Custom styled progress bar */}
                        <div className="h-2 w-full bg-[#333] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full" style={{ width: '85%' }}></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#333] bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer group">
                                <div className="h-10 w-10 mb-2 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>
                                </div>
                                <span className="text-xs text-gray-400 font-medium group-hover:text-white transition-colors">Ecommerce</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#333] bg-[#1a1a1a] hover:bg-[#222] transition-colors cursor-pointer group">
                                <div className="h-10 w-10 mb-2 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                </div>
                                <span className="text-xs text-gray-400 font-medium group-hover:text-white transition-colors">Tiendanube</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Kanban Board */}
            <h2 className="text-xl font-medium mt-4 text-white">Kanban Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* To Do Column */}
                <div className="bg-[#121212]/50 border border-[#222] rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-300">To Do</h3>
                        <span className="bg-[#222] text-gray-400 text-xs px-2 py-1 rounded-full">2</span>
                    </div>

                    <Card className="bg-[#1a1a1a] border-[#333] hover:border-orange-500/50 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-200 mb-3">Reunión kickoff Diseño Web Velmor</p>
                            <div className="flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-orange-500 text-[10px] flex items-center justify-center font-bold border-2 border-[#1a1a1a]">V</div>
                                    <div className="w-6 h-6 rounded-full bg-blue-500 text-[10px] flex items-center justify-center font-bold border-2 border-[#1a1a1a]">R</div>
                                </div>
                                <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-400 bg-orange-500/10">Alta</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1a1a] border-[#333] hover:border-orange-500/50 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-200 mb-3">Actualizar copy campaña Meta Ads</p>
                            <div className="flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 text-[10px] flex items-center justify-center font-bold border-2 border-[#1a1a1a]">R</div>
                                </div>
                                <Badge variant="outline" className="text-[10px] border-[#444] text-gray-400 bg-[#222]">Media</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <button className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-white p-2 mt-2 transition-colors border border-dashed border-[#333] rounded-lg hover:border-gray-500">
                        <Plus className="h-4 w-4" /> Add a card
                    </button>
                </div>

                {/* Doing Column */}
                <div className="bg-[#121212]/50 border border-[#222] rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-300">Doing</h3>
                        <span className="bg-[#222] text-gray-400 text-xs px-2 py-1 rounded-full">1</span>
                    </div>

                    <Card className="bg-[#1a1a1a] border-[#333] hover:border-orange-500/50 transition-colors cursor-pointer border-l-2 border-l-orange-500">
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-200 mb-3">Finalizar API Turnos</p>
                            <div className="flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 text-[10px] flex items-center justify-center font-bold border-2 border-[#1a1a1a]">R</div>
                                </div>
                                <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-400 bg-orange-500/10">Alta</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <button className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-white p-2 mt-2 transition-colors border border-dashed border-[#333] rounded-lg hover:border-gray-500">
                        <Plus className="h-4 w-4" /> Add a card
                    </button>
                </div>

                {/* Done Column */}
                <div className="bg-[#121212]/50 border border-[#222] rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-300">Done</h3>
                        <span className="bg-[#222] text-gray-400 text-xs px-2 py-1 rounded-full">1</span>
                    </div>

                    <Card className="bg-[#1a1a1a] border-[#333] hover:border-green-500/50 transition-colors cursor-pointer opacity-70">
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-400 line-through mb-3">Refactor UX Landing (Val)</p>
                            <div className="flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-orange-500 text-[10px] flex items-center justify-center font-bold border-2 border-[#1a1a1a]">V</div>
                                </div>
                                <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-400 bg-green-500/10">Completado</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
