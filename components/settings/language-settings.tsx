"use client"

import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageToggle } from "@/components/language-toggle"
import { Globe } from "lucide-react"
import { useEffect, useState } from "react"

export function LanguageSettings() {
  const { t, lang, setLang } = useI18n()
  const [timezone, setTimezone] = useState("ist")

  // Load timezone from localStorage on component mount
  useEffect(() => {
    const savedTimezone = localStorage.getItem("timezone")
    if (savedTimezone) {
      setTimezone(savedTimezone)
    }
  }, [])

  // Save timezone to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("timezone", timezone)
  }, [timezone])

  const handleTimezoneChange = (value: string) => {
    setTimezone(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-green-500" />
          {t("Language Settings")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="language">{t("Interface Language")}</Label>
            <p className="text-sm text-muted-foreground">{t("Change the language of the application")}</p>
          </div>
          <LanguageToggle />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">{t("Timezone")}</Label>
          <Select value={timezone} onValueChange={handleTimezoneChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("Select timezone")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ist">{t("India Standard Time (IST)")}</SelectItem>
              <SelectItem value="utc">{t("UTC")}</SelectItem>
              <SelectItem value="est">{t("Eastern Standard Time (EST)")}</SelectItem>
              <SelectItem value="pst">{t("Pacific Standard Time (PST)")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}