"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, MessageCircle, X, Sparkles, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  status?: "sending" | "delivered"
}

const aiResponses = [
  "I've analyzed the farm data and recommend increasing irrigation by 15% for optimal yield. This will help improve your crop health significantly.",
  "The water quality in your area is within acceptable parameters. No immediate action required. I'll continue monitoring for any changes.",
  "Power consumption has increased by 12% this month. Consider implementing energy-saving measures like solar panels for long-term benefits.",
  "Welfare scheme applications are processing normally. Expected completion in 3-5 business days. I'll notify you when it's done.",
  "Market prices for your crops are favorable this season. Consider selling soon for maximum profit. I can connect you with nearby buyers.",
  "Education program enrollment is at 95%. Additional resources allocated to improve outcomes. Your child's school is performing well.",
  "I've coordinated with other agents and identified a potential solution for your concern. Let me connect you with the relevant department.",
  "Based on advanced AI analysis, I recommend the following actions to optimize your operations: 1) Schedule maintenance, 2) Update records, 3) Apply for relevant schemes.",
  "Your query has been processed through our intelligent system. Here are the insights I've gathered from multiple data sources for your situation.",
  "I've cross-referenced this with national databases and found relevant information for you. Would you like me to explain the details?",
  "For your specific location, I recommend checking the soil health report which was generated last month. Shall I send it to you?",
  "I can help you apply for the PM-Kisan scheme. You're eligible based on your landholding details. Would you like to proceed?",
  "There's a community meeting scheduled for tomorrow regarding water distribution. Would you like me to register your attendance?",
  "Your irrigation schedule has been optimized based on weather forecasts. You can save up to 20% water with this plan.",
  "I noticed a discrepancy in your electricity bill. I've flagged it for review with the utility department."
]

const quickActions = [
  "Check my scheme eligibility",
  "View irrigation schedule",
  "Report water issue",
  "Get market prices",
  "Find nearby services"
]

// Load messages from localStorage
const loadMessages = (): Message[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("chatbot-messages")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Convert timestamp strings back to Date objects
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      } catch (e) {
        console.error("Failed to parse chatbot messages", e)
      }
    }
  }
  // Return default welcome message if no saved messages
  return [
    {
      id: "1",
      text: "Hello! I'm your Digital Sarpanch AI assistant. I can help you with agriculture, welfare schemes, education, and more. How can I assist you today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]
}

// Save messages to localStorage
const saveMessages = (messages: Message[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("chatbot-messages", JSON.stringify(messages))
    } catch (e) {
      console.error("Failed to save chatbot messages", e)
    }
  }
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(loadMessages())
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Save messages whenever they change
  useEffect(() => {
    saveMessages(messages)
  }, [messages])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "delivered"
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "ai",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Clear chat history
  const clearChat = () => {
    const welcomeMessage: Message[] = [
      {
        id: Date.now().toString(),
        text: "Hello again! I'm your Digital Sarpanch AI assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date()
      }
    ]
    setMessages(welcomeMessage)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.3 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 w-full max-w-md h-[500px] bg-card border rounded-xl shadow-2xl z-[60] flex flex-col overflow-hidden modern-bharat-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold">Digital Sarpanch AI</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearChat}
                  className="rounded-full h-8 w-8 p-0"
                  aria-label="Clear chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full h-8 w-8 p-0"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "ai" && (
                      <div className="flex-shrink-0 mr-2 mt-1">
                        <div className="bg-blue-500 rounded-full p-1.5">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-secondary text-secondary-foreground rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === "user" && message.status === "delivered" && (
                          <span className="text-xs opacity-70">✓✓</span>
                        )}
                      </div>
                    </div>
                    {message.sender === "user" && (
                      <div className="flex-shrink-0 ml-2 mt-1">
                        <div className="bg-primary rounded-full p-1.5">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex-shrink-0 mr-2 mt-1">
                      <div className="bg-blue-500 rounded-full p-1.5">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-2xl rounded-tl-none">
                      <div className="flex items-center gap-1">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 border-t border-b">
                <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs py-1 px-2"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message Digital Sarpanch..."
                    className="w-full px-4 py-3 text-sm border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary pr-12 min-h-[44px] max-h-[120px]"
                    rows={1}
                  />
                </div>
                <Button 
                  size="icon"
                  onClick={handleSend}
                  disabled={inputValue.trim() === "" || isTyping}
                  className="rounded-full h-10 w-10 self-end"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by IBM WatsonX AI • <span className="text-green-600">● Online</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="default"
        size="lg"
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-40"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  )
}