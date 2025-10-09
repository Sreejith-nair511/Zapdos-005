"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Globe, Server } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

export function EmbeddedArchitecture() {
  const { t } = useI18n()
  
  return (
    <Card className="w-full bg-gradient-to-br from-background to-secondary/10">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg md:text-xl bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">
          {t("AI-Powered Rural Services Platform Architecture")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className="p-4 border-b bg-secondary/10">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                {t("Frontend Dashboard")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("User interface and citizen services platform")}
              </p>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Frontend Dashboard Preview</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={() => window.open('https://digitalsarpanch-xf1o.vercel.app/', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                {t("View Frontend Dashboard")}
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className="p-4 border-b bg-secondary/10">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Server className="h-5 w-5 text-purple-500" />
                {t("Backend System")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("Management and administration platform")}
              </p>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Backend System Preview</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={() => window.open('https://digitalsarpanch-2.onrender.com/', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                {t("View Backend System")}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-6 p-4 rounded-lg bg-secondary/30">
          <h3 className="font-semibold mb-3 text-lg bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">
            {t("Implementation Architecture")}
          </h3>
          <div className="flex justify-center">
            <img 
              src="/implementation-diagram.svg" 
              alt="Platform Implementation Architecture" 
              className="w-full max-w-2xl rounded-lg border"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold mb-3 text-lg bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">
            {t("Platform Integration")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">{t("Seamless Access")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("Access both frontend and backend systems directly from the dashboard")}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">{t("Real-time Monitoring")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("Monitor platform performance and user engagement metrics")}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <h4 className="font-medium mb-2 text-purple-700 dark:text-purple-300">{t("Unified Control")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("Manage all platform components from a single interface")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}