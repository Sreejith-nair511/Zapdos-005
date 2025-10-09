"use client"

import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2 } from "lucide-react"
import { useEffect, useState } from "react"

export function AccessibilitySettings() {
  const { t } = useI18n()
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState("medium")
  const [focusVisible, setFocusVisible] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState("normal")

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedHighContrast = localStorage.getItem("highContrast")
    const savedFontSize = localStorage.getItem("fontSize")
    const savedFocusVisible = localStorage.getItem("focusVisible")
    const savedAnimationSpeed = localStorage.getItem("animationSpeed")
    
    if (savedHighContrast !== null) {
      setHighContrast(savedHighContrast === "true")
    }
    
    if (savedFontSize) {
      setFontSize(savedFontSize)
    }
    
    if (savedFocusVisible !== null) {
      setFocusVisible(savedFocusVisible === "true")
    }
    
    if (savedAnimationSpeed) {
      setAnimationSpeed(savedAnimationSpeed)
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("highContrast", highContrast.toString())
    // Apply high contrast class to body
    if (highContrast) {
      document.body.classList.add("high-contrast")
    } else {
      document.body.classList.remove("high-contrast")
    }
  }, [highContrast])

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize)
    // Apply font size class to body
    document.body.className = document.body.className.replace(/font-size-\w+/g, "")
    if (fontSize !== "medium") {
      document.body.classList.add(`font-size-${fontSize}`)
    }
  }, [fontSize])

  useEffect(() => {
    localStorage.setItem("focusVisible", focusVisible.toString())
    // Apply focus visibility class to body
    if (!focusVisible) {
      document.body.classList.add("no-focus-outline")
    } else {
      document.body.classList.remove("no-focus-outline")
    }
  }, [focusVisible])

  useEffect(() => {
    localStorage.setItem("animationSpeed", animationSpeed)
    // Apply animation speed class to body
    document.body.className = document.body.className.replace(/animation-speed-\w+/g, "")
    if (animationSpeed !== "normal") {
      document.body.classList.add(`animation-speed-${animationSpeed}`)
    }
  }, [animationSpeed])

  const handleHighContrastToggle = () => {
    setHighContrast(!highContrast)
  }

  const handleFocusVisibleToggle = () => {
    setFocusVisible(!focusVisible)
  }

  const handleFontSizeChange = (value: string) => {
    setFontSize(value)
  }

  const handleAnimationSpeedChange = (value: string) => {
    setAnimationSpeed(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Volume2 className="h-5 w-5 mr-2 text-purple-500" />
          {t("Accessibility Settings")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="high-contrast">{t("High Contrast Mode")}</Label>
            <p className="text-sm text-muted-foreground">{t("Increase contrast for better visibility")}</p>
          </div>
          <Switch id="high-contrast" checked={highContrast} onCheckedChange={handleHighContrastToggle} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="font-size">{t("Font Size")}</Label>
          <Select value={fontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("Select font size")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">{t("Small")}</SelectItem>
              <SelectItem value="medium">{t("Medium")}</SelectItem>
              <SelectItem value="large">{t("Large")}</SelectItem>
              <SelectItem value="xlarge">{t("Extra Large")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="focus-visible">{t("Focus Visibility")}</Label>
            <p className="text-sm text-muted-foreground">{t("Show/hide focus outlines for keyboard navigation")}</p>
          </div>
          <Switch id="focus-visible" checked={focusVisible} onCheckedChange={handleFocusVisibleToggle} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="animations-speed">{t("Animation Speed")}</Label>
            <p className="text-sm text-muted-foreground">{t("Control the speed of UI animations")}</p>
          </div>
          <Select value={animationSpeed} onValueChange={handleAnimationSpeedChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t("Speed")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="off">{t("Off")}</SelectItem>
              <SelectItem value="slow">{t("Slow")}</SelectItem>
              <SelectItem value="normal">{t("Normal")}</SelectItem>
              <SelectItem value="fast">{t("Fast")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}