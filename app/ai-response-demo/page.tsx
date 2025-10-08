"use client"

import { VoiceConsole } from "@/components/voice-console"
import { CitizenHeader } from "@/components/citizen-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Volume2, Droplets, Zap, Brain, Lightbulb, Sparkles, Globe } from "lucide-react"
import { AIResponseExplainer } from "@/components/ai-response-explainer"
import { motion } from "framer-motion"

export default function AIResponseDemo() {
  return (
    <div className="min-h-screen bg-background soft-tricolor-bg">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <CitizenHeader />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">
            AI Response & Explanation Demo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how Digital Sarpanch provides AI responses with full transparency using Mistral AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
              <Mic className="h-5 w-5 text-blue-500" />
              Voice Console
            </h2>
            <VoiceConsole />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  How AI Explanation Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  When you use the voice console, our AI system provides not just responses but also full transparency 
                  into how decisions are made.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <p className="text-sm">Input: What you say is analyzed for intent and context</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm">Agent: The appropriate AI agent is selected based on your query</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    </div>
                    <p className="text-sm">Rule Engine: Specific protocols and rules are applied</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <p className="text-sm">Confidence: AI confidence score is calculated</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    </div>
                    <p className="text-sm">Human Verification: Process for human oversight</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200/50 dark:border-green-800/50 bg-green-50/30 dark:bg-green-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-500" />
                  Try These Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border">
                    <h4 className="font-medium text-sm flex items-center gap-1 mb-1">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      Water Issue
                    </h4>
                    <p className="text-xs text-muted-foreground">"Water tank is almost empty"</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border">
                    <h4 className="font-medium text-sm flex items-center gap-1 mb-1">
                      <Zap className="h-3 w-3 text-yellow-500" />
                      Power Issue
                    </h4>
                    <p className="text-xs text-muted-foreground">"Power outage in our area"</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border">
                    <h4 className="font-medium text-sm flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-purple-500" />
                      Crop Issue
                    </h4>
                    <p className="text-xs text-muted-foreground">"My paddy crop is drying"</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border">
                    <h4 className="font-medium text-sm flex items-center gap-1 mb-1">
                      <Globe className="h-3 w-3 text-green-500" />
                      General Query
                    </h4>
                    <p className="text-xs text-muted-foreground">"What schemes are available?"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  Water Tank Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Try saying: "Water tank is almost empty"</p>
                <AIResponseExplainer 
                  input="Water tank is almost empty"
                  agent="Water Resource Management Agent"
                  ruleEngine="Water Distribution Algorithm v3.0 - Critical Level"
                  confidence={92}
                  decision="Schedule emergency refill, dispatch water truck if needed"
                  humanVerification="Auto-verified. Supervisor notified for critical cases."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Power Outage Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Try saying: "Power outage in our area"</p>
                <AIResponseExplainer 
                  input="Power outage in our area"
                  agent="Utility Management Agent"
                  ruleEngine="Emergency Response Protocol v2.1 - Priority 1"
                  confidence={95}
                  decision="Dispatch technician within 24 hours, send SMS confirmation"
                  humanVerification="Auto-verified by system. Manual review if not resolved in 48 hours."
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            How It Works
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Press and hold the microphone to speak your concern</li>
            <li>Release to stop recording and let the AI process your request</li>
            <li>Receive an immediate, helpful response powered by Mistral AI</li>
            <li>Click "Explain AI Reasoning" to see how the decision was made</li>
            <li>All processing happens securely in the browser</li>
          </ul>
        </motion.div>
      </main>
    </div>
  )
}