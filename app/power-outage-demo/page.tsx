"use client"

import { useState } from "react"
import { VoiceConsole } from "@/components/voice-console"
import { CitizenHeader } from "@/components/citizen-header"
import { Button } from "@/components/ui/button"
import { Mic, Volume2 } from "lucide-react"

export default function PowerOutageDemo() {
  const [currentResponse, setCurrentResponse] = useState(0)
  
  const powerOutageResponses = [
    "Power outage reported in your area. Technician has been dispatched and will arrive within 24 hours. For immediate assistance, please contact the emergency helpline at 1912.",
    "We've registered your power outage report. Our team is aware of the issue in your area. Estimated restoration time is 6-8 hours. You'll receive an SMS update when the technician is on the way.",
    "Thank you for reporting the power outage. We've logged your complaint and assigned it priority status. A technician will contact you within 2 hours. In the meantime, please stay safe."
  ]

  return (
    <div className="min-h-screen bg-background soft-tricolor-bg">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <CitizenHeader />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Power Outage Response Demo</h1>
          <p className="text-muted-foreground">
            Demonstration of AI responses for power outage reports
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Voice Console</h2>
            <p className="text-muted-foreground mb-4">
              Press and hold the microphone, then say "Power outage in our area."
            </p>
            
            <VoiceConsole />
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Expected Responses</h2>
            <p className="text-muted-foreground mb-4">
              The system will cycle through these 3 responses for power outage reports:
            </p>
            
            <div className="space-y-4">
              {powerOutageResponses.map((response, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    index === currentResponse 
                      ? "border-primary bg-primary/10" 
                      : "border-muted bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Volume2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Response {index + 1}</span>
                        {index === currentResponse && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm">{response}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => setCurrentResponse((prev) => (prev + 1) % 3)}
                className="flex-1"
              >
                Show Next Response
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentResponse(0)}
              >
                Reset to First
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>When you say "Power outage in our area," the system recognizes this specific phrase</li>
            <li>The AI provides one of three predetermined responses in rotation</li>
            <li>Each response includes relevant information like technician dispatch, ETA, and emergency contacts</li>
            <li>Responses are designed to be helpful, informative, and reassuring to citizens</li>
          </ul>
        </div>
      </main>
    </div>
  )
}