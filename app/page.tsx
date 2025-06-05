"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StoreSection } from "@/components/store-integration"
import { YouTubeSection } from "@/components/youtube-section"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { AboutSection } from "@/components/about-section"
import {
  Calendar,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
  Users,
  Lightbulb,
  Star,
  Code,
  Palette,
  Camera,
  Megaphone,
  TrendingUp,
  Zap,
  Rocket,
  ArrowUp,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function EstudioVePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-800 text-charcoal-800 dark:text-cream-50 transition-colors duration-300">

      <section className="relative min-h-screen flex flex-col px-6 py-22 overflow-hidden">
        {/* Fondo con overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
            style={{
              backgroundImage: "url('/images/fondo-inicio.png')"
            }}
          />
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-orange-800/30 dark:from-charcoal-900/60 dark:via-charcoal-800/40 dark:to-orange-900/15" />
          {/* Overlay adicional para mejor contraste */}
          <div className="absolute inset-0 dark:bg-black/30 bg-cream-50/5" />
        </motion.div>

        {/* Elementos decorativos */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 5 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-yellow-400/20 rounded-full blur-2xl opacity-50" />
        </motion.div>

        {/* Contenido principal */}
        <div className="relative z-20 mx-auto flex-1 flex flex-col items-center justify-center w-full h-full ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl text-center mt-32"
          >
            <div className="flex justify-center">
              <Image
                src="/images/estudiove-logo.png"
                alt="Logo Estudio Ve"
                className="h-auto w-full max-w-[725px] drop-shadow-[6px_3px_0.8px_rgba(15,15,15,1)] brightness-110 transform perspective-1000 rotate-3d"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateY(-10deg) rotateX(10deg)"
                }}
                width={725}
                height={725}
              />
            </div>

            <h1 className="text-3xl md:text-5xl text-[#f5e9cf] text-balance tracking-tight leading-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] mb-16">
              Tu estudio creativo, de desarrollo y dirección estratégica.
            </h1>
          </motion.div>

          {/* Botones de acción - Ahora en la parte inferior */}
          <motion.div
            className="w-full max-w-2xl mx-auto mt-2 pb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Ver opciones
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="group relative overflow-hidden border-2 border-orange-400/30 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent hover:from-orange-500/20 hover:via-orange-500/30 hover:to-orange-500/20 hover:border-orange-400/60 text-white backdrop-blur-sm px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-orange-400/20">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                  </svg>
                  Agendar mentoría
                </span>
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -translate-x-full" />
                {/* Borde interior brillante */}
                <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Elementos flotantes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 bg-orange-400/80 rounded-full blur-sm opacity-25`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity
              }}
            />
          ))}
        </motion.div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 pattern-overlay">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Zap className="mr-2 h-4 w-4" />
              Lo que ofrecemos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros <span className="text-primary">Servicios</span>
            </h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              Herramientas y acompañamiento diseñados para potenciar tu creatividad y estrategia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Mentorías 1:1 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-white dark:bg-charcoal-800 animate-scale-in">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <Image
                  src="/images/logo-mentorias.png"
                  alt="Mentorías"
                  width={64}
                  height={64}
                  className="object-contain w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Mentorías</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 flex-grow">
                  Sesiones personalizadas para acelerar tu crecimiento creativo y estratégico
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full group-hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar en Calendly
                </Button>
              </CardContent>
            </Card>

            {/* Desarrollo Web */}
            <Card
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-white dark:bg-charcoal-800 animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col">
                <Image
                  src="/images/logo-desarrollo.png"
                  alt="Desarrollo de software"
                  width={64}
                  height={64}
                  className="object-contain w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Desarrollo de software</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 flex-grow">
                  Aplicaciones y software que potencian tu productividad y eficiencia
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full group-hover:scale-105 transition-all duration-300"
                >
                  <Link href="/servicios">
                    <Code className="mr-2 h-4 w-4" />
                    Ver proyectos
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Marketing Digital */}
            <Card
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-white dark:bg-charcoal-800 animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col">
                <Image
                  src="/images/logo-direccion.png"
                  alt="Marketing Digital"
                  width={64}
                  height={64}
                  className="object-contain w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Marketing Digital</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 flex-grow">
                  Estrategias de marketing que amplifican tu mensaje y hacen crecer tu negocio
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full group-hover:scale-105 transition-all duration-300"
                >
                  <Link href="/servicios">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Ver estrategias
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Consultoría Estratégica */}
            <Card
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-white dark:bg-charcoal-800 animate-scale-in"
              style={{ animationDelay: "0.5s" }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col">
                <Image
                  src="/images/logo-automatizaciones.png"
                  alt="Automatizaciones & Sistemas"
                  width={64}
                  height={64}
                  className="object-contain w-24 h-24 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Automatizaciones & Sistemas
                </h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 flex-grow">
                  Automatizaciones y sistemas que potencian tu productividad y eficiencia
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full group-hover:scale-105 transition-all duration-300"
                >
                  <Link href="/servicios">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Solicitar consulta
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

         
        </div>
      </section>

      {/* Store Section */}
      <div id="productos">
        <StoreSection />
      </div>

      {/* CTA Central */}
      <section className="py-24 bg-charcoal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/pattern-background.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-800/90 via-charcoal-800/70 to-primary/20" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Estás a una decisión de dejar de{" "}
            <span className="text-primary relative animate-glow">
              improvisar
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary/50 rounded-full" />
            </span>
          </h2>
          <p className="text-xl text-charcoal-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Únete a creadores que ya transformaron su visión en resultados concretos. El momento de actuar es ahora.
          </p>
          <Button
            onClick={() => scrollToSection("servicios")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
            Explorar Estudio Ve
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Resultados */}
      <section id="resultados" className="py-20 bg-gradient-to-b from-cream-100 to-cream-50 dark:from-charcoal-800 dark:to-charcoal-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-800 dark:text-cream-50 mb-4">
              Nuestros Resultados
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              Descubre los logros y éxitos que hemos alcanzado junto a nuestros clientes y estudiantes.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <Link
              href="/resultados"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors duration-300 hover:shadow-lg"
            >
              Ver todos los resultados
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre Ve */}
      <AboutSection />

      {/* YouTube Section */}
      <YouTubeSection />

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-white to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Mentoría Section */}
      <section
        id="mentoria"
        className="py-24 bg-gradient-to-br from-white to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Users className="mr-2 h-4 w-4" />
              Mentoría Personalizada
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Acelera tu <span className="text-primary">crecimiento</span>
            </h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 mb-12 max-w-2xl mx-auto">
              Sesiones 1:1 diseñadas para desbloquear tu potencial creativo y estratégico
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Personalizado</h3>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                  Cada sesión adaptada a tus objetivos específicos
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Estratégico</h3>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                  Enfoque en resultados medibles y crecimiento sostenible
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Probado</h3>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                  Metodología validada con más de 500 creadores
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <Calendar className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Agendar mi sesión gratuita
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Image
                src="/images/estudio-ve-logo.png"
                alt="Estudio Ve"
                width={200}
                height={60}
                className="h-12 w-auto mb-6 brightness-0 invert"
              />
              <p className="text-charcoal-400 mb-6 max-w-md leading-relaxed">
                Transformando ideas en impacto. Acompañamos a creadores y emprendedores a desarrollar su máximo
                potencial desde Mar del Plata para el mundo.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-charcoal-700 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-charcoal-700 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-charcoal-700 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Servicios</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="text-charcoal-400 hover:text-primary transition-colors duration-300"
                  >
                    Mentorías 1:1
                  </button>
                </li>
                <li>
                  <Link
                    href="/productos"
                    className="text-charcoal-400 hover:text-primary transition-colors duration-300"
                  >
                    Productos Digitales
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contenido")}
                    className="text-charcoal-400 hover:text-primary transition-colors duration-300"
                  >
                    Contenido Educativo
                  </button>
                </li>
                <li>
                  <Link
                    href="/servicios"
                    className="text-charcoal-400 hover:text-primary transition-colors duration-300"
                  >
                    Desarrollo Web
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Conecta</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/sobre-ve"
                    className="text-charcoal-400 hover:text-primary transition-colors duration-300"
                  >
                    Sobre Ve
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("mentoria")}
                    className="text-charcoal-400 hover:text-primary transition-colors duration-300"
                  >
                    Agendar Mentoría
                  </button>
                </li>
                <li>
                  <Link href="/blog" className="text-charcoal-400 hover:text-primary transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:contacto@estudiove.com"
                    className="text-charcoal-400 hover:text-primary transition-colors duration-300"
                  >
                    contacto@estudiove.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-charcoal-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-charcoal-400 mb-4 md:mb-0">
                Hecho con alma desde <span className="text-primary">Mar del Plata</span>, por Estudio Ve
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="text-charcoal-400 hover:text-primary transition-colors duration-300">
                  Términos y Condiciones
                </Link>
                <Link href="#" className="text-charcoal-400 hover:text-primary transition-colors duration-300">
                  Política de Privacidad
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform"
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
