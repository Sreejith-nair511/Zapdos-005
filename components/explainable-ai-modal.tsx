"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight, Brain, Mic, FileText, Network, User, Check } from "lucide-react"

interface AIStep {
  id: string
  title: string
  description: string
  confidence: number
  icon: React.ReactNode
}

export function ExplainableAIModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  const aiSteps: AIStep[] = [
    {
      id: "input",
      title: "Voice Input",
      description: "Farmer reports: \"My fields need irrigation\"",
      confidence: 95,
      icon: <Mic className="h-5 w-5" />
    },
    {
      id: "parser",
      title: "WatsonX Parser",
      description: "Natural language processed and structured",
      confidence: 92,
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: "model",
      title: "Predictive Model (Farm Agent)",
      description: "Soil moisture analysis and irrigation prediction",
      confidence: 88,
      icon: <Brain className="h-5 w-5" />
    },
    {
      id: "coordinator",
      title: "Coordinator Decision",
      description: "Cross-agent validation and priority assignment",
      confidence: 90,
      icon: <Network className="h-5 w-5" />
    },
    {
      id: "verification",
      title: "Human Verification",
      description: "Officer review and approval",
      confidence: 98,
      icon: <User className="h-5 w-5" />
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Brain className="h-4 w-4 mr-2" />
          Explain AI Reasoning
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-500" />
            Explainable AI Decision Process
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="relative">
            {/* Connection lines */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-8">
              {aiSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative pl-12"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Step icon */}
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-500">
                    {step.icon}
                  </div>
                  
                  {/* Connection to next step */}
                  {index < aiSteps.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-blue-300 transform -translate-x-1/2"></div>
                  )}
                  
                  {/* Arrow to next step */}
                  {index < aiSteps.length - 1 && (
                    <motion.div
                      className="absolute left-3 top-12 text-blue-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="h-5 w-5 rotate-90" />
                    </motion.div>
                  )}
                  
                  {/* Step content */}
                  <div className="bg-card rounded-lg p-4 border shadow-sm">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        {step.confidence}%
                      </div>
                    </div>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                    
                    {/* Confidence bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Confidence Score</span>
                        <span>{step.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-green-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${step.confidence}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              Final Decision
            </h4>
            <p className="mt-2 text-blue-700">
              Based on the analysis, the system recommends immediate irrigation for the reported fields. 
              This decision has an overall confidence score of 92%.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}