"use client"
import { useI18n } from "@/components/i18n-provider"
import { VoiceConsole } from "@/components/voice-console"
import { AgentNavigation } from "@/components/agent-navigation"
import { ExplainableAIModal } from "@/components/explainable-ai-modal"
import { MultilingualReportExport } from "@/components/multilingual-report-export"
import { AccessibilitySuite } from "@/components/accessibility-suite"
import { DevRibbon } from "@/components/dev-ribbon"
import { OfficerHeader } from "@/components/officer-header"
import { Chatbot } from "@/components/chatbot"

function AgentsInner() {
  const { t } = useI18n()
  
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8 grid gap-6" role="main">
      <OfficerHeader />

      {/* Agent Navigation */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("AI Agents")}</h2>
        <AgentNavigation />
      </div>
      
      {/* Voice + TTS Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VoiceConsole />
        <div className="flex flex-col gap-4">
          <ExplainableAIModal />
          <MultilingualReportExport />
        </div>
      </div>
      
      {/* Accessibility Suite */}
      <AccessibilitySuite />
      
      {/* Developer Features */}
      <DevRibbon />
      
      {/* Chatbot */}
      <Chatbot />
    </main>
  )
}

export default function Page() {
  return <AgentsInner />
}