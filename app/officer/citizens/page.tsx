"use client"
import { useI18n } from "@/components/i18n-provider"
import { AccessibilitySuite } from "@/components/accessibility-suite"
import { DevRibbon } from "@/components/dev-ribbon"
import { OfficerHeader } from "@/components/officer-header"
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
  Info,
  MessageSquare, 
  MapPin, 
  Phone 
} from "lucide-react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

function CitizensInner() {
  const { t } = useI18n()
  
  // Data for the sentiment chart
  const sentimentData = [
    { category: t("Agriculture"), positive: 93, neutral: 6, negative: 1 },
    { category: t("Welfare Access"), positive: 90, neutral: 8, negative: 2 },
    { category: t("Education Alerts"), positive: 89, neutral: 9, negative: 2 },
    { category: t("Water Management"), positive: 92, neutral: 7, negative: 1 },
    { category: t("Market Intelligence"), positive: 88, neutral: 9, negative: 3 },
  ]

  // Data for the overall satisfaction pie chart
  const satisfactionData = [
    { name: t("Positive"), value: 91.6 },
    { name: t("Neutral/Negative"), value: 8.4 },
  ]

  const COLORS = ['#4CAF50', '#FFC107']

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8 grid gap-6 soft-tricolor-bg" role="main">
      <OfficerHeader />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("Citizen Engagement & Feedback")}</h1>
        <div className="text-sm text-muted-foreground">
          {t("Active Citizens: 501")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Total Citizens")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">540</div>
            <p className="text-xs text-muted-foreground">+5.2% {t("from last month")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Active This Week")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500</div>
            <p className="text-xs text-muted-foreground">+12% {t("from last week")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Feedback Received")}</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">499</div>
            <p className="text-xs text-muted-foreground">+8.4% {t("from last week")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Satisfaction Rate")}</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.4%</div>
            <p className="text-xs text-muted-foreground">+2.1% {t("from last month")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Farmers' Voices Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Leaf className="h-5 w-5 text-green-600" />
          <h2 className="text-2xl font-semibold">{t("Farmers' Voices (Agriculture & Water)")}</h2>
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
                    {t("Earlier, I had to wait for the agriculture officer to visit. Now, Digital Sarpanch tells me in advance when my crops need water — even when the network is down.")}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic text-muted-foreground mb-3">
                  {t("മുമ്പ് എനിക്ക് ഓഫീസർ വരുന്നത് കാത്തിരിക്കേണ്ടി വരുമായിരുന്നു, ഇപ്പോൾ ഡിജിറ്റൽ സര്‍പ്പാഞ്ച് തന്നെയാണ് പറളുന്നത് വയലിന് എപ്പോഴാണ് വെള്ളം വേണമെന്ന്.")}
                </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg">96%</div>
                  <div className="text-xs text-muted-foreground">{t("Satisfaction")}</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-lg">28%</div>
                  <div className="text-xs text-muted-foreground">{t("Water Saved")}</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                  <div className="text-orange-600 font-bold text-lg">Malayalam</div>
                  <div className="text-xs text-muted-foreground">{t("IVR Language")}</div>
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
                    {t("I got a voice call warning me about a sandstorm before it reached our village. The AI even told me how to protect my animals.")}
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
                  <div className="text-xs text-muted-foreground">{t("Satisfaction")}</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-center">
                  <div className="text-yellow-600 font-bold text-lg">91%</div>
                  <div className="text-xs text-muted-foreground">{t("Alerts Accuracy")}</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                  <div className="text-orange-600 font-bold text-lg">Rajasthani</div>
                  <div className="text-xs text-muted-foreground">{t("IVR Language")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Education & Youth Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <School className="h-5 w-5 text-blue-600" />
          <h2 className="text-2xl font-semibold">{t("Education & Youth")}</h2>
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
                  <div className="text-xs text-muted-foreground">{t("Attendance Rate")}</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-center">
                  <div className="text-yellow-600 font-bold text-lg">₹12,000</div>
                  <div className="text-xs text-muted-foreground">{t("Scholarship Disbursed")}</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-lg">Hindi</div>
                  <div className="text-xs text-muted-foreground">{t("IVR Language")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priya Sharma - Payyanur, Kerala */}
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Volume2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">👩‍🏫 Priya Sharma</span>
                    <Badge variant="outline">Teacher, Payyanur, Kerala</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    "Attendance and mid-day meal data reach the district dashboard automatically. The voice alerts help even our less literate parents stay informed."
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic text-muted-foreground mb-3">
                  ഇപ്പോൾ സ്കൂളിന്റെ വിവരങ്ങൾ സ്വയം പഞ്ചായത്തിലേക്ക് എത്തുന്നു — മാതാപിതാക്കൾക്കും ഫോൺ കോളിലൂടെ എല്ലാം അറിയാൻ സാധിക്കുന്നു.”
                </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg">+40%</div>
                  <div className="text-xs text-muted-foreground">{t("Parent Engagement")}</div>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg text-center">
                  <div className="text-indigo-600 font-bold text-lg">Malayalam</div>
                  <div className="text-xs text-muted-foreground">{t("TTS Used")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Health & Welfare Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-5 w-5 text-red-600" />
          <h2 className="text-2xl font-semibold">{t("Health & Welfare")}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meena Devi - Barmer, Rajasthan */}
          <Card className="border-t-4 border-t-red-500">
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">👵 Meena Devi</span>
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
                 "ಈಗ ಕಚೇರಿಗೆ ಹೋಗುವ ಅಗತ್ಯವೇ ಇಲ್ಲ. ಕೇವಲ ಕರೆ ಮಾಡಿ, ಬಟನ್ ಒತ್ತಿ — ಎಐ ತಾನೇ ಹೇಳುತ್ತದೆ ಯಾವ ಯೋಜನೆ ನಿಮಗೆ ಸಿಗುತ್ತದೆ ಎಂದು.”
                </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg">100%</div>
                  <div className="text-xs text-muted-foreground">{t("Scheme Awareness")}</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-lg">Completed</div>
                  <div className="text-xs text-muted-foreground">{t("PM-Kisan Enrollment")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lakshmi - Payyanur, Kerala */}
          <Card className="border-t-4 border-t-red-500">
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <div className="bg-teal-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">👨‍💼 Lakshmi</span>
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
                  "अगर किसी घर तक पानी या सब्सिडी नहीं पहुँची, तो तुरंत पता चल जाता है — अब काम पारदर्शी है।"
                </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg">-40%</div>
                  <div className="text-xs text-muted-foreground">{t("Response Time")}</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                  <div className="text-purple-600 font-bold text-lg">94%</div>
                  <div className="text-xs text-muted-foreground">{t("AI Explainability Score")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sentiment Analysis Charts */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">{t("Sentiment Analysis")}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-purple-600" />
                {t("Citizen Sentiment by Category")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={sentimentData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" name={t("Positive")} fill="#4CAF50" />
                    <Bar dataKey="neutral" name={t("Neutral")} fill="#FFC107" />
                    <Bar dataKey="negative" name={t("Negative")} fill="#F44336" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-green-600" />
                {t("Overall Citizen Satisfaction")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
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
                    <Tooltip formatter={(value) => [`${value}%`, t("Percentage")]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility Suite */}
      <AccessibilitySuite />
      
      {/* Developer Features */}
      <DevRibbon />
    </main>
  )
}

export default function Page() {
  return <CitizensInner />
}
