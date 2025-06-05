"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Send,
  CheckCircle,
  Sparkles,
  Target,
  Award,
  Download,
  Bell,
  Crown
} from "lucide-react"

export const NewsletterSignup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subscriberName, setSubscriberName] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name || !email) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubscriberName(name)
    setIsSubscribed(true)
    setIsLoading(false)
    setName("")
    setEmail("")

    setTimeout(() => {
      setIsSubscribed(false)
      setSubscriberName("")
    }, 3000)
  }

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden"
      >
        <Card className="bg-gradient-to-br from-orange-500/10 via-yellow-400/10 to-orange-600/10 border-orange-500/20 shadow-2xl">
          <CardContent className="p-8 text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent"
            >
              {subscriberName ? `¡Gracias, ${subscriberName}!` : "¡Bienvenido a la familia Ve!"}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-charcoal-600 dark:text-charcoal-300"
            >
              Tu kit de productividad llegará a tu email en los próximos minutos
            </motion.p>
            
            {/* Elementos decorativos */}
            <div className="absolute top-4 right-4 text-orange-500/30">
              <Crown className="h-6 w-6" />
            </div>
            <div className="absolute bottom-4 left-4 text-yellow-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
    >
      <Card className="bg-gradient-to-br from-white via-orange-50/30 to-yellow-50/30 dark:from-charcoal-800 dark:via-charcoal-800/90 dark:to-charcoal-700 border-orange-200/50 dark:border-orange-500/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <CardContent className="p-8 relative">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-xl" />
          
          <div className="text-center mb-8 relative z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Bell className="h-10 w-10 text-white" />
            </motion.div>
            
            <motion.h3 
              className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Newsletter Estudio Ve
            </motion.h3>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-charcoal-600 dark:text-charcoal-300 mb-6 text-lg"
            >
              Estrategias, recursos y el <span className="font-semibold text-orange-600">kit de productividad gratuito</span> que necesitas para hacer crecer tu proyecto
            </motion.p>

            {/* Benefits mejorados */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Download, text: "Kit gratuito" },
                { icon: Target, text: "Estrategias exclusivas" },
                { icon: Sparkles, text: "Tips semanales" },
                { icon: Award, text: "Descuentos VIP" }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-orange-500/5 to-yellow-500/5 border border-orange-200/20 dark:border-orange-500/10"
                >
                  <benefit.icon className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 relative z-10"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 border-orange-200 dark:border-orange-500/20 focus:border-orange-500 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-sm"
              />
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border-orange-200 dark:border-orange-500/20 focus:border-orange-500 bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-sm"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl group border-0"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      Obtener mi kit
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 text-center">
              🔒 Sin spam. Cancela cuando quieras. Más de 2,000 creadores ya se unieron.
            </p>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
