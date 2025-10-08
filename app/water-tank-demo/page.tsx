"use client"

import { useState } from "react"
import { VoiceConsole } from "@/components/voice-console"
import { CitizenHeader } from "@/components/citizen-header"
import { Button } from "@/components/ui/button"
import { Droplets, Volume2 } from "lucide-react"

export default function WaterTankDemo() {
  const [currentResponse, setCurrentResponse] = useState(0)
  
  const waterTankResponses = [
    "Water tank level critical. Refill scheduled for tomorrow morning between 6-8 AM. You'll receive an SMS confirmation shortly.",
    "We've registered your water tank issue. Emergency water supply truck dispatched. Estimated arrival time: 2 hours. Please conserve water until then.",
    "Thank you for reporting the low water level. Our team has scheduled a refill for today. You should have water by evening. For immediate needs, contact the helpline at 1912."
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
          <h1 className="text-3xl font-bold mb-2">Water Tank Response Demo</h1>
          <p className="text-muted-foreground">
            Demonstration of AI responses for water tank level reports
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Voice Console</h2>
            <p className="text-muted-foreground mb-4">
              Press and hold the microphone, then say "Water tank is almost empty."
            </p>
            
            <VoiceConsole />
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Expected Responses</h2>
            <p className="text-muted-foreground mb-4">
              The system will cycle through these 3 responses for water tank reports:
            </p>
            
            <div className="space-y-4">
              {waterTankResponses.map((response, index) => (
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
                      <Droplets className="h-5 w-5 text-primary" />
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
            <li>When you say "Water tank is almost empty," the system recognizes this specific phrase</li>
            <li>The AI provides one of three predetermined responses in rotation</li>
            <li>Each response includes relevant information like refill schedules and emergency contacts</li>
            <li>Responses are designed to be helpful, informative, and reassuring to citizens</li>
          </ul>
        </div>
      </main>
    </div>
  )
}