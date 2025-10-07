"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { I18nProvider } from "@/components/i18n-provider"
import { HeroIndiaMap } from "@/components/hero-india-map"
import { FloatingInfoBar } from "@/components/floating-info-bar"
import { LandingHeader } from "@/components/landing-header"
import { StartingAnimation } from "@/components/starting-animation"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Users, BarChart } from "lucide-react"

function LandingInner() {
  const [showAnimation, setShowAnimation] = useState(true)
  
  const handleAnimationComplete = () => {
    setShowAnimation(false)
  }
  
  if (showAnimation) {
    return <StartingAnimation onCompleted={handleAnimationComplete} />
  }
  
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10 flex flex-col gap-6 md:gap-8 soft-tricolor-bg">
      <LandingHeader />

      <section className="grid gap-4">
        <HeroIndiaMap />
        <p className="text-pretty text-center md:text-lg">From Payyanur to every village — Digital Sarpanch ensures no citizen is left behind.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/citizen" className="rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium">
            Citizen Voice Access
          </Link>
          <Link href="/officer" className="rounded-lg bg-accent text-accent-foreground px-4 py-2 font-medium">
            Panchayat Officer Dashboard
          </Link>
        </div>
        <FloatingInfoBar />
      </section>

      {/* Citizen Feedback Section */}
      <section className="rounded-xl bg-card border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Citizen Voices & Feedback</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Real stories from Digital Sarpanch 2.0 users across India
        </p>
        <Link href="/citizen/feedback">
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            View Citizen Feedback
          </Button>
        </Link>
      </section>

      <footer className="pt-4 text-center text-sm text-foreground/80">
        {"AI + Governance = Inclusive India. "}
        <br />
        {"Built by Jugggad.exe, Cambridge Institute of Technology – Hackathon 2025."}
      </footer>
      
      <Chatbot />
    </main>
  )
}

export default function Page() {
  return (
    <I18nProvider>
      <LandingInner />
    </I18nProvider>
  )
}