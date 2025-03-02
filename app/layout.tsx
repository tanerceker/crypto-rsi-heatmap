import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto RSI Heatmap",
  description: "A heatmap showing RSI values for cryptocurrencies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <main className="min-h-screen bg-background text-foreground">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'