"use client"

import { useState } from "react"
import { OfficerHeader } from "@/components/officer-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Globe, Server } from "lucide-react"
import { AccessibilitySuite } from "@/components/accessibility-suite"
import { DevRibbon } from "@/components/dev-ribbon"
import { useI18n } from "@/components/i18n-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"

function EmbeddedDashboardInner() {
  const { t } = useI18n()
  
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8 grid gap-6 soft-tricolor-bg" role="main">
      <OfficerHeader />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Embedded Systems Dashboard</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>

      <Tabs defaultValue="frontend" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="frontend" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Frontend Dashboard
          </TabsTrigger>
          <TabsTrigger value="backend" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            Backend System
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="frontend" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>AI-Powered Rural Services Platform</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open('https://digitalsarpanch-xf1o.vercel.app/', '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in New Tab
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full">
                <iframe 
                  src="https://digitalsarpanch-xf1o.vercel.app/" 
                  title="Digital Sarpanch Frontend Dashboard"
                  className="w-full h-full border-0 rounded-b-lg"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backend" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Backend Management System</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open('https://digitalsarpanch-2.onrender.com/', '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in New Tab
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full">
                <iframe 
                  src="https://digitalsarpanch-2.onrender.com/" 
                  title="Digital Sarpanch Backend System"
                  className="w-full h-full border-0 rounded-b-lg"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Accessibility Suite */}
      <AccessibilitySuite />
      
      {/* Developer Features */}
      <DevRibbon />
    </main>
  )
}

export default function Page() {
  return <EmbeddedDashboardInner />
}