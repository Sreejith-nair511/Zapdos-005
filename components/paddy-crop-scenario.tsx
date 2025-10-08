"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Phone, 
  Mic, 
  Volume2, 
  Leaf, 
  Droplets, 
  Thermometer, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Brain
} from "lucide-react"
import { IVRDemo } from "@/components/ivr-demo"

export function PaddyCropScenario() {
  const [simulationStep, setSimulationStep] = useState(0)
  const [isIVRActive, setIsIVRActive] = useState(false)
  
  const steps = [
    {
      title: "Citizen Dials IVR Number",
      description: "Farmer Ramesh Nair from Payyanur dials the local Digital Sarpanch IVR number",
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      details: "Local toll-free number: 1800-123-4567"
    },
    {
      title: "Voice Prompt in Native Dialect",
      description: "System greets in Malayalam with Payyanur dialect",
      icon: <Volume2 className="h-5 w-5 text-green-500" />,
      details: "നമസ്കാരം, ഡിജിറ്റൽ സർപ്പാഞ്ച് IVR സേവനത്തിലേക്ക് സ്വാഗതം - പയ്യന്നൂർ പ്രത്യേക പതിപ്പ്"
    },
    {
      title: "Citizen Speaks Issue",
      description: "Ramesh says: 'എന്റെ നെൽക്കൃഷി ഉണങ്ങുകയാണ്' (My paddy crop is drying)",
      icon: <Mic className="h-5 w-5 text-purple-500" />,
      details: "Voice captured with high accuracy despite dialect variations"
    },
    {
      title: "WatsonX AI Processing",
      description: "IBM WatsonX processes the voice input using agricultural models",
      icon: <Brain className="h-5 w-5 text-orange-500" />,
      details: "Intent detected: CROP_WATER_MANAGEMENT | Confidence: 94.2%"
    },
    {
      title: "Smart Response Generated",
      description: "System provides precise irrigation advice based on real-time data",
      icon: <Leaf className="h-5 w-5 text-green-600" />,
      details: "Irrigate fields in 2 days, early morning before 9 AM to reduce evaporation"
    },
    {
      title: "Follow-up Action",
      description: "System schedules follow-up and sends SMS confirmation",
      icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
      details: "SMS sent to 9876543210: 'Irrigation advice for your paddy field provided. Follow-up scheduled for tomorrow.'"
    }
  ]

  const handleIVRStart = () => {
    setIsIVRActive(true)
  }

  const handleIVREnd = () => {
    setIsIVRActive(false)
    setSimulationStep(0)
  }

  // Auto-advance simulation when IVR is active
  useEffect(() => {
    if (isIVRActive) {
      const timer = setInterval(() => {
        setSimulationStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1
          }
          return prev
        })
      }, 3000)
      
      return () => clearInterval(timer)
    }
  }, [isIVRActive])

  return (
    <div className="w-full space-y-6">
      <Card className="border-t-4 border-t-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span>Payyanur Paddy Crop Scenario Simulation</span>
            <Badge variant="secondary" className="ml-2">Pilot Case</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Simulating citizen interaction with Digital Sarpanch IVR for agricultural advisory
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Simulation Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-red-500" />
                Scenario Progress
              </h3>
              
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border transition-all ${
                      index === simulationStep 
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-sm" 
                        : index < simulationStep 
                          ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10" 
                          : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1.5 rounded-full ${
                        index === simulationStep 
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
                          : index < simulationStep 
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                      }`}>
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{step.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                        {index <= simulationStep && (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            {step.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={handleIVRStart}
                  disabled={isIVRActive}
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Start Simulation
                </Button>
                <Button 
                  onClick={handleIVREnd}
                  variant="outline"
                  disabled={!isIVRActive}
                >
                  Reset
                </Button>
              </div>
            </div>
            
            {/* IVR Demo */}
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <Phone className="h-4 w-4 text-blue-500" />
                Interactive IVR Demo
              </h3>
              <div className="bg-secondary/50 rounded-lg p-4 min-h-64 flex items-center justify-center">
                {isIVRActive ? (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      IVR simulation is running. Speak into your microphone when prompted.
                    </p>
                    <div className="animate-pulse flex justify-center">
                      <Mic className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Click "Start Simulation" to begin the Payyanur paddy crop scenario
                    </p>
                    <IVRDemo />
                  </div>
                )}
              </div>
              
              {/* Results Summary */}
              {simulationStep === steps.length - 1 && (
                <Card className="mt-4 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Scenario Complete
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      The farmer received precise irrigation advice based on real-time soil moisture data. 
                      This is how Digital Sarpanch + IBM WatsonX reduced crop loss by 15% in Payyanur.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Payyanur Pilot Impact Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                <div className="text-lg font-bold text-blue-600">100%</div>
                <div className="text-xs text-muted-foreground">Scheme Enrollment</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-center">
                <div className="text-lg font-bold text-green-600">15%</div>
                <div className="text-xs text-muted-foreground">Crop Loss Reduction</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-center">
                <div className="text-lg font-bold text-purple-600">30%</div>
                <div className="text-xs text-muted-foreground">Water Saved</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-center">
                <div className="text-lg font-bold text-yellow-600">+18%</div>
                <div className="text-xs text-muted-foreground">School Attendance</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded text-center">
                <div className="text-lg font-bold text-orange-600">92%</div>
                <div className="text-xs text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}