"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-24 bg-gradient-to-br from-white to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900 pattern-overlay">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative hidden md:block">
            <Image
              src="/images/estudio-ve-logo.png"
              alt="Estudio Ve"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl" />
          </div>
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Sobre Ve</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Conoce <span className="text-primary">nuestra historia</span>
            </h2>
            <div className="space-y-4 text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              <p>
                Estudio Ve es un espacio creativo, técnico y educativo que nace en Mar del Plata.
                No vendemos humo: diseñamos con criterio, programamos con intención y compartimos lo que aprendemos.
              </p>
              <p>
                Todo empezó con una historia familiar: el primer "Ve" fue un estudio gráfico fundado por mi viejo,
                que cerró cuando el mundo cambió más rápido de lo que pudo adaptarse. Años después, decidí recuperar ese nombre y darle otro sentido.
              </p>
              <p>
                Hoy, Estudio Ve es mi forma de construir algo propio con lo que tengo: código, ideas, herramientas y una necesidad real de dejar algo útil.
              </p>
              <p className="font-medium">
                No trabajamos con cualquiera. Buscamos proyectos con propósito. Ideas con hambre. Personas con ganas de hacer mejor las cosas.
              </p>
              <p>Esto no es una agencia. Es un estudio. Y el estudio no para.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
