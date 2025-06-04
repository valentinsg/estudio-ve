"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Eye,
  Heart,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Menu,
  X,
  ChevronRight,
  BookOpen,
} from "lucide-react"
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

// Simulamos el contenido del blog post
const getBlogPost = (slug: string): BlogPost | null => {
  const posts: BlogPost[] = [
    {
      id: "estrategia-contenido-2024",
      title: "Cómo Crear una Estrategia de Contenido que Funcione en 2024",
      excerpt:
        "Descubre mi framework completo para crear una estrategia de contenido que realmente genere resultados y conecte con tu audiencia.",
      content: `
# Introducción

En el mundo digital actual, crear contenido sin una estrategia clara es como navegar sin brújula. Después de trabajar con más de 500 creadores, he desarrollado un framework que realmente funciona.

## El Framework IMPACT

### I - Identifica tu audiencia
Lo primero que debes hacer es conocer profundamente a tu audiencia. No hablo solo de demografía, sino de:
- Sus dolores y frustraciones
- Sus aspiraciones y sueños
- Dónde consumen contenido
- Qué tipo de contenido prefieren

### M - Mapea el customer journey
Cada pieza de contenido debe tener un propósito específico en el viaje de tu audiencia:
- **Awareness**: Contenido educativo que resuelve problemas
- **Consideration**: Casos de estudio y comparaciones
- **Decision**: Testimonios y demos
- **Retention**: Contenido exclusivo y de valor añadido

### P - Planifica con propósito
No se trata de crear contenido por crear. Cada pieza debe:
- Tener un objetivo claro
- Estar alineada con tus metas de negocio
- Aportar valor real a tu audiencia
- Ser medible y optimizable

### A - Automatiza lo repetible
Usa herramientas y sistemas para:
- Programar publicaciones
- Reutilizar contenido en diferentes formatos
- Analizar métricas automáticamente
- Gestionar interacciones

### C - Crea consistentemente
La consistencia es clave. Mejor publicar 2 veces por semana de forma constante que 10 veces una semana y luego desaparecer.

### T - Trackea y optimiza
Mide lo que importa:
- Engagement rate
- Tiempo de permanencia
- Conversiones
- Feedback cualitativo

## Herramientas Recomendadas

1. **Notion** - Para planificación y organización
2. **Canva** - Para diseño visual
3. **Buffer** - Para programación
4. **Google Analytics** - Para métricas
5. **Hotjar** - Para feedback de usuarios

## Conclusión

Una estrategia de contenido efectiva no es solo sobre crear más contenido, sino sobre crear el contenido correcto para las personas correctas en el momento correcto.

¿Quieres profundizar más en este tema? Te invito a mi mentoría 1:1 donde podemos trabajar juntos en tu estrategia personalizada.
      `,
      author: "Valentín Sánchez Guevara",
      publishedAt: "2024-01-15",
      readTime: "8 min",
      category: "Estrategia",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["contenido", "estrategia", "marketing"],
      views: 1247,
      likes: 89,
    },
  ]

  return posts.find((post) => post.id === slug) || null
}

const relatedPosts = [
  {
    id: "productividad-creadores",
    title: "Productividad para Creadores: Mi Sistema Completo",
    excerpt: "El sistema exacto que uso para gestionar múltiples proyectos creativos.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "12 min",
    category: "Productividad",
  },
  {
    id: "marca-personal-desde-cero",
    title: "Construye tu Marca Personal desde Cero",
    excerpt: "Pasos esenciales para definir tu propuesta de valor única.",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "10 min",
    category: "Branding",
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const foundPost = getBlogPost(params.slug)
    setPost(foundPost)
    if (foundPost) {
      setLikes(foundPost.likes)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Calculate reading progress
      const article = document.querySelector(".article-content")
      if (article) {
        const articleTop = article.offsetTop
        const articleHeight = article.offsetHeight
        const windowHeight = window.innerHeight
        const scrollTop = window.scrollY

        const progress = Math.min(Math.max((scrollTop - articleTop + windowHeight / 2) / articleHeight, 0), 1)
        setReadingProgress(progress * 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [params.slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = post?.title || ""

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case "copy":
        await navigator.clipboard.writeText(url)
        // Aquí podrías mostrar un toast de confirmación
        break
    }
  }

  if (!mounted) return null

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-charcoal-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
          <p className="text-charcoal-600 dark:text-charcoal-300 mb-8">
            El artículo que buscas no existe o ha sido movido.
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-900 text-charcoal-800 dark:text-cream-50 transition-colors duration-300">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-charcoal-200 dark:bg-charcoal-700 z-50">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-cream-50/95 dark:bg-charcoal-900/95 backdrop-blur-md shadow-lg border-b border-charcoal-200/20 dark:border-charcoal-700/20"
            : "bg-transparent"
        }`}
        style={{ marginTop: "4px" }}
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
              <Link href="/blog" className="text-primary font-medium">
                Blog
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
                <Link href="/blog" className="text-left text-primary font-medium">
                  Blog
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

      {/* Article Content */}
      <article className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-white to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-charcoal-500 dark:text-charcoal-400 mb-8">
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-charcoal-800 dark:text-charcoal-200">{post.category}</span>
              </nav>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-primary text-white">{post.category}</Badge>
                <div className="flex items-center gap-4 text-sm text-charcoal-500 dark:text-charcoal-400">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} de lectura</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views} vistas</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>

              {/* Excerpt */}
              <p className="text-xl text-charcoal-600 dark:text-charcoal-300 mb-8 leading-relaxed">{post.excerpt}</p>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400">Compartir:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("twitter")}
                    className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-900/20"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("facebook")}
                    className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-900/20"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("linkedin")}
                    className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-900/20"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare("copy")}
                    className="hover:bg-charcoal-50 hover:border-charcoal-200 dark:hover:bg-charcoal-800"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div
                    className="article-content prose prose-lg dark:prose-invert max-w-none
                      prose-headings:text-charcoal-800 dark:prose-headings:text-cream-50
                      prose-p:text-charcoal-700 dark:prose-p:text-charcoal-300
                      prose-strong:text-charcoal-800 dark:prose-strong:text-cream-50
                      prose-a:text-primary hover:prose-a:text-primary/80
                      prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded
                      prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r
                    "
                    dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-charcoal-200 dark:border-charcoal-700">
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Like and Share */}
                  <div className="mt-8 flex items-center justify-between p-6 bg-charcoal-50 dark:bg-charcoal-800 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={handleLike}
                        className={`transition-all duration-300 ${
                          isLiked
                            ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                            : "hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20"
                        }`}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                        {likes} Me gusta
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </Button>
                    </div>
                    <div className="text-sm text-charcoal-500 dark:text-charcoal-400">{post.views} visualizaciones</div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-8">
                    {/* Author Card */}
                    <Card className="p-6 bg-white dark:bg-charcoal-800 border-0 shadow-lg">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold mb-2">{post.author}</h3>
                        <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mb-4">
                          Fundador de Estudio Ve. Ayudo a creadores a transformar ideas en impacto.
                        </p>
                        <Button asChild size="sm" className="w-full">
                          <Link href="/#mentoria">Agendar Mentoría</Link>
                        </Button>
                      </div>
                    </Card>

                    {/* Table of Contents */}
                    <Card className="p-6 bg-white dark:bg-charcoal-800 border-0 shadow-lg">
                      <h3 className="font-bold mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Contenido
                      </h3>
                      <nav className="space-y-2 text-sm">
                        <a
                          href="#introduccion"
                          className="block text-charcoal-600 dark:text-charcoal-400 hover:text-primary transition-colors"
                        >
                          Introducción
                        </a>
                        <a
                          href="#framework-impact"
                          className="block text-charcoal-600 dark:text-charcoal-400 hover:text-primary transition-colors"
                        >
                          El Framework IMPACT
                        </a>
                        <a
                          href="#herramientas"
                          className="block text-charcoal-600 dark:text-charcoal-400 hover:text-primary transition-colors"
                        >
                          Herramientas Recomendadas
                        </a>
                        <a
                          href="#conclusion"
                          className="block text-charcoal-600 dark:text-charcoal-400 hover:text-primary transition-colors"
                        >
                          Conclusión
                        </a>
                      </nav>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-gradient-to-br from-white to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Artículos Relacionados</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-charcoal-800"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-4 left-4 bg-primary text-white">{relatedPost.category}</Badge>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-sm text-charcoal-500 dark:text-charcoal-400">
                          <Clock className="h-4 w-4" />
                          <span>{relatedPost.readTime} de lectura</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-charcoal-600 dark:text-charcoal-300 mb-4 text-sm leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        <Button
                          asChild
                          variant="ghost"
                          className="text-primary hover:text-primary/80 p-0 h-auto font-medium group"
                        >
                          <Link href={`/blog/${relatedPost.id}`}>
                            Leer artículo
                            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}
