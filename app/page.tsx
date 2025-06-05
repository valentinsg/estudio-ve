"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StoreSection } from "@/components/store-integration"
import { BlogSection } from "@/components/blog-section"
import { YouTubeSection } from "@/components/youtube-section"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import {
  Calendar,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
  Play,
  Users,
  Lightbulb,
  Menu,
  X,
  Star,
  Code,
  Palette,
  Camera,
  Megaphone,
  TrendingUp,
  Zap,
  Sparkles,
  Rocket,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function EstudioVePage() {
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
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-cream-50 dark:bg-charcoal-800 shadow-md"
          : "bg-cream-50 dark:bg-charcoal-800"
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
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Servicios
              </button>
              <Link
                href="/sobre-ve"
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
              <button
                onClick={() => scrollToSection("contenido")}
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Contenido
              </button>

              <div className="flex items-center space-x-4">
                <DarkModeToggle />
                <Button
                  onClick={() => scrollToSection("mentoria")}
                  className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Agendar Mentoría
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
            <div className="md:hidden mt-4 pb-4 border-t border-charcoal-200/20 dark:border-charcoal-700/20 animate-slide-up">
              <nav className="flex flex-col space-y-4 pt-4">
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Servicios
                </button>
                <Link
                  href="/sobre-ve"
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
                <button
                  onClick={() => scrollToSection("contenido")}
                  className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
                >
                  Contenido
                </button>
                <Button
                  onClick={() => scrollToSection("mentoria")}
                  className="bg-primary hover:bg-primary/90 text-white w-full group"
                >
                  <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Agendar Mentoría
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        {/* Fondo con overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/fondo-inicio.png')"
            }}
          />
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 dark:via-black/30 dark:to-orange-900/30 to-orange-900/30" />
          {/* Overlay adicional para mejor contraste */}
          <div className="absolute inset-0 dark:bg-black/20 bg-cream-50/5" />
        </motion.div>

        {/* Elementos decorativos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000" />
        </motion.div>

        {/* Contenido principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mx-auto"
        >
          <h1 className="text-6xl font-semibold text-cream-50 bg-orange-500/10 px-4 py-2 rounded-full backdrop-blur-sm border border-orange-500/20 uppercase tracking-wider">
            Estudio Creativo & Educativo
          </h1>
          <div className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10">

            <p>
              Acompañamos a creadores, marcas y equipos a construir sistemas con propósito.
              <br />
              <span className="text-orange-300 font-medium">Desde una plantilla hasta una plataforma.</span>
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Ver productos o servicios
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-primary/25">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agendar mentoría
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

        </motion.div>

        {/* Elementos flotantes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-orange-400/30 rounded-full animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mentorías 1:1 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-white dark:bg-charcoal-800 animate-scale-in">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Mentorías 1:1</h3>
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
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Desarrollo Web</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 flex-grow">
                  Sitios web y aplicaciones que conectan con tu audiencia y generan resultados
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

            {/* Diseño Gráfico */}
            <Card
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-white dark:bg-charcoal-800 animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Diseño Gráfico</h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 flex-grow">
                  Identidad visual que comunica tu esencia y diferencia tu marca
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full group-hover:scale-105 transition-all duration-300"
                >
                  <Link href="/servicios">
                    <Palette className="mr-2 h-4 w-4" />
                    Ver portfolio
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Producción Audiovisual */}
            <Card
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 shadow-lg bg-white dark:bg-charcoal-800 animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Producción Audiovisual
                </h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 flex-grow">
                  Videos, podcasts y contenido multimedia que cuenta tu historia
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full group-hover:scale-105 transition-all duration-300"
                >
                  <Link href="/servicios">
                    <Camera className="mr-2 h-4 w-4" />
                    Ver trabajos
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
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Megaphone className="h-8 w-8 text-white" />
                </div>
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
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  Consultoría Estratégica
                </h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 mb-6 flex-grow">
                  Análisis profundo y roadmap personalizado para escalar tu proyecto
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

          {/* Ver todos los servicios */}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 group"
            >
              <Link href="/servicios">
                Ver todos los servicios
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
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

      {/* YouTube Section */}
      <YouTubeSection />

      {/* Blog Section */}
      <BlogSection />

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
    </div>
  )
}
