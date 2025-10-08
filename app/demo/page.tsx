"use client"

import Link from "next/link"

export default function DemoPage() {
  const trigger = async (name: string) => {
    // Placeholder: in a richer demo we could post to scenario endpoints
    await fetch("/api/mock/reset", { method: "POST" })
    alert(`Scenario triggered: ${name}`)
  }
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 md:py-10 grid gap-6 light-theme-bg">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Digital Sarpanch Demo Center</h1>
        <p className="text-muted-foreground">
          Explore all features and scenarios of the Digital Sarpanch platform
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Core Scenarios</h2>
          <div className="grid gap-3">
            {["Pilot Success", "Drought", "Market Shock", "School Alert"].map((s) => (
              <button
                key={s}
                onClick={() => trigger(s)}
                className="rounded-md bg-primary px-4 py-3 text-primary-foreground text-left hover:opacity-90 transition-opacity"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Interactive Features</h2>
            <div className="space-y-3">
              <Link href="/ivr-test" className="block rounded-md bg-green-600 px-4 py-3 text-white text-center hover:opacity-90 transition-opacity">
                Test Enhanced IVR System
              </Link>
              <Link href="/translation-demo" className="block rounded-md bg-purple-600 px-4 py-3 text-white text-center hover:opacity-90 transition-opacity">
                Test Translation & AI Workflow
              </Link>
              <Link href="/api-test" className="block rounded-md bg-blue-600 px-4 py-3 text-white text-center hover:opacity-90 transition-opacity">
                Test Individual APIs
              </Link>
              <Link href="/chatbot-test" className="block rounded-md bg-orange-600 px-4 py-3 text-white text-center hover:opacity-90 transition-opacity">
                Test Chatbot API
              </Link>
              <p className="text-sm text-muted-foreground">
                Try the new IVR scenarios with expanded menu options and improved mobile responsiveness
              </p>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Business Model</h2>
            <div className="space-y-3">
              <Link href="/cost-breakdown" className="block rounded-md bg-blue-600 px-4 py-3 text-white text-center hover:opacity-90 transition-opacity">
                View Cost Breakdown
              </Link>
              <p className="text-sm text-muted-foreground">
                Detailed financial analysis of the Digital Sarpanch implementation model
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Feature Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">12+ Menu Options</h3>
            <p className="text-sm text-muted-foreground">Expanded IVR system with comprehensive services</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">Mobile Optimized</h3>
            <p className="text-sm text-muted-foreground">Fully responsive design for all devices</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">Voice Recognition</h3>
            <p className="text-sm text-muted-foreground">Natural language processing in English</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h3 className="font-semibold mb-2">Financial Model</h3>
            <p className="text-sm text-muted-foreground">Transparent cost breakdown and ROI</p>
          </div>
        </div>
      </div>
      
      <p className="text-center text-sm text-muted-foreground">Use ?dev=1 to show the simulation ribbon globally.</p>
    </main>
  )
}