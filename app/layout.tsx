import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import JsonLdScript from "@/components/json-ld-script"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Estudio Ve | Creatividad, mentorías y desarrollo digital",
  description: "Mentorías 1:1, desarrollo web y herramientas para creadores que quieren transformar su visión en impacto real.",
  keywords: [
    "mentorías para emprendedores",
    "estudio creativo Argentina",
    "desarrollo web freelance",
    "herramientas para creadores",
    "productos digitales educativos",
    "automatización creativa",
    "asesorías 1 a 1 Notion",
    "Valentín Sánchez Guevara",
    "Juan Carlos Sánchez",
    "Estudio Ve Mar del Plata"
  ],
  authors: [{ name: "Valentín Sánchez Guevara" }],
  creator: "Estudio Ve",
  publisher: "Estudio Ve",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://estudiove.com"),
  alternates: {
    canonical: "https://estudiove.com/",
    languages: {
      "es-AR": "https://estudiove.com",
      "en-US": "https://estudiove.com/en"
    }
  },
  openGraph: {
    title: "Estudio Ve | Creatividad y mentorías digitales",
    description: "Aprendé, creá y escalá tu proyecto con herramientas, asesorías y contenido útil para creadores.",
    url: "https://estudiove.com",
    siteName: "Estudio Ve",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Estudio Ve - Transformamos ideas en impacto",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Ve | Creatividad y mentorías digitales",
    description: "Aprendé, creá y escalá tu proyecto con herramientas, asesorías y contenido útil para creadores.",
    images: ["/og-image.jpg"],
    creator: "@valsgdev",
    site: "@estudiove"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev"
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#4B4B49" />
        <meta name="color-scheme" content="light dark" />
        <JsonLdScript />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
            {children}
            <Analytics />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
