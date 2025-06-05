"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ArrowLeft, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

export default function SobreVePage() {
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

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-900 text-charcoal-800 dark:text-cream-50 transition-colors duration-300">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden pattern-overlay">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Button asChild variant="outline" className="mb-8 border-charcoal-300 dark:border-charcoal-600 text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            La Historia de <span className="text-primary">Estudio Ve</span>
          </h1>
          <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
            Conocé cómo comenzamos y por qué trabajamos para potenciar a creadores y marcas.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 prose lg:prose-lg dark:prose-invert">
          <p>
            Estudio Ve nació en 2020 en Mar del Plata como la unión creativa de dos hermanos que buscaban llevar sus ideas al siguiente nivel. Empezamos ofreciendo servicios de diseño y desarrollo para amigos y emprendimientos locales.
          </p>
          <p>
            Con el tiempo fuimos sumando mentorías y productos digitales para ayudar a otros creadores a profesionalizar sus proyectos. Nuestra misión es brindar herramientas claras y acompañamiento estratégico para que las buenas ideas tengan el impacto que merecen.
          </p>
          <p>
            Hoy seguimos creciendo junto a una comunidad de personas curiosas y emprendedoras que creen en el poder de la creatividad aplicada. Si querés conocer más o trabajar con nosotros, no dudes en contactarnos.
          </p>
        </div>
      </section>
    </div>
  )
}

