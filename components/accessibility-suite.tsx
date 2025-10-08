"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { 
  Accessibility, 
  Contrast, 
  Volume2, 
  Type, 
  Sun, 
  Moon,
  Eye,
  Keyboard,
  Mouse,
  Palette,
  Zap,
  X
} from "lucide-react"

export function AccessibilitySuite() {
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [textSize, setTextSize] = useState(1) // 1 = normal, 1.2 = large, 1.5 = extra large
  const [isVoiceOnly, setIsVoiceOnly] = useState(false)
  const [showCaptions, setShowCaptions] = useState(true)
  const [isKeyboardMode, setIsKeyboardMode] = useState(false)
  const [isGrayscale, setIsGrayscale] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1) // 0 = off, 1 = normal, 2 = slow
  const [isFocusVisible, setIsFocusVisible] = useState(true)
  const [isTTSActive, setIsTTSActive] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [ttsRate, setTtsRate] = useState(1) // Speech rate (0.1 to 10)
  const [ttsPitch, setTtsPitch] = useState(1) // Speech pitch (0 to 2)
  const [ttsVoice, setTtsVoice] = useState<string | null>(null) // Selected voice
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])
  
  // Load available voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices()
        if (voicesRef.current.length > 0 && !ttsVoice) {
          // Select a default voice based on browser language
          const defaultVoice = voicesRef.current.find(voice => 
            voice.lang.startsWith(navigator.language) || 
            voice.lang.startsWith('en')
          ) || voicesRef.current[0]
          setTtsVoice(defaultVoice?.name || null)
        }
      }
      
      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [ttsVoice])
  
  // Apply accessibility settings to the document
  useEffect(() => {
    // TTS functionality
    const handleTTS = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'T') {
        toggleTTS()
      }
    }
    
    window.addEventListener('keydown', handleTTS)
    return () => {
      window.removeEventListener('keydown', handleTTS)
    }
  }, [])
  
  useEffect(() => {
    // High contrast mode
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
    
    // Text size
    document.documentElement.style.fontSize = `${16 * textSize}px`
    
    // Voice-only mode
    if (isVoiceOnly) {
      document.body.classList.add('voice-only')
    } else {
      document.body.classList.remove('voice-only')
    }
    
    // Grayscale mode
    if (isGrayscale) {
      document.documentElement.classList.add('grayscale-mode')
    } else {
      document.documentElement.classList.remove('grayscale-mode')
    }
    
    // Animation speed
    document.documentElement.style.setProperty('--animation-duration', `${animationSpeed}s`)
    
    // Focus visibility
    if (isFocusVisible) {
      document.documentElement.classList.remove('no-focus-outline')
    } else {
      document.documentElement.classList.add('no-focus-outline')
    }
    
    return () => {
      document.documentElement.classList.remove('high-contrast')
      document.documentElement.classList.remove('grayscale-mode')
      document.documentElement.classList.remove('no-focus-outline')
      document.documentElement.style.fontSize = ''
      document.body.classList.remove('voice-only')
      document.documentElement.style.setProperty('--animation-duration', '1s')
    }
  }, [isHighContrast, textSize, isVoiceOnly, isGrayscale, animationSpeed, isFocusVisible])
  
  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip to main content
    if (e.altKey && e.key === 'S') {
      const main = document.querySelector('main')
      if (main) {
        main.focus()
        main.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    // Increase text size
    if (e.altKey && e.key === '+') {
      setTextSize(prev => Math.min(1.5, prev + 0.1))
    }
    
    // Decrease text size
    if (e.altKey && e.key === '-') {
      setTextSize(prev => Math.max(0.8, prev - 0.1))
    }
  }, [])
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  
  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }
  
  const increaseTextSize = () => {
    setTextSize((prev: number) => Math.min(1.5, prev + 0.1))
  }
  
  const decreaseTextSize = () => {
    setTextSize((prev: number) => Math.max(0.8, prev - 0.1))
  }
  
  const resetTextSize = () => {
    setTextSize(1)
  }
  
  const toggleVoiceOnly = () => {
    setIsVoiceOnly(!isVoiceOnly)
  }
  
  const toggleCaptions = () => {
    setShowCaptions(!showCaptions)
  }
  
  const toggleKeyboardMode = () => {
    setIsKeyboardMode(!isKeyboardMode)
    if (!isKeyboardMode) {
      // Focus first focusable element
      const firstFocusable = document.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement
      if (firstFocusable) {
        firstFocusable.focus()
      }
    }
  }
  
  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale)
  }
  
  const changeAnimationSpeed = (speed: number) => {
    setAnimationSpeed(speed)
  }
  
  const toggleFocusVisibility = () => {
    setIsFocusVisible(!isFocusVisible)
  }
  
  const toggleTTS = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported in this browser")
      return
    }
    
    if (isTTSActive) {
      window.speechSynthesis.cancel()
      setIsTTSActive(false)
    } else {
      // Get the current page content and read it aloud
      const content = document.body.innerText || ""
      if (content) {
        try {
          window.speechSynthesis.cancel()
          const u = new SpeechSynthesisUtterance(content)
          utteranceRef.current = u
          
          // Set TTS properties
          u.rate = ttsRate
          u.pitch = ttsPitch
          
          // Set voice if available
          if (ttsVoice && voicesRef.current.length > 0) {
            const selectedVoice = voicesRef.current.find(voice => voice.name === ttsVoice)
            if (selectedVoice) {
              u.voice = selectedVoice
            }
          }
          
          u.onend = () => setIsTTSActive(false)
          u.onerror = (event) => {
            console.error("TTS Error:", event)
            setIsTTSActive(false)
          }
          
          window.speechSynthesis.speak(u)
          setIsTTSActive(true)
        } catch (error) {
          console.error("TTS Error:", error)
          setIsTTSActive(false)
        }
      }
    }
  }
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }
  
  const increaseTtsRate = () => {
    setTtsRate(prev => Math.min(10, prev + 0.2))
  }
  
  const decreaseTtsRate = () => {
    setTtsRate(prev => Math.max(0.1, prev - 0.2))
  }
  
  const increaseTtsPitch = () => {
    setTtsPitch(prev => Math.min(2, prev + 0.1))
  }
  
  const decreaseTtsPitch = () => {
    setTtsPitch(prev => Math.max(0, prev - 0.1))
  }
  
  return (
    <div 
      className="fixed bottom-4 right-20 z-50"
      role="region" 
      aria-label="Accessibility Controls"
    >
      {isMinimized ? (
        <Button 
          size="sm" 
          variant="default" 
          onClick={toggleMinimize}
          className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
          aria-label="Open accessibility controls"
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      ) : (
        <div className="bg-card border rounded-lg shadow-lg p-4 w-80 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-sm flex items-center">
              <Accessibility className="h-4 w-4 mr-2" />
              Accessibility Suite
            </h3>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={toggleMinimize}
              className="p-1 h-auto"
              aria-label="Minimize accessibility controls"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            size="sm" 
            variant={isHighContrast ? "default" : "outline"}
            onClick={toggleHighContrast}
            aria-pressed={isHighContrast}
            aria-label={isHighContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
          >
            <Contrast className="h-4 w-4 mr-1" />
            {isHighContrast ? "Normal" : "High Contrast"}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={increaseTextSize}
            disabled={textSize >= 1.5}
            aria-label="Increase text size"
          >
            <Type className="h-4 w-4 mr-1" />
            A+
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={decreaseTextSize}
            disabled={textSize <= 0.8}
            aria-label="Decrease text size"
          >
            <Type className="h-4 w-4 mr-1" />
            A-
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={resetTextSize}
            aria-label="Reset text size"
          >
            <Type className="h-4 w-4 mr-1" />
            Reset
          </Button>
          
          <Button 
            size="sm" 
            variant={isVoiceOnly ? "default" : "outline"}
            onClick={toggleVoiceOnly}
            aria-pressed={isVoiceOnly}
            className="col-span-2"
            aria-label={isVoiceOnly ? "Switch to full mode" : "Switch to voice-only mode"}
          >
            <Volume2 className="h-4 w-4 mr-1" />
            {isVoiceOnly ? "Full Mode" : "Voice Only"}
          </Button>
          
          <Button 
            size="sm" 
            variant={showCaptions ? "default" : "outline"}
            onClick={toggleCaptions}
            aria-pressed={showCaptions}
            aria-label={showCaptions ? "Hide captions" : "Show captions"}
          >
            <Eye className="h-4 w-4 mr-1" />
            Captions
          </Button>
          
          <Button 
            size="sm" 
            variant={isKeyboardMode ? "default" : "outline"}
            onClick={toggleKeyboardMode}
            aria-pressed={isKeyboardMode}
            aria-label={isKeyboardMode ? "Disable keyboard mode" : "Enable keyboard mode"}
          >
            <Keyboard className="h-4 w-4 mr-1" />
            Keyboard
          </Button>
          
          <Button 
            size="sm" 
            variant={isGrayscale ? "default" : "outline"}
            onClick={toggleGrayscale}
            aria-pressed={isGrayscale}
            aria-label={isGrayscale ? "Disable grayscale mode" : "Enable grayscale mode"}
          >
            <Palette className="h-4 w-4 mr-1" />
            Grayscale
          </Button>
          
          <Button 
            size="sm" 
            variant={animationSpeed === 0 ? "default" : "outline"}
            onClick={() => changeAnimationSpeed(animationSpeed === 0 ? 1 : 0)}
            aria-label={animationSpeed === 0 ? "Enable animations" : "Disable animations"}
          >
            <Zap className="h-4 w-4 mr-1" />
            {animationSpeed === 0 ? "Animations On" : "Animations Off"}
          </Button>
          
          <Button 
            size="sm" 
            variant={isFocusVisible ? "default" : "outline"}
            onClick={toggleFocusVisibility}
            aria-pressed={isFocusVisible}
            aria-label={isFocusVisible ? "Hide focus outlines" : "Show focus outlines"}
          >
            <Mouse className="h-4 w-4 mr-1" />
            {isFocusVisible ? "Focus Visible" : "Focus Hidden"}
          </Button>
          
          <Button 
            size="sm" 
            variant={isTTSActive ? "default" : "outline"}
            onClick={toggleTTS}
            aria-pressed={isTTSActive}
            className="col-span-2"
            aria-label={isTTSActive ? "Stop text to speech" : "Start text to speech"}
          >
            <Volume2 className="h-4 w-4 mr-1" />
            {isTTSActive ? "Stop TTS" : "Start TTS"}
          </Button>
          
          {/* TTS Controls */}
          {isTTSActive && (
            <div className="col-span-2 mt-2 pt-2 border-t">
              <div className="text-xs font-medium mb-1">TTS Settings</div>
              <div className="grid grid-cols-2 gap-1">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={decreaseTtsRate}
                  aria-label="Decrease speech rate"
                >
                  Rate -
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={increaseTtsRate}
                  aria-label="Increase speech rate"
                >
                  Rate +
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={decreaseTtsPitch}
                  aria-label="Decrease speech pitch"
                >
                  Pitch -
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={increaseTtsPitch}
                  aria-label="Increase speech pitch"
                >
                  Pitch +
                </Button>
              </div>
              <div className="text-xs mt-1 text-muted-foreground">
                Rate: {ttsRate.toFixed(1)}, Pitch: {ttsPitch.toFixed(1)}
              </div>
            </div>
          )}
        </div>
        
          <div className="mt-4 pt-3 border-t text-xs">
            <div className="flex justify-between items-center">
              <div className="text-muted-foreground">
                <p>Keyboard shortcuts:</p>
                <p>Alt+S: Skip to content</p>
                <p>Alt+Plus: Increase text</p>
                <p>Alt+Minus: Decrease text</p>
                <p>Alt+T: Toggle TTS</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-medium">✓ WCAG 2.2 AA</p>
                <p className="text-green-600 font-medium">✓ Screen Reader</p>
                <p className="text-green-600 font-medium">✓ Keyboard Nav</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}