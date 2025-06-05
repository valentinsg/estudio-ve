"use client"

import Link from "next/link"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface BlogPost {
  id: string
  title: string
  publishedAt: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: "estrategia-contenido-2024",
    title: "Cómo Crear una Estrategia de Contenido que Funcione en 2024",
    publishedAt: "2024-01-15",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "productividad-creadores",
    title: "Productividad para Creadores: Mi Sistema Completo",
    publishedAt: "2024-01-08",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "marca-personal-desde-cero",
    title: "Construye tu Marca Personal desde Cero: Guía Completa",
    publishedAt: "2024-01-01",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function HeaderBlogDropdown() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium">
          Blog
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700">
        <div className="space-y-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="flex items-start gap-3 group">
              <img src={post.image} alt={post.title} className="w-14 h-14 object-cover rounded-md group-hover:scale-105 transition-transform" />
              <div>
                <p className="text-sm font-medium leading-snug group-hover:text-primary line-clamp-2">
                  {post.title}
                </p>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/blog" className="text-primary text-sm font-medium hover:underline">
            Ver todos
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default HeaderBlogDropdown
