import { MercadoPagoConfig } from "mercadopago"

let client: MercadoPagoConfig | null = null

export function getMercadoPagoClient() {
  if (client) {
    return client
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!accessToken) {
    console.warn("MERCADOPAGO_ACCESS_TOKEN not set; Mercado Pago client disabled")
    return null
  }

  client = new MercadoPagoConfig({
    accessToken,
    options: { timeout: 5000 },
  })

  return client
}
