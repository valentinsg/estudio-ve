import { db } from "@/lib/db/db"
import { kanbanTasks } from "@/lib/db/schema"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

export default async function KanbanPage() {
    let tasks: typeof kanbanTasks.$inferSelect[] = [];
    let dbError = false;

    try {
        tasks = await db.select().from(kanbanTasks);
    } catch (e) {
        dbError = true;
    }

    const todoTasks = tasks.filter(t => t.status === 'todo');
    const doingTasks = tasks.filter(t => t.status === 'in_progress');
    const doneTasks = tasks.filter(t => t.status === 'done');

    const Column = ({ title, items, count }: { title: string, items: typeof tasks, count: number }) => (
        <div className="bg-[#121212]/50 border border-[#222] rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-300">{title}</h3>
                <span className="bg-[#222] text-gray-400 text-xs px-2 py-1 rounded-full">{count}</span>
            </div>

            {items.map((task: any) => (
                <Card key={task.id} className="bg-[#1a1a1a] border-[#333] hover:border-orange-500/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-200 mb-3">{task.title}</p>
                        <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-400 bg-orange-500/10">Tarea</Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <button className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-white p-2 mt-2 transition-colors border border-dashed border-[#333] rounded-lg hover:border-gray-500">
                <Plus className="h-4 w-4" /> Añadir tarea
            </button>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 text-white h-full">
            <div>
                <h1 className="text-2xl font-bold">Kanban Interno</h1>
                <p className="text-gray-400">Gestiona las tareas activas y flujos de trabajo de la agencia.</p>
            </div>

            {dbError && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg">
                    Error de Base de Datos. Asegurate de configurar tu .env.local y ejecutar `pnpm drizzle-kit push`.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <Column title="To Do" items={todoTasks} count={todoTasks.length} />
                <Column title="In Progress" items={doingTasks} count={doingTasks.length} />
                <Column title="Done" items={doneTasks} count={doneTasks.length} />
            </div>
        </div>
    )
}
