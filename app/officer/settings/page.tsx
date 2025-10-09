"use client"
import Link from "next/link"
import { useI18n } from "@/components/i18n-provider"
import { AccessibilitySuite } from "@/components/accessibility-suite"
import { DevRibbon } from "@/components/dev-ribbon"
import { OfficerHeader } from "@/components/officer-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Globe, Palette, Shield, User, Volume2 } from "lucide-react"

function SettingsInner() {
  const { t } = useI18n()
  
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8 grid gap-6 soft-tricolor-bg" role="main">
      <OfficerHeader />

      <h1 className="text-2xl font-bold">{t("Settings")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t("Settings Menu")}</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/officer/settings/profile">
                    <User className="h-4 w-4 mr-2" />
                    {t("Profile")}
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/officer/settings/notifications">
                    <Bell className="h-4 w-4 mr-2" />
                    {t("Notifications")}
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start bg-secondary" asChild>
                  <Link href="/officer/settings/appearance">
                    <Palette className="h-4 w-4 mr-2" />
                    {t("Appearance")}
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/officer/settings/accessibility">
                    <Volume2 className="h-4 w-4 mr-2" />
                    {t("Accessibility")}
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/officer/settings/language">
                    <Globe className="h-4 w-4 mr-2" />
                    {t("Language")}
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/officer/settings/privacy">
                    <Shield className="h-4 w-4 mr-2" />
                    {t("Privacy")}
                  </Link>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <h2 className="text-xl font-semibold mb-2">{t("Select a Settings Category")}</h2>
              <p className="text-muted-foreground text-center">
                {t("Choose a category from the left menu to configure your preferences")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Accessibility Suite */}
      <AccessibilitySuite />
      
      {/* Developer Features */}
      <DevRibbon />
    </main>
  )
}

export default function Page() {
  return <SettingsInner />
}