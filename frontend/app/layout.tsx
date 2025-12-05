import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Fredoka } from "next/font/google"
import { Navbar } from "@/components/navbar"
import "./globals.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
})

// <CHANGE> Updated metadata for the game
export const metadata: Metadata = {
  title: "Opération N.I.R.D. - Sauvez le lycée !",
  description: "Un jeu éducatif pour apprendre la résistance numérique face aux Big Tech",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#4A90D9",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={fredoka.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
