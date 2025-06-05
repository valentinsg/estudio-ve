"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { Menu, X, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

export default function Header() {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cream-50/95 dark:bg-charcoal-800/95 backdrop-blur-md shadow-md"
          : "bg-cream-50 dark:bg-charcoal-800"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/estudio-ve-logo.png"
                alt="Estudio Ve"
                width={180}
                height={60}
                className={`h-10 w-auto transition-all duration-300 ${
                  theme === "dark" ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
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
            <Link
              href="/blog"
              className="text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
            >
              Blog
            </Link>

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
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
              <Link
                href="/blog"
                className="text-left text-charcoal-600 dark:text-charcoal-300 hover:text-primary transition-colors duration-300 font-medium"
              >
                Blog
              </Link>
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
  )
}