import ResultsSection from "@/components/results-section"

export const metadata = {
  title: "Resultados | Estudio Ve",
  description: "Impacto real obtenido por nuestros clientes"
}

export default function ResultadosPage() {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-900">
      <ResultsSection />
    </div>
  )
}
