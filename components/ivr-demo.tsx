"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, Mic, Volume2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface KeypadButton {
  label: string
  value: string
  type: "digit" | "action"
}

const keypadButtons: KeypadButton[] = [
  { label: "1", value: "1", type: "digit" },
  { label: "2", value: "2", type: "digit" },
  { label: "3", value: "3", type: "digit" },
  { label: "4", value: "4", type: "digit" },
  { label: "5", value: "5", type: "digit" },
  { label: "6", value: "6", type: "digit" },
  { label: "7", value: "7", type: "digit" },
  { label: "8", value: "8", type: "digit" },
  { label: "9", value: "9", type: "digit" },
  { label: "*", value: "*", type: "digit" },
  { label: "0", value: "0", type: "digit" },
  { label: "#", value: "#", type: "digit" },
]

const ivrOptions = [
  "1. Check scheme eligibility",
  "2. Report issue",
  "3. Get updates",
  "4. Speak to officer",
  "5. Exit"
]

export function IVRDemo() {
  const [isActive, setIsActive] = useState(false)
  const [display, setDisplay] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [ttsActive, setTtsActive] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("Welcome to Digital Sarpanch IVR Service")
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  
  useEffect(() => {
    if (isActive && currentPrompt) {
      speakText(currentPrompt)
    }
  }, [isActive, currentPrompt])
  
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      utteranceRef.current = u
      u.onend = () => setTtsActive(false)
      window.speechSynthesis.speak(u)
      setTtsActive(true)
    } catch (error) {
      console.error("TTS Error:", error)
    }
  }
  
  const startIVR = () => {
    setIsActive(true)
    setDisplay("")
    setCurrentPrompt("Welcome to Digital Sarpanch IVR Service. Please select an option:\n" + ivrOptions.join("\n"))
  }
  
  const endIVR = () => {
    setIsActive(false)
    setDisplay("")
    setIsListening(false)
    setCurrentPrompt("")
    if (ttsActive) {
      window.speechSynthesis.cancel()
      setTtsActive(false)
    }
  }
  
  const handleKeyPress = (button: KeypadButton) => {
    if (button.type === "digit") {
      setDisplay(prev => prev + button.value)
      
      // Process the input after a short delay
      setTimeout(() => {
        processInput(button.value)
      }, 500)
    } else if (button.value === "*") {
      // Clear last digit
      setDisplay(prev => prev.slice(0, -1))
    }
  }
  
  const processInput = (input: string) => {
    switch (input) {
      case "1":
        setCurrentPrompt("You selected option 1. Checking your scheme eligibility...\nYou are eligible for PM-Kisan and MGNREGS schemes. Details sent to your registered mobile.")
        break
      case "2":
        setCurrentPrompt("You selected option 2. Please describe your issue after the beep.")
        setIsListening(true)
        // Simulate listening for 3 seconds
        setTimeout(() => {
          setIsListening(false)
          setCurrentPrompt("Thank you for reporting. Your issue has been logged. An officer will contact you shortly.")
        }, 3000)
        break
      case "3":
        setCurrentPrompt("You selected option 3. Here are your latest updates:\n1. Paddy procurement starts next week\n2. School mid-day meals resumed\n3. Water tanker schedule updated")
        break
      case "4":
        setCurrentPrompt("You selected option 4. Connecting you to an officer. Please wait...")
        // Simulate connection
        setTimeout(() => {
          setCurrentPrompt("You are now connected to Officer Asha Nair. How can I help you today?")
        }, 2000)
        break
      case "5":
        setCurrentPrompt("Thank you for using Digital Sarpanch IVR Service. Have a great day!")
        setTimeout(() => {
          endIVR()
        }, 2000)
        break
      default:
        setCurrentPrompt("Invalid option. Please select a valid option from the menu.")
        break
    }
  }
  
  const simulateVoiceInput = () => {
    setIsListening(true)
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false)
      setDisplay("Voice input received")
      setCurrentPrompt("Voice input processed. Thank you.")
    }, 2000)
  }

  return (
    <div className="relative">
      {isActive ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Phone Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white text-center relative">
              <h3 className="font-bold text-lg">Digital Sarpanch IVR</h3>
              <p className="text-sm opacity-90">Voice Service</p>
              <button 
                onClick={endIVR}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20"
                aria-label="Close IVR"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Display Screen */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 min-h-32 flex flex-col">
              <div className="flex-1 bg-white dark:bg-gray-600 rounded-lg p-3 mb-2 overflow-y-auto h-24">
                <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {currentPrompt}
                </p>
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 rounded p-2 text-right">
                <p className="text-lg font-mono">{display}</p>
              </div>
              
              {/* Voice Indicator */}
              {isListening && (
                <div className="flex items-center justify-center mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <Mic className="h-4 w-4 text-red-500 mr-2 animate-pulse" />
                  <span className="text-red-500 text-sm">Listening...</span>
                </div>
              )}
              
              {ttsActive && (
                <div className="flex items-center justify-center mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <Volume2 className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-blue-500 text-sm">Speaking...</span>
                </div>
              )}
            </div>
            
            {/* Keypad */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {keypadButtons.map((button) => (
                  <button
                    key={button.value}
                    onClick={() => handleKeyPress(button)}
                    className="bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg p-3 text-lg font-medium shadow transition-colors"
                    aria-label={`Press ${button.label}`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={simulateVoiceInput}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Voice
                </Button>
                <Button
                  onClick={endIVR}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  End
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={startIVR}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          <Phone className="h-4 w-4 mr-2" />
          Start IVR Demo
        </Button>
      )}
    </div>
  )
}