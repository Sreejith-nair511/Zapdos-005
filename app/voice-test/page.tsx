"use client"

import { VoiceConsole } from "@/components/voice-console"
import { CitizenHeader } from "@/components/citizen-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Volume2, Droplets, Zap } from "lucide-react"

export default function VoiceTestPage() {
  return (
    <div className="min-h-screen bg-background soft-tricolor-bg">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <CitizenHeader />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Voice Console Test</h1>
          <p className="text-muted-foreground">
            Test the voice recognition and AI response functionality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-blue-500" />
                How to Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Press and hold the microphone button</li>
                <li>Say one of the test phrases exactly</li>
                <li>Release the button to stop recording</li>
                <li>Listen to the AI response</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-green-500" />
                Water Tank Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">Say exactly:</p>
              <p className="font-mono bg-muted p-2 rounded text-sm">
                Water tank is almost empty
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                You'll get one of 3 rotating responses about water refill schedules
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Power Outage Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">Say exactly:</p>
              <p className="font-mono bg-muted p-2 rounded text-sm">
                Power outage in our area
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                You'll get one of 3 rotating responses about technician dispatch
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Voice Console</h2>
          <VoiceConsole />
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            How It Works
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>The system listens to your voice when you press and hold the microphone</li>
            <li>When you release, it processes your speech and matches it to predefined scenarios</li>
            <li>For exact matches, it provides specific, helpful responses</li>
            <li>Responses rotate through different options to avoid repetition</li>
            <li>All processing happens in the browser - no internet required</li>
          </ul>
        </div>
      </main>
    </div>
  )
}