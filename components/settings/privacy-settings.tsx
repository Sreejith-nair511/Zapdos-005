"use client"

import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function PrivacySettings() {
  const { t } = useI18n()
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedProfileVisibility = localStorage.getItem("profileVisibility")
    const savedDataSharing = localStorage.getItem("dataSharing")
    const savedAnalytics = localStorage.getItem("analytics")
    
    if (savedProfileVisibility !== null) {
      setProfileVisibility(savedProfileVisibility === "true")
    }
    
    if (savedDataSharing !== null) {
      setDataSharing(savedDataSharing === "true")
    }
    
    if (savedAnalytics !== null) {
      setAnalytics(savedAnalytics === "true")
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("profileVisibility", profileVisibility.toString())
  }, [profileVisibility])

  useEffect(() => {
    localStorage.setItem("dataSharing", dataSharing.toString())
  }, [dataSharing])

  useEffect(() => {
    localStorage.setItem("analytics", analytics.toString())
  }, [analytics])

  const handleProfileVisibilityToggle = () => {
    setProfileVisibility(!profileVisibility)
  }

  const handleDataSharingToggle = () => {
    setDataSharing(!dataSharing)
  }

  const handleAnalyticsToggle = () => {
    setAnalytics(!analytics)
  }

  const handleDownloadData = () => {
    // In a real application, this would trigger a data download
    alert(t("Your data download has started. You will receive an email when it's ready."))
  }

  const handleDeleteAccount = () => {
    // In a real application, this would trigger account deletion
    if (confirm(t("Are you sure you want to delete your account? This action cannot be undone."))) {
      alert(t("Your account deletion request has been submitted. You will receive an email with further instructions."))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-500" />
          {t("Privacy Settings")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="profile-visibility">{t("Profile Visibility")}</Label>
            <p className="text-sm text-muted-foreground">{t("Make your profile visible to other users")}</p>
          </div>
          <Switch id="profile-visibility" checked={profileVisibility} onCheckedChange={handleProfileVisibilityToggle} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="data-sharing">{t("Data Sharing")}</Label>
            <p className="text-sm text-muted-foreground">{t("Allow sharing of anonymized data for research")}</p>
          </div>
          <Switch id="data-sharing" checked={dataSharing} onCheckedChange={handleDataSharingToggle} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="analytics">{t("Analytics")}</Label>
            <p className="text-sm text-muted-foreground">{t("Allow usage analytics to improve the platform")}</p>
          </div>
          <Switch id="analytics" checked={analytics} onCheckedChange={handleAnalyticsToggle} />
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-4">{t("Data Management")}</h3>
          <div className="space-y-3">
            <div>
              <Button variant="outline" className="w-full" onClick={handleDownloadData}>
                {t("Download My Data")}
              </Button>
            </div>
            <div>
              <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
                {t("Delete My Account")}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}