"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Send, CheckCircle, Gift, Sparkles, TrendingUp } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")

    // Reset después de 3 segundos
    setTimeout(() => {
      setIsSubscribed(false)
    }, 3000)
  }

  if (isSubscribed) {
    return (
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-primary">¡Bienvenido a la comunidad!</h3>
          <p className="text-charcoal-600 dark:text-charcoal-300">
            Te has suscrito exitosamente. Revisa tu email para confirmar tu suscripción.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            Newsletter de <span className="text-primary">Estudio Ve</span>
          </h3>
          <p className="text-charcoal-600 dark:text-charcoal-300 mb-4">
            Recibe contenido exclusivo, tips de productividad y las últimas novedades directamente en tu inbox
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Gift className="h-4 w-4 text-primary" />
              <span>Recursos gratuitos</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Tips exclusivos</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Estrategias probadas</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 border-charcoal-300 dark:border-charcoal-600 focus:border-primary"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 group"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Suscribirse
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 text-center">
            No spam. Puedes darte de baja en cualquier momento.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
