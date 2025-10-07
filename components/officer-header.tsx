"use client"

import { useI18n } from "@/components/i18n-provider"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { Auth } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"

export function OfficerHeader() {
  const { t } = useI18n()
  
  const handleLogout = () => {
    Auth.logout()
  }
  
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="Digital Sarpanch Logo" 
          className="h-10 w-10 object-contain"
        />
        <div className="grid">
          <div className="text-xl md:text-2xl font-semibold">{t("aiGovCenter")}</div>
          <div className="text-sm text-muted-foreground">{"Officer: Asha Nair · Ward 5"}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          IBM WatsonX — Active
        </Badge>
        <button aria-label="Sync Now" className="rounded bg-primary text-primary-foreground px-3 py-1">
          {t("syncNow")}
        </button>
        <button aria-label="Open Reports" className="rounded bg-secondary px-3 py-1">
          {t("reports")}
        </button>
        <button aria-label="Logout" className="rounded bg-secondary px-3 py-1" onClick={handleLogout}>
          {t("logout")}
        </button>
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  )
}