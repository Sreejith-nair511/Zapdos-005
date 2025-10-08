"use client"

import { I18nProvider } from "@/components/i18n-provider"
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
      </main>
    </div>
  )
}

export default function CitizenFeedbackPage() {
  return (
    <I18nProvider>
      <CitizenFeedbackInner />
    </I18nProvider>
  )
}