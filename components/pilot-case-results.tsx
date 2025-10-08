"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Leaf, 
  School, 
  Droplets, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Award
} from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function PilotCaseResults() {
  const { data } = useSWR("/api/mcp", fetcher, { refreshInterval: 10000 })
  
  const results = data?.pilotResults?.results || {
    schemeEnrollment: "100%",
    cropLossReduction: "15%",
    waterWastageReduction: "30%",
    schoolAttendanceImprovement: "18%",
    citizenSatisfaction: "92%"
  }

  return (
    <div className="w-full">
      <Card className="border-t-4 border-t-green-500 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            <span>Payyanur, Kerala Pilot Case Results</span>
            <Badge variant="secondary" className="ml-2">6 Months</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Deployed in partnership with local panchayat + IBM WatsonX for voice processing
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{results.schemeEnrollment}</div>
              <div className="text-xs text-muted-foreground mt-1">Scheme Enrollment</div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <Leaf className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{results.cropLossReduction}</div>
              <div className="text-xs text-muted-foreground mt-1">Crop Loss Reduction</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
              <Droplets className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{results.waterWastageReduction}</div>
              <div className="text-xs text-muted-foreground mt-1">Water Saved</div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
              <School className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">+{results.schoolAttendanceImprovement}</div>
              <div className="text-xs text-muted-foreground mt-1">School Attendance</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
              <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{results.citizenSatisfaction}</div>
              <div className="text-xs text-muted-foreground mt-1">Satisfaction</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Key Achievements
            </h4>
            <ul className="text-sm space-y-1">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>100% scheme enrollment for eligible farmers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>15% reduction in crop loss via early irrigation alerts</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>30% reduction in water wastage through optimized irrigation schedules</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>School attendance tracking improved by 18%</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Citizens reported 92% satisfaction with IVR-based access</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}