"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  students: number
  features: string[]
}

const products: Product[] = [
  {
    id: "notion-templates",
    name: "Pack de Plantillas Notion Pro",
    description: "Sistema completo de productividad y gestión creativa",
    price: 29,
    image: "/placeholder.svg?height=300&width=400",
    category: "Plantillas",
    rating: 4.9,
    students: 247,
    features: ["Dashboard de proyectos", "Sistema de tareas", "Tracker de hábitos", "Base de conocimiento"],
  },
  {
    id: "creative-strategy-ebook",
    name: "Estrategia Creativa: De la Idea al Impacto",
    description: "Guía completa para desarrollar y ejecutar proyectos creativos",
    price: 19,
    image: "/placeholder.svg?height=300&width=400",
    category: "Ebook",
    rating: 4.8,
    students: 156,
    features: ["120 páginas", "Casos de estudio", "Plantillas incluidas", "Acceso de por vida"],
  },
  {
    id: "brand-workshop",
    name: "Workshop: Construye tu Marca Personal",
    description: "Curso intensivo para definir y comunicar tu propuesta de valor",
    price: 89,
    image: "/placeholder.svg?height=300&width=400",
    category: "Curso",
    rating: 5.0,
    students: 89,
    features: ["4 horas de contenido", "Ejercicios prácticos", "Feedback personalizado", "Certificado"],
  },
]

export function StoreSection() {
  const handlePurchase = async (product: Product) => {
    try {
      // Registrar analytics antes del checkout
      await fetch("/api/analytics/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "begin_checkout",
          productId: product.id,
          productName: product.name,
          price: product.price,
          sessionId: Math.random().toString(36).substr(2, 9),
        }),
      })

      const button = document.querySelector(`[data-product-id="${product.id}"]`) as HTMLButtonElement
      if (button) {
        button.disabled = true
        button.innerHTML =
          '<div class="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Procesando...'
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = "Error al procesar la compra"
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.error || errorMessage
        } catch {
          // Si no es JSON válido, usar mensaje genérico
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No se recibió URL de checkout")
      }
    } catch (error: any) {
      console.error("Error al procesar la compra:", error)
      alert(`Error: ${error.message || "No se pudo procesar la compra. Inténtalo de nuevo."}`)

      const button = document.querySelector(`[data-product-id="${product.id}"]`) as HTMLButtonElement
      if (button) {
        button.disabled = false
        button.innerHTML =
          '<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path></svg>Comprar'
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900 pattern-overlay">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Productos Digitales</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Herramientas que <span className="text-primary">transforman</span>
          </h2>
          <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto mb-8">
            Recursos digitales diseñados para acelerar tu crecimiento creativo y profesional
          </p>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
          >
            <Link href="/productos">
              Ver todos los productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-charcoal-800"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">{product.category}</Badge>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-charcoal-500 dark:text-charcoal-400">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{product.students} estudiantes</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-charcoal-600 dark:text-charcoal-300 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <ul className="space-y-1 mb-6">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-charcoal-600 dark:text-charcoal-400 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">${product.price}</div>
                    <Button
                      onClick={() => handlePurchase(product)}
                      data-product-id={product.id}
                      className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Comprar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
