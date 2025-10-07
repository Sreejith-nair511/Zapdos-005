"use client"

import Link from "next/link"
import { useI18n } from "@/components/i18n-provider"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"

export function LandingHeader() {
  const { t } = useI18n()
  
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-balance text-2xl md:text-3xl font-semibold">{t("title")}</h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  )
}