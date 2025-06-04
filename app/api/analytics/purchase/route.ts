import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, productId, productName, price, userId, sessionId } = body

    // Validar datos requeridos
    if (!event || !productId) {
      return NextResponse.json({ error: "Faltan datos requeridos: event, productId" }, { status: 400 })
    }

    const analyticsData = {
      event,
      productId,
      productName,
      price,
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    }

    // Simular envío a diferentes plataformas de analytics
    console.log("Analytics Event:", analyticsData)

    // Aquí se enviarían los datos a:
    // - Google Analytics 4
    // - Facebook Pixel
    // - TikTok Pixel
    // - Base de datos interna

    // Simular Google Analytics 4
    if (event === "purchase") {
      console.log("GA4 Purchase Event:", {
        transaction_id: sessionId,
        value: price,
        currency: "USD",
        items: [
          {
            item_id: productId,
            item_name: productName,
            category: "digital_product",
            quantity: 1,
            price: price,
          },
        ],
      })
    }

    // Simular Facebook Pixel
    console.log("Facebook Pixel Event:", {
      event_name: event === "purchase" ? "Purchase" : "InitiateCheckout",
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        client_ip_address: analyticsData.ip,
        client_user_agent: analyticsData.userAgent,
      },
      custom_data: {
        currency: "USD",
        value: price,
        content_ids: [productId],
        content_type: "product",
      },
    })

    return NextResponse.json({ status: "success", message: "Analytics event registrado" })
  } catch (error) {
    console.error("Error registrando analytics:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Analytics endpoint activo",
    events: ["view_item", "add_to_cart", "begin_checkout", "purchase"],
  })
}
