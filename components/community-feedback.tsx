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
    <div className="rounded-xl bg-card p-4 ring-1 ring-border">
      <div className="text-sm font-medium mb-2">{"💬 Community Voices Carousel"}</div>
      
      <div className="relative h-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={current.avatar || "/placeholder.svg"}
                alt="Citizen avatar"
                className="h-12 w-12 rounded-full ring-1 ring-border"
              />
              <div>
                <div className="font-medium">Community Member</div>
                <div className="text-xs text-muted-foreground">
                  Speaking in {current.language === 'en' ? 'English' : 'Local Language'}
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <blockquote className="text-lg text-pretty italic">"{current.quote}"</blockquote>
              
              {showSubtitles && current.subtitle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 text-sm text-muted-foreground"
                >
                  {current.subtitle}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowSubtitles(!showSubtitles)}
          >
            <Volume2 className="h-4 w-4 mr-1" />
            {showSubtitles ? "Hide Subtitles" : "Show Subtitles"}
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