"use client"

import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AppearanceSettings() {
  const { t } = useI18n()
  const { theme, setTheme } = useTheme()
  const [animations, setAnimations] = useState(true)
  const [colorTheme, setColorTheme] = useState("default")

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedAnimations = localStorage.getItem("animations")
    const savedColorTheme = localStorage.getItem("colorTheme")
    
    if (savedAnimations !== null) {
      setAnimations(savedAnimations === "true")
    }
    
    if (savedColorTheme) {
      setColorTheme(savedColorTheme)
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("animations", animations.toString())
  }, [animations])

  useEffect(() => {
    localStorage.setItem("colorTheme", colorTheme)
    // Apply color theme to body
    document.body.className = document.body.className.replace(/color-theme-\w+/g, "")
    if (colorTheme !== "default") {
      document.body.classList.add(`color-theme-${colorTheme}`)
    }
  }, [colorTheme])

  const handleAnimationToggle = () => {
    setAnimations(!animations)
  }

  const handleColorThemeChange = (value: string) => {
    setColorTheme(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="h-5 w-5 mr-2 text-blue-500" />
          {t("Appearance Settings")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme-toggle">{t("Dark Mode")}</Label>
            <p className="text-sm text-muted-foreground">{t("Switch between light and dark themes")}</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="color-theme">{t("Color Theme")}</Label>
            <p className="text-sm text-muted-foreground">{t("Choose your preferred color scheme")}</p>
          </div>
          <Select value={colorTheme} onValueChange={handleColorThemeChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t("Theme")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{t("Default")}</SelectItem>
              <SelectItem value="vibrant">{t("Vibrant")}</SelectItem>
              <SelectItem value="ocean">{t("Ocean")}</SelectItem>
              <SelectItem value="sunset">{t("Sunset")}</SelectItem>
              <SelectItem value="indian-tricolor">{t("Indian Tricolor")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="animations">{t("Animations")}</Label>
            <p className="text-sm text-muted-foreground">{t("Enable or disable UI animations")}</p>
          </div>
          <Switch id="animations" checked={animations} onCheckedChange={handleAnimationToggle} />
        </div>
      </CardContent>
    </Card>
  )
}