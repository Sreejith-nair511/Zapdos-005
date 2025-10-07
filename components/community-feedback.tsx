"use client"
import useSWR from "swr"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeedbackItem {
  id: string
  avatar: string
  quote: string
  language: string
  audioUrl?: string
  subtitle?: string
}

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function CommunityFeedback() {
  const { data } = useSWR("/api/community", fetcher, { refreshInterval: 15000 })
  const items: FeedbackItem[] = data?.items ?? [
    { 
      id: "1",
      avatar: "/citizen-avatar.jpg", 
      quote: "I get my welfare updates by phone now.", 
      language: "en",
      subtitle: "मुझे अब फोन पर मेरे कल्याण अपडेट मिलते हैं।"
    },
    { 
      id: "2",
      avatar: "/citizen-avatar.jpg", 
      quote: "The AI tells me when to water my fields.", 
      language: "en",
      subtitle: "एआई मुझे बताता है कि मेरे खेतों को कब पानी देना है।"
    },
    {
      id: "3",
      avatar: "/citizen-avatar.jpg",
      quote: "School attendance tracking helps my child's education.",
      language: "en",
      subtitle: "स्कूल उपस्थिति ट्रैकिंग मेरे बच्चे की शिक्षा में मदद करती है।"
    }
  ]
  
  const [idx, setIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
    const id = setInterval(() => setIdx((i: number) => (i + 1) % items.length), 6000)
    return () => clearInterval(id)
  }, [items.length])
  
  const current = items[idx]
  
  const handlePlay = () => {
    // In a real implementation, this would play the actual audio
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 3000) // Simulate 3 second audio
  }
  
  const handlePause = () => {
    setIsPlaying(false)
  }
  
  return (
    <div className="rounded-xl bg-card p-3 sm:p-4 ring-1 ring-border bg-gradient-to-br from-background to-secondary/10 backdrop-blur-sm">
      <div className="text-sm sm:text-base font-medium mb-2 bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{"💬 Community Voices Carousel"}</div>
      
      <div className="relative h-40 sm:h-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img
                src={current.avatar || "/placeholder.svg"}
                alt="Citizen avatar"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-1 ring-border"
              />
              <div>
                <div className="font-medium text-sm sm:text-base">Community Member</div>
                <div className="text-xs text-muted-foreground">
                  Speaking in {current.language === 'en' ? 'English' : 'Local Language'}
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <blockquote className="text-base sm:text-lg text-pretty italic">"{current.quote}"</blockquote>
              
              {showSubtitles && current.subtitle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground"
                >
                  {current.subtitle}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 mt-3 sm:mt-4">
        <div className="flex gap-1 sm:gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={isPlaying ? handlePause : handlePlay}
            className="text-xs sm:text-sm"
          >
            {isPlaying ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
            <span className="hidden xs:inline ml-1">{isPlaying ? "Pause" : "Play"}</span>
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowSubtitles(!showSubtitles)}
            className="text-xs sm:text-sm"
          >
            <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden xs:inline">
              {showSubtitles ? "Hide" : "Show"}
            </span>
          </Button>
        </div>
        
        <div className="flex gap-1">
          {items.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === idx ? "bg-primary" : "bg-muted"
              }`}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}