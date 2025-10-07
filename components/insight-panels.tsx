"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Wheat, 
  Droplets, 
  School, 
  Handshake,
  Brain,
  TrendingUp,
  Thermometer,
  CloudRain,
  Users,
  Wallet,
  Check,
  Eye,
  AlertTriangle
} from "lucide-react"

function ExplainModal({ 
  title, 
  onClose, 
  data 
}: { 
  title: string; 
  onClose: () => void;
  data: {
    input: string;
    reasoning: string[];
    confidence: number;
    decision: string;
  }
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
      <motion.div 
        className="w-full max-w-md rounded-xl bg-card p-4 ring-1 ring-border max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Decision Explanation
          </h3>
          <button 
            className="text-2xl"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
          >
            &times;
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-muted-foreground text-sm">Input</h4>
            <p className="mt-1 text-sm">{data.input}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-muted-foreground text-sm">Reasoning Chain</h4>
            <div className="mt-2 space-y-2">
              {data.reasoning.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs mt-0.5">
                    {index + 1}
                  </div>
                  <div className="ml-2 p-2 bg-secondary rounded flex-1 text-sm">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-muted-foreground text-sm">Confidence Score</h4>
            <div className="mt-1 flex items-center gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${data.confidence}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">{data.confidence}%</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-muted-foreground text-sm">Decision</h4>
            <p className="mt-1 text-sm">{data.decision}</p>
          </div>
          
          <div className="flex gap-2 pt-2 flex-col sm:flex-row">
            <button 
              className="flex-1 bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Acknowledge clicked');
                // Add your acknowledge logic here
              }}
            >
              <Check className="h-4 w-4" />
              <span>Acknowledge</span>
            </button>
            <button 
              className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Verify clicked');
                // Add your verify logic here
              }}
            >
              <Eye className="h-4 w-4" />
              <span>Verify</span>
            </button>
            <button 
              className="flex-1 bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Escalate clicked');
                // Add your escalate logic here
              }}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Escalate</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Panel({ 
  title, 
  icon,
  data
}: { 
  title: string; 
  icon: React.ReactNode;
  data: {
    input: string;
    reasoning: string[];
    confidence: number;
    decision: string;
    visualization: React.ReactNode;
  }
}) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div 
      className="rounded-xl bg-card p-4 ring-1 ring-border hover:ring-2 hover:ring-primary transition-all"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <div className="font-medium">{title}</div>
        </div>
        <button 
          className="text-sm rounded bg-secondary px-2 py-1 flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <Brain className="h-3 w-3" />
          Explain AI
        </button>
      </div>
      <div className="mt-3">
        {data.visualization}
      </div>
      {open && (
        <ExplainModal 
          title={title} 
          onClose={() => setOpen(false)} 
          data={{
            input: data.input,
            reasoning: data.reasoning,
            confidence: data.confidence,
            decision: data.decision
          }} 
        />
      )}
    </motion.div>
  )
}

export function InsightPanels() {
  // Mock data for each panel
  const cropHealthData = {
    input: "Soil moisture sensors report 23% in 5 fields, weather forecast shows no rain for next 7 days",
    reasoning: [
      "Soil moisture below optimal threshold of 30%",
      "No rainfall expected in next week",
      "Crop stress risk assessment: High",
      "Irrigation required to prevent yield loss",
      "Water availability check: Sufficient reserves"
    ],
    confidence: 92,
    decision: "Trigger irrigation for 5 affected fields",
    visualization: (
      <div className="h-24 rounded bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 p-2">
        <div className="flex justify-between text-xs mb-1">
          <span>0%</span>
          <span>Moisture Level</span>
          <span>100%</span>
        </div>
        <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
          <div className="absolute top-0 left-1/4 w-0.5 h-3 bg-black"></div>
          <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-black"></div>
          <div className="absolute top-0 left-3/4 w-0.5 h-3 bg-black"></div>
          <div className="absolute top-0 left-[23%] w-1 h-5 bg-blue-600 -mt-1 rounded"></div>
        </div>
        <div className="text-center mt-2 text-sm font-medium text-red-600">
          Low Moisture - Action Required
        </div>
      </div>
    )
  }

  const waterResourceData = {
    input: "Tank level at 32%, rainfall in last 24 hours: 0mm, consumption rate: 15% per day",
    reasoning: [
      "Tank level below optimal threshold of 40%",
      "No recent rainfall recorded",
      "Consumption rate higher than average",
      "Water shortage risk in 2-3 days",
      "Conservation measures recommended"
    ],
    confidence: 88,
    decision: "Issue water conservation alert to citizens",
    visualization: (
      <div className="h-24 flex items-center justify-center">
        <div className="relative">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#E0F2FE" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#0EA5E9" strokeWidth="5" 
              strokeDasharray={`${32} 100`} transform="rotate(-90 50 50)" />
            <text x="50" y="55" textAnchor="middle" fontSize="20" fill="#0EA5E9">32%</text>
          </svg>
          <div className="absolute -bottom-2 left-0 right-0 text-center text-sm font-medium text-blue-600">
            Water Level
          </div>
        </div>
      </div>
    )
  }

  const educationData = {
    input: "Attendance rate dropped to 78% in 3 schools, 2 students absent for 5+ days",
    reasoning: [
      "Attendance below threshold of 85%",
      "Multiple students with prolonged absences",
      "Dropout risk assessment: Medium-High",
      "Parent notification required",
      "Counselor intervention recommended"
    ],
    confidence: 91,
    decision: "Send attendance alerts to parents and assign counselor follow-up",
    visualization: (
      <div className="h-24 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <svg width="80" height="80" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#EDECEB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="78, 100"
              />
              <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#10B981">78%</text>
            </svg>
          </div>
          <div className="text-sm font-medium text-green-600 mt-1">
            Attendance Rate
          </div>
        </div>
      </div>
    )
  }

  const welfareData = {
    input: "PM-Kisan applications: 142 pending, MGNREGS: 89 pending, PMAY: 34 pending",
    reasoning: [
      "High volume of pending applications",
      "Processing delay exceeds 48-hour target",
      "Resource allocation needed for faster processing",
      "Citizen satisfaction risk: Medium",
      "Additional staff allocation recommended"
    ],
    confidence: 85,
    decision: "Allocate additional staff to welfare scheme processing",
    visualization: (
      <div className="h-24 flex items-center justify-center">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">142</div>
            <div className="text-xs text-muted-foreground">PM-Kisan</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">89</div>
            <div className="text-xs text-muted-foreground">MGNREGS</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">34</div>
            <div className="text-xs text-muted-foreground">PMAY</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Panel 
        title="🌾 Crop Health Monitor" 
        icon={<Wheat className="h-5 w-5 text-green-600" />}
        data={cropHealthData}
      />
      <Panel 
        title="💧 Water Resource Tracker" 
        icon={<Droplets className="h-5 w-5 text-blue-600" />}
        data={waterResourceData}
      />
      <Panel 
        title="📚 Education Panel" 
        icon={<School className="h-5 w-5 text-indigo-600" />}
        data={educationData}
      />
      <Panel 
        title="👨‍🌾 Welfare Tracker" 
        icon={<Handshake className="h-5 w-5 text-purple-600" />}
        data={welfareData}
      />
    </div>
  )
}

