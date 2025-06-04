import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, action } = body

    console.log("Webhook MercadoPago recibido:", { type, data, action })

    // Verificar el tipo de notificación
    switch (type) {
      case "payment":
        await handlePaymentNotification(data.id)
        break
      case "plan":
        await handlePlanNotification(data.id)
        break
      case "subscription":
        await handleSubscriptionNotification(data.id)
        break
      case "invoice":
        await handleInvoiceNotification(data.id)
        break
      case "point_integration_wh":
        // Webhook de integración
        console.log("Webhook de integración recibido")
        break
      default:
        console.log("Tipo de notificación no manejado:", type)
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Error procesando webhook de MercadoPago:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

async function handlePaymentNotification(paymentId: string) {
  try {
    console.log("Procesando notificación de pago:", paymentId)

    // Si tenemos el token de MercadoPago, obtener detalles reales
    if (process.env.MERCADOPAGO_ACCESS_TOKEN) {
      try {
        const { MercadoPagoConfig, Payment } = await import("mercadopago")

        const client = new MercadoPagoConfig({
          accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
        })

        const payment = new Payment(client)
        const paymentData = await payment.get({ id: paymentId })

        console.log("Datos del pago obtenidos:", {
          id: paymentData.id,
          status: paymentData.status,
          status_detail: paymentData.status_detail,
          transaction_amount: paymentData.transaction_amount,
          currency_id: paymentData.currency_id,
          external_reference: paymentData.external_reference,
        })

        // Procesar según el estado del pago
        switch (paymentData.status) {
          case "approved":
            await processApprovedPayment(paymentData)
            break
          case "pending":
            await processPendingPayment(paymentData)
            break
          case "rejected":
            await processRejectedPayment(paymentData)
            break
          case "cancelled":
            await processCancelledPayment(paymentData)
            break
        }
      } catch (mpError) {
        console.error("Error obteniendo datos de MercadoPago:", mpError)
        // Procesar con datos simulados
        await processSimulatedPayment(paymentId)
      }
    } else {
      // Procesar con datos simulados
      await processSimulatedPayment(paymentId)
    }
  } catch (error) {
    console.error("Error procesando notificación de pago:", error)
    throw error
  }
}

async function processSimulatedPayment(paymentId: string) {
  const paymentData = {
    id: paymentId,
    status: "approved",
    status_detail: "accredited",
    transaction_amount: 29,
    currency_id: "USD",
    payer: {
      email: "customer@example.com",
    },
    metadata: {
      product_id: "notion-templates-pro",
    },
  }

  await processApprovedPayment(paymentData)
}

async function processApprovedPayment(paymentData: any) {
  console.log("Pago aprobado:", paymentData.id)

  // Analytics de conversión
  console.log("Analytics: Conversión completada", {
    paymentId: paymentData.id,
    productId: paymentData.metadata?.product_id || paymentData.external_reference,
    revenue: paymentData.transaction_amount,
    currency: paymentData.currency_id,
    timestamp: new Date().toISOString(),
  })

  // Aquí iría la lógica para:
  // 1. Actualizar la base de datos
  // 2. Enviar email de confirmación
  // 3. Dar acceso al producto
  // 4. Registrar en analytics

  // Simular envío de email
  console.log("Enviando email de confirmación a:", paymentData.payer?.email)

  // Simular registro en base de datos
  console.log("Registrando compra en base de datos:", {
    paymentId: paymentData.id,
    amount: paymentData.transaction_amount,
    productId: paymentData.metadata?.product_id,
    customerEmail: paymentData.payer?.email,
  })
}

async function processPendingPayment(paymentData: any) {
  console.log("Pago pendiente:", paymentData.id)

  // Analytics de pago pendiente
  console.log("Analytics: Pago pendiente", {
    paymentId: paymentData.id,
    reason: paymentData.status_detail,
    amount: paymentData.transaction_amount,
  })
}

async function processRejectedPayment(paymentData: any) {
  console.log("Pago rechazado:", paymentData.id)

  // Analytics de pago rechazado
  console.log("Analytics: Pago rechazado", {
    paymentId: paymentData.id,
    reason: paymentData.status_detail,
    amount: paymentData.transaction_amount,
  })
}

async function processCancelledPayment(paymentData: any) {
  console.log("Pago cancelado:", paymentData.id)

  // Analytics de pago cancelado
  console.log("Analytics: Pago cancelado", {
    paymentId: paymentData.id,
    amount: paymentData.transaction_amount,
  })
}

async function handlePlanNotification(planId: string) {
  console.log("Notificación de plan:", planId)
  // Lógica para notificaciones de planes de suscripción
}

async function handleSubscriptionNotification(subscriptionId: string) {
  console.log("Notificación de suscripción:", subscriptionId)
  // Lógica para notificaciones de suscripciones
}

async function handleInvoiceNotification(invoiceId: string) {
  console.log("Notificación de factura:", invoiceId)
  // Lógica para notificaciones de facturas
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint activo",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mercadopago_configured: !!process.env.MERCADOPAGO_ACCESS_TOKEN,
  })
}
