"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, BookOpen, User } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: string
  category: string
  image: string
  tags: string[]
}

// Simulamos posts del blog basados en videos de YouTube
const blogPosts: BlogPost[] = [
  {
    id: "estrategia-contenido-2024",
    title: "Cómo Crear una Estrategia de Contenido que Funcione en 2024",
    excerpt:
      "Descubre mi framework completo para crear una estrategia de contenido que realmente genere resultados y conecte con tu audiencia.",
    content: "En este artículo profundizo en los conceptos del video...",
    author: "Valentín Sánchez Guevara",
    publishedAt: "2024-01-15",
    readTime: "8 min",
    category: "Estrategia",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["contenido", "estrategia", "marketing"],
  },
  {
    id: "productividad-creadores",
    title: "Productividad para Creadores: Mi Sistema Completo",
    excerpt:
      "El sistema exacto que uso para gestionar múltiples proyectos creativos sin perder la cabeza ni la calidad.",
    content: "Como creador, la productividad no es solo hacer más cosas...",
    author: "Valentín Sánchez Guevara",
    publishedAt: "2024-01-08",
    readTime: "12 min",
    category: "Productividad",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["productividad", "gestión", "creatividad"],
  },
  {
    id: "marca-personal-desde-cero",
    title: "Construye tu Marca Personal desde Cero: Guía Completa",
    excerpt: "Pasos esenciales para definir y comunicar tu propuesta de valor única en el mercado actual.",
    content: "Tu marca personal es mucho más que un logo o colores...",
    author: "Valentín Sánchez Guevara",
    publishedAt: "2024-01-01",
    readTime: "10 min",
    category: "Branding",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["branding", "marca personal", "estrategia"],
  },
]

export function BlogSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!mounted) return null

  return (
    <section className="py-24 bg-white dark:bg-charcoal-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="mr-2 h-4 w-4" />
            Blog & Artículos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Reflexiones <span className="text-primary">Creativas</span>
          </h2>
          <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
            Artículos profundos sobre creatividad, estrategia y crecimiento profesional
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Artículo Principal */}
          <div className="lg:col-span-2">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white dark:bg-charcoal-800 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">{blogPosts[0].category}</Badge>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-charcoal-500 dark:text-charcoal-400">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blogPosts[0].publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime} de lectura</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h3>

                  <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 leading-relaxed text-lg">
                    {blogPosts[0].excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {blogPosts[0].tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-charcoal-300 dark:border-charcoal-600"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 group"
                  >
                    <Link href={`/blog/${blogPosts[0].id}`}>
                      Leer artículo completo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Artículos Secundarios */}
          <div className="space-y-6">
            {blogPosts.slice(1).map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-white dark:bg-charcoal-800"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-charcoal-500 dark:text-charcoal-400">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-charcoal-600 dark:text-charcoal-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-medium group"
                  >
                    <Link href={`/blog/${post.id}`}>
                      Leer más
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA para ver todos los artículos */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 transition-all duration-300 hover:scale-105"
          >
            <Link href="/blog">
              <BookOpen className="mr-2 h-5 w-5" />
              Ver todos los artículos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
