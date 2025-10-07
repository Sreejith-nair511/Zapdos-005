"use client"

import { useI18n } from "@/components/i18n-provider"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"

export function CitizenHeader() {
  const { t } = useI18n()
  
  return (
    <header className="flex items-center justify-between">
      <h2 className="text-xl md:text-2xl font-semibold">{t("citizenAccess")}</h2>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  )
}