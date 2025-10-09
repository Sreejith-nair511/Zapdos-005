"use client"

import { PrivacySettings } from "@/components/settings/privacy-settings"
import { OfficerHeader } from "@/components/officer-header"
import { AccessibilitySuite } from "@/components/accessibility-suite"
import { DevRibbon } from "@/components/dev-ribbon"
import { useI18n } from "@/components/i18n-provider"

function PrivacySettingsPage() {
  const { t } = useI18n()
  
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8 grid gap-6 soft-tricolor-bg" role="main">
      <OfficerHeader />

      <h1 className="text-2xl font-bold">{t("Privacy Settings")}</h1>

      <PrivacySettings />

      {/* Accessibility Suite */}
      <AccessibilitySuite />
      
      {/* Developer Features */}
      <DevRibbon />
    </main>
  )
}

export default function Page() {
  return <PrivacySettingsPage />
}