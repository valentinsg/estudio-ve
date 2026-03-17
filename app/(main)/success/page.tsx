"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const productName = searchParams.get("product")
  const price = searchParams.get("price")
  const paymentId = searchParams.get("payment_id")

  useEffect(() => {
    // Registrar analytics de compra completada
    if (productName && price) {
      fetch("/api/analytics/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "purchase",
          productName: decodeURIComponent(productName),
          price: Number.parseFloat(price),
          paymentId: paymentId || "simulated",
          sessionId: Math.random().toString(36).substr(2, 9),
        }),
      }).catch(console.error)
    }
  }, [productName, price, paymentId])

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-charcoal-800 dark:text-cream-50">¡Compra exitosa!</h1>

        {productName && (
          <div className="bg-white dark:bg-charcoal-800 rounded-lg p-6 mb-6 shadow-lg border border-charcoal-200 dark:border-charcoal-700">
            <h2 className="font-semibold text-lg mb-2 text-charcoal-800 dark:text-cream-50">Producto adquirido:</h2>
            <p className="text-primary font-medium">{decodeURIComponent(productName)}</p>
            {price && <p className="text-2xl font-bold text-green-600 mt-2">${price}</p>}
          </div>
        )}

        <p className="text-charcoal-600 dark:text-charcoal-300 mb-8">
          Gracias por tu compra. Recibirás un email con los detalles de acceso a tu producto en los próximos minutos.
        </p>

        {paymentId && (
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mb-6">
            ID de transacción: {paymentId.slice(0, 20)}...
          </p>
        )}

        <div className="space-y-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="/productos">Ver más productos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream-50 dark:bg-charcoal-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-charcoal-600 dark:text-charcoal-300">Cargando...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
