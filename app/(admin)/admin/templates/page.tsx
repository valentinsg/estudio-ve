import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

export default async function TemplatesPage() {
    let repos: any[] = [];
    let errorMsg = "";

    try {
        const { Octokit } = await import("@octokit/rest");
        const token = process.env.GITHUB_PAT;

        if (!token) {
            errorMsg = "Falta el token GITHUB_PAT en .env.local para leer los repositorios privados.";
        } else {
            const octokit = new Octokit({ auth: token });
            const response = await octokit.rest.repos.listForAuthenticatedUser({
                visibility: 'all',
                sort: 'updated',
                per_page: 30
            });
            repos = response.data;
        }
    } catch (error: any) {
        errorMsg = error.message;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center text-white">
                <div>
                    <h1 className="text-2xl font-bold">Catálogo de Templates</h1>
                    <p className="text-gray-400">Plantillas y repositorios de EstudioVe listos para desplegar.</p>
                </div>
            </div>

            {errorMsg ? (
                <div className="bg-orange-500/10 border border-orange-500/50 text-orange-400 p-6 rounded-xl">
                    <h2 className="font-bold mb-2">Aviso de Integración con GitHub</h2>
                    <p>{errorMsg}</p>
                    <p className="mt-2 text-sm opacity-80">Por favor, genera un Personal Access Token (PAT) en GitHub y agrégalo a tu archivo `.env.local` como `GITHUB_PAT=tu_token`.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.slice(0, 9).map((repo: any) => (
                        <Card key={repo.id} className="bg-[#121212] border-[#222] text-white hover:border-orange-500/50 transition-colors cursor-pointer group flex flex-col h-full">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-orange-500/20 transition-all">
                                        <Github className="w-5 h-5" />
                                    </div>
                                    <Badge variant="outline" className="border-[#333] text-gray-400 bg-[#1a1a1a]">
                                        {repo.private ? "Private" : "Public"}
                                    </Badge>
                                </div>
                                <CardTitle className="mt-4 break-all text-lg group-hover:text-orange-400 transition-colors">
                                    {repo.name}
                                </CardTitle>
                                <CardDescription className="text-gray-500 line-clamp-2 mt-2">
                                    {repo.description || "Sin descripción proporcionada para este template."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto flex justify-between items-center text-sm pt-4 border-t border-[#222]">
                                <span className="text-gray-400">{repo.language || "N/A"}</span>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1">
                                    Ver en GitHub <ExternalLink className="w-3 h-3" />
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                    {repos.length === 0 && (
                        <div className="col-span-full text-center text-gray-500 py-12 border border-dashed border-[#333] rounded-xl">
                            No se encontraron repositorios o no están catalogados como templates.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
