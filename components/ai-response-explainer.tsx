"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Zap,
  User,
  Bot,
  FileText,
  Cpu,
  ShieldCheck,
  Lightbulb,
  Workflow
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AIExplanationProps {
  input: string
  agent: string
  ruleEngine: string
  confidence: number
  decision: string
  humanVerification: string
}

export function AIResponseExplainer({ 
  input, 
  agent, 
  ruleEngine, 
  confidence, 
  decision, 
  humanVerification 
}: AIExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Determine confidence level text
  const getConfidenceLevel = (score: number) => {
    if (score >= 90) return "Very High";
    if (score >= 70) return "High";
    if (score >= 50) return "Moderate";
    return "Low";
  }

  // Determine confidence level color
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <div className="mt-4 border rounded-lg bg-card">
      <Button
        variant="ghost"
        className="w-full flex items-center justify-between p-3 h-auto"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Explain AI Reasoning</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {isExpanded && (
        <div className="p-3 border-t bg-muted/50">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <User className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Input
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{input}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Bot className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm flex items-center gap-1">
                  <Cpu className="h-3 w-3" />
                  Agent
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{agent}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Zap className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm flex items-center gap-1">
                  <Workflow className="h-3 w-3" />
                  Rule Engine
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{ruleEngine}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Info className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  Confidence Score
                </h4>
                <div className="mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceColor(confidence)}`} 
                        style={{ width: `${confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{confidence}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getConfidenceLevel(confidence)} Confidence
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Decision
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{decision}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Human Verification
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{humanVerification}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  AI Generated
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Explainable AI
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Powered by Mistral AI
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}