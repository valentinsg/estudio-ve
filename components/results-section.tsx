"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Rocket } from "lucide-react"

interface Result {
  id: string
  title: string
  description: string
  icon: any
}

const results: Result[] = [
  {
    id: "projects",
    title: "500+ proyectos entregados",
    description:
      "Acompañamos a creadores y marcas a materializar sus ideas con soluciones digitales a medida.",
    icon: Rocket,
  },
  {
    id: "mentorias",
    title: "Ingresos x3 en mentorías",
    description:
      "Profesionales como María triplicaron sus ingresos en solo 2 meses con nuestras sesiones 1:1.",
    icon: Users,
  },
  {
    id: "leads",
    title: "300% más leads",
    description:
      "Clientes como Carlos generan hasta 300% más contactos gracias a nuestros desarrollos web.",
    icon: TrendingUp,
  },
]

export function ResultsSection() {
  return (
    <section className="py-24 bg-white dark:bg-charcoal-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Resultados
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            Impacto de <span className="text-primary">Estudio Ve</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {results.map((result) => (
            <Card
              key={result.id}
              className="shadow-lg border-0 bg-cream-50 dark:bg-charcoal-900"
            >
              <CardContent className="p-8 text-center">
                <result.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300">
                  {result.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResultsSection
