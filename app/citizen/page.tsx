"use client"
import Link from "next/link"
import { VoiceConsole } from "@/components/voice-console"
import { CitizenHeader } from "@/components/citizen-header"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Users, BarChart, MessageSquare, Brain } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

function CitizenInner() {
  const { t } = useI18n()
  
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 md:py-8 grid gap-6 soft-tricolor-bg" role="main">
      <CitizenHeader />

      <div className="bg-card border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">{t("citizenAccess")}</h1>
        <p className="text-muted-foreground mb-6">{t("speak")}</p>
        
        <VoiceConsole />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <nav aria-label={t("citizenAccess")} className="grid grid-cols-1 gap-3">
          <Link className="rounded-lg bg-secondary p-3 text-center hover:bg-secondary/80 transition-colors" href="#">
            {t("Check Scheme Eligibility")}
          </Link>
          <Link className="rounded-lg bg-secondary p-3 text-center hover:bg-secondary/80 transition-colors" href="#">
            {t("Track Crop Status")}
          </Link>
          <Link className="rounded-lg bg-secondary p-3 text-center hover:bg-secondary/80 transition-colors" href="#">
            {t("School Attendance")}
          </Link>
        </nav>
        
        <div className="bg-card border rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-500" />
            {t("AI Transparency")}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {t("Understand how our AI makes decisions with full explainability")}
          </p>
          <Link href="/ai-response-demo">
            <Button size="sm" className="w-full">
              {t("View AI Explanation Demo")}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* New section for Citizen Feedback */}
      <div className="rounded-xl bg-card border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">{t("Citizen Voices & Feedback")}</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          {t("Hear from real users across India who are benefiting from Digital Sarpanch 2.0")}
        </p>
        <Link href="/citizen/feedback">
          <Button className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            {t("View Detailed Feedback")}
          </Button>
        </Link>
      </div>
      
      <Chatbot />
    </main>
  )
}

export default function Page() {
  return <CitizenInner />
}