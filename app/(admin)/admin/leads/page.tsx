import { db } from "@/lib/db/db"
import { projects } from "@/lib/db/schema"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"

export default async function LeadsPage() {
    let leads: typeof projects.$inferSelect[] = [];
    let dbError = false;

    try {
        leads = await db.select().from(projects);
    } catch (e) {
        console.error("DB error (possibly migrations missing):", e);
        dbError = true;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center text-white">
                <div>
                    <h1 className="text-2xl font-bold">Leads & Contactos</h1>
                    <p className="text-gray-400">Gestiona los proyectos scrapeados y su estado actual.</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Plus className="h-4 w-4" /> Nuevo Lead
                </button>
            </div>

            <Card className="bg-[#121212] border-[#222] text-white shadow-2xl">
                <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[#333] hover:bg-transparent">
                                    <TableHead className="text-gray-400">Nombre</TableHead>
                                    <TableHead className="text-gray-400">URL / Email</TableHead>
                                    <TableHead className="text-gray-400">Estado</TableHead>
                                    <TableHead className="text-gray-400">Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dbError ? (
                                    <TableRow className="border-[#333] hover:bg-transparent">
                                        <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                                            Error conectando a la base de datos Supabase. Revisa tus credenciales o corre `pnpm drizzle-kit push`.
                                        </TableCell>
                                    </TableRow>
                                ) : leads.length === 0 ? (
                                    <TableRow className="border-[#333] hover:bg-transparent">
                                        <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                                            No hay leads registrados aún en la base de datos.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    leads.map((lead) => (
                                        <TableRow key={lead.id} className="border-[#333] hover:bg-[#1a1a1a]">
                                            <TableCell className="font-medium">{lead.name}</TableCell>
                                            <TableCell className="text-gray-400">{lead.url || '-'}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        lead.status === "en_charlas" ? "border-orange-500/50 text-orange-400 bg-orange-500/10" :
                                                            lead.status === "desarrollo" ? "border-blue-500/50 text-blue-400 bg-blue-500/10" :
                                                                lead.status === "mantenimiento" ? "border-green-500/50 text-green-400 bg-green-500/10" :
                                                                    "border-gray-500/50 text-gray-400 bg-gray-500/10"
                                                    }
                                                >
                                                    {lead.status.replace('_', ' ')}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-gray-400 text-sm">{lead.createdAt?.toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
