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
  Calendar,
  Code,
  Palette,
  Camera,
  Megaphone,
  TrendingUp,
  Zap,
  Users,
  Search,
  Filter,
  ArrowLeft,
  Star,
  CheckCircle,
  Clock,
  Menu,
  X,
  MessageCircle,
  Lightbulb,
  Target,
  Rocket,
} from "lucide-react"
import { useTheme } from "next-themes"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

interface Service {
  id: string
  name: string
  description: string
  longDescription: string
  startingPrice: number
  duration: string
  category: string
  rating: number
  completedProjects: number
  features: string[]
  deliverables: string[]
  process: string[]
  icon: any
  image: string
  testimonial?: {
    text: string
    author: string
    role: string
    avatar: string
  }
}

const services: Service[] = [
  {
    id: "mentoria-1-1",
    name: "Mentorías 1:1",
    description: "Sesiones personalizadas para acelerar tu crecimiento creativo y estratégico",
    longDescription:
      "Trabajamos juntos en sesiones individuales para identificar oportunidades, resolver desafíos específicos y crear un plan de acción personalizado para tu crecimiento profesional.",
    startingPrice: 150,
    duration: "1-2 horas",
    category: "Consultoría",
    rating: 4.9,
    completedProjects: 500,
    features: [
      "Sesión personalizada 1:1",
      "Análisis de situación actual",
      "Plan de acción específico",
      "Seguimiento por 30 días",
      "Recursos y herramientas",
      "Grabación de la sesión",
    ],
    deliverables: [
      "Documento con plan de acción",
      "Lista de recursos recomendados",
      "Plantillas personalizadas",
      "Acceso a comunidad privada",
    ],
    process: [
      "Cuestionario previo detallado",
      "Sesión de mentoría (1-2h)",
      "Entrega de materiales",
      "Seguimiento semanal (30 días)",
    ],
    icon: Users,
    image: "/placeholder.svg?height=300&width=400",
    testimonial: {
      text: "La mentoría con Valentín cambió completamente mi enfoque. En 2 meses tripliqué mis ingresos.",
      author: "María González",
      role: "Diseñadora Freelance",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "desarrollo-web",
    name: "Desarrollo Web",
    description: "Sitios web y aplicaciones que conectan con tu audiencia y generan resultados",
    longDescription:
      "Creamos experiencias digitales que no solo se ven increíbles, sino que convierten visitantes en clientes. Desde landing pages hasta aplicaciones web complejas.",
    startingPrice: 2500,
    duration: "2-8 semanas",
    category: "Desarrollo",
    rating: 4.8,
    completedProjects: 120,
    features: [
      "Diseño responsive",
      "Optimización SEO",
      "Integración con CMS",
      "Analytics configurado",
      "Formularios funcionales",
      "Hosting por 1 año incluido",
    ],
    deliverables: [
      "Sitio web completo",
      "Panel de administración",
      "Documentación técnica",
      "Capacitación de uso",
      "Soporte por 3 meses",
    ],
    process: ["Briefing y wireframes", "Diseño y prototipo", "Desarrollo y testing", "Lanzamiento y capacitación"],
    icon: Code,
    image: "/placeholder.svg?height=300&width=400",
    testimonial: {
      text: "Mi nuevo sitio web generó 300% más leads en el primer mes. Increíble trabajo.",
      author: "Carlos Ruiz",
      role: "Coach de Negocios",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  },
  {
    id: "diseno-grafico",
    name: "Diseño Gráfico",
    description: "Identidad visual que comunica tu esencia y diferencia tu marca",
    longDescription:
      "Desarrollamos identidades visuales completas que reflejan la personalidad de tu marca y conectan emocionalmente con tu audiencia objetivo.",
    startingPrice: 800,
    duration: "1-3 semanas",
    category: "Diseño",
    rating: 4.9,
    completedProjects: 200,
    features: [
      "Logo y variaciones",
      "Paleta de colores",
      "Tipografías corporativas",
      "Manual de marca",
      "Papelería corporativa",
      "Templates para redes sociales",
    ],
    deliverables: [
      "Manual de identidad visual",
      "Archivos en todos los formatos",
      "Mockups de aplicación",
      "Templates editables",
    ],
    process: ["Briefing creativo", "Conceptualización", "Desarrollo y refinamiento", "Entrega final y manual"],
    icon: Palette,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "produccion-audiovisual",
    name: "Producción Audiovisual",
    description: "Videos, podcasts y contenido multimedia que cuenta tu historia",
    longDescription:
      "Creamos contenido audiovisual que captura la atención, transmite tu mensaje de forma efectiva y genera engagement con tu audiencia.",
    startingPrice: 1200,
    duration: "1-4 semanas",
    category: "Audiovisual",
    rating: 4.7,
    completedProjects: 80,
    features: [
      "Guión y storyboard",
      "Grabación profesional",
      "Edición avanzada",
      "Motion graphics",
      "Corrección de color",
      "Optimización para plataformas",
    ],
    deliverables: [
      "Video final en múltiples formatos",
      "Versiones para redes sociales",
      "Archivos de audio separados",
      "Thumbnails personalizados",
    ],
    process: ["Briefing y guión", "Pre-producción", "Grabación", "Post-producción y entrega"],
    icon: Camera,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "marketing-digital",
    name: "Marketing Digital",
    description: "Estrategias de marketing que amplifican tu mensaje y hacen crecer tu negocio",
    longDescription:
      "Desarrollamos estrategias integrales de marketing digital que aumentan tu visibilidad, generan leads cualificados y mejoran tu ROI.",
    startingPrice: 1500,
    duration: "Ongoing",
    category: "Marketing",
    rating: 4.8,
    completedProjects: 150,
    features: [
      "Estrategia de contenido",
      "Gestión de redes sociales",
      "Campañas publicitarias",
      "Email marketing",
      "SEO y SEM",
      "Analytics y reportes",
    ],
    deliverables: [
      "Plan estratégico mensual",
      "Contenido para redes sociales",
      "Reportes de performance",
      "Optimizaciones continuas",
    ],
    process: ["Auditoría inicial", "Estrategia personalizada", "Implementación", "Monitoreo y optimización"],
    icon: Megaphone,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "consultoria-estrategica",
    name: "Consultoría Estratégica",
    description: "Análisis profundo y roadmap personalizado para escalar tu proyecto",
    longDescription:
      "Analizamos tu negocio desde una perspectiva estratégica para identificar oportunidades de crecimiento y crear un plan de acción detallado.",
    startingPrice: 2000,
    duration: "2-4 semanas",
    category: "Consultoría",
    rating: 5.0,
    completedProjects: 60,
    features: [
      "Análisis de mercado",
      "Auditoría de procesos",
      "Identificación de oportunidades",
      "Roadmap estratégico",
      "KPIs y métricas",
      "Plan de implementación",
    ],
    deliverables: [
      "Informe estratégico completo",
      "Roadmap de 12 meses",
      "Templates de seguimiento",
      "Sesión de presentación",
    ],
    process: ["Análisis y auditoría", "Investigación de mercado", "Desarrollo de estrategia", "Presentación y entrega"],
    icon: Zap,
    image: "/placeholder.svg?height=300&width=400",
  },
]

const categories = ["Todos", "Consultoría", "Desarrollo", "Diseño", "Audiovisual", "Marketing"]

export default function ServiciosPage() {
  const [filteredServices, setFilteredServices] = useState(services)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState("popular")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme } = useTheme()
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
    let filtered = services

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por categoría
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((service) => service.category === selectedCategory)
    }

    // Ordenar
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.startingPrice - b.startingPrice)
        break
      case "price-high":
        filtered.sort((a, b) => b.startingPrice - a.startingPrice)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
      default:
        filtered.sort((a, b) => b.completedProjects - a.completedProjects)
        break
    }

    setFilteredServices(filtered)
  }, [searchTerm, selectedCategory, sortBy])

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
                href="/#sobre-nosotros"
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Sobre Ve
              </Link>
              <Link
                href="/productos"
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Productos
              </Link>
              <Link
                href="/blog"
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Blog
              </Link>

              <div className="flex items-center space-x-4">
                <DarkModeToggle />
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Link href="#contacto">Solicitar Cotización</Link>
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
                  href="/#sobre-nosotros"
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Sobre Ve
                </Link>
                <Link
                  href="/productos"
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Productos
                </Link>
                <Link
                  href="/blog"
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Blog
                </Link>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                  <Link href="#contacto">Solicitar Cotización</Link>
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
              Nuestros <span className="text-primary">Servicios</span>
            </h1>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 mb-12 max-w-2xl mx-auto">
              Soluciones integrales para hacer crecer tu negocio y transformar tus ideas en resultados reales
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.9</div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">Satisfacción</div>
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
                placeholder="Buscar servicios..."
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
            Mostrando {filteredServices.length} de {services.length} servicios
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-4">No se encontraron servicios</h3>
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
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <Card
                    key={service.id}
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-charcoal-800 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-primary text-white">{service.category}</Badge>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-6 w-6" />
                            <h3 className="text-xl font-bold">{service.name}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Service Info */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-charcoal-500 dark:text-charcoal-400">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{service.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>{service.completedProjects} proyectos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{service.duration}</span>
                          </div>
                        </div>

                        <p className="text-charcoal-600 dark:text-charcoal-300 mb-4 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 text-sm">Incluye:</h4>
                          <ul className="space-y-1">
                            {service.features.slice(0, 4).map((feature, index) => (
                              <li
                                key={index}
                                className="text-sm text-charcoal-600 dark:text-charcoal-400 flex items-center gap-2"
                              >
                                <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                            {service.features.length > 4 && (
                              <li className="text-sm text-charcoal-500 dark:text-charcoal-500">
                                +{service.features.length - 4} características más
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Testimonial */}
                        {service.testimonial && (
                          <div className="mb-6 p-4 bg-charcoal-50 dark:bg-charcoal-700 rounded-lg">
                            <p className="text-sm italic text-charcoal-600 dark:text-charcoal-300 mb-2">
                              "{service.testimonial.text}"
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-xs text-white font-bold">
                                  {service.testimonial.author.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="text-xs font-medium">{service.testimonial.author}</div>
                                <div className="text-xs text-charcoal-500 dark:text-charcoal-400">
                                  {service.testimonial.role}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">${service.startingPrice}</div>
                            <div className="text-xs text-charcoal-500 dark:text-charcoal-400">Desde</div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                            >
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Consultar
                            </Button>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Contratar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-white to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Nuestro <span className="text-primary">Proceso</span>
            </h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300">
              Un enfoque estructurado que garantiza resultados excepcionales
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Descubrimiento",
                description: "Analizamos tus necesidades y objetivos",
                icon: Target,
              },
              {
                step: "02",
                title: "Estrategia",
                description: "Desarrollamos un plan personalizado",
                icon: Lightbulb,
              },
              {
                step: "03",
                title: "Ejecución",
                description: "Implementamos la solución con excelencia",
                icon: Rocket,
              },
              {
                step: "04",
                title: "Optimización",
                description: "Medimos resultados y optimizamos",
                icon: TrendingUp,
              },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-charcoal-600 dark:text-charcoal-300">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-20 bg-charcoal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/pattern-background.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-800/90 via-charcoal-800/70 to-primary/20" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para hacer crecer tu <span className="text-primary">negocio</span>?
          </h2>
          <p className="text-xl text-charcoal-300 mb-12 max-w-2xl mx-auto">
            Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Consulta Gratuita
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-charcoal-800 px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Enviar Mensaje
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
