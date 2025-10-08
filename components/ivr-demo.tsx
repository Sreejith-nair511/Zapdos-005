"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, Mic, Volume2, X, Loader, Leaf, Droplets } from "lucide-react"
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
  "2. Report crop issue",
  "3. Get irrigation advice",
  "4. Speak to officer",
  "5. Power outage report",
  "6. Water supply status",
  "7. School information",
  "8. Health services",
  "9. Market prices",
  "0. More options",
  "#. Emergency alert",
  "*. Back/Cancel",
  "99. Exit"
]

// Payyanur-specific crop issues and solutions
const cropIssues = [
  {
    keywords: ["paddy", "crop", "drying", "water", "irrigation"],
    response: "I understand your paddy crop is drying. Based on soil moisture data from our sensors in Payyanur, you should irrigate your fields in 2 days. The optimal time is early morning before 9 AM to reduce water evaporation.",
    icon: <Leaf className="h-4 w-4 text-green-500" />
  },
  {
    keywords: ["pest", "insect", "damage", "insects"],
    response: "For pest control in your paddy fields, our WatsonX AI recommends using neem-based organic pesticides. Apply in the evening when insects are most active. We can connect you with the nearest agricultural officer for specific guidance.",
    icon: <Leaf className="h-4 w-4 text-red-500" />
  },
  {
    keywords: ["fertilizer", "nutrition", "yellow", "leaves"],
    response: "Yellowing leaves indicate nitrogen deficiency. Our recommendation is to apply organic compost and neem cake fertilizer. The next application should be in 10 days. We'll send you a reminder via SMS.",
    icon: <Leaf className="h-4 w-4 text-yellow-500" />
  },
  {
    keywords: ["weather", "rain", "forecast", "storm"],
    response: "Our weather monitoring system shows a 70% chance of rainfall in the next 48 hours. Postpone any irrigation for 3 days. We'll alert you if there are any severe weather warnings for Payyanur.",
    icon: <Droplets className="h-4 w-4 text-blue-500" />
  },
  // New crop issues
  {
    keywords: ["disease", "fungus", "blight", "wilt"],
    response: "Based on your description, your crop may have a fungal infection. Our recommendation is to apply a fungicide treatment immediately. Mix 2 grams of Carbendazim per liter of water and spray in the evening. We'll connect you with an agricultural officer for further assistance.",
    icon: <Leaf className="h-4 w-4 text-purple-500" />
  },
  {
    keywords: ["soil", "ph", "acidity", "alkalinity"],
    response: "Soil testing indicates pH imbalance. For acidic soil (pH below 6), add lime. For alkaline soil (pH above 8), add organic matter like compost. The ideal pH for paddy cultivation is between 6-7.5. We'll send a soil expert to your location.",
    icon: <Leaf className="h-4 w-4 text-orange-500" />
  },
  {
    keywords: ["seed", "sowing", "planting", "germination"],
    response: "For optimal paddy cultivation in Payyanur, the recommended sowing time is between June 15-30 for the monsoon crop. Use certified seeds with a germination rate above 85%. Pre-soak seeds for 24 hours before sowing. Maintain proper spacing of 20x15 cm for better yield.",
    icon: <Leaf className="h-4 w-4 text-green-500" />
  },
  {
    keywords: ["harvest", "yield", "cutting", "threshing"],
    response: "Your paddy crop is ready for harvest when 85% of grains turn golden yellow. The optimal time for harvesting is in the early morning or late evening to prevent grain shattering. After cutting, allow 2-3 days for proper drying before threshing.",
    icon: <Leaf className="h-4 w-4 text-yellow-500" />
  }
]

// New service issues
const serviceIssues = [
  {
    keywords: ["power", "electricity", "outage", "light"],
    response: "We've registered your power outage report. Our technician will visit within 24 hours. For immediate assistance, please contact the emergency helpline at 1912. You'll receive an SMS update when the technician is dispatched.",
    icon: <Droplets className="h-4 w-4 text-yellow-500" />
  },
  {
    keywords: ["water", "supply", "tanker", "tap"],
    response: "Your area's water supply schedule shows the next tanker delivery on Thursday at 10 AM. For urgent needs, you can request an emergency delivery by pressing 1. Current water quality is normal with no contamination detected.",
    icon: <Droplets className="h-4 w-4 text-blue-500" />
  },
  {
    keywords: ["school", "education", "attendance", "fees"],
    response: "Your child's attendance is 92% this month which is excellent. School fees for the next term are due by 15th. Mid-day meals are being served daily. The next parent-teacher meeting is scheduled for Friday at 3 PM.",
    icon: <Droplets className="h-4 w-4 text-green-500" />
  },
  {
    keywords: ["health", "hospital", "doctor", "medicine"],
    response: "The nearest primary health center is 2 km away and open from 9 AM to 5 PM. For emergencies, the district hospital is 15 km away. Essential medicines are available in stock. Mobile health camps are scheduled for next month.",
    icon: <Droplets className="h-4 w-4 text-red-500" />
  },
  {
    keywords: ["market", "price", "vegetable", "grain"],
    response: "Today's market prices: Paddy - ₹18 per kg, Wheat - ₹22 per kg, Vegetables - ₹35-60 per kg. Government procurement rate for paddy is ₹19 per kg. Weekly market is scheduled for tomorrow with additional vendors.",
    icon: <Droplets className="h-4 w-4 text-orange-500" />
  },
  {
    keywords: ["road", "maintenance", "repair", "construction"],
    response: "We've registered your road maintenance request. Our inspection team will visit within 48 hours to assess the damage. Priority is given to roads affecting school transportation and emergency services. You'll receive an SMS with the estimated repair time.",
    icon: <Droplets className="h-4 w-4 text-gray-500" />
  },
  {
    keywords: ["waste", "garbage", "collection", "cleanliness"],
    response: "Waste collection in your area is scheduled for every Tuesday and Friday. Please place biodegradable waste in green bins and non-biodegradable waste in blue bins. For missed collections or overflow issues, our team will address them within 24 hours.",
    icon: <Droplets className="h-4 w-4 text-purple-500" />
  },
  {
    keywords: ["birth", "death", "certificate", "registration"],
    response: "For birth/death certificate registration, please visit the panchayat office with required documents. Required documents for birth: Hospital certificate + parent ID proof. For death: Medical certificate + family ID proof. Processing time is 7 working days.",
    icon: <Droplets className="h-4 w-4 text-pink-500" />
  },
  {
    keywords: ["pension", "elderly", "senior", "citizen"],
    response: "Your pension details show regular payments of ₹2000/month. Next disbursement is scheduled for the 5th of this month. For any discrepancies or delays, please contact the pension officer at 04985-222222. Annual pension verification is due next month.",
    icon: <Droplets className="h-4 w-4 text-indigo-500" />
  }
]

// Additional sub-menu options
const moreOptions = [
  "1. Road maintenance request",
  "2. Waste collection schedule",
  "3. Birth/death certificate process",
  "4. Pension status inquiry",
  "5. Digital Sarpanch cost breakdown",
  "6. Previous menu",
  "99. Exit"
]

export function IVRDemo() {
  const [isActive, setIsActive] = useState(false)
  const [display, setDisplay] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [ttsActive, setTtsActive] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("Welcome to Digital Sarpanch IVR Service - Payyanur Edition")
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)
  const [recognizedText, setRecognizedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [dialect, setDialect] = useState("ml-IN") // Malayalam (India) as default for Payyanur
  const [detectedIssue, setDetectedIssue] = useState<any>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const recognitionRef = useRef<any>(null)
  
  // Load available voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices)
        
        // Select a default voice based on browser language
        if (availableVoices.length > 0 && !selectedVoice) {
          // Prefer Malayalam voices for Payyanur
          const mlVoice = availableVoices.find(voice => 
            voice.lang.includes("ml") || voice.lang.includes("Malayalam")
          )
          
          const defaultVoice = mlVoice || availableVoices.find(voice => 
            voice.lang.startsWith(navigator.language) || 
            voice.lang.startsWith('en')
          ) || availableVoices[0]
          
          setSelectedVoice(defaultVoice?.name || null)
        }
      }
      
      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [selectedVoice])
  
  // Initialize speech recognition with dialect support
  useEffect(() => {
    // Check for browser support
    const isSpeechRecognitionSupported = 
      typeof window !== "undefined" && 
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window);
    
    if (isSpeechRecognitionSupported) {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = dialect; // Set to Malayalam for Payyanur
      
      recognition.onstart = () => {
        setIsListening(true);
        setRecognizedText("");
      };
      
      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setRecognizedText(finalTranscript + interimTranscript);
      };
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        setRecognizedText(`Error: ${event.error}`);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        if (recognizedText) {
          processVoiceInput(recognizedText);
        }
      };
      
      recognitionRef.current = recognition;
    } else {
      console.warn("Speech recognition not supported in this browser");
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [recognizedText, dialect])
  
  useEffect(() => {
    if (isActive && currentPrompt) {
      speakText(currentPrompt)
    }
  }, [isActive, currentPrompt])
  
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported in this browser")
      return
    }
    
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      utteranceRef.current = u
      
      // Set voice if available
      if (selectedVoice && voices.length > 0) {
        const voice = voices.find(v => v.name === selectedVoice)
        if (voice) {
          u.voice = voice
        }
      }
      
      u.rate = 1.0 // Normal speech rate
      u.pitch = 1.0 // Normal pitch
      u.volume = 1.0 // Max volume
      
      u.onend = () => setTtsActive(false)
      u.onerror = (event) => {
        console.error("TTS Error:", event)
        setTtsActive(false)
      }
      
      window.speechSynthesis.speak(u)
      setTtsActive(true)
    } catch (error) {
      console.error("TTS Error:", error)
      setTtsActive(false)
    }
  }
  
  const startIVR = () => {
    setIsActive(true)
    setDisplay("")
    setDetectedIssue(null)
    setCurrentPrompt("Welcome to Digital Sarpanch IVR Service - Payyanur Edition\nPlease select an option:\n" + ivrOptions.slice(0, -1).join("\n") + "\n" + ivrOptions[ivrOptions.length - 1])
  }
  
  const endIVR = () => {
    setIsActive(false)
    setDisplay("")
    setIsListening(false)
    setCurrentPrompt("")
    setRecognizedText("")
    setDetectedIssue(null)
    if (ttsActive) {
      window.speechSynthesis.cancel()
      setTtsActive(false)
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop()
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
    // Handle main menu options
    switch (input) {
      case "1":
        setCurrentPrompt("You selected option 1. Checking scheme eligibility...\nYou are eligible for PM-Kisan, MGNREGS, and PM-SYM. Details have been sent to your registered mobile number.")
        break
      case "2":
        setCurrentPrompt("You selected option 2. Please describe your crop issue after the beep. For example: My paddy crop is drying due to lack of water.")
        startVoiceRecognition()
        break
      case "3":
        setCurrentPrompt("You selected option 3. Here are your latest irrigation updates:\n1. Next paddy procurement starts next week\n2. School mid-day meal program resumed\n3. Water tanker schedule updated")
        break
      case "4":
        setCurrentPrompt("You selected option 4. Connecting to an officer. Please hold...")
        // Simulate connection
        setTimeout(() => {
          setCurrentPrompt("You are now connected to Officer Asha Nair. How can I assist you today?")
        }, 2000)
        break
      case "5":
        setCurrentPrompt("You selected option 5. Please describe the power outage issue. For example: No electricity in our area for 3 hours.")
        startVoiceRecognition()
        break
      case "6":
        setCurrentPrompt("You selected option 6. Checking water supply status...\nYour area's water supply schedule shows the next tanker delivery on Thursday at 10 AM. For urgent needs, you can request an emergency delivery by pressing 1.")
        break
      case "7":
        setCurrentPrompt("You selected option 7. Here's the school information:\n1. School attendance is 92% this month\n2. Fees for next term due by 15th\n3. Parent-teacher meeting scheduled for Friday at 3 PM")
        break
      case "8":
        setCurrentPrompt("You selected option 8. Health services information:\nThe nearest primary health center is 2 km away and open from 9 AM to 5 PM. Essential medicines are available in stock.")
        break
      case "9":
        setCurrentPrompt("You selected option 9. Today's market prices:\nPaddy - ₹18 per kg, Wheat - ₹22 per kg, Vegetables - ₹35-60 per kg. Government procurement rate for paddy is ₹19 per kg.")
        break
      case "0":
        setCurrentPrompt("More options:\n" + moreOptions.join("\n"))
        break
      case "#":
        setCurrentPrompt("Emergency alert activated. Please describe the emergency after the beep. For example: Medical emergency at house number 15.")
        startVoiceRecognition()
        break
      case "*":
        // Clear last digit or go back to main menu
        setDisplay("")
        setCurrentPrompt("Main menu:\n" + ivrOptions.slice(0, -1).join("\n") + "\n" + ivrOptions[ivrOptions.length - 1])
        break
      case "99":
        setCurrentPrompt("Thank you for using Digital Sarpanch IVR Service. Have a great day!")
        setTimeout(() => {
          endIVR()
        }, 2000)
        break
      default:
        // Handle sub-menu options when in more options mode
        if (currentPrompt.includes("More options")) {
          switch (input) {
            case "1":
              setCurrentPrompt("You selected road maintenance request. Please describe the issue after the beep. For example: Potholes on Main Street near the school.")
              startVoiceRecognition()
              break
            case "2":
              setCurrentPrompt("Waste collection schedule:\nMonday, Wednesday, Friday: Biodegradable waste\nTuesday, Thursday, Saturday: Non-biodegradable waste\nSunday: No collection (deep cleaning day)")
              break
            case "3":
              setCurrentPrompt("Birth/Death Certificate Process:\n1. Visit panchayat office with documents\n2. Fill application form\n3. Pay ₹5 processing fee\n4. Receive certificate in 7 working days\nFor home collection, call 04985-222222")
              break
            case "4":
              setCurrentPrompt("You selected pension status inquiry. Please provide your registered mobile number or pension ID after the beep.")
              startVoiceRecognition()
              break
            case "5":
              // Cost breakdown information
              setCurrentPrompt("Digital Sarpanch Cost Breakdown (Per Village):\n\nSETUP COSTS:\n• AI Development: ₹35,000 (One-time)\n• Edge Gateway: ₹9,000 (One-time)\n• IVR/SMS Setup: ₹2,500 (Monthly)\n• Cloud Infrastructure: ₹1,500 (Monthly)\n• Training: ₹5,000 (One-time)\n• Data Integration: ₹3,000 (One-time)\n\nTOTAL SETUP: ₹52,000\nANNUAL OPERATING: ₹60,000\n\nREVENUE: ₹3,00,000 (B2G + CSR + SaaS)\nPROFIT MARGIN: ~62%")
              break
            case "6":
              // Back to main menu
              setCurrentPrompt("Main menu:\n" + ivrOptions.slice(0, -1).join("\n") + "\n" + ivrOptions[ivrOptions.length - 1])
              break
            case "99":
              setCurrentPrompt("Thank you for using Digital Sarpanch IVR Service. Have a great day!")
              setTimeout(() => {
                endIVR()
              }, 2000)
              break
            default:
              setCurrentPrompt("Invalid option. Please select a valid option from the menu.\n" + moreOptions.join("\n"))
          }
        } else {
          setCurrentPrompt("Invalid option. Please select a valid option from the menu.\nMain menu:\n" + ivrOptions.slice(0, -1).join("\n") + "\n" + ivrOptions[ivrOptions.length - 1])
        }
        break
    }
  }
  
  const startVoiceRecognition = () => {
    const isSpeechRecognitionSupported = 
      typeof window !== "undefined" && 
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window);
    
    if (!isSpeechRecognitionSupported) {
      console.warn("Speech recognition not supported in this browser");
      setCurrentPrompt("Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience.");
      return;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = dialect;
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
        setCurrentPrompt("Sorry, I couldn't start voice recognition. Please try again.");
      }
    } else {
      console.warn("Speech recognition not initialized");
      setCurrentPrompt("Voice recognition is not available. Please ensure you're using a supported browser.");
    }
  }
  
  const processVoiceInput = (text: string) => {
    setIsProcessing(true);
    setDisplay(text);
    
    // Simulate WatsonX AI processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Convert to lowercase for matching
      const lowerText = text.toLowerCase();
      
      // Check for specific exit commands
      if (lowerText.includes("exit") || lowerText.includes("bye") || lowerText.includes("thank you")) {
        setCurrentPrompt("Thank you for using Digital Sarpanch IVR Service. Have a great day!");
        setTimeout(() => {
          endIVR();
        }, 2000);
        return;
      }
      
      // Detect crop issue based on keywords
      const cropIssue = cropIssues.find(item => 
        item.keywords.some(keyword => lowerText.includes(keyword))
      );
      
      if (cropIssue) {
        setDetectedIssue(cropIssue);
        setCurrentPrompt(`${cropIssue.response}\n\nWas this advice helpful? Do you need any other assistance?`);
        return;
      }
      
      // Detect service issue based on keywords
      const serviceIssue = serviceIssues.find(item => 
        item.keywords.some(keyword => lowerText.includes(keyword))
      );
      
      if (serviceIssue) {
        setDetectedIssue(serviceIssue);
        setCurrentPrompt(`${serviceIssue.response}\n\nWe've logged your request. Do you need any other assistance?`);
        return;
      }
      
      // Check for numbers to navigate menu
      const numbers = text.match(/\d+/g);
      if (numbers && numbers.length > 0) {
        const number = numbers[0];
        if (number === "99") {
          setCurrentPrompt("Thank you for using Digital Sarpanch IVR Service. Have a great day!");
          setTimeout(() => {
            endIVR();
          }, 2000);
          return;
        }
        // Process as menu selection
        processInput(number);
        return;
      }
      
      // Default response for unrecognized issues
      setCurrentPrompt(`I heard: "${text}". Thank you for your input. We've logged your issue. An officer will contact you soon.\n\nDo you need help with anything else? Press 0 for more options or 99 to exit.`);
    }, 3000); // Simulate processing time for WatsonX AI
  }

  return (
    <div className="relative">
      {isActive ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md overflow-hidden">
            {/* Phone Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 md:p-4 text-white text-center relative">
              <h3 className="font-bold text-base md:text-lg">Digital Sarpanch IVR - Payyanur</h3>
              <p className="text-xs md:text-sm opacity-90">പയ്യന്നൂർ പൈലറ്റ് പദ്ധതി</p>
              <button 
                onClick={endIVR}
                className="absolute top-2 right-2 md:top-3 md:right-3 p-1 rounded-full hover:bg-white/20"
                aria-label="Close IVR"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
            
            {/* Display Screen */}
            <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 min-h-28 md:min-h-32 flex flex-col">
              <div className="flex-1 bg-white dark:bg-gray-600 rounded-lg p-2 md:p-3 mb-2 overflow-y-auto h-20 md:h-24">
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {currentPrompt}
                </p>
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 rounded p-2 text-right">
                <p className="text-base md:text-lg font-mono">{display}</p>
              </div>
              
              {/* Voice Recognition Display */}
              {(isListening || recognizedText || isProcessing) && (
                <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <Loader className="h-3 w-3 md:h-4 md:w-4 text-blue-500 mr-2 animate-spin" />
                      <span className="text-blue-500 text-xs md:text-sm">WatsonX AI processing...</span>
                    </div>
                  ) : isListening ? (
                    <div className="flex items-center">
                      <Mic className="h-3 w-3 md:h-4 md:w-4 text-blue-500 mr-2 animate-pulse" />
                      <span className="text-blue-500 text-xs md:text-sm">Listening... Please speak now</span>
                    </div>
                  ) : (
                    <div className="text-xs md:text-sm text-blue-500">
                      <span className="font-medium">Recognized:</span> {recognizedText}
                    </div>
                  )}
                </div>
              )}
              
              {/* Detected Issue Display */}
              {detectedIssue && (
                <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded flex items-center">
                  {detectedIssue.icon}
                  <span className="text-green-700 dark:text-green-300 text-xs md:text-sm ml-2">
                    Solution Identified
                  </span>
                </div>
              )}
              
              {ttsActive && (
                <div className="flex items-center justify-center mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded">
                  <Volume2 className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-2" />
                  <span className="text-green-500 text-xs md:text-sm">Speaking...</span>
                </div>
              )}
            </div>
            
            {/* Keypad */}
            <div className="p-3 md:p-4 bg-gray-100 dark:bg-gray-700">
              <div className="grid grid-cols-3 gap-1 md:gap-2 mb-2 md:mb-3">
                {keypadButtons.map((button) => (
                  <button
                    key={button.value}
                    onClick={() => handleKeyPress(button)}
                    className="bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg p-2 md:p-3 text-base md:text-lg font-medium shadow transition-colors"
                    aria-label={`Press ${button.label}`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={startVoiceRecognition}
                  disabled={isListening || isProcessing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs md:text-sm"
                >
                  <Mic className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Voice
                </Button>
                <Button
                  onClick={endIVR}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-xs md:text-sm"
                >
                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  End
                </Button>
              </div>
              
              {/* Voice Selection */}
              {voices.length > 0 && (
                <div className="mt-2 md:mt-3">
                  <label htmlFor="voice-select" className="text-xs text-gray-600 dark:text-gray-300 block mb-1">
                    Voice:
                  </label>
                  <select
                    id="voice-select"
                    value={selectedVoice || ""}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full text-xs p-1 rounded border bg-white dark:bg-gray-600"
                    aria-label="Select voice for text-to-speech"
                  >
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Dialect Selection for Payyanur */}
              <div className="mt-2 md:mt-3">
                <label htmlFor="dialect-select" className="text-xs text-gray-600 dark:text-gray-300 block mb-1">
                  Language:
                </label>
                <select
                  id="dialect-select"
                  value={dialect}
                  onChange={(e) => setDialect(e.target.value)}
                  className="w-full text-xs p-1 rounded border bg-white dark:bg-gray-600"
                  aria-label="Select Payyanur language dialect"
                >
                  <option value="ml-IN">Malayalam (Payyanur dialect)</option>
                  <option value="ml">Malayalam (Standard)</option>
                  <option value="en-IN">English (India)</option>
                  <option value="en-US">English (US)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={startIVR}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm md:text-base"
        >
          <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          Start IVR Demo
        </Button>
      )}
    </div>
  )
}