"use client"
import Link from "next/link"
import { useI18n } from "@/components/i18n-provider"
import { AccessibilitySuite } from "@/components/accessibility-suite"
import { DevRibbon } from "@/components/dev-ribbon"
import { OfficerHeader } from "@/components/officer-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, Bot, FileText, Settings, Users, BarChart, Globe } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

function OfficerInner() {
  const { t } = useI18n()
  
  const navigationItems = [
    { 
      title: t("Dashboard"), 
      description: t("Overview of all systems and metrics"), 
      href: "/officer/dashboard", 
      icon: LayoutDashboard,
      color: "from-blue-500 to-blue-600"
    },
    { 
      title: t("AI Agents"), 
      description: t("Manage and monitor all AI agents"), 
      href: "/officer/agents", 
      icon: Bot,
      color: "from-green-500 to-green-600"
    },
    { 
      title: t("Embedded Systems"), 
      description: t("View external platform dashboards"), 
      href: "/embedded-dashboard", 
      icon: Globe,
      color: "from-indigo-500 to-indigo-600"
    },
    { 
      title: t("Reports"), 
      description: t("View and generate system reports"), 
      href: "/officer/reports", 
      icon: FileText,
      color: "from-purple-500 to-purple-600"
    },
    { 
      title: t("Analytics"), 
      description: t("Detailed analytics and insights"), 
      href: "/officer/analytics", 
      icon: BarChart,
      color: "from-orange-500 to-orange-600"
    },
    { 
      title: t("Citizens"), 
      description: t("Citizen engagement and feedback"), 
      href: "/officer/citizens", 
      icon: Users,
      color: "from-teal-500 to-teal-600"
    },
    { 
      title: t("Settings"), 
      description: t("System configuration and preferences"), 
      href: "/officer/settings", 
      icon: Settings,
      color: "from-gray-500 to-gray-600"
    },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8 grid gap-6 light-theme-bg" role="main">
      <OfficerHeader />

      <div className="text-center py-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t("Digital Sarpanch Command Center")}</h1>
        <p className="text-muted-foreground mt-2">{t("India's AI-driven rural governance platform")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.title} href={item.href}>
              <Card className="hover:shadow-lg transition-all duration-300 h-full border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Accessibility Suite */}
      <AccessibilitySuite />
      
      {/* Developer Features */}
      <DevRibbon />
      
      {/* Chatbot */}
      <Chatbot />
    </main>
  )
}

export default function Page() {
  return <OfficerInner />
}