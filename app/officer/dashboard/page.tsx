"use client"
import { LiveMetrics } from "@/components/live-metrics"
import { InsightPanels } from "@/components/insight-panels"
import { AlertsFeed } from "@/components/alerts-feed"
import { EdgeGatewayCard } from "@/components/edge-gateway-card"
import { SchemeBoard } from "@/components/scheme-board"
import { SentimentMap } from "@/components/sentiment-map"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { EthicsPanel } from "@/components/ethics-panel"
import { MaintenanceSection } from "@/components/maintenance-section"
import { RoadmapTimeline } from "@/components/roadmap-timeline"
import { CommunityFeedback } from "@/components/community-feedback"
import { AgentArchitecture } from "@/components/agent-architecture"
import { HeroIndiaMap } from "@/components/hero-india-map"
import { LiveAIFeed } from "@/components/live-ai-feed"
import { AccessibilitySuite } from "@/components/accessibility-suite"
import { DevRibbon } from "@/components/dev-ribbon"
import { OfficerHeader } from "@/components/officer-header"
import { Chatbot } from "@/components/chatbot"
import { AgentControlConsole } from "@/components/agent-control-console"
import { PlatformArchitecture } from "@/components/platform-architecture"
import { WatsonXLogs } from "@/components/watsonx-logs"
import { PilotCaseResults } from "@/components/pilot-case-results"
import { PaddyCropScenario } from "@/components/paddy-crop-scenario"
import { EmbeddedArchitecture } from "@/components/embedded-architecture"

function DashboardInner() {
  return (
    <main className="px-2 sm:px-4 py-4 sm:py-6 md:px-6 md:py-8 grid gap-4 sm:gap-6 soft-tricolor-bg bg-gradient-to-br from-background to-secondary/10" role="main">
      <OfficerHeader />

      {/* Platform Architecture Visualization */}
      <PlatformArchitecture />

      {/* Multi-Agent Architecture Visualization */}
      <AgentArchitecture />
      
      {/* AI-Powered Rural Services Platform Architecture */}
      <EmbeddedArchitecture />
      
      {/* Interactive India Map */}
      <HeroIndiaMap />

      {/* Payyanur Pilot Case Results */}
      <PilotCaseResults />

      {/* Paddy Crop Scenario Simulation */}
      <PaddyCropScenario />

      <LiveMetrics />

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <InsightPanels />
        <div className="flex flex-col gap-4 sm:gap-6">
          <AlertsFeed />
          <LiveAIFeed />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="card-vibrant-primary">
          <EdgeGatewayCard />
        </div>
        <div className="card-vibrant-secondary">
          <SchemeBoard />
        </div>
        <div className="card-vibrant-accent">
          <SentimentMap />
        </div>
      </div>

      {/* Agent Control Console */}
      <AgentControlConsole />

      <AnalyticsCharts />
      <EthicsPanel />
      <MaintenanceSection />
      <RoadmapTimeline />
      <CommunityFeedback />
      
      {/* Accessibility Suite */}
      <AccessibilitySuite />
      
      {/* Developer Features */}
      <DevRibbon />
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* WatsonX Logs */}
      <WatsonXLogs />
    </main>
  )
}

export default function Page() {
  return (
    <DashboardInner />
  )
}