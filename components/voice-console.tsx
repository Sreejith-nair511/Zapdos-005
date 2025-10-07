"use client"
import { useEffect, useRef, useState } from "react"
import { Mic, RotateCcw, Languages, MessageSquare, Play, Pause, Save, Phone } from "lucide-react"
import { useI18n } from "./i18n-provider"
import { Button } from "@/components/ui/button"
import { IVRDemo } from "@/components/ivr-demo"

const sampleTranscripts = [
  "Checking paddy field status...",
  "My crop is drying due to heatwave.",
  "Is PM-Kisan payment processed?",
  "School attendance for ward 5.",
  "Power outage in our area.",
  "Water tank is almost empty.",
  "Need help with crop insurance.",
]

const aiReplies = [
  "Your paddy field shows moisture drop. Alerting irrigation officer.",
  "PM-Kisan payment credited to your account.",
  "School attendance is above 92% today.",
  "Irrigation slots scheduled this evening.",
  "Power outage reported. Technician dispatched.",
  "Water tank level critical. Refill scheduled.",
  "Crop insurance claim processed. Amount credited.",
  "Fertilizer shortage predicted. Irrigate within 3 hours.",
]

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
  const waveRef = useRef<HTMLDivElement>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let id: any
    if (listening) {
      id = setInterval(() => {
        const i = Math.floor(Math.random() * sampleTranscripts.length)
        setTranscript(sampleTranscripts[i])
        setConfidence(Math.floor(Math.random() * 40) + 60) // 60-99%
      }, 1500)
    }
    return () => clearInterval(id)
  }, [listening])

  useEffect(() => {
    if (!reply) return
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    try {
      const u = new SpeechSynthesisUtterance(reply)
      utteranceRef.current = u
      // prefer local language voices if available
      const voices = window.speechSynthesis.getVoices()
      const pref =
        voices.find((v) => v.lang?.toLowerCase().startsWith(lang)) || voices.find((v) => v.lang?.includes("en-IN"))
      if (pref) u.voice = pref
      u.onend = () => setIsPlaying(false)
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
      setIsPlaying(true)
    } catch {}
  }, [reply, lang])

  const handleStart = () => {
    setListening(true)
    setReply("")
  }
  
  const handleStop = () => {
    setListening(false)
    const i = Math.floor(Math.random() * aiReplies.length)
    setReply(aiReplies[i])
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

  // IVR Simulation - replaced with IVRDemo component

  return (
    <div className={`grid gap-4 ${isVoiceOnly ? "voice-only-mode" : ""}`}>
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
        >
          <Mic className="h-8 w-8" />
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

      <div className="text-center text-sm text-foreground/80">{t("speak")}</div>

      {/* Confidence Percentage */}
      {listening && transcript && (
        <div className="text-center text-xs">
          Confidence: {confidence}%
        </div>
      )}

      {/* IVR Mode Indicator */}
      {isIVRMode && (
        <div className="text-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 p-2 rounded">
          IVR Mode Active
        </div>
      )}

      {/* Transcription Section */}
      <div className="grid gap-2 rounded-xl bg-card p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{"Transcription"}</div>
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
            }}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> {"Replay"}
          </Button>
          <Button size="sm" variant="secondary">
            <Languages className="h-4 w-4 mr-1" /> {"Translate"}
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
      <div className="grid gap-2 rounded-xl bg-card p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{"AI Response"}</div>
        <div 
          className={`rounded-lg bg-secondary p-3 min-h-12 ${isLargeText ? "text-lg" : ""}`} 
          aria-live="polite"
        >
          <pre className="whitespace-pre-wrap">{reply || "—"}</pre>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={togglePlayback}
            disabled={!reply}
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button size="sm" variant="secondary">
            <Languages className="h-4 w-4 mr-1" /> {"Translate"}
          </Button>
          <Button size="sm" variant="secondary" onClick={saveTranscript}>
            <Save className="h-4 w-4 mr-1" /> {"Save"}
          </Button>
          <IVRDemo />
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground">{t("offline")}</div>
    </div>
  )
}