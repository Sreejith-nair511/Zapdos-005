"use client"

import { useState } from "react"

export default function ApiTestPage() {
  const [inputText, setInputText] = useState("Power outage in our area.")
  const [translationResult, setTranslationResult] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const testTranslation = async () => {
    setIsLoading(true)
    setError("")
    setTranslationResult("")
    
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, targetLanguage: "ml" }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Translation failed")
      }
      
      setTranslationResult(data.translation)
      setError(data.error || "")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  const testMistral = async () => {
    if (!translationResult) return
    
    setIsLoading(true)
    setError("")
    setAiResponse("")
    
    try {
      const response = await fetch("/api/mistral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: translationResult }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "AI request failed")
      }
      
      setAiResponse(data.response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Translation Test</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="english-input" className="block text-sm font-medium mb-2">Input Text (English)</label>
              <textarea
                id="english-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
                placeholder="Enter English text to translate..."
              />
            </div>
            
            <button
              onClick={testTranslation}
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Translating..." : "Translate to Malayalam"}
            </button>
            
            {translationResult && (
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <h3 className="font-medium mb-2">Translation Result:</h3>
                <p className="text-lg">{translationResult}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">AI Response Test</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="malayalam-input" className="block text-sm font-medium mb-2">Input Text (Malayalam)</label>
              <textarea
                id="malayalam-input"
                value={translationResult}
                onChange={(e) => setTranslationResult(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
                placeholder="Enter Malayalam text for AI processing..."
              />
            </div>
            
            <button
              onClick={testMistral}
              disabled={isLoading || !translationResult}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Get AI Response"}
            </button>
            
            {aiResponse && (
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <h3 className="font-medium mb-2">AI Response:</h3>
                <p className="text-lg">{aiResponse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          <h3 className="font-medium mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}
      
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-2">Test Workflow</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Enter English text in the first box</li>
          <li>Click "Translate to Malayalam"</li>
          <li>View the Malayalam translation</li>
          <li>Click "Get AI Response" to send the Malayalam text to Mistral</li>
          <li>View the AI response in Malayalam</li>
        </ol>
      </div>
    </div>
  )
}