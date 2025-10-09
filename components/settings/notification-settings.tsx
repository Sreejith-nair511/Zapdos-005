"use client"

import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell } from "lucide-react"
import { useEffect, useState } from "react"

export function NotificationSettings() {
  const { t } = useI18n()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [agentAlerts, setAgentAlerts] = useState(true)
  const [systemUpdates, setSystemUpdates] = useState(false)

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedEmailNotifications = localStorage.getItem("emailNotifications")
    const savedSmsNotifications = localStorage.getItem("smsNotifications")
    const savedPushNotifications = localStorage.getItem("pushNotifications")
    const savedAgentAlerts = localStorage.getItem("agentAlerts")
    const savedSystemUpdates = localStorage.getItem("systemUpdates")
    
    if (savedEmailNotifications !== null) {
      setEmailNotifications(savedEmailNotifications === "true")
    }
    
    if (savedSmsNotifications !== null) {
      setSmsNotifications(savedSmsNotifications === "true")
    }
    
    if (savedPushNotifications !== null) {
      setPushNotifications(savedPushNotifications === "true")
    }
    
    if (savedAgentAlerts !== null) {
      setAgentAlerts(savedAgentAlerts === "true")
    }
    
    if (savedSystemUpdates !== null) {
      setSystemUpdates(savedSystemUpdates === "true")
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("emailNotifications", emailNotifications.toString())
  }, [emailNotifications])

  useEffect(() => {
    localStorage.setItem("smsNotifications", smsNotifications.toString())
  }, [smsNotifications])

  useEffect(() => {
    localStorage.setItem("pushNotifications", pushNotifications.toString())
  }, [pushNotifications])

  useEffect(() => {
    localStorage.setItem("agentAlerts", agentAlerts.toString())
  }, [agentAlerts])

  useEffect(() => {
    localStorage.setItem("systemUpdates", systemUpdates.toString())
  }, [systemUpdates])

  const handleEmailNotificationsToggle = () => {
    setEmailNotifications(!emailNotifications)
  }

  const handleSmsNotificationsToggle = () => {
    setSmsNotifications(!smsNotifications)
  }

  const handlePushNotificationsToggle = () => {
    setPushNotifications(!pushNotifications)
  }

  const handleAgentAlertsToggle = () => {
    setAgentAlerts(!agentAlerts)
  }

  const handleSystemUpdatesToggle = () => {
    setSystemUpdates(!systemUpdates)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-yellow-500" />
          {t("Notification Settings")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications">{t("Email Notifications")}</Label>
            <p className="text-sm text-muted-foreground">{t("Receive email updates about your account")}</p>
          </div>
          <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={handleEmailNotificationsToggle} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sms-notifications">{t("SMS Notifications")}</Label>
            <p className="text-sm text-muted-foreground">{t("Receive SMS alerts for important updates")}</p>
          </div>
          <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={handleSmsNotificationsToggle} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="push-notifications">{t("Push Notifications")}</Label>
            <p className="text-sm text-muted-foreground">{t("Receive push notifications on your device")}</p>
          </div>
          <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={handlePushNotificationsToggle} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="agent-alerts">{t("Agent Alerts")}</Label>
            <p className="text-sm text-muted-foreground">{t("Receive alerts from AI agents")}</p>
          </div>
          <Switch id="agent-alerts" checked={agentAlerts} onCheckedChange={handleAgentAlertsToggle} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="system-updates">{t("System Updates")}</Label>
            <p className="text-sm text-muted-foreground">{t("Receive notifications about system updates")}</p>
          </div>
          <Switch id="system-updates" checked={systemUpdates} onCheckedChange={handleSystemUpdatesToggle} />
        </div>
      </CardContent>
    </Card>
  )
}