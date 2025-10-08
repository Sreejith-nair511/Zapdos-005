"use client"

import { useState } from "react"
import { VoiceConsole } from "@/components/voice-console"

export default function TranslationTestPage() {
  const [testText, setTestText] = useState("")
  const [translation, setTranslation] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTranslate = async () => {
    if (!testText.trim()) return
    
    setLoading(true)
    try {
      // Translate English to Malayalam
      const translationResponse = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: testText, targetLanguage: "ml" }),
      })
      
      if (!translationResponse.ok) {
        throw new Error(`Translation failed with status ${translationResponse.status}`)
      }
      
      const translationData = await translationResponse.json()
      setTranslation(translationData.translation)
      
      // Get AI response for the Malayalam text
      const aiResponse = await fetch("/api/mistral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: translationData.translation }),
      })
      
      if (!aiResponse.ok) {
        throw new Error(`AI request failed with status ${aiResponse.status}`)
      }
      
      const aiData = await aiResponse.json()
      setAiResponse(aiData.response)
    } catch (error) {
      console.error("Error:", error)
      setAiResponse("Error processing request: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Translation and AI Response Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Manual Test</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">English Text</label>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
                placeholder="Enter English text to translate..."
              />
            </div>
            
            <button
              onClick={handleTranslate}
              disabled={loading || !testText.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
            >
              {loading ? "Processing..." : "Translate & Get AI Response"}
            </button>
            
            {translation && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Malayalam Translation:</h3>
                <div className="p-3 bg-secondary rounded-lg">
                  {translation}
                </div>
              </div>
            )}
            
            {aiResponse && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">AI Response (in Malayalam):</h3>
                <div className="p-3 bg-secondary rounded-lg">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Voice Console Test</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Use the voice console below to test the complete workflow:
            English speech → Malayalam translation → AI response in Malayalam
          </p>
          <VoiceConsole />
        </div>
      </div>
    </div>
  )
}