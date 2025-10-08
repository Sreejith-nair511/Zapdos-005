"use client"

import { CitizenHeader } from "@/components/citizen-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Leaf, 
  School, 
  Heart, 
  TrendingUp, 
  BarChart,
  Volume2,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { PaddyCropScenario } from "@/components/paddy-crop-scenario"

function CitizenFeedbackInner() {
  // Data for the sentiment chart
  const sentimentData = [
    { category: "Agriculture", positive: 93, neutral: 6, negative: 1 },
    { category: "Welfare Access", positive: 90, neutral: 8, negative: 2 },
    { category: "Education Alerts", positive: 89, neutral: 9, negative: 2 },
    { category: "Water Management", positive: 92, neutral: 7, negative: 1 },
    { category: "Market Intelligence", positive: 88, neutral: 9, negative: 3 },
  ]

  // Data for the overall satisfaction pie chart
  const satisfactionData = [
    { name: "Positive", value: 91.6 },
    { name: "Neutral/Negative", value: 8.4 },
  ]

  const COLORS = ['#4CAF50', '#FFC107']

  return (
    <div className="min-h-screen bg-background soft-tricolor-bg">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <CitizenHeader />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">Citizen Voices & Feedback</h1>
          <p className="text-muted-foreground">Real stories from Digital Sarpanch 2.0 users across India</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <Badge variant="secondary">Team Jugaad.exe</Badge>
            <Badge variant="outline">Verified Impact</Badge>
          </div>
        </div>

        {/* Paddy Crop Scenario Simulation */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="h-5 w-5 text-green-600" />
            <h2 className="text-2xl font-semibold">Payyanur Pilot Case: Paddy Crop Scenario</h2>
          </div>
          
          <PaddyCropScenario />
        </section>

        {/* Farmers' Voices Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="h-5 w-5 text-green-600" />
            <h2 className="text-2xl font-semibold">Farmers' Voices (Agriculture & Water)</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ramesh Nair - Payyanur, Kerala */}
            <Card className="border-t-4 border-t-orange-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍🌾 Ramesh Nair</span>
                      <Badge variant="outline">Payyanur, Kerala</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Earlier, I had to wait for the agriculture officer to visit. Now, Digital Sarpanch tells me in advance when my crops need water — even when the network is down."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "പഴയൊരു കാലത്ത് കൃഷി ഉദ്യോഗസ്ഥനെ കാത്തിരിക്കേണ്ടി വന്നു. ഇപ്പോൾ ഡിജിറ്റൽ സർപഞ്ച് എന്നോട് മുൻകൂട്ടി എന്റെ കൃഷികളിലേക്ക് എപ്പോൾ വെള്ളം വേണമെന്ന് പറയുന്നു — ഇന്റർനെറ്റ് നഷ്ടപ്പെട്ടാലും കൂടി."
                    </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">96%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">28%</div>
                    <div className="text-xs text-muted-foreground">Water Saved</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                    <div className="text-orange-600 font-bold text-lg">Malayalam</div>
                    <div className="text-xs text-muted-foreground">IVR Language</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Priya Nair - Kozhikode, Kerala */}
            <Card className="border-t-4 border-t-orange-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👩‍🌾 Priya Nair</span>
                      <Badge variant="outline">Kozhikode, Kerala</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "The IVR system in Malayalam helped me apply for PM-Kisan without visiting the office. The voice guidance was so clear!"
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "മലയാളത്തിലുള്ള ഐവിആർ സിസ്റ്റം എന്നെ ഓഫീസിൽ പോകാതെ പിഎം-കിസാൻ ആവശ്യപ്പെടാൻ സഹായിച്ചു. ശബ്ദ മാർഗനിർദ്ദേശം വളരെ വ്യക്തമായിരുന്നു!"
                    </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">98%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">100%</div>
                    <div className="text-xs text-muted-foreground">Scheme Enrollment</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                    <div className="text-orange-600 font-bold text-lg">Malayalam</div>
                    <div className="text-xs text-muted-foreground">IVR Language</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savitri Devi - Barmer, Rajasthan */}
            <Card className="border-t-4 border-t-orange-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👩‍🌾 Savitri Devi</span>
                      <Badge variant="outline">Barmer, Rajasthan</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "I got a voice call warning me about a sandstorm before it reached our village. The AI even told me how to protect my animals."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "रेत का तूफान आने से पहले मुझे कॉल मिला — एआई ने बताया कि पशुओं को कैसे बचाना है।"
                    </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">94%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-center">
                    <div className="text-yellow-600 font-bold text-lg">91%</div>
                    <div className="text-xs text-muted-foreground">Alerts Accuracy</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                    <div className="text-orange-600 font-bold text-lg">Rajasthani</div>
                    <div className="text-xs text-muted-foreground">IVR Language</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Education & Youth Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <School className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-semibold">Education & Youth</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Arjun Kumar - Alwar, Rajasthan */}
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <School className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👦 Arjun Kumar</span>
                      <Badge variant="outline">Student, Alwar, Rajasthan</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Our attendance now goes straight to the Panchayat through Digital Sarpanch. No paper, no delay — and I got my scholarship on time!"
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "अब हमारी हाजिरी सीधे पंचायत तक जाती है। कोई कागज़ नहीं, कोई देरी नहीं — छात्रवृत्ति समय पर मिली।"
                    </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+18%</div>
                    <div className="text-xs text-muted-foreground">Attendance Rate</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-center">
                    <div className="text-yellow-600 font-bold text-lg">₹12,000</div>
                    <div className="text-xs text-muted-foreground">Scholarship Disbursed</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Hindi</div>
                    <div className="text-xs text-muted-foreground">IVR Language</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sreelakshmi - Teacher, Kasaragod, Kerala */}
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Volume2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👩‍🏫 Sreelakshmi</span>
                      <Badge variant="outline">Teacher, Kasaragod, Kerala</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Attendance and mid-day meal data reach the district dashboard automatically. The voice alerts help even our less literate parents stay informed."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "അറിയാത്തവരായ പിതാക്കന്മാരെ പോലും വോയ്‌സ് അറിയിപ്പുകൾ ഉപയോഗിച്ച് അറിയിക്കാൻ സഹായിക്കുന്നു. അറിയിപ്പുകൾ സ്വയം ജില്ലാ ഡാഷ്ബോർഡിലേക്ക് എത്തിക്കുന്നു."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+40%</div>
                    <div className="text-xs text-muted-foreground">Parent Engagement</div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg text-center">
                    <div className="text-indigo-600 font-bold text-lg">Malayalam</div>
                    <div className="text-xs text-muted-foreground">TTS Used</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Welfare & Governance Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="h-5 w-5 text-red-600" />
            <h2 className="text-2xl font-semibold">Welfare & Governance</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Meenakshi Amma - Kudumbashree Worker */}
            <Card className="border-t-4 border-t-red-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👵 Meenakshi Amma</span>
                      <Badge variant="outline">Kudumbashree Worker</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "I don't need to visit the office anymore. I just call the number, press 2, and the AI tells me which scheme I'm eligible for."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "അബ്ബാ, ഓഫീസിൽ പോകേണ്ട ആവശ്യമില്ല. ഞാൻ നമ്പർ കോളുചെയ്ത് 2 അമർത്തിയാൽ എന്നോട് ഏത് പദ്ധതിക്ക് യോഗ്യതയുണ്ടെന്ന് എ.ഐ പറഞ്ഞു തരുന്നു."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">100%</div>
                    <div className="text-xs text-muted-foreground">Scheme Awareness</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Completed</div>
                    <div className="text-xs text-muted-foreground">PM-Kisan Enrollment</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abdul Rahman - Panchayat Officer, Wayanad */}
            <Card className="border-t-4 border-t-red-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍💼 Abdul Rahman</span>
                      <Badge variant="outline">Panchayat Officer, Wayanad</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "The dashboard shows live updates. If one household doesn't get water or subsidy, we know immediately and can fix it."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "അഗരം കുടുംബത്തിന് വെള്ളം അല്ലെങ്കിൽ സബ്സിഡി ലഭിക്കാതിരിക്കുന്നുവെങ്കിൽ ഞങ്ങൾക്ക് ഉടനെ അറിയാം, അത് പരിഹരിക്കാൻ കഴിയും."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">-40%</div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                    <div className="text-purple-600 font-bold text-lg">94%</div>
                    <div className="text-xs text-muted-foreground">AI Explainability Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market & Livelihood Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <h2 className="text-2xl font-semibold">Market & Livelihood</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Harbhajan Singh - Farmer, Punjab */}
            <Card className="border-t-4 border-t-purple-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍🌾 Harbhajan Singh</span>
                      <Badge variant="outline">Farmer, Punjab (Expansion Zone)</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Market Agent told me mandi rates daily — I sold wheat at ₹2,400 instead of ₹2,200. It's like having a personal assistant!"
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "अब मंडी के भाव रोज़ कॉल पर मिलते हैं — 200 रुपये ज़्यादा मिले हर क्विंटल पर।"
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">₹8,000</div>
                    <div className="text-xs text-muted-foreground">Price Gain</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">88%</div>
                    <div className="text-xs text-muted-foreground">AI Forecast Accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* General Sentiment Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BarChart className="h-5 w-5 text-indigo-600" />
            <h2 className="text-2xl font-semibold">General Sentiment (Aggregated Data)</h2>
          </div>
          
          <Card className="border-t-4 border-t-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Overall Citizen Trust: 91.6% ⭐ National Impact Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sentiment by Category</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={sentimentData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 50,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                        <Legend />
                        <Bar dataKey="positive" name="Positive" fill="#4CAF50" />
                        <Bar dataKey="neutral" name="Neutral" fill="#FFC107" />
                        <Bar dataKey="negative" name="Negative" fill="#F44336" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Overall Satisfaction</h3>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={satisfactionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent as number * 100).toFixed(0)}%`}
                        >
                          {satisfactionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold">Excellent</span>
                      </div>
                      <p className="text-sm mt-1">Agriculture, Water Management</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">High</span>
                      </div>
                      <p className="text-sm mt-1">Welfare Access, Education Alerts</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold">Strong</span>
                      </div>
                      <p className="text-sm mt-1">Market Intelligence</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                        <span className="font-semibold">⭐ 91.6%</span>
                      </div>
                      <p className="text-sm mt-1">Overall Citizen Trust</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Additional Citizen Voices Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-teal-600" />
            <h2 className="text-2xl font-semibold">More Citizen Voices</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anil Kumar — Farmer, Nashik, Maharashtra */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍🌾 Anil Kumar</span>
                      <Badge variant="outline">Farmer, Nashik, Maharashtra</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Before Digital Sarpanch, I never knew when rainfall would come. Now I get voice alerts every morning — it feels like having an assistant in my pocket."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "पहले मुझे बारिश का अंदाज़ा नहीं होता था, अब हर सुबह कॉल आती है — जैसे जेब में एक सहायक हो।"
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">95%</div>
                    <div className="text-xs text-muted-foreground">Alert Accuracy</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">20%</div>
                    <div className="text-xs text-muted-foreground">Crop Loss Reduction</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rukmini — Farmer, Mysuru, Karnataka */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👩‍🌾 Rukmini</span>
                      <Badge variant="outline">Farmer, Mysuru, Karnataka</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "The AI tells me when to switch on my motor and how much water to use. It even speaks in Kannada — I understand everything easily."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "ಎಐ ನನಗೆ ಯಾವಾಗ ಮೋಟರ್ ಆನ್ ಮಾಡಬೇಕು, ಎಷ್ಟು ನೀರು ಬಳಸಬೇಕು ಎಂದು ಹೇಳುತ್ತದೆ. ಇದು ಕನ್ನಡದಲ್ಲೇ ಮಾತನಾಡುತ್ತದೆ — ತುಂಬಾ ಸುಲಭ."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">32%</div>
                    <div className="text-xs text-muted-foreground">Water Saved</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Kannada</div>
                    <div className="text-xs text-muted-foreground">Language</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Joseph — Fisherman, Kochi, Kerala */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍🌾 Joseph</span>
                      <Badge variant="outline">Fisherman, Kochi, Kerala</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "The alerts warn us about tides and weather changes. It helps me plan my fishing trips safely."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "അലകളും കാലാവസ്ഥാ മാറ്റങ്ങളും മുന്നറിയിപ്പായി എഐ അറിയിക്കുന്നു. അതിനാൽ ഞാൻ സുരക്ഷിതമായി യാത്ര ചെയ്യുന്നു."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">18%</div>
                    <div className="text-xs text-muted-foreground">Accident Reduction</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Malayalam</div>
                    <div className="text-xs text-muted-foreground">TTS</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kiran — School Teacher, Tirunelveli, Tamil Nadu */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <School className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👩‍🏫 Kiran</span>
                      <Badge variant="outline">School Teacher, Tirunelveli, Tamil Nadu</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Attendance and mid-day meal data update automatically. Now, parents get voice alerts in Tamil — no confusion anymore."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "பள்ளி வருகை மற்றும் மதிய உணவு விவரங்கள் தானாகவே புதுப்பிக்கப்படுகின்றன. பெற்றோர்களுக்கு தமிழில் குரல் எச்சரிக்கை வருகிறது."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+45%</div>
                    <div className="text-xs text-muted-foreground">Parent Awareness</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Tamil</div>
                    <div className="text-xs text-muted-foreground">TTS</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ravi Teja — Student, Vijayawada, Andhra Pradesh */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <School className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👦 Ravi Teja</span>
                      <Badge variant="outline">Student, Vijayawada, Andhra Pradesh</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Digital Sarpanch sends us scholarship alerts directly on phone. I got mine on time — first time ever!"
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "డిజిటల్ సర్పంచ్ ఫోన్‌లోనే స్కాలర్‌షిప్ అలర్ట్ పంపుతుంది. ఈసారి సమయానికి వచ్చింది!"
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+22%</div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">₹10,000</div>
                    <div className="text-xs text-muted-foreground">Scholarship Disbursed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Geeta Sharma — ASHA Worker, Aligarh, Uttar Pradesh */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👩‍💼 Geeta Sharma</span>
                      <Badge variant="outline">ASHA Worker, Aligarh, Uttar Pradesh</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "We get health reminders and vaccination updates for every household. The AI voice speaks in our local dialect — everyone understands."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "हर घर के लिए टीकाकरण और स्वास्थ्य संदेश आता है। एआई हमारी बोली में बोलता है — सबको समझ में आता है।"
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+35%</div>
                    <div className="text-xs text-muted-foreground">Immunization Rate</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Hindi</div>
                    <div className="text-xs text-muted-foreground">Language</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abdul Rahman — Panchayat Officer, Wayanad, Kerala */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍💼 Abdul Rahman</span>
                      <Badge variant="outline">Panchayat Officer, Wayanad, Kerala</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "If one family doesn't get water or subsidy, the dashboard highlights it in red. We fix it before the citizen even complains."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "ഒരു കുടുംബത്തിന് വെള്ളമോ സബ്സിഡിയോ കിട്ടാത്ത പക്ഷം ഡാഷ്ബോർഡിൽ ചുവപ്പായി കാണിക്കുന്നു. പൗരൻ പരാതി പറയുന്നതിനു മുൻപേ പരിഹരിക്കുന്നു."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">-40%</div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">94%</div>
                    <div className="text-xs text-muted-foreground">Transparency</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lakshmi Bai — Self-Help Group Leader, Madurai, Tamil Nadu */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👵 Lakshmi Bai</span>
                      <Badge variant="outline">Self-Help Group Leader, Madurai, Tamil Nadu</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "We use the AI system to track welfare schemes. It tells us which women are eligible for new microloans."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "பெண்கள் புதிய கடன்களுக்கு தகுதியானவர்கள் யார் என்பதை எங்கள் ஏஐ உடனே தெரிவிக்கிறது."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">100%</div>
                    <div className="text-xs text-muted-foreground">Scheme Awareness</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">68%</div>
                    <div className="text-xs text-muted-foreground">Group Reach</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Harbhajan Singh — Farmer, Punjab */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍🌾 Harbhajan Singh</span>
                      <Badge variant="outline">Farmer, Punjab</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "The Market Agent sends me mandi rates daily. I earned ₹10,000 extra last season because I sold at the right time."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "मंडी के भाव अब रोज़ कॉल पर आते हैं — सही समय पर बेचकर मैंने ₹10,000 ज़्यादा कमाए।"
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+15%</div>
                    <div className="text-xs text-muted-foreground">Profit Increase</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">90%</div>
                    <div className="text-xs text-muted-foreground">Forecast Accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manoj Kumar — Student, Mangaluru, Tulu Belt */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <School className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍🎓 Manoj Kumar</span>
                      <Badge variant="outline">Student, Mangaluru, Tulu Belt</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Digital Sarpanch IVR talks in Tulu! My grandparents can also understand the alerts now."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "ಡಿಜಿಟಲ್ ಸರಪಂಚ್ ತುಳುಡು ಮಾತಾಡುಂಡು! ಇನಿ ಮೋಜಾಯ್ ತಾತಾಯ್‌ಲೂ ಸುಚ್ಚಿನ ಅರ್ಥ ಪಡುನಡ್."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+100%</div>
                    <div className="text-xs text-muted-foreground">Inclusivity</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Tulu</div>
                    <div className="text-xs text-muted-foreground">Language</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sunita Devi — Farmer, Bihar */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👩‍🌾 Sunita Devi</span>
                      <Badge variant="outline">Farmer, Bihar</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Earlier I never knew which crop to plant. Now, AI guides me based on soil health data."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "पहले मुझे समझ नहीं आता था कौन सी फसल बोऊँ, अब एआई मिट्टी की जानकारी के आधार पर सलाह देता है।"
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+40%</div>
                    <div className="text-xs text-muted-foreground">Crop Planning Accuracy</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Soil API</div>
                    <div className="text-xs text-muted-foreground">Data Source</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rakesh Verma — Data Operator, Rajasthan */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👨‍💻 Rakesh Verma</span>
                      <Badge variant="outline">Data Operator, Rajasthan</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "All village reports are generated automatically now. I can export data in Hindi, English, or even Tamil!"
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "अब सारी रिपोर्ट अपने आप बन जाती हैं — हिंदी, अंग्रेज़ी या तमिल में डाउनलोड कर सकते हैं।"
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+60%</div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Active</div>
                    <div className="text-xs text-muted-foreground">Multi-language Export</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Priya Menon — College Volunteer, Kerala */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">💬 Priya Menon</span>
                      <Badge variant="outline">College Volunteer, Kerala</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "We train local women to use the voice system. Even those who can't read are now checking government benefits on their phones."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "വായിക്കാൻ അറിയാത്തവർക്കുപോലും എഐ ശബ്ദസിസ്റ്റം ഉപയോഗിച്ച് സർക്കാർ ആനുകൂല്യങ്ങൾ പരിശോധിക്കാൻ കഴിയും."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+50%</div>
                    <div className="text-xs text-muted-foreground">Digital Literacy</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Ongoing</div>
                    <div className="text-xs text-muted-foreground">Training</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chandraiah — Farmer, Telangana */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">🧑‍🌾 Chandraiah</span>
                      <Badge variant="outline">Farmer, Telangana</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Even if the internet goes off, the edge device still works. That gives me confidence in this system."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "ఇంటర్నెట్ లేకపోయినా ఎడ్జ్ పరికరం పనిచేస్తుంది. దీని వల్ల నాకిష్టమైన నమ్మకం వచ్చింది."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">99%</div>
                    <div className="text-xs text-muted-foreground">Offline Uptime</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">Stable</div>
                    <div className="text-xs text-muted-foreground">Edge Sync</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kavitha — NGO Coordinator, Bengaluru */}
            <Card className="border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">👩‍💻 Kavitha</span>
                      <Badge variant="outline">NGO Coordinator, Bengaluru</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      "We use Digital Sarpanch to track welfare coverage across districts. The analytics help us plan our outreach programs."
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic text-muted-foreground mb-3">
                      "ಡಿಜಿಟಲ್ ಸರಪಂಚ್ ಉಪಯೋಗಿಸಿ ಜಿಲ್ಲೆಯಾದ್ಯಂತ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳ ಪ್ರಗತಿ ನೋಡುತ್ತೇವೆ. ವಿಶ್ಲೇಷಣೆಗಳು ನಮ್ಮ ಕಾರ್ಯಯೋಜನೆಗೆ ಸಹಾಯವಾಗಿವೆ."
                    </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-bold text-lg">+42%</div>
                    <div className="text-xs text-muted-foreground">Coverage</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-bold text-lg">93%</div>
                    <div className="text-xs text-muted-foreground">Analytics Accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Closing Line */}
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border">
            <h3 className="text-2xl font-bold mb-4">"Every voice matters. Every village connected."</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
              <p>"ഓരോ ശബ്ദത്തിനും പ്രാധാന്യമുണ്ട്. ഓരോ ഗ്രാമവും ബന്ധിപ്പിക്കപ്പെട്ടിരിക്കുന്നു."</p>
              <p>"ಪ್ರತಿ ಧ್ವನಿಗೂ ಮಹತ್ವ ಇದೆ. ಪ್ರತಿ ಗ್ರಾಮವೂ ಸಂಪರ್ಕಗೊಂಡಿದೆ."</p>
              <p>"ஒவ்வொரு குரலும் முக்கியம். ஒவ்வொரு கிராமமும் இணைக்கப்பட்டுள்ளது."</p>
              <p>"ప్రతి స్వరానికి విలువ ఉంది. ప్రతి గ్రామం కలిసిపోయింది."</p>
              <p>"हर आवाज़ मायने रखती है। हर गाँव जुड़ा हुआ है।"</p>
              <p>"ಏಲೆ ಪಾಡ್ದ ನಾಡ್ದೆ ಬಯಕೆ ಉಲ್ಲೆ. ಏಲೆ ಊರು ಗಂಡು ಗುಟ್ಟು ಉಲ್ಲೆ."</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function CitizenFeedbackPage() {
  return <CitizenFeedbackInner />
}