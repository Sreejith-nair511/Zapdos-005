"use client"

import { IVRDemo } from "@/components/ivr-demo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mic, Leaf, Droplets, Lightbulb, School, Heart, TrendingUp, Wrench, Trash2, FileText, User } from "lucide-react"
import Link from "next/link"

export default function IVRTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Digital Sarpanch IVR Testing</h1>
        <p className="text-muted-foreground">
          Test the enhanced IVR system with multiple scenarios in English
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IVR Demo */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                <span>Interactive IVR Demo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-96">
              <IVRDemo />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Click the button above to start the IVR demo. Try different options to test various scenarios.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Scenarios Guide */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-blue-600" />
                <span>Test Scenarios</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Agricultural Scenarios
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• "My paddy crop is drying due to lack of water"</li>
                    <li>• "I see pests damaging my crops"</li>
                    <li>• "My plant leaves are turning yellow"</li>
                    <li>• "When will it rain next?"</li>
                    <li>• "My crop has a fungal disease"</li>
                    <li>• "Soil pH is not suitable for cultivation"</li>
                    <li>• "When should I sow paddy seeds?"</li>
                    <li>• "How do I know when to harvest?"</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    Utility Scenarios
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• "No electricity in our area for 3 hours"</li>
                    <li>• "When will the water tanker arrive?"</li>
                    <li>• "Water quality seems poor"</li>
                    <li>• "Road has potholes near school"</li>
                    <li>• "Garbage not collected for 3 days"</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <School className="h-4 w-4 text-purple-600" />
                    Education & Health
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• "My child's school fees are due"</li>
                    <li>• "Need to check school attendance"</li>
                    <li>• "Where is the nearest health center?"</li>
                    <li>• "Medicine stock information"</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    Market & Economy
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• "What are today's vegetable prices?"</li>
                    <li>• "Government procurement rates"</li>
                    <li>• "When is the weekly market?"</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    Emergency Services
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• Press # for emergency alerts</li>
                    <li>• "Medical emergency at house number 15"</li>
                    <li>• "Road accident near the school"</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-600" />
                    Administrative Services
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>• "How to get birth certificate?"</li>
                    <li>• "Pension payment status"</li>
                    <li>• "Waste collection schedule"</li>
                    <li>• "Road maintenance request"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-blue-600" />
              <span>How to Test</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="text-sm space-y-2 list-decimal pl-5">
              <li>Click "Start IVR Demo" button</li>
              <li>Try different menu options (1-9, 0, #, *)</li>
              <li>Press "Voice" button to speak</li>
              <li>Test various scenarios from the guide</li>
              <li>Check responses for accuracy</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Key Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 list-disc pl-5">
              <li>12 main menu options</li>
              <li>6 sub-menu options</li>
              <li>Voice recognition in English</li>
              <li>Multi-language support</li>
              <li>Mobile-optimized UI</li>
              <li>WatsonX AI integration</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-purple-600" />
              <span>Documentation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/cost-breakdown" className="text-blue-600 hover:underline">
                  Cost Breakdown Model
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-blue-600 hover:underline">
                  Demo Scenarios
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-600 hover:underline">
                  Home Page
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Link href="/demo">
          <Button variant="outline" className="mr-4">
            Back to Demo Scenarios
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}