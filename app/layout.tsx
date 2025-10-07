import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { DevRibbon } from "@/components/dev-ribbon"
import { I18nProvider } from "@/components/i18n-provider"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Digital Sarpanch",
  description: "India's AI-driven rural governance command center — Digital Sarpanch",
  generator: "sree.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <DevRibbon />
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}