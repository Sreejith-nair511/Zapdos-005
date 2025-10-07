"use client"
import { useI18n } from "./i18n-provider"

const options = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ta", label: "தமிழ்" },
  { code: "ml", label: "മലയാളം" },
] as const

export function LanguageToggle() {
  const { lang, setLang } = useI18n()
  return (
    <div className="inline-flex items-center gap-1 sm:gap-2 rounded-lg bg-secondary px-1 py-1 sm:px-2 sm:py-1">
      {options.map((o) => (
        <button
          key={o.code}
          onClick={() => setLang(o.code as any)}
          className={`text-[10px] sm:text-xs md:text-sm rounded px-1.5 py-1 sm:px-2 transition ${
            lang === o.code ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
