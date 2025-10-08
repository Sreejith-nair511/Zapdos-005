"use client"

import { useState } from "react"
import { VoiceConsole } from "@/components/voice-console"
import { Button } from "@/components/ui/button"
import { Mic, Volume2, Languages } from "lucide-react"

export default function TranslationDemoPage() {
  const [testEnglish, setTestEnglish] = useState("Power outage in our area.")
  const [malayalamTranslation, setMalayalamTranslation] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [ttsPlaying, setTtsPlaying] = useState(false)

  const handleTestWorkflow = async () => {
    if (!testEnglish.trim()) return
    
    setIsProcessing(true)
    setMalayalamTranslation("")
    setAiResponse("")
    
    try {
      // Step 1: Translate English to Malayalam
      const translationResponse = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: testEnglish, targetLanguage: "ml" }),
      })
      
      if (!translationResponse.ok) {
        throw new Error(`Translation failed with status ${translationResponse.status}`)
      }
      
      const translationData = await translationResponse.json()
      setMalayalamTranslation(translationData.translation)
      
      // Step 2: Get AI response for the Malayalam text
      const aiResponseReq = await fetch("/api/mistral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: translationData.translation }),
      })
      
      if (!aiResponseReq.ok) {
        throw new Error(`AI request failed with status ${aiResponseReq.status}`)
      }
      
      const aiData = await aiResponseReq.json()
      setAiResponse(aiData.response)
    } catch (error) {
      console.error("Error:", error)
      setAiResponse("Error processing request: " + (error as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTtsPlayback = () => {
    if (!aiResponse) return
    
    try {
      const utterance = new SpeechSynthesisUtterance(aiResponse)
      const voices = window.speechSynthesis.getVoices()
      
      // Try to find a Malayalam voice
      const malayalamVoice = voices.find(v => v.lang?.toLowerCase().includes('ml')) || 
                            voices.find(v => v.lang?.toLowerCase().includes('kn')) ||
                            voices.find(v => v.lang?.includes("en-IN"))
      
      if (malayalamVoice) {
        utterance.voice = malayalamVoice
      }
      
      utterance.onstart = () => setTtsPlaying(true)
      utterance.onend = () => setTtsPlaying(false)
      
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    } catch (error) {
      console.error("TTS Error:", error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Translation & AI Response Workflow</h1>
        <p className="text-muted-foreground mb-8">
          Demonstrating the complete flow: English speech → Malayalam translation → AI response in Malayalam → TTS in Malayalam
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Manual Test Section */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Manual Workflow Test
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">English Input</label>
                <textarea
                  value={testEnglish}
                  onChange={(e) => setTestEnglish(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="Enter English text..."
                />
              </div>
              
              <Button
                onClick={handleTestWorkflow}
                disabled={isProcessing || !testEnglish.trim()}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Run Translation & AI Workflow"}
              </Button>
              
              {malayalamTranslation && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <h3 className="font-medium mb-2">Malayalam Translation:</h3>
                  <p className="text-lg">{malayalamTranslation}</p>
                </div>
              )}
              
              {aiResponse && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">AI Response (in Malayalam):</h3>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleTtsPlayback}
                      disabled={ttsPlaying}
                    >
                      <Volume2 className="h-4 w-4 mr-1" />
                      {ttsPlaying ? "Playing..." : "Listen"}
                    </Button>
                  </div>
                  <p className="text-lg">{aiResponse}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Voice Console Section */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Console Test
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Speak in English and see the complete workflow in action:
            </p>
            <ul className="text-sm space-y-2 mb-4">
              <li>• English speech is captured</li>
              <li>• Translated to Malayalam</li>
              <li>• Sent to Mistral AI for processing</li>
              <li>• Response generated in Malayalam</li>
              <li>• TTS plays the response in Malayalam</li>
            </ul>
            <VoiceConsole />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>User speaks in English (e.g., "Power outage in our area")</li>
            <li>Voice Console captures the English speech and converts it to text</li>
            <li>The English text is sent to the translation API to convert to Malayalam</li>
            <li>The Malayalam text is sent to Mistral AI for processing</li>
            <li>Mistral AI generates a response in Malayalam</li>
            <li>The Malayalam response is played back using Text-to-Speech with Malayalam voice</li>
          </ol>
        </div>
      </div>
    </div>
  )
}