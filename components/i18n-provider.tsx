"use client"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { messages, type Lang } from "@/lib/i18n"

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    const saved = window.localStorage.getItem("lang") as Lang | null
    if (saved) {
      setLang(saved)
    } else {
      const supported: Lang[] = ["en", "hi", "kn", "ta", "ml"]
      const nav = navigator?.language?.toLowerCase() || "en"
      const match =
        supported.find((l) => nav.startsWith(l)) ||
        (nav.includes("hi")
          ? "hi"
          : nav.includes("ml")
            ? "ml"
            : nav.includes("ta")
              ? "ta"
              : nav.includes("kn")
                ? "kn"
                : "en")
      setLang(match as Lang)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("lang", lang)
  }, [lang])

  const t = (key: string) => {
    const table = messages[lang] || messages.en
    return table[key] ?? key
  }

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
