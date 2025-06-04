"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Youtube, Clock, Eye, ThumbsUp } from "lucide-react"

interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  likes: string
  publishedAt: string
}

// Simulamos el último video de YouTube - en producción se conectaría a la API de YouTube
const latestVideo: YouTubeVideo = {
  id: "latest-video",
  title: "Cómo Crear una Estrategia de Contenido que Funcione en 2024",
  description:
    "En este video te enseño mi framework completo para crear una estrategia de contenido que realmente genere resultados y conecte con tu audiencia.",
  thumbnail: "/placeholder.svg?height=300&width=500",
  duration: "18:42",
  views: "12.3k",
  likes: "847",
  publishedAt: "hace 2 días",
}

const featuredVideos: YouTubeVideo[] = [
  {
    id: "video-1",
    title: "Productividad para Creadores: Mi Sistema Completo",
    description: "Te muestro el sistema exacto que uso para gestionar múltiples proyectos sin perder la cabeza.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "22:15",
    views: "8.7k",
    likes: "623",
    publishedAt: "hace 1 semana",
  },
  {
    id: "video-2",
    title: "Construye tu Marca Personal desde Cero",
    description: "Pasos esenciales para definir y comunicar tu propuesta de valor única en el mercado.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "16:28",
    views: "15.2k",
    likes: "1.1k",
    publishedAt: "hace 2 semanas",
  },
  {
    id: "video-3",
    title: "Monetiza tu Creatividad: 7 Estrategias Probadas",
    description: "Las mejores formas de generar ingresos con tu talento creativo, basadas en casos reales.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "24:33",
    views: "21.5k",
    likes: "1.8k",
    publishedAt: "hace 3 semanas",
  },
]

export function YouTubeSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="contenido" className="py-24 bg-cream-50 dark:bg-charcoal-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-100 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/20">
            <Youtube className="mr-2 h-4 w-4" />
            Contenido en YouTube
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Último <span className="text-primary">Contenido</span>
          </h2>
          <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
            Contenido gratuito y de valor para impulsar tu crecimiento creativo y profesional
          </p>
        </div>

        {/* Video Principal */}
        <div className="mb-16">
          <Card className="overflow-hidden shadow-2xl border-0 bg-white dark:bg-charcoal-800">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative group cursor-pointer">
                  <img
                    src={latestVideo.thumbnail || "/placeholder.svg"}
                    alt={latestVideo.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                    {latestVideo.duration}
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-600 text-white border-0">NUEVO</Badge>
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-charcoal-500 dark:text-charcoal-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{latestVideo.views} visualizaciones</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{latestVideo.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{latestVideo.publishedAt}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{latestVideo.title}</h3>

                  <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 leading-relaxed">
                    {latestVideo.description}
                  </p>

                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white w-fit transition-all duration-300 hover:scale-105"
                  >
                    <Youtube className="mr-2 h-5 w-5" />
                    Ver en YouTube
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Videos Destacados */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Videos Destacados</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVideos.map((video) => (
              <Card
                key={video.id}
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-charcoal-800 cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-charcoal-500 dark:text-charcoal-400">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{video.likes}</span>
                      </div>
                      <span>{video.publishedAt}</span>
                    </div>

                    <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {video.title}
                    </h4>

                    <p className="text-charcoal-600 dark:text-charcoal-300 text-sm leading-relaxed line-clamp-3">
                      {video.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA para el canal */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 transition-all duration-300 hover:scale-105"
          >
            <Youtube className="mr-2 h-5 w-5" />
            Suscribirse al canal
          </Button>
        </div>
      </div>
    </section>
  )
}
