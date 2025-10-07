"use client"
import Link from "next/link"
import { I18nProvider } from "@/components/i18n-provider"
import { VoiceConsole } from "@/components/voice-console"
import { CitizenHeader } from "@/components/citizen-header"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Users, BarChart, MessageSquare } from "lucide-react"

function CitizenInner() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 md:py-8 grid gap-6 soft-tricolor-bg" role="main">
      <CitizenHeader />

      <VoiceConsole />

      <nav aria-label="Citizen quick actions" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link className="rounded-lg bg-secondary p-3 text-center" href="#">
          {"Check Scheme Eligibility"}
        </Link>
        <Link className="rounded-lg bg-secondary p-3 text-center" href="#">
          {"Track Crop Status"}
        </Link>
        <Link className="rounded-lg bg-secondary p-3 text-center" href="#">
          {"School Attendance"}
        </Link>
      </nav>
      
      {/* New section for Citizen Feedback */}
      <div className="rounded-xl bg-card border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Citizen Voices & Feedback</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Hear from real users across India who are benefiting from Digital Sarpanch 2.0
        </p>
        <Link href="/citizen/feedback">
          <Button className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            View Detailed Feedback
          </Button>
        </Link>
      </div>
      
      <Chatbot />
    </main>
  )
}

export default function Page() {
  return (
    <I18nProvider>
      <CitizenInner />
    </I18nProvider>
  )
}