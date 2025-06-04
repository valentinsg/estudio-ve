"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Search, Filter, ArrowLeft, Eye, Heart, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

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
  views: number
  likes: number
}

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
    views: 1247,
    likes: 89,
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
    views: 892,
    likes: 67,
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
    views: 1534,
    likes: 112,
  },
  {
    id: "monetizar-creatividad",
    title: "7 Formas de Monetizar tu Creatividad en 2024",
    excerpt:
      "Estrategias probadas para generar ingresos con tu talento creativo, desde servicios hasta productos digitales.",
    content: "La monetización de la creatividad ha evolucionado...",
    author: "Valentín Sánchez Guevara",
    publishedAt: "2023-12-20",
    readTime: "15 min",
    category: "Monetización",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["monetización", "creatividad", "ingresos"],
    views: 2103,
    likes: 156,
  },
  {
    id: "herramientas-creador-2024",
    title: "Las Mejores Herramientas para Creadores en 2024",
    excerpt: "Una selección curada de las herramientas más efectivas para optimizar tu flujo de trabajo creativo.",
    content: "En el mundo actual, las herramientas correctas pueden...",
    author: "Valentín Sánchez Guevara",
    publishedAt: "2023-12-15",
    readTime: "11 min",
    category: "Herramientas",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["herramientas", "productividad", "software"],
    views: 987,
    likes: 73,
  },
  {
    id: "storytelling-digital",
    title: "El Arte del Storytelling en la Era Digital",
    excerpt: "Cómo contar historias que conecten emocionalmente con tu audiencia en plataformas digitales.",
    content: "El storytelling es una de las habilidades más poderosas...",
    author: "Valentín Sánchez Guevara",
    publishedAt: "2023-12-10",
    readTime: "9 min",
    category: "Comunicación",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["storytelling", "comunicación", "narrativa"],
    views: 756,
    likes: 54,
  },
]

const categories = ["Todos", "Estrategia", "Productividad", "Branding", "Monetización", "Herramientas", "Comunicación"]

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState("recent")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let filtered = blogPosts

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filtrar por categoría
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Ordenar
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.views - a.views)
        break
      case "liked":
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case "recent":
      default:
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, sortBy])

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
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-900 text-charcoal-800 dark:text-cream-50 transition-colors duration-300">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream-50/95 dark:bg-charcoal-900/95 backdrop-blur-md shadow-lg border-b border-charcoal-200/20 dark:border-charcoal-700/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/images/estudio-ve-logo.png"
                alt="Estudio Ve"
                width={180}
                height={60}
                className={`h-10 w-auto transition-all duration-300 ${theme === "dark" ? "brightness-0 invert" : ""}`}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Inicio
              </Link>
              <Link
                href="/#servicios"
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Servicios
              </Link>
              <Link
                href="/productos"
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Productos
              </Link>

              <div className="flex items-center space-x-4">
                <DarkModeToggle />
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Link href="/#mentoria">Agendar Mentoría</Link>
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <DarkModeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-charcoal-200/20 dark:border-charcoal-700/20">
              <nav className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/"
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Inicio
                </Link>
                <Link
                  href="/#servicios"
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Servicios
                </Link>
                <Link
                  href="/productos"
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Productos
                </Link>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                  <Link href="/#mentoria">Agendar Mentoría</Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden pattern-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Button
              asChild
              variant="outline"
              className="mb-8 border-charcoal-300 dark:border-charcoal-600 text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Blog de <span className="text-primary">Estudio Ve</span>
            </h1>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 mb-12 max-w-2xl mx-auto">
              Reflexiones, estrategias y conocimientos sobre creatividad, productividad y crecimiento profesional
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{blogPosts.length}+</div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Artículos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(blogPosts.reduce((acc, post) => acc + post.views, 0) / 1000)}k+
                </div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Lecturas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {blogPosts.reduce((acc, post) => acc + post.likes, 0)}+
                </div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Likes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-charcoal-800 border-y border-charcoal-200 dark:border-charcoal-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
              <Input
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-charcoal-300 dark:border-charcoal-600"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-charcoal-600 dark:text-charcoal-400" />
                <span className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400">Filtros:</span>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más reciente</SelectItem>
                  <SelectItem value="popular">Más leído</SelectItem>
                  <SelectItem value="liked">Más gustado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-charcoal-600 dark:text-charcoal-400">
            Mostrando {filteredPosts.length} de {blogPosts.length} artículos
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-4">No se encontraron artículos</h3>
              <p className="text-charcoal-600 dark:text-charcoal-400 mb-8">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todos")
                }}
                variant="outline"
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-charcoal-800"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-white">{post.category}</Badge>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-charcoal-500 dark:text-charcoal-400">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-charcoal-600 dark:text-charcoal-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-charcoal-300 dark:border-charcoal-600"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-charcoal-500 dark:text-charcoal-400">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                        </div>

                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                        >
                          <Link href={`/blog/${post.id}`}>Leer más</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
