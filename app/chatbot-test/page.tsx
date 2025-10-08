"use client"

import { useState } from "react"

export default function ChatbotTestPage() {
  const [inputText, setInputText] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const testChatbot = async () => {
    if (!inputText.trim()) return
    
    setIsLoading(true)
    setError("")
    setResponse("")
    
    try {
      const res = await fetch("/api/mistral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Request failed")
      }
      
      setResponse(data.response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Chatbot API Test</h1>
      
      <div className="bg-card p-6 rounded-xl border max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Test Chatbot Response</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="input-text" className="block text-sm font-medium mb-2">Input Text</label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-3 border rounded-lg"
              rows={3}
              placeholder="Enter your message..."
            />
          </div>
          
          <button
            onClick={testChatbot}
            disabled={isLoading || !inputText.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Send to Chatbot"}
          </button>
          
          {response && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">Chatbot Response:</h3>
              <p className="text-lg">{response}</p>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
              <h3 className="font-medium mb-2">Error:</h3>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-2">Test Instructions</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Enter a message in the text area</li>
          <li>Click "Send to Chatbot"</li>
          <li>View the response from the Mistral AI</li>
        </ol>
      </div>
    </div>
  )
}