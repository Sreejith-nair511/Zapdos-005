"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DigitalSarpanchLogo } from "@/components/digital-sarpanch-logo"

export function StartingAnimation({ onCompleted }: { onCompleted: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    "Initializing Digital Sarpanch...",
    "Connecting to AI agents...",
    "Loading governance modules...",
    "Preparing dashboard...",
    "Ready!"
  ]
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        // Animation completed
        const completionTimer = setTimeout(() => {
          onCompleted()
        }, 500)
        return () => clearTimeout(completionTimer)
      }
    }, 800)
    
    return () => clearTimeout(timer)
  }, [currentStep, onCompleted])
  
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DigitalSarpanchLogo size={80} />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold mt-6 text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Digital Sarpanch
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          India's AI-driven rural governance command center
        </motion.p>
        
        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0,
                x: index <= currentStep ? 0 : -20
              }}
              transition={{ delay: index * 0.2, duration: 0.3 }}
            >
              {index < currentStep && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
              )}
              {index === currentStep && (
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              )}
              {index > currentStep && (
                <div className="w-5 h-5 rounded-full border-2 border-muted" />
              )}
              <span className={index <= currentStep ? "text-foreground" : "text-muted-foreground"}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}