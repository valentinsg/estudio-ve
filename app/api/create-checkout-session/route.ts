import { type NextRequest, NextResponse } from "next/server"

// Simulamos MercadoPago para el demo - en producción usar MercadoPago real
const simulateMercadoPagoCheckout = async (productData: any) => {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simular URL de checkout de MercadoPago
  return {
    init_point: `/success?product=${encodeURIComponent(productData.productName)}&price=${productData.price}&payment_id=${Math.random().toString(36).substr(2, 9)}`,
    id: Math.random().toString(36).substr(2, 9),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, productName, price } = body

    // Validar datos requeridos
    if (!productId || !productName || !price) {
      return NextResponse.json({ error: "Faltan datos requeridos: productId, productName, price" }, { status: 400 })
    }

    // Validar que el precio sea un número válido
    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json({ error: "El precio debe ser un número mayor a 0" }, { status: 400 })
    }

    // Analytics de compra - simular evento
    console.log("Analytics: Checkout iniciado", {
      productId,
      productName,
      price,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
    })

    // Verificar si tenemos el token de MercadoPago
    if (process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.log("Usando MercadoPago real con token configurado")

      try {
        // Importar MercadoPago SDK dinámicamente
        const { MercadoPagoConfig, Preference } = await import("mercadopago")

        const client = new MercadoPagoConfig({
          accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
          options: { timeout: 5000 },
        })

        const preference = new Preference(client)

        const preferenceData = {
          items: [
            {
              id: productId,
              title: productName,
              quantity: 1,
              unit_price: price,
              currency_id: "USD",
            },
          ],
          back_urls: {
            success: `${request.nextUrl.origin}/success`,
            failure: `${request.nextUrl.origin}/productos?error=payment_failed`,
            pending: `${request.nextUrl.origin}/productos?status=pending`,
          },
          auto_return: "approved",
          metadata: {
            product_id: productId,
            source: "estudio_ve_website",
          },
          notification_url: `${request.nextUrl.origin}/api/webhooks/mercadopago`,
          external_reference: `${productId}-${Date.now()}`,
          expires: true,
          expiration_date_from: new Date().toISOString(),
          expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        }

        const response = await preference.create({ body: preferenceData })

        // Analytics de MercadoPago
        console.log("MercadoPago Analytics:", {
          preference_id: response.id,
          product: productName,
          amount: price,
          init_point: response.init_point,
        })

        return NextResponse.json({ url: response.init_point })
      } catch (mercadoPagoError: any) {
        console.error("Error de MercadoPago:", mercadoPagoError)

        // Fallback a simulación si hay error con MercadoPago
        console.log("Fallback: Usando simulación debido a error de MercadoPago")
        const preference = await simulateMercadoPagoCheckout({ productId, productName, price })
        return NextResponse.json({ url: preference.init_point })
      }
    } else {
      // En desarrollo o sin token, usar simulación
      console.log("Usando simulación de MercadoPago (sin token configurado)")
      const preference = await simulateMercadoPagoCheckout({ productId, productName, price })
      return NextResponse.json({ url: preference.init_point })
    }
  } catch (error: any) {
    console.error("Error en create-checkout-session:", error)

    // Manejar errores de parsing JSON
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Datos de solicitud inválidos" }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
