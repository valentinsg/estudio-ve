"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShoppingCart,
  Star,
  Users,
  Search,
  Filter,
  ArrowLeft,
  Download,
  Clock,
  BookOpen,
  Video,
  FileText,
  Menu,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

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
  duration?: string
  pages?: number
  type: "ebook" | "template" | "course" | "tool"
}

const products: Product[] = [
  {
    id: "notion-templates-pro",
    name: "Pack de Plantillas Notion Pro",
    description: "Sistema completo de productividad y gestión creativa con más de 15 plantillas profesionales",
    price: 29,
    image: "/placeholder.svg?height=300&width=400",
    category: "Plantillas",
    rating: 4.9,
    students: 247,
    type: "template",
    features: [
      "Dashboard de proyectos completo",
      "Sistema de tareas avanzado",
      "Tracker de hábitos personalizable",
      "Base de conocimiento estructurada",
      "Plantilla de finanzas personales",
      "Sistema de CRM básico",
    ],
  },
  {
    id: "creative-strategy-ebook",
    name: "Estrategia Creativa: De la Idea al Impacto",
    description: "Guía completa para desarrollar y ejecutar proyectos creativos que generen resultados reales",
    price: 19,
    image: "/placeholder.svg?height=300&width=400",
    category: "Ebook",
    rating: 4.8,
    students: 156,
    type: "ebook",
    pages: 120,
    features: [
      "120 páginas de contenido premium",
      "Casos de estudio reales",
      "Plantillas y frameworks incluidos",
      "Acceso de por vida",
      "Actualizaciones gratuitas",
    ],
  },
  {
    id: "brand-workshop",
    name: "Workshop: Construye tu Marca Personal",
    description: "Curso intensivo para definir y comunicar tu propuesta de valor única en el mercado",
    price: 89,
    image: "/placeholder.svg?height=300&width=400",
    category: "Curso",
    rating: 5.0,
    students: 89,
    type: "course",
    duration: "4 horas",
    features: [
      "4 horas de contenido en video",
      "Ejercicios prácticos descargables",
      "Feedback personalizado",
      "Certificado de finalización",
      "Acceso a comunidad privada",
    ],
  },
  {
    id: "content-calendar-notion",
    name: "Calendario de Contenido Notion",
    description: "Plantilla avanzada para planificar y gestionar tu estrategia de contenido",
    price: 15,
    image: "/placeholder.svg?height=300&width=400",
    category: "Plantillas",
    rating: 4.7,
    students: 312,
    type: "template",
    features: ["Calendario visual interactivo", "Base de datos de ideas", "Tracker de métricas", "Plantillas de posts"],
  },
  {
    id: "freelancer-toolkit",
    name: "Toolkit Completo para Freelancers",
    description: "Todo lo que necesitas para gestionar tu negocio freelance de forma profesional",
    price: 45,
    image: "/placeholder.svg?height=300&width=400",
    category: "Ebook",
    rating: 4.9,
    students: 198,
    type: "ebook",
    pages: 85,
    features: ["Contratos y propuestas", "Sistema de facturación", "Gestión de clientes", "Estrategias de pricing"],
  },
  {
    id: "video-editing-course",
    name: "Edición de Video para Creadores",
    description: "Aprende a editar videos profesionales para redes sociales y YouTube",
    price: 67,
    image: "/placeholder.svg?height=300&width=400",
    category: "Curso",
    rating: 4.8,
    students: 134,
    type: "course",
    duration: "6 horas",
    features: [
      "6 horas de video tutoriales",
      "Proyectos prácticos",
      "Recursos y assets incluidos",
      "Soporte por 30 días",
    ],
  },
]

const categories = ["Todos", "Ebook", "Plantillas", "Curso"]
const types = ["Todos", "ebook", "template", "course", "tool"]

export default function ProductosPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedType, setSelectedType] = useState("Todos")
  const [sortBy, setSortBy] = useState("popular")
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
    let filtered = products

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por categoría
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filtrar por tipo
    if (selectedType !== "Todos") {
      filtered = filtered.filter((product) => product.type === selectedType)
    }

    // Ordenar
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
      default:
        filtered.sort((a, b) => b.students - a.students)
        break
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, selectedType, sortBy])

  const handlePurchase = async (product: Product) => {
    try {
      const button = document.querySelector(`[data-product-id="${product.id}"]`) as HTMLButtonElement
      if (button) {
        button.disabled = true
        button.textContent = "Procesando..."
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
                href="/#contenido"
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Contenido
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
                  href="/#contenido"
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Contenido
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
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <Image src="/images/pattern-background.png" alt="" fill className="object-cover scale-110" />
        </div>

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
              Productos <span className="text-primary">Digitales</span>
            </h1>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 mb-12 max-w-2xl mx-auto">
              Herramientas, recursos y conocimiento para acelerar tu crecimiento creativo y profesional
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1.2k+</div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Estudiantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.8</div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Rating</div>
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
                placeholder="Buscar productos..."
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

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "Todos" ? "Todos" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Más popular</SelectItem>
                  <SelectItem value="rating">Mejor valorado</SelectItem>
                  <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-charcoal-600 dark:text-charcoal-400">
            Mostrando {filteredProducts.length} de {products.length} productos
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-4">No se encontraron productos</h3>
              <p className="text-charcoal-600 dark:text-charcoal-400 mb-8">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todos")
                  setSelectedType("Todos")
                }}
                variant="outline"
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-charcoal-800"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-white">{product.category}</Badge>
                      <div className="absolute top-4 right-4">
                        {product.type === "ebook" && <BookOpen className="h-5 w-5 text-white" />}
                        {product.type === "template" && <FileText className="h-5 w-5 text-white" />}
                        {product.type === "course" && <Video className="h-5 w-5 text-white" />}
                        {product.type === "tool" && <Download className="h-5 w-5 text-white" />}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-charcoal-500 dark:text-charcoal-400">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{product.students} estudiantes</span>
                        </div>
                        {product.duration && (
                          <div className="flex items-center gap-1 text-charcoal-500 dark:text-charcoal-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{product.duration}</span>
                          </div>
                        )}
                        {product.pages && (
                          <div className="flex items-center gap-1 text-charcoal-500 dark:text-charcoal-400">
                            <BookOpen className="h-4 w-4" />
                            <span className="text-sm">{product.pages} páginas</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
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
                        {product.features.length > 3 && (
                          <li className="text-sm text-charcoal-500 dark:text-charcoal-500">
                            +{product.features.length - 3} características más
                          </li>
                        )}
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
          )}
        </div>
      </section>
    </div>
  )
}
