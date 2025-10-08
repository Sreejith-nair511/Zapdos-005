"use client"
import { useEffect, useRef, useState } from "react"
import { Mic, RotateCcw, Languages, MessageSquare, Play, Pause, Save, Phone, Volume2, Square, Loader } from "lucide-react"
import { useI18n } from "./i18n-provider"
import { Button } from "@/components/ui/button"
import { IVRDemo } from "@/components/ivr-demo"
import { AIResponseExplainer } from "@/components/ai-response-explainer"

// Specific responses for different scenarios
const scenarioResponses: Record<string, string[]> = {
  "Power outage in our area.": [
    "Power outage reported in your area. Technician has been dispatched and will arrive within 24 hours. For immediate assistance, please contact the emergency helpline at 1912.",
    "We've registered your power outage report. Our team is aware of the issue in your area. Estimated restoration time is 6-8 hours. You'll receive an SMS update when the technician is on the way.",
    "Thank you for reporting the power outage. We've logged your complaint and assigned it priority status. A technician will contact you within 2 hours. In the meantime, please stay safe."
  ],
  "Water tank is almost empty.": [
    "Water tank level critical. Refill scheduled for tomorrow morning between 6-8 AM. You'll receive an SMS confirmation shortly.",
    "We've registered your water tank issue. Emergency water supply truck dispatched. Estimated arrival time: 2 hours. Please conserve water until then.",
    "Thank you for reporting the low water level. Our team has scheduled a refill for today. You should have water by evening. For immediate needs, contact the helpline at 1912."
  ]
}

// AI explanation data for different scenarios
const aiExplanationData: Record<string, any> = {
  "Power outage in our area.": {
    input: "Power outage in our area",
    agent: "Utility Management Agent",
    ruleEngine: "Emergency Response Protocol v2.1 - Priority 1",
    confidence: 95,
    decision: "Dispatch technician within 24 hours, send SMS confirmation",
    humanVerification: "Auto-verified by system. Manual review if not resolved in 48 hours."
  },
  "Water tank is almost empty.": {
    input: "Water tank is almost empty",
    agent: "Water Resource Management Agent",
    ruleEngine: "Water Distribution Algorithm v3.0 - Critical Level",
    confidence: 92,
    decision: "Schedule emergency refill, dispatch water truck if needed",
    humanVerification: "Auto-verified. Supervisor notified for critical cases."
  }
}

export function VoiceConsole() {
  const { t, lang } = useI18n() as any
  const [transcript, setTranscript] = useState("")
  const [reply, setReply] = useState("")
  const [listening, setListening] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLargeText, setIsLargeText] = useState(false)
  const [isVoiceOnly, setIsVoiceOnly] = useState(false)
  const [isIVRMode, setIsIVRMode] = useState(false)
  const [responseIndex, setResponseIndex] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [currentExplanation, setCurrentExplanation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const transcriptRef = useRef<string>("") // Ref to store current transcript

  // Update transcript ref whenever transcript state changes
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // @ts-ignore
      const recognition = new window.webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"
      
      recognition.onstart = () => {
        setListening(true)
        setTranscript("")
        setReply("")
        setShowExplanation(false)
        setCurrentExplanation(null)
        setError(null)
      }
      
      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscript = ""
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        const fullTranscript = finalTranscript + interimTranscript;
        console.log("Speech recognition result:", fullTranscript); // Debug log
        setTranscript(fullTranscript)
        transcriptRef.current = fullTranscript; // Update ref
      }
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setListening(false)
        setTranscript(`Error: ${event.error}`)
        transcriptRef.current = `Error: ${event.error}`; // Update ref
        setError(`Speech recognition error: ${event.error}`)
      }
      
      recognition.onend = () => {
        console.log("Speech recognition ended"); // Debug log
        setListening(false)
        // Use the current transcript from ref
        console.log("Processing transcript from ref:", transcriptRef.current); // Debug log
        if (transcriptRef.current) {
          processTranscript(transcriptRef.current)
        }
      }
      
      recognitionRef.current = recognition
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  // Text-to-speech effect
  useEffect(() => {
    if (!reply) return
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    try {
      const u = new SpeechSynthesisUtterance(reply)
      utteranceRef.current = u
      // prefer local language voices if available
      const voices = window.speechSynthesis.getVoices()
      
      // Check if the reply contains Malayalam characters and use Malayalam voice if available
      const isMalayalam = /[\u0D00-\u0D7F]/.test(reply);
      let pref;
      
      if (isMalayalam) {
        // Prefer Malayalam voices for Malayalam text
        pref = voices.find((v) => v.lang?.toLowerCase().includes('ml')) || 
               voices.find((v) => v.lang?.toLowerCase().includes('kn')) || // Kannada as fallback
               voices.find((v) => v.lang?.toLowerCase().includes('ta')) || // Tamil as fallback
               voices.find((v) => v.lang?.includes("en-IN"))
      } else {
        // Prefer local language voices for other text
        pref = voices.find((v) => v.lang?.toLowerCase().startsWith(lang)) || 
               voices.find((v) => v.lang?.includes("en-IN"))
      }
      
      if (pref) u.voice = pref
      u.onend = () => setIsPlaying(false)
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
      setIsPlaying(true)
    } catch (error) {
      console.error("TTS Error:", error)
      setError("Text-to-speech error occurred")
    }
  }, [reply, lang])

  const processTranscript = async (text: string) => {
    console.log("Processing transcript:", text); // Debug log
    setConfidence(90) // Simulate high confidence
    
    // Skip processing if text is empty
    if (!text.trim()) {
      console.log("Empty transcript, skipping processing");
      return;
    }
    
    // First, translate the English transcript to Malayalam
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Translating to Malayalam:", text); // Debug log
      const translationResponse = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, targetLanguage: "ml" }),
      });
      
      if (!translationResponse.ok) {
        throw new Error(`Translation failed with status ${translationResponse.status}`);
      }
      
      const translationData = await translationResponse.json();
      const malayalamText = translationData.translation;
      console.log("Translated to Malayalam:", malayalamText); // Debug log
      
      // Check for specific scenarios first (in English, as they're defined in English)
      const matchedScenario = Object.keys(scenarioResponses).find(scenario => 
        text.trim().toLowerCase().includes(scenario.toLowerCase())
      )
      
      if (matchedScenario) {
        console.log("Matched scenario:", matchedScenario); // Debug log
        const responses = scenarioResponses[matchedScenario]
        const nextIndex = responseIndex % responses.length
        setReply(responses[nextIndex])
        setResponseIndex(nextIndex + 1)
        
        // Set explanation data
        setCurrentExplanation(aiExplanationData[matchedScenario])
        setShowExplanation(true)
      } else {
        console.log("Using Mistral AI for Malayalam query:", malayalamText); // Debug log
        // Use Mistral AI for other queries with the Malayalam text
        try {
          // Create a timeout promise
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Request timeout")), 15000)
          );
          
          // API call promise
          const apiPromise = fetch("/api/mistral", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: malayalamText }),
          })
          
          // Race the API call against the timeout
          const response = await Promise.race([apiPromise, timeoutPromise]) as Response;
          
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
          }
          
          const data = await response.json()
          console.log("Mistral API response:", data); // Debug log
          
          if (data.error) {
            throw new Error(data.error)
          }
          
          setReply(data.response)
          setConfidence(data.confidence || 90)
          
          // Set explanation data from AI response
          if (data.explanation) {
            setCurrentExplanation(data.explanation)
            setShowExplanation(true)
          } else {
            setShowExplanation(false)
          }
        } catch (err) {
          console.error("AI processing error:", err)
          setError(err instanceof Error ? err.message : "Failed to process your request")
          // Fallback response
          setReply("Thank you for your input. We've logged your request. An officer will contact you soon.")
          setShowExplanation(false)
        }
      }
    } catch (translationError) {
      console.error("Translation error:", translationError);
      setError(translationError instanceof Error ? translationError.message : "Translation failed");
      setReply("Sorry, we couldn't process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleStart = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = "en-US"
        recognitionRef.current.start()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        setListening(false)
        setTranscript("Sorry, I couldn't start voice recognition. Please try again.")
        setError("Error starting speech recognition")
      }
    } else {
      console.warn("Speech recognition not supported in this browser")
      setTranscript("Voice recognition is not supported in your browser. Please use Chrome or Edge.")
      setError("Voice recognition not supported")
    }
  }
  
  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const togglePlayback = () => {
    if (!utteranceRef.current) return
    if (isPlaying) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    } else {
      window.speechSynthesis.resume()
      setIsPlaying(true)
    }
  }

  const saveTranscript = () => {
    // In a real app, this would save to a database or file
    console.log("Transcript saved:", transcript)
    
    // Create and download a text file
    const element = document.createElement("a")
    const file = new Blob([`Transcript: ${transcript}\nReply: ${reply}\nConfidence: ${confidence}%`], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "voice-transcript.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Translation function
  const translateText = async (text: string, targetLanguage: string) => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, targetLanguage }),
      })

      if (!response.ok) {
        throw new Error(`Translation failed with status ${response.status}`)
      }

      const data = await response.json()
      return data.translation
    } catch (error) {
      console.error("Translation error:", error)
      return "Translation failed"
    }
  }

  // IVR Simulation - replaced with IVRDemo component

  return (
    <div className={`grid gap-4 ${isVoiceOnly ? "voice-only-mode" : ""}`}>
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold mb-2">Speak in your language…</h2>
        {listening && transcript && (
          <div className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Confidence: {confidence}%
          </div>
        )}
      </div>

      {/* Animated Mic Waveform */}
      <div className="mx-auto relative h-48 w-48 rounded-full bg-secondary shadow-inner flex items-center justify-center">
        <button
          onMouseDown={handleStart}
          onMouseUp={handleStop}
          onTouchStart={handleStart}
          onTouchEnd={handleStop}
          title={listening ? "Stop listening" : "Start listening"}
          className={`h-24 w-24 rounded-full flex items-center justify-center transition ${
            listening ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="h-8 w-8 animate-spin" />
          ) : listening ? (
            <Square className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </button>
        <div
          ref={waveRef}
          className={`absolute inset-0 rounded-full pointer-events-none ${listening ? "animate-ping" : ""}`}
          style={{
            border: "2px dashed oklch(var(--brand-accent))",
          }}
        />
        
        {/* Animated waveform visualization */}
        {listening && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="mx-0.5 w-1 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${Math.floor(Math.random() * 40) + 20}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-center text-sm text-foreground/80">Press and hold the microphone to speak</div>

      {/* Confidence Percentage */}
      {listening && transcript && (
        <div className="text-center text-sm font-medium">
          Confidence: <span className="text-blue-600">{confidence}%</span>
        </div>
      )}

      {/* IVR Mode Indicator */}
      {isIVRMode && (
        <div className="text-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 p-2 rounded">
          IVR Mode Active
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center text-sm text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded">
          Error: {error}
        </div>
      )}

      {/* Transcription Section */}
      <div className="grid gap-2 rounded-xl bg-card p-4 border">
        <div className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <MessageSquare className="h-3 w-3" />
          Transcription
        </div>
        <div 
          className={`rounded-lg bg-secondary p-3 min-h-12 ${isLargeText ? "text-lg" : ""}`} 
          aria-live="polite"
        >
          {transcript || "—"}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setTranscript("")
              setReply("")
              setShowExplanation(false)
              setCurrentExplanation(null)
              setError(null)
            }}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> {"Clear"}
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={async () => {
              if (transcript) {
                const translated = await translateText(transcript, "ml") // Translate to Malayalam by default
                setTranscript(`${transcript} → ${translated}`)
              }
            }}
          >
            <Languages className="h-4 w-4 mr-1" /> {"Translate to Malayalam"}
          </Button>
          <Button size="sm" variant="secondary" onClick={saveTranscript}>
            <Save className="h-4 w-4 mr-1" /> {"Save"}
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={() => setIsLargeText(!isLargeText)}
          >
            {isLargeText ? "Normal Text" : "Large Text"}
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={() => setIsVoiceOnly(!isVoiceOnly)}
          >
            {isVoiceOnly ? "Full Mode" : "Voice Only"}
          </Button>
        </div>
      </div>

      {/* AI Response Section */}
      <div className="grid gap-2 rounded-xl bg-card p-4 border">
        <div className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Volume2 className="h-3 w-3" />
          AI Response
        </div>
        <div 
          className={`rounded-lg bg-secondary p-3 min-h-12 ${isLargeText ? "text-lg" : ""}`} 
          aria-live="polite"
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-12">
              <Loader className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Processing your request...</span>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap">{reply || "—"}</pre>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={togglePlayback}
            disabled={!reply || isLoading}
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={async () => {
              if (reply) {
                const translated = await translateText(reply, "ml") // Translate to Malayalam by default
                setReply(`${reply} → ${translated}`)
              }
            }}
          >
            <Languages className="h-4 w-4 mr-1" /> {"Translate to Malayalam"}
          </Button>
          <Button size="sm" variant="secondary" onClick={saveTranscript}>
            <Save className="h-4 w-4 mr-1" /> {"Save"}
          </Button>
          <Button 
            size="sm" 
            variant={isIVRMode ? "default" : "outline"}
            onClick={() => setIsIVRMode(!isIVRMode)}
          >
            <Phone className="h-4 w-4 mr-1" />
            {isIVRMode ? "Exit IVR" : "IVR Mode"}
          </Button>
        </div>
        
        {/* AI Explanation */}
        {showExplanation && currentExplanation && (
          <AIResponseExplainer 
            input={currentExplanation.input}
            agent={currentExplanation.agent}
            ruleEngine={currentExplanation.ruleEngine}
            confidence={currentExplanation.confidence}
            decision={currentExplanation.decision}
            humanVerification={currentExplanation.humanVerification}
          />
        )}
      </div>

      {isIVRMode && (
        <div className="mt-4">
          <IVRDemo />
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground">Powered by Mistral AI</div>
    </div>
  )
}